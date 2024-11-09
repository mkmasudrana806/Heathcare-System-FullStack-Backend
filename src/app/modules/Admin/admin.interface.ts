import { IPaginationOptions } from "../../interfaces/pagination";

export type IQueryParams = {
  searchTerm: string | undefined;
  name?: string | undefined;
  email?: string | undefined;
  contactNumber?: string | undefined;
} & IPaginationOptions;
