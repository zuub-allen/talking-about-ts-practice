/**
 * https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html
 */

describe("TypeScript for JavaScript Programmers", () => {
  it("should demonstrate types by inference", () => {
    const helloWorld = "Hello world";
    expect(typeof helloWorld).toBe("string");

    const user = {
      name: "Guy",
      id: 0,
    };
    expect(typeof user.name).toBe("string");
    expect(typeof user.id).toBe("number");
  });

  it("should describe object shape using interface", () => {
    interface User {
      name: string;
      id: number;
    }
    const user: User = {
      name: "Bob",
      id: 1,
    };
    expect(user.name).toBe("Bob");
    expect(user.id).toBe(1);
    expect(typeof user).toBe("object");
  });

  it("should demonstrate using interface declaration with classes", () => {
    interface User {
      name: string;
      id: number;
    }
    class UserAccount {
      name: string;
      id: number;

      constructor(name: string, id: number) {
        this.name = name;
        this.id = id;
      }
    }

    const user: User = new UserAccount("Jill", 2);

    expect(user.name).toBe("Jill");
    expect(user.id).toBe(2);
    expect(typeof user).toBe("object");
    expect(user instanceof UserAccount).toBe(true);
  });

  it("should demonstrate union types", () => {
    type MyBoolean = true | false;
    const myBoolean: MyBoolean = true;
    expect(typeof myBoolean).toBe("boolean");

    type Foo = MyBoolean | string;
    const foo1 = "yo";
    expect(typeof foo1).toBe("string");
    const foo2 = false;
    expect(typeof foo2).toBe("boolean");

    type WindowStates = "open" | "closed" | "minimized";
    const windowState = "closed";
    expect(typeof windowState).toBe("string");

    type PositiveOddNumbersUnderTen = 1 | 3 | 5 | 7 | 9;
    const oddNumber = 9;
    expect(typeof oddNumber).toBe("number");

    function getLength(value: string | string[]) {
      return value.length;
    }
    expect(typeof getLength).toBe("function");
    expect(getLength("string")).toBe(6);
    expect(getLength(["foo", "bar"])).toBe(2);
  });

  it("should demonstrate generics", () => {
    type StringArray = Array<string>;
    const stringArray: StringArray = ["foo", "bar"];
    expect(typeof stringArray).toBe("object");

    type ObjectWithNameArray = Array<{ name: string }>;
    const objectWithNameArray: ObjectWithNameArray = [
      { name: "Bob" },
      { name: "Sally" },
    ];
    expect(typeof objectWithNameArray).toBe("object");

    interface Backpack<T> {
      thing: T;
    }
    const backpack: Backpack<string> = { thing: "pencil" };
    expect(typeof backpack.thing).toBe("string");

    interface StrangeThing<T> {
      thing: T;
    }
    const strangeThing: StrangeThing<"toy" | 7 | false> = { thing: 7 };
    expect(typeof strangeThing.thing).toBe("number");
  });

  it("should demonstrate structural typing (two objects with same shape are same type)", () => {
    interface Point {
      x: number;
      y: number;
    }
    function logPoint(point: Point): string {
      return `${point.x}, ${point.y}`;
    }
    const point = { x: 12, y: 26 }; // not declared to be a Point...
    const loggedPoint = logPoint(point); // yet it can be passed to the function (same shape)
    expect(loggedPoint).toBe("12, 26");

    const point3 = { x: 12, y: 26, z: 100 };
    const loggedPoint3 = logPoint(point3); // works even with extra value, as all needed values are present
    expect(loggedPoint3).toBe("12, 26");

    // There is no difference between how classes and objects conform to shapes
    class VirtualPoint {
      x: number;
      y: number;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
      }
    }
    const newVirtualPoint = new VirtualPoint(13, 56);
    const loggedNewVirtualPoint = logPoint(newVirtualPoint);
    expect(loggedNewVirtualPoint).toBe("13, 56");

    // If the object or class has all the required properties, TypeScript will say they match, regardless of
    // the implementation details.
  });
});
