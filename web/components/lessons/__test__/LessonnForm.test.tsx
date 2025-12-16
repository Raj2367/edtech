import { render, screen } from "@testing-library/react";
import LessonForm from "../LessonForm";

describe("LessonForm", () => {
  it("renders lesson form fields", () => {
    render(<LessonForm action={async () => {}} />);

    expect(screen.getByPlaceholderText("Lesson Title")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Lesson Content")).toBeInTheDocument();
  });

  it("renders submit button with correct type", () => {
    render(<LessonForm action={async () => {}} />);

    const button = screen.getByRole("button", {
      name: /create lesson/i,
    });

    expect(button).toHaveAttribute("type", "submit");
  });

  it("renders hidden lessonId when editing", () => {
    render(
      <LessonForm
        action={async () => {}}
        defaultValues={{
          title: "Intro",
          content: "Lesson content",
          lessonId: "lesson123",
        }}
      />
    );

    const hiddenInput = screen.getByDisplayValue("lesson123");
    expect(hiddenInput).toHaveAttribute("type", "hidden");
  });
});
