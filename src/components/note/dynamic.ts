"use client";

import dynamic from "next/dynamic";

export const Dynamic_LatestNote = dynamic(
  () => import("~/components/note").then((x) => x.LatestNote),
  {
    ssr: true,
  },
);

export const Dynamic_CreateNote = dynamic(
  () => import("~/components/note").then((x) => x.CreateNote),
  {
    ssr: false,
  },
);
