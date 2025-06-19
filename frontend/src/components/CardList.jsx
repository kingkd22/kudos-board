import React from "react";

const CardList = ({ cards }) => {
    return (
        <div className="card-grid">
            {cards.length > 0 ? (
                cards.map((card) => (
                    <div key={card.id} className="card">
                        {card.imageUrl && (
                            <img src={card.imageUrl} alt="gif" className="card-img" />
                        )}
                        <p>{card.message}</p>
                        <span className="card-author">- {card.author}</span>
                    </div>
                ))
            ) : (
                <p>No cards on this board yet.</p>
            )}
        </div>
    )
}

export default CardList