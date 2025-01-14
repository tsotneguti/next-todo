import { notFound } from "next/navigation";
import TodoForm from "@/app/ui/todo/Form";
import { getTodo } from "@/app/actions";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const todo = await getTodo(id);

  if (!todo) {
    notFound();
  }

  return <TodoForm data={todo} />;
}
