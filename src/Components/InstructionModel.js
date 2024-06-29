import React from "react";
import "./InstructionModel.css";

const InstructionModal = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Game Instructions</h2>
        </div>
        <div className="modal-body">
          <p>Welcome to the game!</p>
          <p>Rules:</p>
          <ul>
            <li>The game is played on a 4x4 grid.</li>
            <li>Players take turns clicking on circles to claim them.</li>
            <li>
              Player 1's circles turn red, and Player 2's circles turn blue.
            </li>
            <li>
              The first player to get four in a row (horizontally, vertically,
              or diagonally) wins!
            </li>
            <li>
              If all circles are filled and no player has four in a row, the
              game is a draw.
            </li>
          </ul>
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstructionModal;
