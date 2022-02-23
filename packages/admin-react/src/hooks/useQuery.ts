/**
 * @description 解决umi useLocation没有query类型的问题
 */
import { useLocation } from 'umi';
import type { Location } from 'umi';

export const useQuery = <T extends Record<string, string>>() => {
  const location = useLocation() as Location & { query: T };
  return location.query;
};

export const useLocationWithQuery = <T extends Record<string, string>>() => {
  const location = useLocation() as Location & { query: T };
  return location;
};
