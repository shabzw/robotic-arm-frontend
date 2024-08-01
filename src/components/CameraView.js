import React, { useRef, useState, useEffect } from "react";

const CameraView = ({ showAlert }) => {
  const videoRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [stream, setStream] = useState(null);
  const [cameraError, setCameraError] = useState(false);
  const [alertShown, setAlertShown] = useState(false);

  const startCamera = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
        setStream(userStream);
        setCameraError(false);
        if (alertShown) {
          setAlertShown(false); // Reset the alert shown state when camera access is granted
        }
      }
    } catch (err) {
      console.error("Error accessing the camera", err);
      setCameraError(true);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    if (isCameraOn) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isCameraOn]);

  useEffect(() => {
    if (cameraError && !alertShown) {
      showAlert(
        "Camera access was denied. Please allow camera access to use this feature.",
        "danger"
      );
      setAlertShown(true); // Set the alert as shown
    }
  }, [cameraError, alertShown, showAlert]);

  return (
    <div className="camera-view">
      <video ref={videoRef} autoPlay />
      <button
        onClick={() => {
          setIsCameraOn(!isCameraOn);
          if (!isCameraOn) {
            setAlertShown(false); // Reset the alert shown state when turning the camera back on
          }
        }}
        className="camera-toggle-button"
      >
        {isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
      </button>
    </div>
  );
};

export default CameraView;
