import React, { useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import { MeshPhongMaterial } from "three";

const radiansToDegrees = (radians) => radians * (180 / Math.PI);

const RobotView = ({ robotName = "Robot X", shoulderAngle, elbowAngle }) => {
  const [cameraPosition, setCameraPosition] = useState([0, 2, 5]);
  const cameraRef = useRef();

  const handleViewChange = (position) => {
    setCameraPosition(position);
  };

  return (
    <div className="robot-view">
      <Canvas shadows>
        <PerspectiveCamera
          ref={cameraRef}
          makeDefault
          position={cameraPosition}
        />
        <OrbitControls target={[0, 1, 0]} />
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <shadowMaterial opacity={0.3} />
        </mesh>
        
        <group rotation={[0, shoulderAngle, 0]} castShadow>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
            <meshPhongMaterial color="grey" />
          </mesh>
          <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.2, 1, 0.2]} />
            <meshPhongMaterial color="blue" />
          </mesh>
          <group position={[0, 1, 0]} rotation={[0, 0, elbowAngle]} castShadow>
            <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
              <boxGeometry args={[0.2, 1, 0.2]} />
              <meshPhongMaterial color="red" />
            </mesh>
          </group>
        </group>

        <Environment preset="sunset" background />
      </Canvas>
      <div className="robot-details">
        <h5 className="robot-name">{robotName}</h5>
        <div className="angles-display">
          <p>Shoulder Angle: {radiansToDegrees(shoulderAngle).toFixed(2)}°</p>
          <p>Elbow Angle: {radiansToDegrees(elbowAngle).toFixed(2)}°</p>
        </div>
      </div>
      <div className="view-controls">
        <button onClick={() => handleViewChange([0, 2, 5])}>Front View</button>
        <button onClick={() => handleViewChange([0, 2, -5])}>Rear View</button>
        <button onClick={() => handleViewChange([0, 5, 0])}>Top View</button>
        <button onClick={() => handleViewChange([0, -5, 0])}>Bottom View</button>
      </div>
    </div>
  );
};

export default RobotView;
