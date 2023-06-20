import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebase";


export const uploadImage = (e, setImgUrl, setPercentUpload, setIsUpload) => {
    const file = e.target.files[0];
    if (!file) return;
    const sotrageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(sotrageRef, file);
    uploadTask.on(
        "state_changed",
        (snapshot) => {
            const prog = `${Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )}%`;
            setPercentUpload(prog);
        },
        (error) => console.log(error),
        () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImgUrl(downloadURL);
                setIsUpload(false);
            });
        }
    );
}