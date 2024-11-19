import path from "path";
import dotenv from "dotenv";
dotenv.config({
  path: path.join(process.cwd(), ".env"),
});

export default {
  port: process.env.PORT,
  node_env: process.env.NODE_ENV,
  // jwt
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  // reset password
  jwt_reset_password_secret: process.env.RESET_PASSWORD_SECRET,
  jwt_reset_password_expires_in: process.env.RESET_PASSWORD_EXPIRES_IN,
  reset_password_ui_link: process.env.RESET_PASSWORD_UI_LINK,
  // bcrypt
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  // node mailer
  nodemailer_email: process.env.NODEMAILER_EMAIL,
  nodemailer_app_password: process.env.NODEMAILER_APP_PASSWORD,
};
