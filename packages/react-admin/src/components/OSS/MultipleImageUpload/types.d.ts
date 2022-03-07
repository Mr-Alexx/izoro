import type { UploadFile } from 'antd/es/upload/interface';
import type { UploadProps } from 'antd/lib/upload';
import type { UploadChangeParam } from 'antd/lib/upload/interface';
import type { ReactNode } from 'react';

export type FieldsName = { id: string; url: string };

export type Props = UploadProps & {
  /** @description 自定义出/入数据对象的键名，数据默认为string[]，定义此值后，数据为Record<string, any>[] */
  fieldsName?: FieldsName;
  /** @description 初始图片列表 */
  initialValue?: string[];
  /** @description 自定义上传文件夹名称 */
  directoryPath?: string;
  /** @description 是否在文件名上加入uid唯一标识 */
  showUid?: boolean;
  /**
   * @description // 限制大小，单位 MB
   * @default 2MB
   */
  limit?: number;
  // onChange: (params: UploadFile[]) => void;
  /** @description 数据 */
  value?: Record<string, any>[];
  /** @description 图片变更回调 */
  onChange?: (urls: string[] | Record<string, string | number>[], files?: UploadFile[]) => void;
  children?: ReactNode;
};

type SortableParams = {
  props: Omit<Props, 'onChange'>;
  fieldsName?: FieldsName;
  onPreview: (file: UploadFile) => void;
  onRemove: (file: UploadFile) => void | boolean;
};

export type SortableItemParams = {
  item: UploadFile;
  fieldsName?: FieldsName;
} & SortableParams;

export type SortableListParams = {
  onChange: (info: UploadChangeParam) => void;
  items: UploadFile[] | Record<string, any>[];
} & SortableParams;
