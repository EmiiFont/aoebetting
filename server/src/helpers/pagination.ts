export class Pagination<T> {
  data: T[];
  page: number;
  limit: number;
  totalCount: number;
}
