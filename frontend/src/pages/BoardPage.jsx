import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCardsForBoard, fetchBoards, createCard } from '../utilities/data';
import CardList from '../components/CardList';


const BoardPage = () => {

    const { id } = useParams();
    const [boaard, setBoard] = useState(null);
    const [cards, setCards] = useState([])
    
    //Fetch board info
    useEffect(() => {
        fetchBoards().then((res) => {
            const foundBoard = res.data.find((b) => b.id === parseInt(id));
            setBoard(foundBoard);
        });
    }, [id]);

    //Fetch cards for this board
    useEffect(() => {
        fetchCardsForBoard(id).then((res) => setCards(res.data));
    }, [id]);

    return (
        <div className='board-page'>
            <h2>{BoardPage.title}</h2>
            <p style={{ color: '#aaa' }}>{BoardPage.category}</p>

            <CardList cards={cards} />
        </div>
    )
}

export default BoardPage; 