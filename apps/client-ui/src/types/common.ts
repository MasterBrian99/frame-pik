export type ErrorResponseT = {
  message: string;
  error: string;
  statusCode: number;
};

export type CommonResponseT<Data> = {
  statusCode: number;
  message: string;
  data: Data;
};
