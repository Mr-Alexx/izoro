type GoodsDetailType = {
  id: React.Key;
  name: string;
  value1: string;
  value2: string;
};

type TransportMode = {
  id: React.Key;
  domestic_transport_mode: string;
  freight: string;
  charge_per_piece: string;
};

type GoodsDetailType2 = {
  id: React.Key;
  avatar?: string;
  sku?: string;
  set_of?: string;
  upc?: string;
  ean?: string;
  sales_num?: number;
  keyword?: string;
};
