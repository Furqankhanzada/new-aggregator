import type { Article } from "~/types/article";
import { NewsItem } from "./NewsItem";
import Header from "~/components/Header";
import Filter from "~/components/Filter";
import { useSearchParams, useSubmit } from "react-router";
import { format } from "date-fns";

type Props = {
  list: Article[];
  queryParams: Record<string, string>;
};

export function NewsList({ list, queryParams }: Props) {
  const submit = useSubmit();
  let [searchParams] = useSearchParams();

  function onDateFilter(date: Date) {
    submit({ 
      date: format(date, "yyyy-MM-dd"),
      ...queryParams.q ? { q: queryParams.q } : {}
    });
  }

  return (
    <main className="container mx-auto pt-16 pb-4">
      <div className="bg-white">
        <Header q={queryParams.q} />
        <Filter onDateFilter={onDateFilter} defaultDate={searchParams.has('date') ? new Date(searchParams.get('date') || '') : undefined} />
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-2">
          {list.map((article) => (
            <NewsItem key={article.url} article={article} />
          ))}
        </div>
      </div>
    </main>
  );
}
