"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestNote() {
  const [latestNote] = api.note.getLatest.useSuspenseQuery();

  const utils = api.useUtils();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const createNote = api.note.create.useMutation({
    onSuccess: async () => {
      await utils.note.invalidate();
      setName("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      {latestNote ? (
        <p className="truncate">Your most recent post: {latestNote.name}</p>
      ) : (
        <p>You have no notes yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createNote.mutate({ name, content });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />

        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createNote.isPending}
        >
          {createNote.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
