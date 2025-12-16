import { render, screen } from "@testing-library/react";
import FormError from "../FormError";

describe("FormError", () => {
  it("renders error message", () => {
    render(<FormError message="Error occurred" />);
    expect(screen.getByText("Error occurred")).toBeInTheDocument();
  });

  it("renders nothing if no message", () => {
    const { container } = render(<FormError />);
    expect(container.firstChild).toBeNull();
  });
});
