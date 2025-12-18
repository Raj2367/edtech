"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import FormError from "@/components/ui/FormError";

export default function CourseForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => Promise<any>;
  defaultValues?: { title?: string; description?: string; courseId?: string };
}) {
  const [error, setError] = useState<string | undefined>();

  async function onSubmit(data: FormData) {
    const result = await action(data);
    if (result?.error) setError(result.error);
  }

  return (
    <form action={onSubmit} className="space-y-4 max-w-xl">
      <Input
        name="title"
        placeholder="Course Title"
        defaultValue={defaultValues?.title}
        required
      />

      <textarea
        name="description"
        placeholder="Course Description"
        className="w-full border p-3 rounded-md h-32 dark:focus:outline-none dark:bg-gray-700 dark:border-gray-600"
        defaultValue={defaultValues?.description}
      />

      {defaultValues?.courseId && (
        <input type="hidden" name="courseId" value={defaultValues.courseId} />
      )}

      <FormError message={error} />

      <Button label={defaultValues ? "Update Course" : "Create Course"} />
    </form>
  );
}
