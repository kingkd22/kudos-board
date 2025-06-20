import React, { useState } from 'react'
import { toast } from 'react-toastify';
import "./CardForm.css"

const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

const CardForm = ({ onAddCard, boardId }) => {

    const [form, setForm] = useState({
        message: '',
        author: '',
        imageUrl: ''
    });

    const [gifSearch, setGifSearch] = useState('');
    const [gifResults, setGifResults] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleGifSearch = async () => {
        if (!gifSearch) {
            console.log('GIF search input is empty')
            toast.error("Please enter a search term for GIFs");
            return;
        }

        try {
            const response = await fetch(
                `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${gifSearch}&limit=9`
            );
            const data = await response.json();
            setGifResults(data.data);
        }   catch (error) {
            console.error("Error fetching from GIPHY:", error);
            toast.error("Something went wrong fetching GIFS.")
        }
    }

    const selectGif = (gifUrl) => {
        setForm({ ...form, imageUrl: gifUrl });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCard(form, boardId);
        setForm({ message: '', author: '', imageUrl: '' });
        setGifSearch('');
        setGifResults([]);
    };

    return (
        <form onSubmit={handleSubmit} className='card-form'>
            <input
                type="text"
                name="message"
                placeholder='Message'
                value={form.message}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="author"
                placeholder='Author'
                value={form.author}
                onChange={handleChange}
            />
            <input
                type="text"
                value={gifSearch}
                onChange={(e) => setGifSearch(e.target.value)}
                placeholder="Search Giphy"
            />
            <button type="button" onClick={handleGifSearch}> Search </button>

            <div className='gif-grid'>
                {gifResults.map((gif) => (
                    <img
                        key={gif.id}
                        src={gif.images.fixed_height_small.url}
                        alt="gif"
                        onClick={() => selectGif(gif.images.fixed_height_small.url)}
                        className="gif-thumbnail"
                    />
                ))}
            </div>

            <input 
                type="text"
                name="imageUrl"
                placeholder='Selected GIF URL'
                value={form.imageUrl}
                onChange={handleChange}
            />

            <button type='submit'>Create Card</button>
        </form>
    );
};

export default CardForm;
