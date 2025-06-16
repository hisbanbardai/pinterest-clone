import { PrismaClient } from "../src/generated/prisma/edge.js";

const prisma = new PrismaClient();

const users = [
  {
    name: "Benjamin",
  },
  {
    name: "Richard",
  },
  {
    name: "Anna",
  },
];

async function main() {
  console.log(`Start seeding ...`);

  for (const user of users) {
    const result = await prisma.users.create({
      data: user,
    });
    console.log(`Created user with id: ${result.id}`);
  }

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
