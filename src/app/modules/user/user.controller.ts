import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserService } from './user.service';
// import { z } from 'zod'
const createUser: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req.body;
    const result = await UserService.createdUser(user);
    res.status(200).json({
      success: true,
      message: 'User created Successfully',
      data: result,
    });
  } catch (err) {
    next(err);
    // res.status(200).json({
    //   error: err,
    // })
  }
};

export const UserController = {
  createUser,
};
