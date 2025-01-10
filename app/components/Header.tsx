import { useEffect, useState } from "react";
import { Form, NavLink, useSearchParams, useSubmit } from "react-router";
import { Settings } from "lucide-react";
import { Input } from "./ui/input";

type Props = {
  q?: string;
  showRightHeader?: boolean;
};

export default function Header({ q, showRightHeader = true }: Props) {
  // the query now needs to be kept in state
  const [query, setQuery] = useState(q || "");
  let [searchParams] = useSearchParams();


  const submit = useSubmit();

  // we still have a `useEffect` to synchronize the query
  // to the component state on back/forward button clicks
  useEffect(() => {
    setQuery(q || "");
  }, [q]);

  function onSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    const qInput = event.currentTarget.elements.namedItem(
      "q"
    ) as HTMLInputElement;
    submit({
      q: qInput.value,
      ...searchParams.has('date') ? { date: searchParams.get('date') } : {}
    });
  }

  function onSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setQuery(event.currentTarget.value);
  }

  return (
    <header>
      <div className="mx-auto lg:mx-0 flex justify-between items-center">
        <NavLink to="/">
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            News
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">A News Aggregator App</p>
        </NavLink>
        {showRightHeader ? (
          <div className="flex items-center">
            <Form onChange={onSubmit} className="flex items-center">
              <Input
                type="text"
                name="q"
                value={query}
                onChange={onSearch}
                placeholder="Search..."
              />
            </Form>
            <NavLink to="/preference">
              <Settings size={38} className="py-2" />
            </NavLink>
          </div>
        ) : null}
      </div>
    </header>
  );
}
