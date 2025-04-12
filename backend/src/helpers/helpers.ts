interface PaginateOptions {
  page?: number;
  limit?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total_items: number;
  total_pages: number;
  paginate: {
    total: number;
    per_page: number;
    current_page: number;
  };
}

export async function paginate<
  T,
  Args extends object,
  CountArgs extends object,
>(
  findMany: (args: Args & { skip: number; take: number }) => Promise<T[]>,
  count: (args?: CountArgs) => Promise<number>,
  _paginate: PaginateOptions,
  findManyOptions: Args,
  countOptions?: CountArgs,
): Promise<PaginatedResult<T>> {
  const page =
    _paginate.page && _paginate.page > 0 ? Number(_paginate.page) : 1;
  const limit =
    _paginate.limit && _paginate.limit > 0
      ? Math.min(Number(_paginate.limit), 500)
      : 10;
  const skip = (page - 1) * limit;

  const [data, total] = await Promise.all([
    findMany({ ...findManyOptions, skip, take: limit }),
    count(countOptions),
  ]);

  return {
    items: data,
    total_items: total,
    total_pages: Math.ceil(total / limit),
    paginate: {
      total,
      per_page: limit,
      current_page: page,
    },
  };
}
