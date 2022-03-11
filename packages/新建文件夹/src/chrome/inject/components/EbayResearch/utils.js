//获取url中的参数
export function getUrlParam() {
  const paramsStr = location.search.substr(1);
  const paramsArr = paramsStr.split("&");
  let queryObj = {};
  for (let i = 0; i < paramsArr.length; i++) {
    const [key, value] = paramsArr[i].split("=");
    queryObj[key] = value;
  }
  return queryObj;
}

// 构造查询参数
export function joinUrlParam(params) {
  let queryArr = [];
  for (let key in params) {
    queryArr.push(`${key}=${params[key]}`);
  }
  return queryArr.join("&");
}

export function formatDate(data) {
  const [d, m, y] = data.split("/");
  return `${y}-${m}-${d}`;
}
