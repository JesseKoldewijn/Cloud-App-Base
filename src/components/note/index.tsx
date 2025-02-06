"use client";

import { Suspense, useRef, useState } from "react";

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
            <div
              key={note.id}
              className="border p-1"
              style={{
                backgroundColor: note.note_color ?? "#000000",
                color: note.note_color_isDark ? "#ffffff" : "#000000",
              }}
            >
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
  const formRef = useRef<HTMLFormElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [noteColor, setNoteColor] = useState("#000000");

  const createNote = api.note.create.useMutation({
    onSuccess: async () => {
      await apiUtils?.note.invalidate();
      setName("");
      setContent("");
      setNoteColor("#000000");

      setTimeout(() => {
        closeRef.current?.click();
        formRef.current?.reset();
      }, 100);
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
            ref={formRef}
            onSubmit={(e) => {
              e.preventDefault();
              createNote.mutate({ name, content, note_color: noteColor });
              e.currentTarget.reset();
            }}
            className="flex flex-col gap-2"
          >
            <input
              type="text"
              placeholder="Title"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-background text-foreground w-full rounded-md border px-4 py-2"
              autoFocus
            />

            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-background text-foreground w-full rounded-md border px-4 py-2"
            />

            <input
              type="color"
              className="block h-10 w-full cursor-pointer rounded-lg border border-gray-200 bg-white p-1 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900"
              value={noteColor}
              onChange={(e) => setNoteColor(e.target.value)}
              title="Choose your color"
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
            <DrawerClose ref={closeRef}>Cancel</DrawerClose>
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
