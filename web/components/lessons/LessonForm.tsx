"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormError from "@/components/ui/FormError";

export default function LessonForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<any>;
  defaultValues?: { title?: string; content?: string; lessonId?: string };
}) {
  const [error, setError] = useState<string>();

  async function onSubmit(data: FormData) {
    const res = await action(data);
    if (res?.error) setError(res.error);
  }

  return (
    <form action={onSubmit} className="space-y-4 max-w-2xl">
      <Input
        name="title"
        placeholder="Lesson Title"
        defaultValue={defaultValues?.title}
        required
      />

      <textarea
        name="content"
        placeholder="Lesson Content"
        className="w-full border p-3 rounded-md h-48"
        defaultValue={defaultValues?.content}
        required
      />

      {defaultValues?.lessonId && (
        <input type="hidden" name="lessonId" value={defaultValues.lessonId} />
      )}

      <FormError message={error} />

      <Button label={defaultValues ? "Update Lesson" : "Create Lesson"} />
    </form>
  );
}
