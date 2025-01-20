"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export const LatestNote = () => {
  const [allNotes] = api.note.getAll.useSuspenseQuery();

  const utils = api.useUtils();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const createNote = api.note.create.useMutation({
    onSuccess: async () => {
      await utils.note.invalidate();
      setName("");
      setContent("");
    },
  });

  return (
    <div className="flex w-full max-w-xs flex-col gap-2 px-2 py-1">
      {allNotes ? (
        <div>
          {allNotes.map((note) => (
            <div key={note.id} className="border p-1">
              <p>{note.name}</p>
              <p>{note.content}</p>
            </div>
          ))}
        </div>
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
          className="w-full rounded-md px-4 py-2 text-black"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full rounded-md px-4 py-2 text-black"
        />

        <button
          type="submit"
          className="rounded-md bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createNote.isPending}
        >
          {createNote.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};
