import React, { useState } from 'react';
import { toast } from 'react-toastify';
import "./NewBoardForm.css"

const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;

const NewBoardForm = ({ onCreateBoard }) => {

    const [form, setForm] = useState({
        title:"",
        description: '',
        category: '',
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
    
    //API search
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
        if (!form.title || !form.description || !form.category || !form.imageUrl) {
            toast.error('Please complete all required fields')
            return;
        }
        onCreateBoard(form);
        setForm({ title: '', description: '', category: '', imageUrl: ''});
        setGifSearch('');
        setGifResults([])
    };

    return (
        <form onSubmit={handleSubmit} className='board-form'>
            <input type="text" name="title" value={form.title} placeholder='Board Title' onChange={handleChange} required />
            <input type='text' name='description' value={form.description} placeholder='Board Description' onChange={handleChange} required />
            <select name="category" value={form.category} onChange={handleChange} required>
                <option value=''>Select Category</option>
                <option value="celebration">Celebration</option>
                <option value='thank you'>Thank You</option>
                <option value="inspiration">Inspiration</option>
            </select>
            <input type="text" value={gifSearch} onChange={(e) => setGifSearch(e.target.value)} placeholder='Search Board Image (GIPHY)' />
            <button type="button" onClick={handleGifSearch}> Search </button>

            <div className="gif-grid">
                {gifResults.map((gif) => (
                    <img
                        key={gif.id}
                        src={gif.images.fixed_height_small.url}
                        alt="gif"
                        onClick={() => selectGif(gif.images.fixed_height_small.url)}
                        className='gif-thumbnail'
                    />
                ))}
            </div>

            <input
                type="text"
                name="imageUrl"
                placeholder='Selecting GIF URL'
                value={form.imageUrl}
                onChange={handleChange}
                required
            />

            <button type="submit">Create Board</button>
        </form>
    );
}

export default NewBoardForm