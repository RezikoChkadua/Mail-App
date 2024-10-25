export interface MulterFile {
  key: string;
  path?: string;
  mimetype: string;
  originalname: string;
  size: number;
}

export interface PaginationParams {
  skip?: number;
  page?: number;
  perPage?: number;
  limit?: number;
  direction?: "asc" | "desc";
  sort?: string;
}

export interface PaginationResponse<T> {
  data: T;
  page: number;
  total: number;
  perPage: number;
  direction?: "asc" | "desc";
  sort?: string;
}
