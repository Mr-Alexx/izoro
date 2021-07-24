type DataSourceType = {
  id: React.Key;
  title?: string;
  value?: number;
};

type PropertyType = {
  id: React.Key;
  sku: string;
  upc?: string;
  ean?: string;
  keyword: string;
};

type PropertyType2 = {
  id: React.Key;
  avatar?: string;
  sku: string;
  inventory?: number;
  price?: string;
  upc?: string;
  ean?: string;
  keyword: string;
};

export type propsType = {
  productList?: any[];
  handleDelete?: any;
};
