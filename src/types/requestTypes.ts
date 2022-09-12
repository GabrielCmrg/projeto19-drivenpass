export type HeaderType = {
  authentication: string;
  [key: string]: any;
};
export type LocalsType<type = any> = {
  reqBody: type;
  userId: number;
};
