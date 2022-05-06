import { useRouter } from 'next/router';
type T = Record<string, any>;

const useQuery = () => {
  const router = useRouter();
  return router.query as T;
};

export default useQuery;
