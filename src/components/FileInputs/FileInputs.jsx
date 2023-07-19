

const FileInputs = ({ item }) => {
    console.log(item)
    return (
        <div className='productImageVideosInput marginRight20'>
            <label
                htmlFor={item?.id}> <span>{item?.icon} </span> {item?.label}</label>
            <input
                type="file"
                id={item?.id}
                accept={item?.accept}
                multiple={item?.multiple}
                onChange={item?.handleUpload}
            />
        </div>
    )
}

export default FileInputs