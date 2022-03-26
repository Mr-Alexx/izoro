import Wrapper from '@/components/Wrapper';
import { GetServerSidePropsContext } from 'next';
import { useEffect, useMemo } from 'react';
import Link from 'next/link';

type Item = {
  id: number;
  title: string;
  publish_at: string;
};

const list: Item[] = new Array(20).fill(0).map((item, index) => {
  return {
    id: index + 1,
    title: `This is a test title - ${index + 1}`,
    publish_at: `${index < 12 ? 2022 : 2021}-${index < 12 ? index + 1 : index - 11}-01 00:00:00`,
  };
});

export default function Archives({ initialData }) {
  /** 列表数据格式化成 {[年]: { [月]: [列表] }} */
  const data = useMemo(() => {
    const res = {};
    if (!initialData || initialData.length === 0) {
      return res;
    }

    let year: string;
    let month: string;
    initialData.forEach((item: Item) => {
      year = item.publish_at.substring(0, 4) + '年';
      if (!res[year]) {
        res[year] = {};
      }
      month = item.publish_at.split(' ')[0].split('-')[1] + '月';
      if (!res[year][month]) {
        res[year][month] = [];
      }
      res[year][month].push(item);
    });
    return res;
  }, [initialData]);

  useEffect(() => {
    console.log(list, data);
  }, []);

  return (
    <Wrapper>
      {Object.keys(data).map(yearKey => {
        return (
          <div key={yearKey}>
            {/* 年份 */}
            <div>{yearKey}</div>

            {data[yearKey] &&
              Object.keys(data[yearKey]).map(monthKey => {
                return (
                  <div key={monthKey}>
                    {/* 月份 */}
                    <div>{monthKey}</div>

                    {data[yearKey][monthKey] &&
                      data[yearKey][monthKey].length > 0 &&
                      data[yearKey][monthKey].map((item: Item) => {
                        return (
                          <div key={item.id}>
                            <span>{item.publish_at}</span>
                            <Link href={`/post/${item.id}`}>
                              <a target="_blank">{item.title}</a>
                            </Link>
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        );
      })}
    </Wrapper>
  );
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    return {
      props: {
        initialData: list,
      },
    };
  } catch (err) {
    // console.error(12, err);
  }
};
