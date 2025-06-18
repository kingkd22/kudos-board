const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//Get all boards
router.get('/', async (req, res) => {
    const boards = await prisma.board.findMany({
        include: { cards: true }
    });
    res.json(boards);
})

//Get board by Id
router.get('/:id', async(req, res) => {
    const { id } = req.params;
    const board = await prisma.board.findUnique({
        where: { id: parseInt(id) },
        include: { cards: true }
    });
    board ? res.json(board) : res.status(404).json({ error : 'Board not found'});
});

//POST create a board
router.post('/', async(req, res) => {
    const { title, category, author } = req.body;
    try {
        const newBoard = await prisma.board.create({
            data: {
                title,
                category,
                author
            }
        });
        res.status(201).json(newBoard);
    }   catch (err) {
        res.status(400).json({ error: 'Board creation failed'})
    }
});

//PUT update board
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, category, author } = req.body;
    const updateBoard = await prisma.board.update({
        where: { id: parseInt(id) },
        data: { title, category, author }
    });
    res.json(updateBoard);
});

//DELETE board
router.delete('/.id', async(req, res) => {
    const { id } = req.params;
    await prisma.board.delete({ where: {id: parseInt(id) } });
});

module.exports = router;