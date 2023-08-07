import add from "../src/add";

describe("add", () => {
  it("should return 15 when adding 10 and 5", () => {
    const actual = add(10, 5);

    expect(actual).toBe(15);
  });

  it("should return 5 when adding 2 and 3", () => {
    const actual = add(2, 3);

    expect(actual).toBe(5);
  });

  it("should return 100 when adding 1 and 99", () => {
    const actual = add(1, 99);

    expect(actual).toBe(100);
  });
});
