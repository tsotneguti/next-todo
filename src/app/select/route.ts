import {db} from "@vercel/postgres";
// import { invoices, customers, revenue, users } from "../lib/placeholder-data";

const client = await db.connect();


async function seedUsers() {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    return await client.sql`
        select * from users
    `;
}

export async function GET() {
    try {
        await client.sql`BEGIN`;
        const message = await seedUsers();
        await client.sql`COMMIT`;

        return Response.json({message});
    } catch (error) {
        await client.sql`ROLLBACK`;
        return Response.json({error}, {status: 500});
    }
}
