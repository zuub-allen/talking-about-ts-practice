describe("FizzBuzz", () => {
  it("should create number range", () => {
    const maximumNumber = 5;
    const range = [...Array(maximumNumber + 1).keys()].slice(1);
    expect(range).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it("should FizzBuzz", () => {
    const maximumNumber = 20;
    const range = [...Array(maximumNumber + 1).keys()].slice(1);
    // const range = Array.from(Array(maximumNumber + 1).keys()).slice(1); // same result

    let divisibleBy3: boolean;
    let divisibleBy5: boolean;
    let output: string;
    const results: string[] = [];

    range.forEach((n) => {
      output = "";
      divisibleBy3 = !(n % 3);
      divisibleBy5 = !(n % 5);

      if (divisibleBy3) {
        output += "Fizz";
      }
      if (divisibleBy5) {
        output += "Buzz";
      }
      if (!(divisibleBy3 || divisibleBy5)) {
        output = n.toString();
      }

      results.push(output);
    });

    expect(results).toStrictEqual([
      "1",
      "2",
      "Fizz",
      "4",
      "Buzz",
      "Fizz",
      "7",
      "8",
      "Fizz",
      "Buzz",
      "11",
      "Fizz",
      "13",
      "14",
      "FizzBuzz",
      "16",
      "17",
      "Fizz",
      "19",
      "Buzz",
    ]);
  });
});
