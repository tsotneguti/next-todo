import { getTodos } from "../../actions";
import TodoListItem from "./TodoListItem";

export default async function TodoList(props: { query?: string }) {
  const items = await getTodos(props.query);

  if (typeof items === "string") {
    return items;
  }

  return (
    <div>
      {items.map((item: any) => (
        <TodoListItem item={item} key={item.id} />
      ))}
    </div>
  );
}
