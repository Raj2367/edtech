import { render, screen } from "@testing-library/react";
import CourseList from "../CourseList";

describe("CourseList", () => {
  it("shows empty message", () => {
    render(<CourseList courses={[]} />);
    expect(screen.getByText(/no courses/i)).toBeInTheDocument();
  });

  it("renders courses", () => {
    render(
      <CourseList courses={[{ _id: "1", title: "React", slug: "react" }]} />
    );
    expect(screen.getByText("React")).toBeInTheDocument();
  });
});
