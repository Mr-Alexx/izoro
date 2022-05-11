import Editor from '@/components/Editor';
import MarkdownEditor from '@/components/Editor/MarkdownEditor';
import useParams from '@/hooks/useParams';
import { getArticle } from '@/services/article';
import ProForm, {
  ProFormDependency,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { debounce } from 'lodash'; // '@/utils/throttle-debounce';

const ArticleEditPage = () => {
  const { id } = useParams();

  /* 存草稿 */
  const saveDraft = debounce(formVal => {
    console.log('草稿', formVal);
  }, 300);

  return (
    <ProForm
      onValuesChange={saveDraft}
      request={async () => {
        if (!id) {
          return;
        }
        try {
          const data = await getArticle(id);
          console.log(data);
          return {
            ...data,
            markdown: data.markdown?.replace(/↵/gi, '\n\r'),
          };
        } catch (err) {
          console.error(err);
          return;
        }
      }}
      onFinish={async formVal => {
        console.log('d', formVal);
        return false;
      }}>
      {/* <ProFormText label="标题" name="title" rules={[{ required: true }]} />
      <ProFormTextArea label="小结" name="summary" rules={[{required: true}]}/>
      <ProFormUploadButton label="封面图" name="cover" />
      <ProFormRadio.Group
        label="状态"
        name="status"
        options={[
          { label: '草稿', value: 0 },
          { label: '发布', value: 1 },
          { label: '关闭', value: 2 }
        ]}
        rules={[{ required: true }]}
      />
      <ProFormText label="密码" name="password" />

      <ProFormDependency name={['title']}>
        {({ title }) => <ProFormText label="seo标题" name="seo_title" />}
      </ProFormDependency>
      <ProFormDependency name={['title']}>
        {({ title }) => <ProFormText label="seo关键词" name="seo_keyword" />}
      </ProFormDependency>
      <ProFormDependency name={['summary']}>
        {({ title }) => <ProFormText label="seo描述" name="seo_description" />}
      </ProFormDependency> */}

      <ProForm.Item name="markdown">
        <MarkdownEditor />
      </ProForm.Item>

      {/* <ProFormDependency name={['markdown']}>
        {({markdown}) => {
          return <ProFormTextArea hidden name="summary" fieldProps={{
            value: ''
          }} />
        }}
      </ProFormDependency> */}
    </ProForm>
  );
};

export default ArticleEditPage;
