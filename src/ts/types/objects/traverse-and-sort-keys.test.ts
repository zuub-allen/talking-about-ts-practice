/**
 * All JavaScript objects consist of a collection of properties, each of which contains
 * a primitive value, object, or function. Prior to ES2015, property order in objects
 * was not guaranteed at all, as the ECMAScript Third Edition specification stated an
 * object is "an unordered collection of properties". Since ES2015, there is a certain
 * set of rules that object iteration follows, but it does not (always) follow the
 * insertion order.
 *
 * As such, the sorting of object keys can be achieved using a recursive function.
 *
 * The sortObjectKeys function below demonstrates the process. Highlights:
 * 1. a for...of loop is used to iterate over the object's key-value pairs
 * 2. an object's keys are sorted first, before inspection
 * 3. if the value of a property is an object, the function is called recursively
 * 4. found key/value pairs are added to a new array to preserve the insertion order
 * 5. the function returns an array of key-value pairs, sorted
 */

function sortObjectKeys(object: Record<string, any>): Record<string, any> {
  const sortedArrayOfKeyValuePairs: any[] = [];

  for (const [key, value] of Object.entries(object).sort()) {
    if (typeof object[key] === "object" && object[key] !== undefined) {
      sortedArrayOfKeyValuePairs.push({
        k: key,
        v: sortObjectKeys(object[key]),
      });
      continue;
    }
    sortedArrayOfKeyValuePairs.push({ k: key, v: object[key] });
  }

  return sortedArrayOfKeyValuePairs;
}

describe("Traversing Objects and Sorting Keys:", () => {
  it("should sort object keys recursively", () => {
    const objectWithUnorderedKeys = {
      z: "z",
      a: "a",
      j: { c: { x: "x", w: "w" }, b: "b" },
    };
    const objectWithOrderedKeys = {
      a: "a",
      j: { b: "b", c: { w: "w", x: "x" } },
      z: "z",
    };

    const x = sortObjectKeys(objectWithUnorderedKeys);
    const y = sortObjectKeys(objectWithOrderedKeys);

    expect(JSON.stringify(x)).toBe(
      '[{"k":"a","v":"a"},{"k":"j","v":[{"k":"b","v":"b"},{"k":"c","v":[{"k":"w","v":"w"},{"k":"x","v":"x"}]}]},{"k":"z","v":"z"}]'
    );

    expect(JSON.stringify(x)).toBe(JSON.stringify(y));
  });
});

/**
 * References:
 * - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
 * - https://stackoverflow.com/questions/5525795/does-javascript-guarantee-object-property-order
 * - https://www.ecma-international.org/wp-content/uploads/ECMA-262_3rd_edition_december_1999.pdf (section 4.3.3)
 */
