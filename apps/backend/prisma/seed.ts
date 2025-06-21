import { PrismaClient } from "../src/generated/prisma/edge.js";

const prisma = new PrismaClient();

async function main() {
  //delete existing data
  console.log(`Delete existing data`);
  await prisma.comments.deleteMany();
  await prisma.pins.deleteMany();
  await prisma.boards.deleteMany();
  await prisma.users.deleteMany();

  //add data
  console.log(`Start seeding users data ...`);

  const users = [] as any;

  for (let i = 1; i <= 5; i++) {
    const result = await prisma.users.create({
      data: {
        firstName: `User`,
        lastName: `${i}`,
        email: `user${i}@test.com`,
        password:
          "$2b$10$JDT5y9kQUlfEBMUmmDpXxeN7iaAPWEK/hvmdy2VgdaHgyR5j1QbV2",
        image: `https://picsum.photos/id/${i}/200/200`,
      },
    });

    users.push(result);
  }
  console.log("All users created");

  console.log(`Start seeding boards data ...`);
  const boards = [] as any;

  for (let i = 0; i < 5; i++) {
    const result = await prisma.boards.create({
      data: {
        title: `Board of user ${users[i].lastName}`,
        userId: users[i].id,
      },
    });

    boards.push(result);
  }

  console.log("All boards created");

  console.log(`Start seeding pins data ...`);
  const pins = [];

  for (let i = 0; i < 100; i++) {
    const mediaSize = Math.random() < 0.5 ? "800/1200" : "800/600";
    const result = await prisma.pins.create({
      data: {
        title: `Pin ${i + 1}`,
        description: `Descripiton of pin ${i + 1}`,
        imageUrl: `https://picsum.photos/id/${i + 1}/${mediaSize}`,
        userId: `${users[Math.ceil(Math.random() * 4)].id}`,
        boardId: `${boards[Math.ceil(Math.random() * 4)].id}`,
      },
    });

    pins.push(result);
  }

  console.log("All pins created");

  console.log(`Start seeding comments data ...`);
  const comments = [];

  for (let i = 0; i < 50; i++) {
    const result = await prisma.comments.create({
      data: {
        text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
        userId: `${users[Math.ceil(Math.random() * 4)].id}`,
        pinId: `${pins[Math.ceil(Math.random() * 9)]?.id}`,
      },
    });
  }

  console.log("All comments created");

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
