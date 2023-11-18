import React, { useState } from 'react';
import Webcam from 'react-webcam';

function WebcamCapture() {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUploadedImage(imageSrc);
    setWebcamEnabled(false);
  }, [webcamRef]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        style={imageStyles}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture} type="button">Capturar Foto</button>
    </div>
  );
}

export default function ImageUpload() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  const imageStyles = {
    maxWidth: '100%',
    maxHeight: '280px',
    marginTop: '20px',
  };

  const clearImage = () => {
    setUploadedImage(null);
  };

  return (
    <div>
      {!uploadedImage && !webcamEnabled && (
        <>
          <button onClick={() => setWebcamEnabled(true)} type="button">Tirar Foto</button>
          <label htmlFor="uploadImage">Escolha uma imagem:</label>
          <input
            type="file"
            accept="image/*"
            id="uploadImage"
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();

              reader.onload = () => {
                setUploadedImage(reader.result);
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

      {webcamEnabled && <WebcamCapture />}
    </div>
  );
}
