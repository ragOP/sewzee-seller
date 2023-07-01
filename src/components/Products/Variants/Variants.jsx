import { useRef, useState } from "react"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { GiWaterDrop } from 'react-icons/gi';
import { IoIosColorFill } from 'react-icons/io';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import { sewzeeImages } from "../../../assets"
import "./Variants.css"
import { storage } from "../../../firebase/firebase";
import { Switch } from "@mui/material";
import { ADDMORESUBVARIANT, ADDMOREVARIANT, VARIANT, VARIANTSUB } from "../../../hooks/constant";
import ProductTopHead from "../ProductTopHead/ProductTopHead";

const label = { inputProps: { 'aria-label': 'Switch demo' } };


const Variants = ({ formState, dispatch }) => {
    const imgref = useRef(null)
    const [color, setColor] = useState("#000000")
    const [percentUpload, setPercentUpload] = useState(0)
    const [isUploading, setIsUploading] = useState(false)

    const handleUpload = (e, index) => {
        setIsUploading(true)
        const file = e.target.files[0]
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
                    setIsUploading(false);
                    dispatch({
                        type: VARIANT,
                        payload: {
                            index: index,
                            name: "image",
                            value: downloadURL
                        }
                    })
                });
            }
        );
    }

    const handleVariant = (e, index) => {
        if (e.target.name === "color") {
            setColor(e.target.value)
            dispatch({
                type: VARIANT,
                payload: {
                    index: index,
                    value: e.target.value,
                    name: e.target.name,
                }
            })
        } else {
            handleUpload(e, index)
        }

    }

    const handleSubVariant = (e, index, subIndex) => {
        dispatch({
            type: VARIANTSUB,
            payload: {
                index: index,
                subIndex: subIndex,
                value: e.target.value,
                name: e.target.name,
                checked: e.target.checked
            }
        })
    }

    const addMoreVariants = () => {
        dispatch({
            type: ADDMOREVARIANT,
            payload: {

            }
        })
    }

    //  add more sub variants
    const addMoreSubVariants = (index) => {
        dispatch({
            type: ADDMORESUBVARIANT,
            payload: index
        })
    }
    return (
        <>
            <ProductTopHead title="Variants" isbtn={true} handleClick={addMoreVariants} />
            <section className="variantsWrapper">
                {formState?.variants.map((item, index) =>
                    <div key={index} className="variantsInputsConatiner">
                        <h6>Variant {index + 1}</h6>
                        <div className="flexAlignStart width100">
                            <div className="variantsLeft">
                                <div className="variantsInputBox">
                                    <label className="marginBottom20">Variant Color</label>
                                    <div className="variantColorPicker">
                                        <GiWaterDrop style={{
                                            fill: color
                                        }} />
                                        <input value={color} type="text" onChange={(e) => setColor(e.target.value)} />
                                        <div className="variantsInput">
                                            <label htmlFor="color"><IoIosColorFill style={{
                                                fill: "var(--primary)"
                                            }} /></label>
                                            <input required onChange={(e) => handleVariant(e, index)} value={color} type="color" id="color" name="color" />
                                        </div>
                                    </div>
                                </div>
                                <div className="variantsInputBox marginY10">
                                    <label className="marginBottom20">Variant Image</label>
                                    <div className="variantsImage">
                                        <img src={item?.image || sewzeeImages.DummyLogo} alt="logo" />
                                        <label
                                            onClick={() => imgref.current.click()} className="onboardingLogoUploadBtn"> {isUploading ? percentUpload : formState?.logo ? "Upload Again" : "Upload"}</label>
                                        <input required onChange={(e) => handleUpload(e, index)} type="file" ref={imgref} hidden />
                                    </div>
                                </div>
                            </div>
                            <div className="variantsRight">
                                <div className="variantsRightHeader">
                                    <label >Sub Variants</label>
                                    <p onClick={() => addMoreSubVariants(index)}>+ Add More Sub Variants</p>
                                </div>
                                <TableContainer className="variantTable" component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead className="tableHead">
                                            <TableRow>
                                                <TableCell>Size</TableCell>
                                                <TableCell>Stock</TableCell>
                                                <TableCell>Price</TableCell>
                                                <TableCell>Discount</TableCell>
                                                <TableCell>On sale</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {item?.subvariants?.map((row, subIndex) => (
                                                <TableRow
                                                    key={subIndex}
                                                    className="tableRow"
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell className="tableCell" component="th" scope="row">
                                                        <input onChange={(e) => handleSubVariant(e, index, subIndex)} placeholder="Enter Size" type="text" name="size" />
                                                    </TableCell>
                                                    <TableCell onChange={(e) => handleSubVariant(e, index, subIndex)} className="tableCell" ><input type="text" name="stock" placeholder="Enter Stock" /></TableCell>
                                                    <TableCell onChange={(e) => handleSubVariant(e, index, subIndex)} className="tableCell" ><input type="text" name="price" placeholder="Enter Price" /></TableCell>
                                                    <TableCell onChange={(e) => handleSubVariant(e, index, subIndex)} className="tableCell" ><input type="text" name="discount" placeholder="Enter Discount" /></TableCell>
                                                    <TableCell className="tableCell" ><Switch onChange={(e) => handleSubVariant(e, index, subIndex)} {...label} required name='onsale' defaultChecked={row?.onsale} /></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>)}
            </section>
        </>

    )
}

export default Variants