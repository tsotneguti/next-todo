"use client";

import Link from "next/link";
import { deleteTodo } from "../../actions";

export default function TodoListItem(props: { item: any }) {
  const { item } = props;
  function handleDelete(id: string) {
    deleteTodo(id);
  }

  return (
    <div key={item.id} className={"p-2"}>
      {item.description}{" "}
      <button onClick={() => handleDelete(item.id)}>X</button>
      <Link href={`/main/todos/${item.id}/edit`} className={"custom-btn p-1"}>
        edit
      </Link>
    </div>
  );
}
