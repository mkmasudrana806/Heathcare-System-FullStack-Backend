import { Prisma, PrismaClient, UserRole } from "@prisma/client";
import {
  ADMIN_ALLOWED_QUERY_PARAMS,
  ADMIN_SEARCHABLE_FIELDS,
} from "./admin.constant";
import excludeFieldsForFilter from "../../utils/excludeFieldsForFilter";
import getAllowedQueryParams from "../../utils/getAllowedQueryParams";
import { paginationHelper } from "../../utils/paginationHelper";
const prisma = new PrismaClient();

// ------------ get all admin ---------------
const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  // filter query used for exact matching
  const filterQuery = excludeFieldsForFilter({ ...query });
  // pagination
  const { skip, limit, sortBy, sortOrder } =
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

  const whereCondtions: Prisma.AdminWhereInput = { AND: andConditions };

  const result = await prisma.admin.findMany({
    where: whereCondtions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  return result;
};

// export all services
export const AdminServices = {
  getAllAdminFromDB,
};
