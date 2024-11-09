/**
 *
 * @param query query object
 * @returns return only query object that is used for filtering
 */
const excludeFieldsForFilter = (query: Record<string, unknown>) => {
  const excludesFields = [
    "page",
    "limit",
    "skip",
    "sortBy",
    "sortOrder",
    "searchTerm",
  ];
  excludesFields.forEach((field) => delete query[field]);

  return query;
};

export default excludeFieldsForFilter;
