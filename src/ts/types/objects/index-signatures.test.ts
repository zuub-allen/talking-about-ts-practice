/**
 * Sometimes you don't know all the names of a type's properties ahead of time,
 * but you do know the shape of the values. In those cases, you can use an
 * index signature to describe the types of possible values.
 *
 * Only some types are allowed for index signature properties: string, number,
 * symbol, template string patterns, and union types consisting of only these.
 */

describe("Index Signatures", () => {
  it("should allow indexed values matching index signature", () => {
    /**
     * Here we have a simple interface representing a string array, using an
     * index signature. This index signature states that when a StringArray is
     * indexed with a number, it will return a string. It allows for the
     * assignment of new values to indices, so long as the index is numeric and
     * the value is a string.
     */
    interface StringArray {
      [index: number]: string;
    }

    const myArray: StringArray = ["Bob", "Fred"];
    myArray[4] = "Alice";

    expect(myArray[0]).toBe("Bob");
    expect(myArray[1]).toBe("Fred");
    expect(myArray[2]).toBeUndefined();
    expect(myArray[3]).toBeUndefined();
    expect(myArray[4]).toBe("Alice");
    /**
     * Assignment of new strings to numbered indices works, because it matches
     * the index signature.
     *
     * If you tried to assign a non-string value (like a number) to a numeric
     * index, the type checker would give an error.
     */
    // myArray[5] = 5; // TS2322: Type 'number' is not assignable to type 'string'.
    /**
     * If you tried to assign a value to a string index, it would throw a runtime
     * error complaining of the index expression not being of type 'number'
     */
    // myArray["yo"] = "YO!"; // TS7015: Element implicitly has an 'any' type because index expression is not of type 'number'.
  });

  it("should force all other properties to match return type of string index signature", () => {
    /**
     * String index signatures are a powerful way to describe the "dictionary"
     * pattern, but they also enforce that all properties match their return
     * type. This is because a string index declares that obj.property is also
     * available as obj["property"].
     */
    interface NumberDictionary {
      [index: string]: number;
      length: number; // ok, length is a number
      // name: string; // TS2411: Property 'name' of type 'string' is not assignable to string index type 'number'.
    }
    /**
     * However, properties of different types are acceptable if the index
     * signature is a union of the property types.
     */
    interface NumberOrStringDictionary {
      [index: string]: number | string;
      length: number; // ok, length is a number
      name: string; // ok, name is a string
    }
    /**
     * Additionally, a non-string index signature will not force all other
     * properties to match its return type, the way a string index signature does.
     */
    interface Yo {
      [index: number]: number;
      name: string;
    }
    const yo: Yo = {
      0: 0,
      1: 100,
      name: "yo",
    };

    expect(yo.name).toBe("yo");
  });
});

/**
 * References
 * - https://www.typescriptlang.org/docs/handbook/2/objects.html#index-signatures
 */
