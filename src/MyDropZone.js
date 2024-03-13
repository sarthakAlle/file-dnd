import React, { useState, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import './MyDropZone.css';

const MyDropzone = () => {
  const [selectedImages, setSelectedImages] = useState([]); // Array to store images
  const inputRef = useRef(null); // Ref for the input element

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign({}, file, { preview: URL.createObjectURL(file) })
    );
    setSelectedImages([...selectedImages, ...newImages]); // Update state with new images
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleBrowseClick = () => {
    inputRef.current.click(); // Trigger click on hidden input
  };

  return (
    <div {...getRootProps()}>
      <input {...getInputProps({ ref: inputRef })} />
      {isDragActive ? (
        <div className="card card2">
          <p>Uploading files</p>
          <button onClick={handleBrowseClick}>Browse files</button>
        </div>
      ) : (
        <div className="card">
          <p>Drag and drop images here, or click to select images</p>
          <button onClick={handleBrowseClick}>Browse files</button>
        </div>
      )}
      {selectedImages.length > 0 && (
        <ul>
          {selectedImages.map((image) => (
            <li key={image.name}>
              <img src={image.preview} alt={image.name} width="100" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyDropzone;
