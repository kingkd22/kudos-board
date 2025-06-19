import React, { useEffect, useState } from "react";
import { deleteBoard, fetchBoards } from "../utilities/data";
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const [boards, setBoards] = useState([]);
    const [filterCategory, setFilterCategory] = useState('All')

    // fetch boards from the backend
    useEffect(() => {
        fetchBoards().then((res) => setBoards(res.data));
    }, []);

    //deleting board
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this board?')) {
            await deleteBoard(id);
            setBoards(boards.filter((b) => b.id !== id));
        }
    }

    //handle category filter change
    const handleFilterChange = (e) => {
        setFilterCategory(e.target.value)
    };

    //Filter boards by category if selected
    const filteredBoards = filterCategory === 'All'
        ? boards
        : boards.filter((b) => b.category === filterCategory);
    
    return (
        <div className="dashboard-container">
            <h2 className="dashboard-Title"> Kudos Boards</h2>

            <div className="filter">
                <label htmlFor="category-select"> Filter by Category: </label>
                <select id="category-select" value={filterCategory} onChange={handleFilterChange}>
                    <option value="All">All</option>
                    <option value="Celebration">Celebration</option>
                    <option value="Thank You">Thank You</option>
                    <option value="Inspiration">Inspiration</option>
                </select>
            </div>

            <div className="board-grid">
                {filteredBoards.length > 0 ? (
                    filteredBoards.map((board) => (
                        <div key={board.id} className="board-card">
                            <Link to={`board/${board.id}`} className="board-link">
                                <div className="board-img" />
                                <div className="board-info">
                                    <h3>{board.title}</h3>
                                    <p className="board-category">{board.category}</p>
                                </div>
                            </Link>

                            <div className="board-actions">
                                <button className="edit" onClick={() => alert('Edit coming soon')}>Edit</button>
                                <button className="delete" onClick={() => handleDelete(board.id)}>Delete</button>
                            </div>
                        </div>
                ))
            ) : ( <p className="no-results">No Boards Found</p>)}
            </div>
        </div>
        
    )
}

export default Dashboard;