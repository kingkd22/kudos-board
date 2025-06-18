const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient();

async function main() {
    const board1 = await prisma.board.create({
        data: {
            title: "Test",
            category: "Celebration",
            author: "System",
            cards: {
                create: [
                    {
                        message: "Test message 1",
                        imageUrl: "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGdlenRweGpuYnY1NHFzbDFlc2hnMHhjNGJsZnhuZHIyZGpyMWFhbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/BPJmthQ3YRwD6QqcVD/giphy.gif",
                        author: "System",
                        upvotes: 1,
                        pinned: true,
                    },
                    {
                        message: "Test message 2",
                        imageUrl: "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTg0emFqbHFrY2d4eWppNmQzZmh4dWY2cWF4ZnluMjRoNW9zb3hzNCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/htebeL9yH0ZI9K47Jo/giphy.gif",
                        author: "System",
                        upvotes: 2,
                    }
                ]
            }
        }
    });

    const board2 = await prisma.board.create({
        data: {
            title: "Test 2",
            category: "Celebration",
            author: "Me",
        }
    });
    console.log("Seeded boards", [board1.id, board2.id])
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        prisma.$disconnect()
    });