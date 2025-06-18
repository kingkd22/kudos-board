import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:3000/api'
});

//Boards
export const fetchBoards = () => API.get('/board');
export const createBoard = (data) => API.post('/boards', data);
export const deleteBoard = (id) => API.delete(`/boards/${id}`)

//Cards
export const fetchCardsForBoard = (boardId) => API.get(`/cards/board${boardId}`)
export const createCard = (data) => API.post('/cards', data)

export default API