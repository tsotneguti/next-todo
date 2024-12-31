import bcrypt from "bcrypt";
import { db } from "@vercel/postgres";
// import { invoices, customers, revenue, users } from "../lib/placeholder-data";

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  // language=SQL format=false
  await client.sql`
        CREATE TABLE IF NOT EXISTS users
        (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
        );
    `;

  const insertedUsers = await Promise.all(
    [{ password: "1234", name: "tsotne1", email: "tsotne1@gmail.com" }].map(
      async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
                INSERT INTO users (name, email, password)
                VALUES (${user.name}, ${user.email}, ${hashedPassword}) ON CONFLICT (id) DO NOTHING;
            `;
      }
    )
  );

  return insertedUsers;
}

async function seedTodos() {
  await client.sql`
        CREATE TABLE IF NOT EXISTS todos
        (
            id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
            description TEXT NOT NULL,
            completed BOOLEAN default false NOT NULL
        );
    `;

  const insertedData = await Promise.all(
    [{ description: "todo1" }].map(async (todo) => {
      return client.sql`
                INSERT INTO todos (description)
                VALUES (${todo.description}) ON CONFLICT (id) DO NOTHING;
            `;
    })
  );

  return insertedData;
}

export async function GET() {
  try {
    await client.sql`BEGIN`;
    // await seedUsers();
    await seedTodos();
    await client.sql`COMMIT`;

    return Response.json({ message: "Database seeded successfully" });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
