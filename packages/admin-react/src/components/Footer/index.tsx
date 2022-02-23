import { DefaultFooter } from '@ant-design/pro-layout';

export default () => (
  <DefaultFooter
    copyright={`2014-${new Date().getFullYear()} 广东天拓海汇科技有限公司所有`}
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
