import React from 'react';
import CardForm from './CardForm'
import './CardModal.css'

const CardModal = ({ onClose, onAddCard, boardId }) => {
    return (
        <div className='modal'>
            <div className='modal-content'>
                <button className='modal-close' onClick={onClose}>x</button>
                <h3>Create a New Card</h3>
                <CardForm onAddCard={onAddCard} boardId={boardId}/>
            </div>
        </div>
    );
};

export default CardModal;