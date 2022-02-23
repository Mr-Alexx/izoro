import type { UploadFile } from 'antd/es/upload/interface';
import moment from 'moment';
import Viewer from 'viewerjs';
import 'viewerjs/dist/viewer.css';

// 生成简短唯一名称包
// see https://github.com/dylang/shortid
// @ts-ignore
import shortid from 'shortid';

type UploadOptions = {
  limit?: number; // 限制大小，单位 MB
  directoryPath?: string;
};

export const getBase64 = (file: File | Blob | undefined): Promise<string> => {
  if (!file) return Promise.reject(new Error('no file'));
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file!);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

export const imagePreview = async (file: UploadFile, callback: (params: { image: string }) => void) => {
  const newFile = file;
  if (!newFile.url && !newFile.preview) {
    newFile.preview = await getBase64(file.originFileObj);
  }
  const newPreviewImage: string = newFile.url || newFile.preview || '';
  callback({
    image: newPreviewImage,
  });
};

/**
 * @description viewerjs 动态展现图片
 * @param {string[]} list 图片路径数组
 * @param {number} initialViewIndex 初始显示第几张，可选参数，默认0
 */
export const createViewer = (list: string[], initialViewIndex?: number) => {
  if (!list || list.length === 0) {
    return;
  }
  const div = document.createElement('div');
  let html = '';
  list.forEach(image => {
    html += `<img src="${image}" />`;
  });
  div.innerHTML = html;

  const viewer = new Viewer(div, {
    initialViewIndex: initialViewIndex || 0,
    hidden() {
      viewer.destroy();
    },
  });
  viewer.show();
};

/**
 * @create 2021/09/08 10:40
 * @creator 潜
 * @description 图片上传统一过滤方法
 * 1. 限制类型
 * 2. 限制大小
 * 3. 有错误返回错误信息，没有则返回oss存储的路径
 * @param {File} file
 * @param {Object} options 配置
 * @return {Object}
 * - msg 错误信息
 * - path 存储路径
 */
export const imageUploadHandler = (file: File & { uid?: string; url?: string }, options?: UploadOptions) => {
  const { limit, directoryPath } = options || {};
  const limitSize = limit || 2;
  const isImg = /image\/jpeg|image\/jpg|image\/png|image\/webp|image\/gif/.test(file.type);
  const isInLimitSize = file.size / 1024 / 1024 <= limitSize;
  let warnMsg = '';
  if (!isImg) {
    warnMsg = '只能上传图片！';
  } else if (!isInLimitSize) {
    warnMsg = `图片大小限制在 ${limitSize}MB 以内!`;
  }

  if (warnMsg) {
    return {
      msg: warnMsg,
    };
  }

  // 填写Object完整路径。Object完整路径中不能包含Bucket名称。
  // 您可以通过自定义文件名（例如exampleobject.txt）或文件完整路径（例如exampledir/exampleobject.txt）的形式实现将数据上传到当前Bucket或Bucket中的指定目录。
  // data对象可以自定义为file对象、Blob数据或者OSS Buffer。

  // 文件夹名称默认为：当前日期/images/，如 2021-8-9/images/
  // 如果是自定义文件夹，优先取自定义文件夹名称，如：图片需求单id/sku编码/
  const newDirectory = directoryPath || `${moment().format('YYYY-MM-DD')}/images/`;
  const fileType = file.type.split('/')[1];

  // 文件名称默认为：随机生成的短id-当前时间毫秒数.后缀，如：测试1-1628488659665.jpg
  // const fileName = `${shortid.generate()}-${new Date().getTime()}.${fileType}`;
  const fileName = `${shortid.generate()}.${fileType}`;

  // 关于oss路径在浏览器直接打开时不是预览而是下载的问题，绑定自由域名就可以解决
  // https://www.cnblogs.com/xiaobingch/p/14346067.html
  return {
    path: `${newDirectory}${fileName}`,
  };
};

/**
 * @create 2021/09/08 16:40
 * @creator 潜
 * @description 文件上传统一过滤方法
 * 1. 限制大小
 * 2. 有错误返回错误信息，没有则返回oss存储的路径
 * @param {File} file
 * @param {Object} options 配置
 * @return {Object}
 * - msg 错误信息
 * - path 存储路径
 */
export const fileUploadHandler = (file: File & { uid?: string; url?: string }, options?: UploadOptions) => {
  const { limit, directoryPath } = options || {};
  const limitSize = limit || 20;
  const isInLimitSize = file.size / 1024 / 1024 <= limitSize;
  if (!isInLimitSize) {
    return {
      msg: `文件大小限制在 ${limitSize}MB 以内!`,
    };
  }

  const newDirectory = directoryPath || `${moment().format('YYYY-MM-DD')}/files/`;
  const fileType = file.type.split('/')[1];

  const fileName = `${shortid.generate()}.${fileType}`;

  // 关于oss路径在浏览器直接打开时不是预览而是下载的问题，绑定自由域名就可以解决
  // https://www.cnblogs.com/xiaobingch/p/14346067.html
  return {
    path: `${newDirectory}${fileName}`,
  };
};
