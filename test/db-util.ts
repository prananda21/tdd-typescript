import { User } from "@prisma/client";
import { prismaClient } from "../src/app/database";

/**
 * This function is responsible for deleting all data users from database
 */

export class UserTest {
	static async delete() {
		await prismaClient.user.deleteMany({
			where: {
				name: "test",
			},
		});
	}

	static async add() {
		await prismaClient.user.create({
			data: {
				name: "test",
				email: "test@example.com",
				password: "test",
			},
		});
	}
}
