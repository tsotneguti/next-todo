"use server";

import { db } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

const client = await db.connect();

export async function addTodo(ps: any, formData: any) {
  await delay(500);

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

export async function editTodo(ps: any, formData: any) {
  try {
    await client.sql`
            update todos
            set description=${formData.get("description")}
            where id = ${formData.get("id")}
        `;
    return { data: {}, error: "" };
  } catch (error) {
    return { data: null, error: "შეცდომა" };
  }
}

export async function deleteTodo(id: string) {
  try {
    await client.sql`
            delete
            from todos
            where id = ${id}
        `;
    revalidatePath("/main/todos");
    return { data: {}, error: "" };
  } catch (error) {
    return { data: null, error: "შეცდომა" };
  }
}

export async function getTodos(query?: string) {
  try {
    const res = await client.sql`
            select *
            from todos
            where description like ${query ? `${query}%` : "%"}
        `;

    return res.rows;
  } catch (error) {
    return "error";
  }
}

export async function getTodo(id: string) {
  try {
    const res = await client.sql`
            select *
            from todos
            where id = ${id}
        `;
    return res.rows?.[0];
  } catch (error) {
    return "error";
  }
}

const delay = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));
