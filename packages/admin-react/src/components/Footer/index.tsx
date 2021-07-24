import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright={`2021-${new Date().getFullYear()} 潜所有`}
    links={[
      {
        key: 'test',
        title: '粤ICP备14056602号',
        href: 'http://www.beian.miit.gov.cn',
        blankTarget: true,
      },
    ]}
  />
);
