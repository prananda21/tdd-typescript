import { NextFunction, Request, Response } from "express";
import { UserService } from "../service/user-service";
import { CreateUserRequest } from "../model/user-model";

export class UserController {
	static async register(req: Request, res: Response, next: NextFunction) {
		try {
			const request: CreateUserRequest = req.body as CreateUserRequest;
			const response = await UserService.register(request);
			return res.status(201).json({
				data: response,
			});
		} catch (error) {
			next(error);
		}
	}
}
