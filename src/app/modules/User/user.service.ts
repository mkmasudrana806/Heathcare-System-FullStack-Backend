import { PrismaClient, UserRole } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

// ------------ create admin into db ---------------
const createAdminIntoDB = async (payload: any) => {
  // hash the password
  const hashedPassword = await bcrypt.hash(payload?.password, 10);
  // create user
  const userData = {
    email: payload?.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    // create user
    await transactionClient.user.create({
      data: userData,
    });

    // create admin
    const createdAdminData = await transactionClient.admin.create({
      data: payload?.admin,
    });

    return createdAdminData;
  });

  return result;
};

// export all services
export const UserServices = {
  createAdminIntoDB,
};
