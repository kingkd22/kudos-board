import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:3000/api'
});

//Boards
export const fetchBoards = () => API.get('/boards');
export const createBoard = (data) => API.post('/boards', data);
export const deleteBoard = (id) => API.delete(`/boards/${id}`)
export const updateBoard = (id, data) => API.put(`/boards/${id}`, data)

//Cards
export const fetchCardsForBoard = (boardId) => API.get(`/cards/board/${boardId}`)
export const createCard = async (cardData) => {
    const res = await API.post('/cards', cardData);
    return res;
}
export const deleteCard = (id) => API.delete(`/cards/${id}`);
export const upvoteCard = (id) => API.put(`/cards/${id}/upvote`)

export default API