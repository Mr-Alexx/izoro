import Editor from '@/components/Editor';
import MarkdownEditor from '@/components/Editor/MarkdownEditor';
import ProForm, {
  ProFormDependency,
  ProFormRadio,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';

const ArticleEditPage = () => {
  return (
    <ProForm>
      {/* <ProFormText label="标题" name="title" rules={[{ required: true }]} />
      <ProFormUploadButton label="封面图" name="cover" />
      <ProFormTextArea label="小结" name="summary" rules={[{ required: true }]} />
      <ProFormRadio.Group
        label="状态"
        name="status"
        options={[
          { label: '删除', value: -1 },
          { label: '草稿', value: 0 },
          { label: '发布', value: 1 },
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
    </ProForm>
  );
};

export default ArticleEditPage;
