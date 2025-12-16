import { render, screen } from "@testing-library/react";
import RegisterPage from "../register/page";

describe("RegisterPage", () => {
  it("renders register form", () => {
    render(<RegisterPage />);
    expect(screen.getByText("Create Account")).toBeInTheDocument();
  });
});
