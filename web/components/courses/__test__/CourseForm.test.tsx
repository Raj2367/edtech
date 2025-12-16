import { render, screen } from "@testing-library/react";
import CourseForm from "../CourseForm";

describe("CourseForm", () => {
  it("renders required fields", () => {
    render(<CourseForm action={async () => {}} />);

    expect(screen.getByPlaceholderText("Course Title")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /create course/i })
    ).toBeInTheDocument();
  });

  it("button is of type submit", () => {
    render(<CourseForm action={async () => {}} />);

    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "submit");
  });
});
