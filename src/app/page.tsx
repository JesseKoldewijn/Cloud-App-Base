import { api, HydrateClient } from "~/trpc/server";
import { LatestNote } from "./_components/note";

const Home = async () => {
  void api.note.getLatest.prefetch();

  return (
    <HydrateClient>
      <div className="flex flex-col items-center gap-5">
        <h1>HomePage</h1>
        <LatestNote />
      </div>
    </HydrateClient>
  );
};
export default Home;
