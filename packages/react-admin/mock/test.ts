import { Request, Response } from 'express';

interface Item {
  id: number;
  name: string;
  hidden: boolean;
}

let columns: Item[] = [];
for (let i = 0; i < 30; i++) {
  columns.push({
    id: i,
    name: '列' + (i + 1),
    hidden: i % 3 === 0,
  });
}

const getColumns = (req: Request, res: Response) => {
  res.json({
    code: 0,
    msg: '成功',
    response: columns,
  });
};

const saveColumns = (req: Request, res: Response) => {
  const data: Item[] = req.body;
  columns = data;
  res.json({
    code: 0,
    msg: '成功',
    response: null,
  });
};

export default {
  'GET /api/test/columns': getColumns,
  'POST /api/test/save-columns': saveColumns,
};
