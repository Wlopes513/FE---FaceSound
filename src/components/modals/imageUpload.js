import React, { useState } from 'react';
import Webcam from 'react-webcam';
import { Label } from 'reactstrap';

const imageStyles = {
  maxWidth: '100%',
  maxHeight: '280px',
  marginTop: '20px',
};

function WebcamCapture(props) {
  const { changeImage, setWebcamEnabled, setUploadedImage } = props;
  const webcamRef = React.useRef(null);

  const capture = React.useCallback((e) => {
    const imageSrc = webcamRef.current.getScreenshot();
    setUploadedImage(imageSrc);
    changeImage(e, imageSrc);
    setWebcamEnabled(false);
  }, [webcamRef]);

  const toggle = () => {
    setWebcamEnabled(false);
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        style={imageStyles}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture} type="button">Capturar Foto</button>
      <button onClick={toggle} type="button">Cancelar</button>
    </div>
  );
}

export default function ImageUpload(props) {
  const { changeImage } = props;
  const [uploadedImage, setUploadedImage] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  const clearImage = () => {
    setUploadedImage(null);
  };

  return (
    <div>
      {!uploadedImage && !webcamEnabled && (
        <>
          <button onClick={() => setWebcamEnabled(true)} type="button">Tirar Foto</button>
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

      {webcamEnabled && (
        <WebcamCapture
          changeImage={changeImage}
          setWebcamEnabled={setWebcamEnabled}
          setUploadedImage={setUploadedImage}
        />
      )}
    </div>
  );
}
