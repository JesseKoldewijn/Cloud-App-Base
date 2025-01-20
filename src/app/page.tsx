import { api, HydrateClient } from "~/trpc/server";

const Home = async () => {
  void api.note.getLatest.prefetch();
  const latestNote = await api.note.getLatest();

  return (
    <HydrateClient>
      <div className="flex flex-col gap-5">
        <h1>HomePage</h1>
        {latestNote && (
          <section>
            <header>Latest Note</header>
            <p>{latestNote?.name}</p>
          </section>
        )}
      </div>
    </HydrateClient>
  );
};
export default Home;
