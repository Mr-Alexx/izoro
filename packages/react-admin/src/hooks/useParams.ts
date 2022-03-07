/**
 * @description 解决umi useParams 类型检测问题
 */
import { useParams as useUmiParams } from 'umi';

const useParams = <T extends Record<string, any>>() => {
  const params = useUmiParams() as T;
  return params;
};

export default useParams;
