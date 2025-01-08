"use server";

import { db } from "@vercel/postgres";
import { redirect } from "next/navigation";

const client = await db.connect();

export async function addTodo(ps: any, formData: any) {
  try {
    await client.sql`
            insert into todos (description)
            values (${formData.get("description")})
        `;
  } catch (error) {
    return "error";
  }
  redirect("/main/todos");
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
