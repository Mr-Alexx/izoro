export type FileInfo = {
  uid: string;
  name: string;
  status: string;
  url: string;
};

export type propsType = {
  list?: FileInfo[];
  handleChange?: any;
};
