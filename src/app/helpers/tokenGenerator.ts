import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET!;
const REFRESH_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET_REFRESH!;

export const generateAccessToken = (user: { id: string; email: string }) => {
  return jwt.sign({ id: user.id, email: user.email }, ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

export const generateRefreshToken = (user: { id: string }) => {
  return jwt.sign({ id: user.id }, REFRESH_SECRET, {
    expiresIn: "7d",
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, REFRESH_SECRET);
};
