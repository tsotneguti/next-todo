"use server";

import { db } from "@vercel/postgres";

const client = await db.connect();

export async function addTodo(ps: any, formData: any) {
  await delay(2000);

  try {
    await client.sql`
            insert into todos (description)
            values (${formData.get("description")})
        `;
    return { data: {}, error: "" };
  } catch (error) {
    return { data: null, error: "შეცდომა" };
  }
}

export async function deleteTodo(id: string) {
  try {
    await client.sql`
            delete from todos where id = ${id}
        `;
    return { data: {}, error: "" };
  } catch (error) {
    return { data: null, error: "შეცდომა" };
  }
}

export async function getTodos() {
  try {
    const res = await client.sql`
            select *
            from todos
        `;
    return res.rows;
  } catch (error) {
    return "error";
  }
}

const delay = (time: number) =>
  new Promise((resolve, reject) => setTimeout(resolve, time));
