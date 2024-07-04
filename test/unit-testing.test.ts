import { getName, sumNumber } from "../src/number";

describe("Test file test.ts", () => {
	it("should have value of sum function", () => {
		expect(sumNumber(1, 1)).toEqual(2);
	});

	it("should ", () => {
		expect(getName("Yoga")).toBe("Hello Yoga");
	});
});
