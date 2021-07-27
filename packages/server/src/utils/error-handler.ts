import { errorLogger } from '@/logger/log4.logger';

export default function errorHandler(obj: { code: number; msg: string; url: string | undefined }) {
  const { code, msg, url } = obj;
  const err = {
    code,
    msg,
  };
  errorLogger.error(
    url,
    `
    ==========================================\n
    ${{ ...err }}
    ==========================================
  `,
  );
  return;
}
