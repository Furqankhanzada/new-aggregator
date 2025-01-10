import type { Route } from "./+types/home";
import { NewsList } from "../news/NewsList";
import { getArticles } from "../apis/articles";
export function meta({}: Route.MetaArgs) {
  return [
    { title: "News From The World" },
    { name: "New Aggregator", content: "Welcome to News Aggregator!" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const query = new URL(request.url).searchParams;
  
  const queryParams: Record<string, string> = {
    ...query.get("q") && { q: query.get("q") as string },
    ...query.get("date") && { date: query.get("date") as string },
  }

  const articles = await getArticles(queryParams);
  return { ...articles, queryParams };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { list, queryParams } = loaderData;
  return <NewsList list={list} queryParams={queryParams}  />;
}
