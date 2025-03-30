import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding users...");
  await prisma.user.deleteMany();
  const users = [
    { name: "John Doe", email: "john@example.com", password: "1234" },
    { name: "Jane Smith", email: "jane@example.com", password: "1234" },
    { name: "Sam Wilson", email: "sam@example.com", password: "1234" },
  ];

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
