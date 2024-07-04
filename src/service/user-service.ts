import { prismaClient } from "../app/database";
import { ResponseError } from "../error/response-error";
import {
	CreateUserRequest,
	toUserResponse,
	UserResponse,
} from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { Validation } from "../validation/validation";

export class UserService {
	static async register(request: CreateUserRequest): Promise<UserResponse> {
		const registerRequest = Validation.validate(
			UserValidation.REGISTER,
			request,
		);

		const userWithSameUsername = await prismaClient.user.count({
			where: {
				name: registerRequest.name,
			},
		});

		if (userWithSameUsername != 0) {
			throw new ResponseError(400, "username already exists");
		}

		const user = await prismaClient.user.create({
			data: registerRequest,
		});

		return toUserResponse(user);
	}
}
