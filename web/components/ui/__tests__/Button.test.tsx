import { render, screen } from "@testing-library/react";
import Button from "../Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("is clickable", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click</Button>);
    screen.getByText("Click").click();
    expect(onClick).toHaveBeenCalled();
  });
});
