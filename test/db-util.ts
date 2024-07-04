import { User } from "@prisma/client";
import { prismaClient } from "../src/app/database";

export class UserTest {
	static async delete() {
		await prismaClient.user.deleteMany({
			where: {
				name: "test",
			},
		});
	}
}
