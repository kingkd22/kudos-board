import React from "react";
import NewBoardForm from "./NewBoardForm";
import "./NewBoardModal.css"


const NewBoardModal = ({ onClose, onCreateBoard }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>x</button>
                <h3>Create a New Board</h3>
                <NewBoardForm onCreateBoard={onCreateBoard} />
            </div>
        </div>
    )
}

export default NewBoardModal