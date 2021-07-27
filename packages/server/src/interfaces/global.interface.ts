export interface MultipartFile {
  toBuffer: () => Promise<Buffer>;
  file: NodeJS.ReadableStream;
  filepath: string;
  fieldname: string;
  filename: string;
  encoding: string;
  mimetype: string;
  name?: string;
  url?: string;
  size?: number;
  fields: import('fastify-multipart').MultipartFields;
}
