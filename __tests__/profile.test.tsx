import { render, screen, fireEvent } from "@testing-library/react";
import Profile from "@/app/dashboard/profile/page";
import "@testing-library/jest-dom";
import testUsers from "../generated.json";
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

  window.localStorage.setItem("usersData", JSON.stringify(testUsers));
});

describe("Profile", () => {
  it("loads user data from localStorage based on URL param", () => {
    const mockUser = testUsers[0];
    window.localStorage.setItem("usersData", JSON.stringify(testUsers));
    window.history.pushState({}, "Test page", `?user=${mockUser.id}`);

    render(<Profile />);

    expect(screen.getAllByText(mockUser.user.username).length).toBeGreaterThan(
      0
    );
    expect(screen.getAllByText(mockUser.user.email).length).toBeGreaterThan(0);
  });

  it("shows fallback when no user is found for invalid ID (Negative)", () => {
    window.history.pushState({}, "Test page", `?user=invalid-user-id`);
    render(<Profile />);

    expect(screen.getByText(/User Not Found/i)).toBeInTheDocument();
  });

  it("shows fallback when no user ID is passed in URL", () => {
    window.history.pushState({}, "Test page", ``);
    render(<Profile />);

    expect(screen.getByText(/User Not Found/i)).toBeInTheDocument();
  });

  it("navigates back to dashboard when back is clicked", () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<Profile />);
    fireEvent.click(screen.getByText("Back to Users"));

    expect(pushMock).toHaveBeenCalledWith("/dashboard");
  });

  it("updates active section when header tab is clicked", () => {
    const mockUser = testUsers[0];
    window.localStorage.setItem("usersData", JSON.stringify(testUsers));
    window.history.pushState({}, "Test page", `?user=${mockUser.id}`);

    render(<Profile />);
    const savingsTab = screen.getByText("Savings");
    fireEvent.click(savingsTab);

    expect(savingsTab).toHaveClass("active");
    expect(screen.getByText("Info Unavailable")).toBeInTheDocument();
  });
});
