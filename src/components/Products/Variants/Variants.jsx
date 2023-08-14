import { useRef, useState } from "react";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { GiWaterDrop } from "react-icons/gi";
import { IoIosColorFill } from "react-icons/io";

import CloseIcon from "@mui/icons-material/Close";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Switch } from "@mui/material";

import { sewzeeImages } from "../../../assets";
import "./Variants.css";
import "../../DeleteConfirmation/DeleteConfirmation.css";
import { storage } from "../../../firebase/firebase";
import {
    ADDMORESUBVARIANT,
    ADDMOREVARIANT,
    REMOVEVARIANT,
    VARIANT,
    VARIANTSUB,
} from "../../../hooks/constant";
import ProductTopHead from "../ProductTopHead/ProductTopHead";
import { covertColorName } from "../../../helper/covertColorName";
import CustomModal from "../../../ui/CustomModal/CustomModal";
import { CustomButton } from "../../../ui/constants";

const label = { inputProps: { "aria-label": "Switch demo" } };

const Variants = ({ formState, dispatch }) => {
    const imgref = useRef(null);
    const [color, setColor] = useState("#000000");
    const [percentUpload, setPercentUpload] = useState(0);
    const [isUploading, setIsUploading] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const handleClose = () => setModalOpen(false);
    const handleShow = () => setModalOpen(true);
    const [removeVariantData, setRemoveVariantData] = useState(null);

    const handleUpload = (e, index) => {
        setIsUploading(true);
        const file = e.target.files[0];
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
                            value: downloadURL,
                        },
                    });
                });
            }
        );
    };

    const handleVariant = (e, index) => {
        if (e.target.name === "color") {
            setColor(e.target.value);
            const colorName = covertColorName(e.target.value);
            dispatch({
                type: VARIANT,
                payload: {
                    index: index,
                    value: e.target.value,
                    name: e.target.name,
                },
            });
            // set color name
            dispatch({
                type: VARIANT,
                payload: {
                    index: index,
                    value: colorName,
                    name: "colorname",
                },
            });
        } else {
            handleUpload(e, index);
        }
    };

    const handleVariantRemove = (index) => {
        setRemoveVariantData(index);
        handleShow();
    };

    const removeVariant = (index) => {
        handleClose();
        dispatch({
            type: REMOVEVARIANT,
            payload: index,
        });
    };

    const handleSubVariant = (e, index, subIndex) => {
        dispatch({
            type: VARIANTSUB,
            payload: {
                index: index,
                subIndex: subIndex,
                value: e.target.value,
                name: e.target.name,
                checked: e.target.checked,
            },
        });
    };

    const addMoreVariants = () => {
        dispatch({
            type: ADDMOREVARIANT,
            payload: {},
        });
    };

    //  add more sub variants
    const addMoreSubVariants = (index) => {
        dispatch({
            type: ADDMORESUBVARIANT,
            payload: index,
        });
    };

    const handleInputColor = (e, index) => {
        setColor(e.target.value);
        const colorName = covertColorName(e.target.value);
        dispatch({
            type: VARIANT,
            payload: {
                index: index,
                value: e.target.value,
                name: "color",
            },
        });
        // set color name
        dispatch({
            type: VARIANT,
            payload: {
                index: index,
                value: colorName,
                name: "colorname",
            },
        });
    };

    const handleDiscountType = (data, index, subIndex) => {
        dispatch({
            type: VARIANTSUB,
            payload: {
                index: index,
                subIndex: subIndex,
                name: "discount_type",
                value: data,
            },
        });
    };
    return (
        <>
            <ProductTopHead
                title="Variants"
                isbtn={true}
                handleClick={addMoreVariants}
            />
            <section className="variantsWrapper">
                {formState?.variants.map((item, index) => (
                    <div key={index} className="variantsInputsConatiner">
                        <div className="variantTitle">
                            <h6>Variant {index + 1}</h6>
                            {index !== 0 && (
                                <h6
                                    onClick={() => handleVariantRemove(index)}
                                    className="removeItem"
                                >
                                    <CloseIcon /> Remove Variant {index + 1}
                                </h6>
                            )}
                        </div>
                        <div className="flexAlignStart width100">
                            <div className="variantsLeft">
                                <div className="variantsInputBox">
                                    <label className="marginBottom20">
                                        Variant Color
                                    </label>
                                    <div className="variantColorPicker">
                                        <GiWaterDrop
                                            style={{
                                                fill: item?.color
                                                    ? item?.color
                                                    : "#000000",
                                            }}
                                        />
                                        <input
                                            value={
                                                item?.color
                                                    ? item?.color
                                                    : "#000000"
                                            }
                                            type="text"
                                            onChange={(e) =>
                                                handleInputColor(e, index)
                                            }
                                        />
                                        <div className="variantsInput flex">
                                            <label htmlFor={`color${index}`}>
                                                <IoIosColorFill
                                                    style={{
                                                        fill: "var(--primary)",
                                                    }}
                                                />
                                            </label>
                                            <input
                                                required
                                                onChange={(e) =>
                                                    handleVariant(e, index)
                                                }
                                                value={item?.color}
                                                type="color"
                                                id={`color${index}`}
                                                name="color"
                                            />
                                        </div>
                                    </div>
                                </div>
                                {item?.colorname && (
                                    <div className="variantsInputBox marginTop10">
                                        <label className="marginBottom20">
                                            Variant Color Name
                                        </label>
                                        <div className="variantColorPicker variantColorName">
                                            <div
                                                style={{
                                                    backgroundColor:
                                                        item?.color,
                                                }}
                                            />
                                            <span>{item?.colorname}</span>
                                        </div>
                                    </div>
                                )}
                                <div className="variantsInputBox marginY10">
                                    <label className="marginBottom20">
                                        Variant Image
                                    </label>
                                    <div className="variantsImage">
                                        <img
                                            src={
                                                item?.image ||
                                                sewzeeImages.DummyLogo
                                            }
                                            alt="logo"
                                        />
                                        <label
                                            onClick={() =>
                                                imgref.current.click()
                                            }
                                            className="onboardingLogoUploadBtn"
                                        >
                                            {" "}
                                            {isUploading
                                                ? percentUpload
                                                : formState?.logo
                                                ? "Upload Again"
                                                : "Upload"}
                                        </label>
                                        <input
                                            onChange={(e) =>
                                                handleUpload(e, index)
                                            }
                                            type="file"
                                            ref={imgref}
                                            hidden
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="variantsRight">
                                <div className="variantsRightHeader">
                                    <label>Sub Variants</label>
                                    <p
                                        onClick={() =>
                                            addMoreSubVariants(index)
                                        }
                                    >
                                        + Add More Sub Variants
                                    </p>
                                </div>
                                <TableContainer
                                    className="variantTable"
                                    component={Paper}
                                >
                                    <Table
                                        sx={{ minWidth: 650 }}
                                        aria-label="simple table"
                                    >
                                        <TableHead className="tableHead">
                                            <TableRow>
                                                <TableCell>Size</TableCell>
                                                <TableCell>Price</TableCell>
                                                <TableCell>On sale</TableCell>
                                                <TableCell>Discount</TableCell>
                                                <TableCell>
                                                    Sales Price
                                                </TableCell>
                                                <TableCell>In Stock</TableCell>
                                                <TableCell>Stock</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {item?.subvariants?.map(
                                                (row, subIndex) => (
                                                    <TableRow
                                                        key={subIndex}
                                                        className="tableRow"
                                                        sx={{
                                                            "&:last-child td, &:last-child th":
                                                                { border: 0 },
                                                        }}
                                                    >
                                                        <TableCell
                                                            className="tableCell"
                                                            component="th"
                                                            scope="row"
                                                        >
                                                            <input
                                                                onChange={(e) =>
                                                                    handleSubVariant(
                                                                        e,
                                                                        index,
                                                                        subIndex
                                                                    )
                                                                }
                                                                placeholder="Size"
                                                                type="text"
                                                                value={row?.size}
                                                                name="size"
                                                            />
                                                        </TableCell>
                                                        <TableCell
                                                            onChange={(e) =>
                                                                handleSubVariant(
                                                                    e,
                                                                    index,
                                                                    subIndex
                                                                )
                                                            }
                                                            className="tableCell"
                                                        >
                                                            <input
                                                                type="text"
                                                                name="price"
                                                                value={row?.price}
                                                                placeholder="Price"
                                                            />
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            <Switch
                                                                onChange={(e) =>
                                                                    handleSubVariant(
                                                                        e,
                                                                        index,
                                                                        subIndex
                                                                    )
                                                                }
                                                                {...label}
                                                                name="onsale"
                                                                defaultChecked={
                                                                    row?.onsale
                                                                }
                                                            />
                                                        </TableCell>
                                                        <TableCell
                                                            onChange={(e) =>
                                                                handleSubVariant(
                                                                    e,
                                                                    index,
                                                                    subIndex
                                                                )
                                                            }
                                                            className="tableCell"
                                                        >
                                                            <div className=" subVarientDiscountInput">
                                                                <input
                                                                    disabled={
                                                                        row?.onsale ===
                                                                        1
                                                                            ? false
                                                                            : true
                                                                    }
                                                                    type="text"
                                                                    value={row?.discount}
                                                                    name="discount"
                                                                    placeholder="Dis..."
                                                                />
                                                                <div className="discountIcon">
                                                                    <span
                                                                        onClick={() =>
                                                                            handleDiscountType(
                                                                                "percentage",
                                                                                index,
                                                                                subIndex
                                                                            )
                                                                        }
                                                                        className={`${
                                                                            row?.discount_type ===
                                                                                "percentage" &&
                                                                            "discountIconActive"
                                                                        }`}
                                                                    >
                                                                        %
                                                                    </span>
                                                                    <span
                                                                        onClick={() =>
                                                                            handleDiscountType(
                                                                                "amount",
                                                                                index,
                                                                                subIndex
                                                                            )
                                                                        }
                                                                        className={`${
                                                                            row?.discount_type ===
                                                                                "amount" &&
                                                                            "discountIconActive"
                                                                        }`}
                                                                    >
                                                                        ₹
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </TableCell>
                                                        <TableCell
                                                            onChange={(e) =>
                                                                handleSubVariant(
                                                                    e,
                                                                    index,
                                                                    subIndex
                                                                )
                                                            }
                                                            className="tableCell"
                                                        >
                                                            <input
                                                                disabled
                                                                type="text"
                                                                name="salesprice"
                                                                value={
                                                                    row?.salesprice
                                                                }
                                                                placeholder="Sales P..."
                                                            />
                                                        </TableCell>
                                                        <TableCell className="tableCell">
                                                            <Switch
                                                                onChange={(e) =>
                                                                    handleSubVariant(
                                                                        e,
                                                                        index,
                                                                        subIndex
                                                                    )
                                                                }
                                                                {...label}
                                                                required
                                                                name="instock"
                                                                defaultChecked={
                                                                    row?.instock
                                                                }
                                                            />
                                                        </TableCell>

                                                        <TableCell
                                                            onChange={(e) =>
                                                                handleSubVariant(
                                                                    e,
                                                                    index,
                                                                    subIndex
                                                                )
                                                            }
                                                            className="tableCell"
                                                        >
                                                            <input
                                                                disabled={
                                                                    row?.instock ===
                                                                    1
                                                                        ? false
                                                                        : true
                                                                }
                                                                type="text"
                                                                value={row?.stock}
                                                                name="stock"
                                                                placeholder="Stock"
                                                            />
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                ))}
            </section>
            <CustomModal open={isModalOpen} handleClose={handleClose}>
                <div className="deleteConfirmationWrapper">
                    <div className="deleteConfirmationHeader">
                        <h6>Delete Variant</h6>
                        <CloseIcon onClick={handleClose} />
                    </div>
                    <div className={`deleteConfirmationBody`}>
                        <h5>
                            Are you sure you want to delete this Variant{" "}
                            {removeVariantData + 1} ?
                        </h5>
                    </div>
                    <div className="deleteConfirmationFooter">
                        <CustomButton
                            handleClick={() => removeVariant(removeVariantData)}
                            classId="confirmationBtn confirmationBtn--yes"
                        >
                            Yes
                        </CustomButton>
                        <CustomButton
                            handleClick={handleClose}
                            classId="confirmationBtn confirmationBtn--no"
                        >
                            No
                        </CustomButton>
                    </div>
                </div>
            </CustomModal>
        </>
    );
};

export default Variants;
