const express = require("express")
const router = express.Router();
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

//validation for message and board id inputs
function validateCard(req, res, next) {
    const { message, boardId } = req.body;
    if (!message || typeof title !== 'string') {
        return res.status(400).json({ error: "Card must include a message"});
    }
    if (!boardId || isNaN(parseInt(boardId))) {
        return res.status(400).json({ error: 'Card must have valid boardId'})
    }
    next();
}

// GET all cards for a board
router.get('/board/:boardId', async (req, res) => {
    const { boardId } = req.params;
    const cards = await prisma.card.findMany({
        where: { boardId: parseInt(boardId) }
    });
    res.json(cards);
})

//POST new card
router.post('/', validateCard, async (req, res) => {
    const { message, imageUrl, author, boardId } = req.body;
    const newCard = await prisma.card.create({
        date: {
            message,
            imageUrl,
            author, 
            boardId : parseInt(boardId) 
        }
    });
    res.status(201).json(newCard);
});

//PUT update a card
router.put('/:id',validateCard, async (req, res) => {
    const { id } = req.params;
    const { message, imageUrl, author } = req.body;
    const updatedCard = await prisma.card.update({
        where: { id: parseInt(id) },
        data: { message, imageUrl, author }
    });
    res.json(updatedCard)
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.card.delete({ where: { id: parseInt(id) } });
    res.status(204).end();
})

module.exports = router;