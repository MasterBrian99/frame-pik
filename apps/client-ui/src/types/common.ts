export type CommonResponseType<T = void> = {
  statusCode: number;
  message: string;
  data?: T;
};

export type CommonResponsePaginationType<T = void> = {
  data: T[];
  meta: Meta;
};

export interface Meta {
  page: number;
  count: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
