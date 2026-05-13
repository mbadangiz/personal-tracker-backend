export interface generalResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
