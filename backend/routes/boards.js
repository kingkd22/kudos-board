const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// validation for title and category inputs
function validateBoard(req, res, next) {
    const { title, category } = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: "Board must have valid title"});
    }
    if (!category || typeof category !== "string") {
        return res.status(400).json({ error: 'Board must have a valid category'})
    }
    next();
}

//Get all boards with cards
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
router.post('/', validateBoard, async (req, res) => {
    const { title, category, imageUrl, author } = req.body;
    try {
        const newBoard = await prisma.board.create({
            data: {
                title,
                category,
                author,
                imageUrl
            }
        });
        res.status(201).json(newBoard);
    }   catch (err) {
        res.status(400).json({ error: 'Board creation failed'})
    }
});

//PUT update board
router.put('/:id', validateBoard, async (req, res) => {
    const { id } = req.params;
    const { title, category, author } = req.body;
    const updateBoard = await prisma.board.update({
        where: { id: parseInt(id) },
        data: { title, category, author }
    });
    res.json(updateBoard);
});

//DELETE board
router.delete('/:id', async(req, res) => {
    const { id } = req.params;
    await prisma.board.delete({ where: {id: parseInt(id) } });
});

module.exports = router;