import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "@/app/dashboard/page";
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

const formatPhoneNumber = (rawPhone: string) => {
  const digits = rawPhone.replace(/\D/g, "");
  const localNumber = digits.startsWith("234") ? "0" + digits.slice(3) : digits;
  return localNumber;
};

const formatDate = (dateString: string) => {
  const cleanedDate = dateString.replace(" -", "-");
  const date = new Date(cleanedDate);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

describe("Dashboard", () => {
  it("renders dashboard title and table headers (positive)", () => {
    render(<Dashboard />);
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Date Joined")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("loads and renders user data from localStorage (positive)", async () => {
    render(<Dashboard />);

    const test = testUsers[0];
    expect(
      (await screen.findAllByText(test.user.organization)).length
    ).toBeGreaterThan(0);
    expect(
      (await screen.findAllByText(test.user.username)).length
    ).toBeGreaterThan(0);
    expect(screen.getByText(test.user.username)).toBeInTheDocument();
    expect(
      (await screen.findAllByText(test.user.email)).length
    ).toBeGreaterThan(0);
    expect(
      (await screen.findAllByText(formatPhoneNumber(test.user.phone))).length
    ).toBeGreaterThan(0);
    expect(
      (await screen.findAllByText(formatDate(test.user.dateJoined))).length
    ).toBeGreaterThan(0);
    expect((await screen.findAllByText(test.status)).length).toBeGreaterThan(0);
  });

  it("handles empty localStorage data gracefully (negative)", async () => {
    window.localStorage.setItem("usersData", JSON.stringify([]));
    render(<Dashboard />);
    expect(screen.getByText("Users")).toBeInTheDocument();
  });

  it("displays filter box when Username header is clicked (positive)", () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByText("Username"));
    expect(screen.getByPlaceholderText("User")).toBeInTheDocument();
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("filters users by valid username input (positive)", async () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByText("Username"));
    fireEvent.change(screen.getByPlaceholderText("User"), {
      target: { value: "Eleanor" },
    });
    fireEvent.click(screen.getByText("Filter"));
    await waitFor(() => {
      expect(screen.getAllByText(/Eleanor/i).length).toBeGreaterThan(0);
    });
  });

  it("filters users with no match (negative)", async () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByText("Username"));
    fireEvent.change(screen.getByPlaceholderText("User"), {
      target: { value: "NonExistentName" },
    });
    fireEvent.click(screen.getByText("Filter"));

    await waitFor(() => {
      const matches = screen.queryAllByText(/NonExistentName/i);
      expect(matches.length).toBe(0);
    });
  });
});
