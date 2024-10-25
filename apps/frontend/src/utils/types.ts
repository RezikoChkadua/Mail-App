export interface PaginationResponse<T> {
  data: T;
  page: number;
  total: number;
  perPage: number;
}

export interface PaginationParams {
  page?: number;
  total?: number;
  perPage?: number;
  sort?: string;
  direction?: string;
}
