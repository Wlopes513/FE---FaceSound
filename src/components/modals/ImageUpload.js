import React, { useState } from 'react';
import Webcam from 'react-webcam';

const ImageUpload = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  const WebcamCapture = () => {
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
          screenshotFormat="image/jpeg"
        />
        <button onClick={capture}>Capturar Foto</button>
      </div>
    );
  };


  const clearImage = () => {
    setUploadedImage(null);
  };

  return (
    <div>
      {!uploadedImage && !webcamEnabled && (
        <>
          <button onClick={() => setWebcamEnabled(true)}>Tirar Foto</button>
          <label htmlFor="upload">Escolha uma imagem:</label>
          <input
            type="file"
            accept="image/*"
            id="upload"
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
          <button onClick={clearImage}>Remover Imagem</button>
        </div>
      )}

      {webcamEnabled && <WebcamCapture />}
    </div>
  );
};

const imageStyles = {
  maxWidth: '100%',
  maxHeight: '280px',
  marginTop: '20px',
};

export default ImageUpload;
