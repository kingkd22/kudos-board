import React from "react";
import "./CardList.css"
import { deleteCard, upvoteCard } from "../utilities/data";

const CardList = ({ cards, setCards }) => {

    const handleDelete = async (id) => {
        try {
            await deleteCard(id);
            setCards(prev => prev.filter(card => card.id !== id))
        }   catch (err) {
            console.error("Error deleting card:", err)
        }
};

    const handleUpvote = async (id) => {
        try {
            const { data: updated } = await upvoteCard(id);
            const updatedCards = cards.map(card => {
                if (card.id === id) {
                    return {
                        ...card,
                        ...updated
                    };
                }
                return card
            })
            setCards([...updatedCards])
            console.log(cards)
        }   catch (err) {
            console.error('Error upvoting card:', err)
        }
    }

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

                        <div className="card-actions">
                            <button onClick={() => handleUpvote(card.id)}>⬆️{card.upvotes}</button>
                            <button onClick={() => handleDelete(card.id)}>Delete</button>
                        </div>
                    </div>
                ))
            ) : (
                <p className="no-cards-message">No cards on this board yet.</p>
            )}
        </div>
    )
}

export default CardList