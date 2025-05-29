import { Request } from "express";
import { Paginated } from "../../types/prisma";

function createPagination<T>({
  items = [],
  page = 0,
  count = 0,
  baseUrl = "",
  pageSize = 10,
}: {
  items: T[];
  page: number;
  count: number;
  pageSize: number;
  baseUrl: string;
}): Paginated<T> {
  const nextPage =
    items.length == pageSize && page * pageSize != count
      ? `${baseUrl}?page=${page + 1}&pageSize=${pageSize}`
      : null;
  const previousPage =
    page - 1 > 0 ? `${baseUrl}?page=${page}&pageSize=${pageSize}` : null;

  return {
    totalCount: count,
    nextPage,
    previousPage,
    results: items,
  };
}

export default createPagination;
export function paginationVars(req: Request) {
  const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
  const page = req.query.page ? Number(req.query.page) : 1;
  const baseUrl = req.baseUrl + req.path;
  const skip = (page - 1) * pageSize;
  return { pageSize, page, baseUrl, skip };
}
// filepath: d:\decor app\server\src\v1\utils\createPagination.ts
