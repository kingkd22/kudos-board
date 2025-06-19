import React, { useState } from 'react';
import './EditBoardModal.css'

const EditBoardModal = ({ board, onClose, onSave }) => {

    const [formData, setFormData] = useState({
        title: board.title,
        category: board.category,
        author: board.author || ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(board.id, formData);
        onClose();
    };

    return (
        <div className="moadal">
            <div className='modalContent'>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="title"
                        placeholder='Board TItle'
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                    <select name="category" valie={formData.category} onChange={handleChange}>
                        <option value="Celebration">Celebration</option>
                        <option value="Thank You">Thank You</option>
                        <option value="Inspiration">Inspiration</option>
                    </select>
                    <input
                        type="text"
                        name="author"
                        placeholder='Author'
                        value={formData.author}
                        onChange={handleChange}
                    />
                    <div classname="modal-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose} className="cancel">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBoardModal;