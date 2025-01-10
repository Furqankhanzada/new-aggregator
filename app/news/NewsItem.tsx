import { formatDistance } from "date-fns";
import type { Article } from "~/types/article";

type Props = {
  article: Article;
};

export function NewsItem({ article }: Props) {
  return (
    <article className="flex max-w-xl flex-col items-start justify-between">
      <div className="flex items-center gap-x-4 text-xs">
        <time dateTime="2020-03-16" className="text-gray-500">
          {formatDistance(article.publishedDate, new Date(), {
            addSuffix: true,
          })}
        </time>
        <a
          href={article.url}
          target="_blank"
          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          {article.section}
        </a>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
          <a href={article.url} target="_blank">
            <span className="absolute inset-0"></span>
            {article.title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
          {article.snippet}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <div className="text-sm/6">
          <p className="font-semibold text-gray-900">
            <a href={article.url} target="_blank">
              <span className="absolute inset-0"></span>
              {article.authors.map((author) => author.name).join(", ")}
            </a>
          </p>
          <p className="text-gray-600">{article.source}</p>
        </div>
      </div>
    </article>
  );
}
