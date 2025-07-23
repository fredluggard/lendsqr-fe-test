import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../app/login/page";
import "@testing-library/jest-dom";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const pushMock = jest.fn();

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    push: pushMock,
    prefetch: jest.fn().mockResolvedValue(null),
  });
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();
});

describe("Login Page", () => {
  it("renders login form correctly", () => {
    render(<Login />);
    expect(screen.getByText(/Welcome!/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
  });

  it("shows error when submitting empty form", () => {
    render(<Login />);
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(screen.getAllByText(/please fill in required fields/i)).toHaveLength(
      2
    );
  });

  it("submits form and redirects to dashboard", async () => {
    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Fast-forward setTimeout
    jest.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/dashboard");
    });
  });
});
