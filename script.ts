import { db } from "./lib/prisma/db";

async function main() {
  const post = await db.orm.posts.create({
    title: "Hello World 64",
    content: "This is my first post!",
  });
  console.log(post);

  await db.close();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});