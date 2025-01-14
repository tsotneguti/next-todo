"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { deleteTodo, getTodos } from "../../actions";

export default function Page() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const res = await getTodos();
    if (res !== "error") {
      setItems(res as any);
    } else {
      setItems([]);
    }
  };

  async function handleDelete(id: string) {
    await deleteTodo(id);
    await loadTodos();
  }

  return (
    <div>
      <div>
        <Link href={"/main/todos/create"}>
          <button className={"custom-btn"}>Create Item</button>
        </Link>
      </div>
      {items.map((item: any) => (
        <div key={item.id} className={"p-2"}>
          {item.description}{" "}
          <button onClick={() => handleDelete(item.id)}>X</button>
          <Link
            href={`/main/todos/${item.id}/edit`}
            className={"custom-btn p-1"}
          >
            edit
          </Link>
        </div>
      ))}
    </div>
  );
}
