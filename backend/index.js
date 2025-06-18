const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const boardRoutes = require('./routes/boards')
const cardRoutes = require('./routes/cards')

app.use(cors());
app.use(express.json())

app.use("/api/boards", boardRoutes)
app.use("/api/cards", cardRoutes)

app.get('/', (req, res) => {
    res.send('Kudos Board API is running')
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})