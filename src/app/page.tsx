import { HydrateClient } from "~/trpc/server";

import {
  Dynamic_CreateNote,
  Dynamic_LatestNote,
} from "~/components/note/dynamic";

const Home = async () => {
  return (
    <HydrateClient>
      <div className="flex flex-col items-center gap-5">
        <h1>HomePage</h1>
        <Dynamic_CreateNote />
        <Dynamic_LatestNote />
      </div>
    </HydrateClient>
  );
};
export default Home;
