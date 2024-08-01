import React from "react";
import { saveAs } from "file-saver";

const degreesToRadians = (degrees) => degrees * (Math.PI / 180);
const radiansToDegrees = (radians) => radians * (180 / Math.PI);

const Controls = ({
  shoulderAngle,
  setShoulderAngle,
  elbowAngle,
  setElbowAngle,
}) => {
  const handleShoulderChange = (event) => {
    const newAngle = degreesToRadians(Number(event.target.value));
    setShoulderAngle(newAngle);
  };

  const handleElbowChange = (event) => {
    const newAngle = degreesToRadians(Number(event.target.value));
    setElbowAngle(newAngle);
  };

  const handleSave = () => {
    const fileName = prompt("Enter the name of the file:", "joint_angles.txt");

    if (fileName) {
      const fileContents = `Shoulder Angle: ${radiansToDegrees(
        shoulderAngle
      ).toFixed(2)}°\nElbow Angle: ${radiansToDegrees(elbowAngle).toFixed(2)}°`;
      const blob = new Blob([fileContents], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, fileName);
    } else {
      alert("No file name provided. Save operation cancelled.");
    }
  };

  return (
    <div className="controls">
      <div className="control-group">
        <label>
          Shoulder Angle: {radiansToDegrees(shoulderAngle).toFixed(2)}°
        </label>
        <input
          type="range"
          min="-180"
          max="180"
          step="1"
          value={radiansToDegrees(shoulderAngle)}
          onChange={handleShoulderChange}
          className="range-input"
        />
      </div>
      <div className="control-group">
        <label>Elbow Angle: {radiansToDegrees(elbowAngle).toFixed(2)}°</label>
        <input
          type="range"
          min="-180"
          max="180"
          step="1"
          value={radiansToDegrees(elbowAngle)}
          onChange={handleElbowChange}
          className="range-input"
        />
      </div>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default Controls;
