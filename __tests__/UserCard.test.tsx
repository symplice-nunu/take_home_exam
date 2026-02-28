import { render, screen } from "@testing-library/react";
import UserCard from "@/components/UserCard";
import type { User } from "@/types/user";

jest.mock("next/navigation", () => ({
  useRouter: () => ({ back: jest.fn(), push: jest.fn(), replace: jest.fn() }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

const mockUser: User = {
  id: 7,
  name: "John Doe",
  username: "john.doe",
  email: "john@example.com",
  address: {
    street: "456 Elm St",
    suite: "Suite 3",
    city: "Metropolis",
    zipcode: "67890",
    geo: { lat: "0", lng: "0" },
  },
  phone: "555-9999",
  website: "johndoe.com",
  company: {
    name: "Doe Corp",
    catchPhrase: "Just do it",
    bs: "leverage",
  },
};

describe("UserCard", () => {
  it("renders the user name", () => {
    render(<UserCard user={mockUser} animationDelay={0} />);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("renders the user email", () => {
    render(<UserCard user={mockUser} animationDelay={0} />);
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("renders the user city", () => {
    render(<UserCard user={mockUser} animationDelay={0} />);
    expect(screen.getByText("Metropolis")).toBeInTheDocument();
  });

  it("links to /users/[id] without trailing ? when no searchParams", () => {
    render(<UserCard user={mockUser} animationDelay={0} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/users/7");
  });

  it("appends existing searchParams to the href", () => {
    render(
      <UserCard user={mockUser} animationDelay={0} searchParams="search=john&sort=asc" />
    );
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/users/7?search=john&sort=asc");
  });

  it("renders avatar initials from name", () => {
    render(<UserCard user={mockUser} animationDelay={0} />);
    expect(screen.getByText("JD")).toBeInTheDocument();
  });

  it("applies animation delay via CSS custom property", () => {
    render(<UserCard user={mockUser} animationDelay={240} />);
    const link = screen.getByRole("link");
    expect(link).toHaveStyle("--delay: 240ms");
  });
});
