import { faker } from "@faker-js/faker";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
async function main() {
  const prisma = new PrismaClient();
  await prisma.user.create({
    data: {
      displayName: faker.name.findName(),
      email: faker.internet.email(),
      password: await bcrypt.hashSync("password", 10),
      role: "ADMIN",
    },
  });
}

main();
