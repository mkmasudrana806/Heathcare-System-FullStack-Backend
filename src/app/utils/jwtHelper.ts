import jwt, { JwtPayload } from "jsonwebtoken";

// ------------------ generate token ------------------------
const generateToken = (payload: any, secret: string, expiresIn: string) => {
  const token = jwt.sign(payload, payload, {
    algorithm: "HS256",
    expiresIn,
  });
  return token;
};

const verifyToken = (token: any, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelper = {
  generateToken,
  verifyToken,
};
