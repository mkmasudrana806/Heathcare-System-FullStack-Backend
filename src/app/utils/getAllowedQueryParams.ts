/**
 * -------------------- get Allowed Query Params ---------------------
 * @param allowedFields array of allowed fields like ['name', 'email', 'page', 'limit']
 * @param payload payload data to update
 */
const getAllowedQueryParams = (
  allowedFields: string[],
  payload: Record<string, unknown>
) => {
  const updatedData: Record<string, unknown> = {};
  allowedFields.forEach((field) => {
    if (payload[field]) {
      updatedData[field] = payload[field];
    }
  });

  return updatedData;
};

export default getAllowedQueryParams;
