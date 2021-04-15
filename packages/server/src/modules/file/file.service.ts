/** @format */

import { MultipartFile } from '@/interfaces/global.interface'

export class FileService {
  upload(file: MultipartFile): Promise<{ id: string; url: string }> {
    // console.log(file)
    return Promise.resolve({ id: 'x', url: 'x' })
  }
}
