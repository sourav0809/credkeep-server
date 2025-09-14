import { Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import httpStatus from "http-status";
import { envConfig } from "../config/envConfig";
import { response } from "../utils/response";
import { errorMessages } from "../constant/errorMessages";
import { AuthenticatedRequest } from "../types/common";

interface JWTPayload {
  id: number;
  email: string;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      response(res, httpStatus.UNAUTHORIZED, errorMessages.Auth.TOKEN_MISSING);
      return;
    }

    jwt.verify(
      token,
      envConfig.secretKey.jwtSecretKey,
      (err: VerifyErrors | null, decoded: JWTPayload) => {
        if (err) {
          response(
            res,
            httpStatus.UNAUTHORIZED,
            errorMessages.Auth.INVALID_TOKEN
          );
          return;
        }

        req.user = decoded;
        next();
      }
    );
  } catch (error) {
    response(res, httpStatus.INTERNAL_SERVER_ERROR, "Authentication error");
  }
};
