export type CommonResponseType<T = void> = {
  statusCode: number;
  message: string;
  data?: T;
};
