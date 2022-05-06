declare namespace App {
  type ListRes<ListData = any[]> = {
    total: number;
    page?: number;
    limit?: number;
    list: ListData;
  };
}
