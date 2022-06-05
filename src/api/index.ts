export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  data: T;
}
