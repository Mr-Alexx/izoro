import { useRouter } from 'next/router';
const Search = () => {
  const router = useRouter();
  const query = router.query;

  return <div>搜索关键词：{query.keyword}</div>;
};

export default Search;
