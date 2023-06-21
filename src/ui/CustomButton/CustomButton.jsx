import "./CustomButton.css"

const CustomButton = ({ children, classId, handleClick, isDisabled }) => {
    return (
        <button disabled={isDisabled} onClick={handleClick} type="submit" className={`customButton ${classId}`}>{children}</button>
    )
}

export default CustomButton;