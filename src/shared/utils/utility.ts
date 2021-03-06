import jwt from "jsonwebtoken"
import { User } from "src/entities/user.entity"

export function generateToken(user: User) {
  const token = jwt.sign({id: user.id}, process.env.SECRET_KEY, {expiresIn: process.env.JWT_EXPIRES_IN})
  return token
}