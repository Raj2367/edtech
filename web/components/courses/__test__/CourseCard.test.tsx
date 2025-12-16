import { render, screen } from "@testing-library/react";
import CourseCard from "../CourseCard";

describe("CourseCard", () => {
  const course = {
    slug: "nextjs",
    title: "Next.js",
    description: "SSR framework"
  };

  it("renders course data", () => {
    render(<CourseCard course={course} />);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
    expect(screen.getByText("SSR framework")).toBeInTheDocument();
  });
});
