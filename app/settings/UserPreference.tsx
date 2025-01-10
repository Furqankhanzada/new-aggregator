import Header from "~/components/Header";

type Props = {};

export function UserPreference({}: Props) {
  return (
    <main className="container mx-auto pt-16 pb-4">
      <div className="bg-white">
        <Header showRightHeader={false} />
        <div className="pt-5">UserPreference will go here</div>
      </div>
    </main>
  );
}
