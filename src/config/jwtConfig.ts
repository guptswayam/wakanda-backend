import { registerAs } from "@nestjs/config";

export default registerAs("jwt", () => ({
  jwtSecret: process.env.SECRET_KEY,
  jwtExpresIn: process.env.JWT_EXPIRES_IN
}))