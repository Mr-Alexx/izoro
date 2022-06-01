import Editor from '@/components/Editor';
import MarkdownEditor from '@/components/Editor/MarkdownEditor';
import useParams from '@/hooks/useParams';
import { getArticle } from '@/services/article';
import ProCard from '@ant-design/pro-card';
import ProForm, {
  ProFormDependency,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { Col, Row } from 'antd';
import { debounce } from 'lodash'; // '@/utils/throttle-debounce';
import { useState } from 'react';
import styles from './index.less';
// import { Viewer } from '@bytemd/react';

const ArticleEditPage = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<string>('basic');

  /* 存草稿 */
  const saveDraft = debounce(formVal => {
    console.log('草稿', formVal);
  }, 300);

  return (
    <ProForm
      layout="horizontal"
      onValuesChange={saveDraft}
      request={async () => {
        if (!id) {
          return {};
        }
        try {
          const data = await getArticle(id);
          console.log(data);
          return {
            ...data,
            markdown: data.markdown?.replace(/↵/gi, '\n'),
          };
        } catch (err) {
          console.error(err);
          return {};
        }
      }}
      onFinish={async formVal => {
        console.log('d', formVal);
        return false;
      }}
      labelCol={{ flex: '60px' }}
      wrapperCol={{ flex: '1' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <ProCard
            tabs={{
              tabPosition: 'left',
              activeKey: activeTab,
              onChange: key => {
                setActiveTab(key);
              },
            }}>
            <ProCard.TabPane key="basic" tab="基础信息">
              <Row gutter={15}>
                <Col xs={24} sm={12}>
                  <ProFormText label="标题" name="title" rules={[{ required: true }]} />
                </Col>
                <Col xs={24} sm={12}>
                  <ProFormText label="密码" name="password" />
                </Col>
                <Col xs={24} sm={12}>
                  <ProFormUploadButton label="封面图" name="cover" />
                </Col>
                <Col xs={24} sm={12}>
                  <ProFormTextArea label="小结" name="summary" rules={[{ required: true }]} />
                </Col>
              </Row>

              {/* <ProFormRadio.Group
            label="状态"
            name="status"
            options={[
              { label: '草稿', value: 0 },
              { label: '发布', value: 1 },
              { label: '关闭', value: 2 },
            ]}
            rules={[{ required: true }]}
          /> */}
            </ProCard.TabPane>

            <ProCard.TabPane key="seo" tab="SEO">
              <Row gutter={15}>
                <Col xs={24} sm={12}>
                  <ProFormDependency name={['title']}>
                    {({ title }) => <ProFormText label="标题" name="seo_title" />}
                  </ProFormDependency>
                </Col>
              </Row>
              <Row gutter={15}>
                <Col xs={24} sm={12}>
                  <ProFormDependency name={['title']}>
                    {({ title }) => <ProFormTextArea label="关键词" name="seo_keyword" />}
                  </ProFormDependency>
                </Col>
                <Col xs={24} sm={12}>
                  <ProFormDependency name={['summary']}>
                    {({ title }) => <ProFormTextArea label="描述" name="seo_description" />}
                  </ProFormDependency>
                </Col>
              </Row>
            </ProCard.TabPane>
          </ProCard>
        </div>

        <div className={styles.markdownEditor}>
          <ProForm.Item name="markdown">
            <MarkdownEditor />
          </ProForm.Item>
        </div>
      </div>

      {/* <ProFormDependency name={['html']}>
        {({ html }) => {
          return <Viewer value={html} />;
        }}
      </ProFormDependency> */}
    </ProForm>
  );
};

export default ArticleEditPage;
