/**
 * https://www.typescriptlang.org/docs/handbook/2/everyday-types.html
 */

describe("TypeScript Handbook - Everyday Types", () => {
  it("should define arrays", () => {
    const array1: Array<number> = [1, 2, 3];
    const array2: number[] = [1, 2, 3];
    expect(array1).toStrictEqual(array2);
  });

  it("should demonstrate optional property", () => {
    function printName(firstName: string, lastName?: string): string {
      if (lastName) {
        return `${firstName} ${lastName}`;
      }
      return firstName;
    }

    expect(printName("Bob")).toBe("Bob");
    expect(printName("Bob", "Barker")).toBe("Bob Barker");
  });

  it("should demonstrate narrowing for a union type", () => {
    function printId(id: number | string) {
      if (typeof id === "string") {
        return id.toUpperCase();
      }
      return id;
    }
    expect(printId("four")).toBe("FOUR");
    expect(printId(4)).toBe(4);

    function welcomePeople(value: string[] | string): string {
      if (Array.isArray(value)) {
        return `Hello, ${value.join(" and ")}`;
      }
      return `Welcome lone traveler ${value}`;
    }
    expect(welcomePeople(["Bob", "Sally", "Jerry"])).toBe(
      "Hello, Bob and Sally and Jerry"
    );
    expect(welcomePeople("Dick")).toBe("Welcome lone traveler Dick");
  });

  it("should demonstrate union where all types have method", () => {
    function getFirstThree(value: number[] | string): string | number[] {
      return value.slice(0, 3);
    }
    expect(getFirstThree([1, 2, 3, 4, 5, 6])).toStrictEqual([1, 2, 3]);
    expect(getFirstThree("Footastic")).toBe("Foo");
  });

  it("should demonstrate union types of literals", () => {
    // eslint-disable-next-line @typescript-eslint/prefer-as-const
    let x: "hello" = "hello"; // not very valuable
    expect(x).toBe("hello");
    x = "hello"; // allowed
    expect(x).toBe("hello");

    // combining literals into a union actually has some utility
    function printActionText(
      action: string,
      alignment: "left" | "right" | "center"
    ): string {
      return `${action} - ${alignment}`;
    }
    expect(printActionText("step", "left")).toBe("step - left");
  });

  it("should demonstrate literal inference", () => {
    function handleRequest(url: string, method: "GET" | "POST"): string {
      return `${url} ${method}`;
    }
    const request = { url: "example.com", method: "GET" };
    // The below 'as' type assertion is needed because ts sees method as a string type
    const result = handleRequest(request.url, request.method as "GET");
    expect(result).toBe("example.com GET");

    // conversely, you can use 'as const' to covert the entire object to be type literals
    const request2 = { url: "example.com", method: "GET" } as const;
    const result2 = handleRequest(request2.url, request2.method);
    expect(result2).toBe("example.com GET");
  });

  it("should demonstrate non-null assertion operator", () => {
    function liveDangerously(x?: number | null) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return x!.toFixed();
    }
    expect(liveDangerously(15)).toBe("15");
    // This is dangerous because you would only want to use ! when you know the
    // value can't be null or undefined. Not very good style; eslint hates it.
  });
});
