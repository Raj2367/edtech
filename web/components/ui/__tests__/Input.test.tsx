import { render, screen } from "@testing-library/react";
import Input from "../Input";

describe("Input", () => {
  it("renders input element", () => {
    render(<Input placeholder="Email" />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("accepts value", () => {
    render(<Input defaultValue="test@example.com" />);
    expect(screen.getByDisplayValue("test@example.com")).toBeInTheDocument();
  });
});
