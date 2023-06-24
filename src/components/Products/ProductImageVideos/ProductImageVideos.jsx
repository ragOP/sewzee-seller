import LinearProgress from '@mui/material/LinearProgress';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import ImageIcon from '@mui/icons-material/Image';
import TheatersIcon from '@mui/icons-material/Theaters';
import ClearIcon from '@mui/icons-material/Clear';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ReactPlayer from 'react-player'
import { Box } from '@mui/material';
import { useState } from 'react';



import "./ProductImageVideos.css"
import FileInputs from '../../FileInputs/FileInputs';
import { uploadMultipleFileUpload, uploadSingleFile } from '../../../helper/FileUpload';
import CustomModal from '../../../ui/CustomModal/CustomModal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'transparent',
    boxShadow: 0,
    p: 0,
    borderRadius: 2,
    outline: "none"
};


const ProductImageVideos = () => {
    const [show, setShow] = useState(false);
    const handleOpen = () => setShow(true);
    const handleClose = () => setShow(false);
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [singleVideo, setSingleVideo] = useState('');
    const [ImageData, setImageData] = useState([]);
    const [videoData, setVideoData] = useState({});

    // multiple file upload(Images)
    const handleMultipleChange = (e) => {
        const item = e.target.files;
        var arr = [];
        for (var i = 0; i < item.length; i++) {
            arr.push(item[i]);
        }

        arr.forEach((item, index) => {
            uploadMultipleFileUpload(item, index, setImageData, setImages, images);
        });
    }

    // single file upload(Videos)
    const handleSingleChange = (e) => {
        const item = e.target.files;
        uploadSingleFile(item[0], setVideoData, setVideos, videos)
    }

    // cancel file upload
    const cancelFileUpload = (task, isVideo, index) => {
        if (task) {
            task.cancel();
            if (isVideo) {
                setVideoData({});
            } else {

                setImageData((prevImageData) =>
                    prevImageData.filter((item, i) => i !== index)
                );
            }
        }
    }


    // delete image
    const deleteImage = (index) => {
        setImages((prevImageData) =>
            prevImageData.filter((item, i) => i !== index)
        );
    }




    return (
        <div className="productImageVideosWrapper">
            <div className="productImageVideosInputs">
                <div className='productImageVideosInput marginRight20'>
                    <FileInputs item={{
                        label: "Add Images",
                        id: "productImage",
                        accept: "image/*",
                        icon: <AddPhotoAlternateIcon />,
                        multiple: true,
                        handleUpload: handleMultipleChange
                        // prog={ prog2 }

                    }} />
                </div>
                <div className='productImageVideosInput'>
                    <FileInputs item={{
                        label: "Add Videos",
                        id: "productVideo",
                        accept: "video/*",
                        icon: <VideoCameraBackIcon />,
                        multiple: false,
                        handleUpload: handleSingleChange
                    }} />
                </div>
            </div>
            <div className="productImageVideosUpload">
                <div className='displayFlex flexColumn width100'>
                    {ImageData?.length > 0 && ImageData?.map((item, index) =>
                        <div key={index} className="productImageVideosProgressImage marginRight10">
                            <div className='progressIcon'>
                                <ImageIcon />
                            </div>
                            <div className='progressContent'>
                                <p>{item?.name}</p>
                                <small>{item?.size}</small>
                                <div className='progressContentProg'>
                                    <LinearProgress variant="determinate" value={item?.progress?.replace("%", "")} />
                                    <p>{item?.progress}</p>
                                </div>
                            </div>
                            <div className='progressClear'>
                                <ClearIcon onClick={() => cancelFileUpload(item?.task, false, index,)} />
                            </div>
                        </div>
                    )}
                </div>
                <div className='displayFlex flexColumn width100'>
                    {videoData.name &&
                        <div className="productImageVideosProgressVideo marginLeft10">
                            <div className='progressIcon'>
                                <TheatersIcon />
                            </div>
                            <div className='progressContent'>
                                <p>{videoData?.name}</p>
                                <small>{videoData?.size}</small>
                                <div className='progressContentProg'>
                                    <LinearProgress variant="determinate" value={videoData?.progress?.replace("%", "")} />
                                    <p>{videoData?.progress}</p>
                                </div>
                            </div>
                            <div className='progressClear'>
                                <ClearIcon onClick={() => cancelFileUpload(videoData?.task, true)} />
                            </div>
                        </div>}
                </div>
            </div >
            {(images.length > 0 || videos.length > 0) &&
                <div className="productImageVideosPreview">
                    <div className="productImageVideosPreviewImage">
                        {images.length > 0 && <h6 className="productImageVideosPreviewTitle">Images</h6>}
                        <div className={`flexAlignCenter width100 flexWarp`}>
                            {images.length > 0 && images.map((item, index) =>
                                <div key={index} className='previewImage'>
                                    <img src={item} alt="" />
                                    <div className='previewDelete'>
                                        <DeleteForeverIcon onClick={() => deleteImage(index)} />
                                    </div>
                                </div>)}
                        </div>
                    </div>
                    <div className="productImageVideosPreviewVideo">
                        {videos.length > 0 && <h6 className="productImageVideosPreviewTitle">Videos</h6>}
                        <div className={`flexAlignCenter width100 flexWarp`}>
                            {videos.length > 0 && videos.map((item, index) =>
                                <div key={index} className='previewVideo'>
                                    <video src={item}></video>
                                    <div className='previewDelete'>
                                        <DeleteForeverIcon onClick={() => deleteImage(index)} />
                                    </div>
                                    <div className='videoPlay'>
                                        <PlayArrowIcon onClick={() => { handleOpen(); setSingleVideo(item) }} />
                                    </div>
                                </div>)}
                        </div>
                    </div>
                </div>
            }
            <CustomModal open={show} handleClose={handleClose}>
                <Box sx={style}>
                    <div className='previewVideoModal'>
                        <ReactPlayer url={singleVideo} controls={true} />
                    </div>
                </Box>
            </CustomModal>
        </div >
    )
}

export default ProductImageVideos