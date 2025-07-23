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
  it("renders dashboard title and table headers", () => {
    render(<Dashboard />);
    expect(screen.getByText("Users")).toBeInTheDocument();
    expect(screen.getByText("Organization")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Date Joined")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
  });

  it("loads and renders user data from localStorage", async () => {
    const testUsers = [
      {
        id: "687e4fbe4fa14a3d14356fb2",
        index: 0,
        status: "inactive",
        user: {
          username: "Eleanor Nicholson",
          email: "eleanor@irorun.com",
          phone: "+234 (968) 440-2413",
          twitter: "@eleanor_nicholson",
          facebook: "Eleanor Nicholson",
          instagram: "@eleanor_nicholson",
          organization: "Irorun",
          gender: "Male",
          bvn: 29604575018,
          code: "LSQBtFRxE8p",
          userTier: 1,
          marital_status: "Married",
          children: 4,
          type_of_residence: "Parent's Apartment",
          education: "BEd",
          bankDetails: {
            bankName: "Access Bank",
            acctNumber: 29635080729,
            acctBalance: "₦449,437.00",
          },
          employment_status: "Unemployed",
          sector_of_employment: "None",
          duration_of_employment: "None",
          office_email: "None",
          monthly_income: "₦331,948.00 - ₦630,467.00",
          loan_repayment: "300,000",
          guarantor1: {
            fullName: "Tiffany Monroe",
            email: "tiffanymonroe@valpreal.com",
            phone: "+234 (829) 566-3570",
            relationship: "Mother",
          },
          guarantor2: {
            fullName: "Hart Delacruz",
            email: "hartdelacruz@valpreal.com",
            phone: "+234 (890) 595-2928",
            relationship: "Uncle",
          },
          dateJoined: "August Su, 2021 5:14 PM",
        },
      },
    ];

    window.localStorage.setItem("usersData", JSON.stringify(testUsers));

    render(<Dashboard />);
    for (const user of testUsers) {
      expect(
        await screen.findByText(user.user.organization)
      ).toBeInTheDocument();
      expect(screen.getByText(user.user.username)).toBeInTheDocument();
      expect(screen.getByText(user.user.email)).toBeInTheDocument();
      expect(
        screen.getByText(formatPhoneNumber(user.user.phone))
      ).toBeInTheDocument();
      expect(
        screen.getByText(formatDate(user.user.dateJoined))
      ).toBeInTheDocument();
      expect(screen.getByText(user.status)).toBeInTheDocument();
    }
  });

  it("displays filter box when Username header is clicked", () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByText("Username"));
    expect(screen.getByPlaceholderText("User")).toBeInTheDocument();
    expect(screen.getByText("Filter")).toBeInTheDocument();
  });

  it("filters users by username", async () => {
    render(<Dashboard />);
    fireEvent.click(screen.getByText("Username"));
    fireEvent.change(screen.getByPlaceholderText("User"), {
      target: { value: "Eleanor" },
    });
    fireEvent.click(screen.getByText("Filter"));
    await waitFor(() => {
      const rows = screen.getAllByRole("cell");
      expect(rows.length).toBeGreaterThan(0);
      expect(screen.getAllByText(/Eleanor/i)[0]).toBeInTheDocument();
    });
  });
});
