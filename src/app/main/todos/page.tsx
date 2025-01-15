import Search from "@/app/ui/todo/Search";
import TodoList from "../../ui/todo/TodoList";
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  return (
    <div>
      <Search />
      <TodoList query={query} />
    </div>
  );
}
