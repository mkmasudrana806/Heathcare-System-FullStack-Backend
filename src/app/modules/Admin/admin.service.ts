import { Admin, Prisma, PrismaClient, UserStatus } from "@prisma/client";
import { ADMIN_SEARCHABLE_FIELDS } from "./admin.constant";
import excludeFieldsForFilter from "../../utils/excludeFieldsForFilter";
import { paginationHelper } from "../../utils/paginationHelper";
const prisma = new PrismaClient();


// ------------ get all admin ---------------
const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  // filter query used for exact matching
  const filterQuery = excludeFieldsForFilter({ ...query });
  // pagination
  const { page, skip, limit, sortBy, sortOrder } =
    paginationHelper.calculatePagination({
      page: query?.page as number,
      limit: query?.limit as number,
      sortBy: query?.sortBy as string,
      sortOrder: query?.sortOrder as string,
    });

  // query conditions array
  const andConditions: Prisma.AdminWhereInput[] = [];

  // search
  if (query?.searchTerm) {
    andConditions.push({
      // partial search
      OR: ADMIN_SEARCHABLE_FIELDS.map((field) => ({
        [field]: {
          contains: query?.searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }

  // filter ( exact matching )
  if (Object.keys(filterQuery).length > 0) {
    andConditions.push({
      AND: Object.keys(filterQuery).map((key) => ({
        [key]: {
          equals: filterQuery[key],
        },
      })),
    });
  }

  // is deleted false admin only returns
  andConditions.push({
    isDeleted: false,
  });
  const whereCondtions: Prisma.AdminWhereInput = { AND: andConditions };

  // result
  const result = await prisma.admin.findMany({
    where: whereCondtions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const totalCount = await prisma.admin.count({
    where: whereCondtions,
  });

  return {
    meta: {
      page,
      limit,
      total: totalCount,
    },
    data: result,
  };
};

// ------------ get admin by id ---------------
const getAdminByIdFromDB = async (id: string): Promise<Admin | null> => {
  // result
  const result = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });

  return result;
};

// ------------ update admin ---------------
const updateAdminIntoDB = async (
  id: string,
  payload: Partial<Admin>
): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.admin.update({
    where: {
      id,
      isDeleted: false,
    },
    data: payload,
  });

  return result;
};

// ------------ delete admin ---------------
const deleteAdminFromDB = async (id: string): Promise<Admin | null> => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    // delete admin
    const adminDeleteData = await transactionClient.admin.delete({
      where: {
        id,
      },
    });

    await transactionClient.user.delete({
      where: {
        email: adminDeleteData?.email,
      },
    });

    return adminDeleteData;
  });

  return result;
};

// ------------ soft delete admin ---------------
const softDeleteAdminFromDB = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    // delete admin
    const adminDeleteData = await transactionClient.admin.update({
      where: {
        id,
        isDeleted: false,
      },
      data: {
        isDeleted: true,
      },
    });

    await transactionClient.user.update({
      where: {
        email: adminDeleteData?.email,
      },
      data: {
        status: UserStatus.DELETED,
      },
    });

    return adminDeleteData;
  });

  return result;
};

// export all services
export const AdminServices = {
  getAllAdminFromDB,
  getAdminByIdFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
  softDeleteAdminFromDB,
};
