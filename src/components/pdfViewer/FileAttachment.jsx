const FileAttachment = ({ imageUrl }) => {
    return (
        imageUrl && <img className='w-full max-w-[100px]' src={imageUrl} alt="product" />
    );
};

export default FileAttachment;
