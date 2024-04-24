export type DefaultResponse<T = void> = {
  success: boolean;
  message?: string;
  data?: T;
};
