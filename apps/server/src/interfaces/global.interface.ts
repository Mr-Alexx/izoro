import { MultipartFile as FastifyMultipartFile } from '@fastify/multipart';

export interface MultipartFile extends FastifyMultipartFile {
  name?: string;
  url?: string;
  size?: number;
}
