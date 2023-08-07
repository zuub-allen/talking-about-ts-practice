/**
 * Type signatures can be written for functions. This helps code readers to
 * narrow types, increases readability, and more.
 *
 * A type signature is like a blueprint for any given set of code, as it
 * tells the compiler what things are. Well-typed programs are more reliable,
 * and they run faster. They also give the compiler a lot of additional
 * information which helps us identify errors faster.
 */

describe("Function Type Signatures", () => {
  it("should accept typed argument and return typed return value", () => {
    /**
     * The most basic way to type a function is to declare the arguments
     * and the return.
     */
    const returnNumberAsString = (arg: number): string => {
      return arg.toString();
    };

    const actual = returnNumberAsString(99);

    expect(actual).toBe("99");
    /**
     * Anything inside the function body is typed the same as everything
     * else in typescript. The function body can be treated as if it is its
     * own standalone program.
     *
     * Because of TypeScript's inference, it works almost the same if you don't
     * always type the return statement.
     */
    const addTwoNumbers = (a: number, b: number) => {
      return a + b;
    };

    const actual2 = addTwoNumbers(99, 27);

    expect(actual2).toBe(126);
    /**
     * In this example, we have not explicitly typed the return value of the
     * function, but since both args are explicitly numbers, the compiler is smart
     * enough to know it cannot be anything else.
     */
  });

  it("should use type alias for signature", () => {
    /**
     * We can also separate the type signature from the function itself.
     */
    type add = (a: number, b: number) => number;
    const addTwoNumbers: add = (a, b) => a + b;

    const actual = addTwoNumbers(99, 27);

    expect(actual).toBe(126);
    /**
     * In this example, we have strictly separated our type-level and value-level
     * code, but this function works the same and is just as well-typed as the
     * other functions.
     */
    type fullSignatureAdd = {
      (a: number, b: number): number;
    };
    const addTwoNumbers2: fullSignatureAdd = (a, b) => a + b;

    const actual2 = addTwoNumbers2(99, 27);

    expect(actual2).toBe(126);
    /**
     * The previous examples are actually using shorthand for type signatures,
     * which is the most common way to write them. This example shows the full
     * signature syntax, but it is compiled in the same way.
     */
  });

  it("should use contextual typing", () => {
    /**
     * The inference we get from the compiler provides more power to us than
     * cleaner syntax. We can write type signatures for functions, and then call
     * them before they're declared.
     */
    function timesTwo(func: (index: number) => string, n: number): string[] {
      const results: string[] = [];
      for (let i = 0; i < n; i++) {
        results.push(func(i * 2));
      }
      return results;
    }
    /**
     * Here, we've told the compiler there is some function "func" with a
     * particular type signature, which we want to call n times. This may seem
     * strange because we have only provided a signature rather than a declaration
     * body like we would normally. Of course, "func" won't actually be called
     * until the parent function "timesTwo" is called. We can declare "func" inline
     * when we are ready.
     */
    // timesTwo((n) => console.log(n), 8);
    const actual = timesTwo((i) => `${i / 2} times two is ${i}`, 8);

    expect(actual).toStrictEqual([
      "0 times two is 0",
      "1 times two is 2",
      "2 times two is 4",
      "3 times two is 6",
      "4 times two is 8",
      "5 times two is 10",
      "6 times two is 12",
      "7 times two is 14",
    ]);
    /**
     * When we call "timesTwo" it is smart enough to recognize our inline function
     * as "func" and it assumes the type signature we declared. A good way to read
     * this is that we have a function that will multiply every iteration by 2
     * ("timesTwo") and will do something ("func") with that result in this
     * particular way, but we don't know exactly what "func" looks like until
     * "timesTwo" is called.
     */
  });

  it("should use generic type signature for map behavior", () => {
    /**
     * Generics are commonly used for behavior that needs to be done to something
     * even though we don't know what that thing looks like. They are most commonly
     * used in built-in functions for dynamic languages. For example, in JavaScript,
     * there is the map function.
     */
    const NUMBERS = [1, 2, 3, 4, 5];
    function myMap<TInput, TOutput>(
      input: TInput[],
      f: (item: TInput) => TOutput
    ): TOutput[] {
      const output: TOutput[] = [];
      for (let i = 0; i < input.length; i++) {
        output[i] = f(input[i]);
      }
      return output;
    }
    /**
     * We can type this function by telling the compiler we will pass in some
     * generic array and the output will be a different generic array. The only
     * thing we know for certain about these types is that the returned array can
     * be a different type than the input array (though, in this example, they
     * both are number).
     */
    const actual = myMap(NUMBERS, (item) => item * 2);

    expect(actual).toStrictEqual([2, 4, 6, 8, 10]);
  });

  it("should use generic type signature for filter behavior", () => {
    /**
     * Similarly, with JavaScript's filter function, we're passing in some generic
     * array and removing all the values that fail some criteria before returning
     * an array. A key difference with filter is that we are not actually changing
     * the elements inside the input array, therefore the output array has the same
     * type.
     */
    const NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];

    function filter<TInput>(
      input: TInput[],
      f: (item: TInput) => boolean
    ): TInput[] {
      const output: TInput[] = [];
      for (let i = 0; i < input.length; i++) {
        if (f(input[i])) {
          output.push(input[i]);
        }
      }
      return output;
    }

    const actual = filter(NUMBERS, (item) => item % 2 === 0);

    expect(actual).toStrictEqual([2, 4, 6, 8]);
  });

  it("should put an upper bound on generic type signature for join behavior", () => {
    /**
     * We can also put an upper bound on our generic types. For example, say we
     * want a generic function that will work exclusively on arrays of strings
     * or numbers. This is called putting an upper bound on our generics.
     */
    function join<T extends number | string>(
      input: T[],
      separator: string
    ): string {
      let output = "";
      for (let i = 0; i < input.length; i++) {
        if (i === input.length - 1) {
          output += input[i];
          break;
        }
        output += `${input[i]}${separator}`;
      }
      return output;
    }

    const actual = join([1, 2, 3, 4, "5"], " ");

    expect(actual).toBe("1 2 3 4 5");
    /**
     * This example represents a generic join function, except that it only works
     * on arrays of strings or numbers. Removing one of these two types from the
     * generic type signature would further narrow the upper bound.
     */
  });
});

/**
 * References:
 * - https://levelup.gitconnected.com/typescript-type-signatures-for-any-function-c21a22596d1c
 */
