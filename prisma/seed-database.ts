import { usersSeed } from "./../seed/users.seed";
import "dotenv/config";
import { PrismaClient } from "./generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { siteReviewsSeed } from "../seed/site-review.seed";
import { productsSeed } from "../seed/products.seed";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.siteReview.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  await prisma.siteReview.createMany({
    data: siteReviewsSeed,
  });
  console.log(`Site Reviews created`);

  await prisma.product.createMany({
    data: productsSeed,
  });

  await prisma.user.createMany({
    data: usersSeed.map((user) => ({
      ...user,
      password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
    })),
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
