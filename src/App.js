import React, { useState, lazy, Suspense } from "react";
import "./App.css";
import logo from "./assets/logo.png";
import Alert from "./components/Alert";
import LoadingFallback from "./components/LoadingFallback";

const CameraView = lazy(() => import("./components/CameraView"));
const RobotView = lazy(() => import("./components/RobotView"));
const Controls = lazy(() => import("./components/Controls"));

function App() {
  const [shoulderAngle, setShoulderAngle] = useState(0);
  const [elbowAngle, setElbowAngle] = useState(0);

  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <div className="app-container">
      <Alert alert={alert} />
      <header>
        <img src={logo} alt="Logo" className="logo" />
        <div className="header-text">Robot To Ease Your Life</div>
      </header>

      <main>
        <div className="views-container">
          <Suspense fallback={<LoadingFallback />}>
            <CameraView showAlert={showAlert} />
            <RobotView shoulderAngle={shoulderAngle} elbowAngle={elbowAngle} />
          </Suspense>
        </div>
        <Suspense fallback={<LoadingFallback />}>
          <Controls
            shoulderAngle={shoulderAngle}
            setShoulderAngle={setShoulderAngle}
            elbowAngle={elbowAngle}
            setElbowAngle={setElbowAngle}
          />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
