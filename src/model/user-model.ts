import { User } from "@prisma/client";

export type UserResponse = {
	id: number;
	name: string;
	email: string;
};

export type CreateUserRequest = {
	name: string;
	email: string;
	password: string;
};

export function toUserResponse(user: User): UserResponse {
	return {
		id: user.id,
		name: user.name,
		email: user.email,
	};
}
