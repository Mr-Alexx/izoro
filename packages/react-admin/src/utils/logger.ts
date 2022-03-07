const isDev = process.env.NODE_ENV === 'production';

export const infoLogger = (...args: any[]) => {
  if (isDev) {
    return;
  }
  const [info, ...rest] = args;
  console.log(`[${info}]:`, ...rest);
};

export const errorLogger = (...args: any[]) => {
  if (isDev) {
    return;
  }
  const [info, ...rest] = args;
  console.error(`[${info}]:`, ...rest);
};
