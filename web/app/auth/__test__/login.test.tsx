import { render, screen } from "@testing-library/react";
import LoginPage from "../login/page";

describe("Login Page", () => {
  it("renders login form", () => {
    render(<LoginPage />);
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });
});
