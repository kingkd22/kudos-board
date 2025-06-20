import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCardsForBoard, fetchBoards, createCard } from '../utilities/data';
import CardList from '../components/CardList';
import CardModal from '../components/CardModal';
import { toast } from 'react-toastify';
import "./BoardPage.css"


const BoardPage = () => {

    const { id } = useParams();
    const [board, setBoard] = useState(null);
    const [cards, setCards] = useState([])
    const [showModal, setShowModal] = useState(false)
    
    //Fetch board info
    useEffect(() => {
        fetchBoards().then((res) => {
            const foundBoard = res.data.find((b) => b.id === parseInt(id));
            if (foundBoard) { setBoard(foundBoard);
            }   else { toast.error('Board not found.')
            }
        });
    }, [id]);

    //Fetch cards for this board
    useEffect(() => {
        fetchCardsForBoard(id).then((res) => setCards(res.data));
    }, [id]);

    //create new card
    const handleAddCard = async (cardData) => {
        try {
            console.log('Creating card with:', cardData)
            const newCard = await createCard({ ...cardData, boardId: id });

            const updated = await fetchCardsForBoard(id);
            setCards(updated.data);

            toast.success('Card created')
        } catch (err) {
            toast.error('Failed to create card.');
        }
    };

    if (!board) return <p className='loading'>Loading...</p>

    return (
        <div className='board-page'>
            <h2>{BoardPage.title}</h2>
            <p style={{ color: '#aaa' }}>{BoardPage.category}</p>

            <button className='create' onClick={() => setShowModal(true)}> Create Card </button>

            <CardList cards={cards} setCards={setCards} />

            {showModal && (
                <CardModal
                    onclose={() => setShowModal(false)}
                    onAddCard={(data) => {
                        const cardWithBoard = {...data, boardId: id };
                        handleAddCard(cardWithBoard);
                        setShowModal(false);
                    }}
                    boardId={id}
                />
            )}
        </div>
    )
}

export default BoardPage;