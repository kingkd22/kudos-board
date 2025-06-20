import React from "react";
import "./CardList.css"

const CardList = ({ cards }) => {
    return (
        <div className="card-grid">
            {cards.length > 0 ? (
                cards.map((card) => (
                    <div key={card.id} className="card">
                        {card.imageUrl && (
                            <img src={card.imageUrl} alt="gif" className="card-img" />
                        )}
                        <p className="card-message">{card.message}</p>
                        <span className="card-author">- {card.author}</span>
                    </div>
                ))
            ) : (
                <p className="no-cards-message">No cards on this board yet.</p>
            )}
        </div>
    )
}

export default CardList