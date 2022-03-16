/**
 * @description 获取多少分/时/天/月/年 前
 * @param {string | number | Date} date
 * @return {string}
 */
export const formatTime = (date: string | number | Date): string => {
  if (!date) {
    return '-';
  }
  let result: string = '';
  const currentTime = new Date().getTime();
  const targetTime = new Date(date).getTime();

  // 当前时间与目标时间间隔，转化为秒
  const interval = (currentTime - targetTime) / 1000;
  if (interval < 60) {
    result = '刚刚';
  } else if (interval < 3600) {
    result = `${Math.ceil(interval / 60)}分前`;
  } else if (interval < 3600 * 24) {
    result = `${Math.ceil(interval / 3600)}时前`;
  } else if (interval < 3600 * 24 * 30) {
    result = `${Math.ceil(interval / 3600 / 24)}天前`;
  } else if (interval < 3600 * 24 * 365) {
    result = `${Math.ceil(interval / 3600 / 24 / 30)}月前`;
  } else {
    result = `${Math.ceil(interval / 3600 / 24 / 365)}年前`;
  }

  return result;
};
