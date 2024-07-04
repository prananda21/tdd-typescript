import supertest from "supertest";
import { UserTest } from "./db-util";
import { web } from "../src/app/web";
import { logger } from "../src/app/logger";

/**
 * Code below is for testing on API level using supertest package.
 * for testing on API level no need to running the server. supertest package will test the API even the server is not running.
 */

describe("POST /api/users", () => {
	afterEach(async () => {
		await UserTest.delete();
	});

	it("should accept register new user", async () => {
		const response = await supertest(web)
			.post("/api/users")
			.send({ name: "test", email: "test@example.com", password: "test" });

		logger.debug(response.body);
		expect(response.status).toEqual(201);
		expect(response.body.data.id).toBeDefined();
		expect(response.body.data.name).toBeDefined();
		expect(response.body.data.email).toBeDefined();
	});
	it("should reject register new user if request invalid", async () => {
		const response = await supertest(web)
			.post("/api/users")
			.send({ name: "", email: "com", password: "" });

		logger.debug(response.body);
		expect(response.status).toEqual(400);
		expect(response.body.errors).toBeDefined();
	});
});
