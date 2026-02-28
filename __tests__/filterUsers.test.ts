import { filterUsers } from "@/utils/filterUsers";
import type { User } from "@/types/user";

const makeUser = (id: number, name: string, city = "Anytown"): User => ({
  id,
  name,
  username: name.toLowerCase().replace(" ", "."),
  email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
  address: {
    street: "123 Main St",
    suite: "Apt 1",
    city,
    zipcode: "12345",
    geo: { lat: "0", lng: "0" },
  },
  phone: "555-1234",
  website: "example.com",
  company: {
    name: "Acme",
    catchPhrase: "We do stuff",
    bs: "synergize",
  },
});

const USERS: User[] = [
  makeUser(1, "Charlie Brown"),
  makeUser(2, "Alice Smith"),
  makeUser(3, "Bob Jones"),
];

describe("filterUsers", () => {
  describe("filtering", () => {
    it("returns all users when query is empty", () => {
      expect(filterUsers(USERS, "", "original")).toHaveLength(3);
    });

    it("filters case-insensitively", () => {
      const result = filterUsers(USERS, "ALICE", "original");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Alice Smith");
    });

    it("filters by partial name match", () => {
      const result = filterUsers(USERS, "jones", "original");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Bob Jones");
    });

    it("trims whitespace from the query", () => {
      const result = filterUsers(USERS, "  Bob  ", "original");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Bob Jones");
    });

    it("returns empty array when no match", () => {
      expect(filterUsers(USERS, "zzzzzz", "original")).toHaveLength(0);
    });

    it("filters by email", () => {
      const result = filterUsers(USERS, "alice.smith@example.com", "original");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Alice Smith");
    });

    it("filters by username", () => {
      const result = filterUsers(USERS, "charlie.brown", "original");
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe("Charlie Brown");
    });

    it("filters by city", () => {
      const withCity = [
        makeUser(1, "Charlie Brown", "Springfield"),
        makeUser(2, "Alice Smith", "Shelbyville"),
        makeUser(3, "Bob Jones", "Springfield"),
      ];
      const result = filterUsers(withCity, "springfield", "original");
      expect(result).toHaveLength(2);
    });

    it("filters by phone", () => {
      const result = filterUsers(USERS, "555-1234", "original");
      expect(result).toHaveLength(3);
    });

    it("filters by company name", () => {
      const result = filterUsers(USERS, "acme", "original");
      expect(result).toHaveLength(3);
    });
  });

  describe("sorting", () => {
    it("sorts ascending (A → Z)", () => {
      const result = filterUsers(USERS, "", "asc");
      expect(result.map((u) => u.name)).toEqual([
        "Alice Smith",
        "Bob Jones",
        "Charlie Brown",
      ]);
    });

    it("sorts descending (Z → A)", () => {
      const result = filterUsers(USERS, "", "desc");
      expect(result.map((u) => u.name)).toEqual([
        "Charlie Brown",
        "Bob Jones",
        "Alice Smith",
      ]);
    });

    it("preserves original order", () => {
      const result = filterUsers(USERS, "", "original");
      expect(result.map((u) => u.id)).toEqual([1, 2, 3]);
    });
  });

  describe("immutability", () => {
    it("does not mutate the original array", () => {
      const original = [...USERS];
      filterUsers(USERS, "", "desc");
      expect(USERS.map((u) => u.id)).toEqual(original.map((u) => u.id));
    });
  });
});
