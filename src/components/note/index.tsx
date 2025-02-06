"use client";

import { Suspense, useState } from "react";

import { api } from "~/trpc/react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "~/components/ui/drawer";
import { Button } from "~/components/ui/button";

type ApiUtils = ReturnType<typeof api.useUtils>;

export const INTERNAL_LatestNote = () => {
  const [allNotes] = api.note.getAll.useSuspenseQuery();

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
    </div>
  );
};

export const LatestNote = () => (
  <Suspense>
    <INTERNAL_LatestNote />
  </Suspense>
);

export const INTERNAL_CreateNote = ({ apiUtils }: { apiUtils?: ApiUtils }) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const createNote = api.note.create.useMutation({
    onSuccess: async () => {
      await apiUtils?.note.invalidate();
      setName("");
      setContent("");
    },
  });

  return (
    <Drawer>
      <Button variant="outline" asChild>
        <DrawerTrigger>Open</DrawerTrigger>
      </Button>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
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
              className="bg-background text-foreground w-full rounded-md border px-4 py-2"
            />

            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-background text-foreground w-full rounded-md border px-4 py-2"
            />

            <button
              type="submit"
              className="rounded-md bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
              disabled={createNote.isPending}
            >
              {createNote.isPending ? "Submitting..." : "Submit"}
            </button>
          </form>
          <Button variant="outline" asChild>
            <DrawerClose>Cancel</DrawerClose>
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export const CreateNote = () => {
  const apiUtils = api.useUtils();

  return <INTERNAL_CreateNote apiUtils={apiUtils} />;
};
