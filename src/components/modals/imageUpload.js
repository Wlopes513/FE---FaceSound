import React, { useState } from 'react';
import { Label } from 'reactstrap';

const imageStyles = {
  maxWidth: '100%',
  maxHeight: '280px',
  marginTop: '20px',
};

export default function ImageUpload(props) {
  const { changeImage } = props;
  const [uploadedImage, setUploadedImage] = useState(null);

  const clearImage = () => {
    setUploadedImage(null);
  };

  return (
    <div>
      {!uploadedImage && (
        <>
          <Label htmlFor="uploadImage">Escolha uma imagem:</Label>
          <input
            type="file"
            accept="image/*"
            id="uploadImage"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();

              reader.onload = () => {
                setUploadedImage(reader.result);
                changeImage(e, reader.result);
              };

              reader.readAsDataURL(file);
            }}
          />
        </>
      )}

      {uploadedImage && (
        <div>
          <img src={uploadedImage} alt="Uploaded" style={imageStyles} />
          <button onClick={clearImage} type="button">Remover Imagem</button>
        </div>
      )}
    </div>
  );
}
