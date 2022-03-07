import type { FC } from 'react';
import createField from '@ant-design/pro-form/lib/BaseForm/createField';
import type { ProFieldProps } from '@ant-design/pro-utils';
import type { FieldProps } from '@ant-design/pro-form/lib/interface';
import SingleImageUpload from '@/components/OSS/SingleImageUpload';
import MultipleImageUpload from '@/components/OSS/MultipleImageUpload';
import ProField from '@ant-design/pro-field';
import type { CascaderProps, FormItemProps, TreeSelectProps, InputNumberProps } from 'antd';
import { InputNumber } from 'antd';
import { Cascader, TreeSelect } from 'antd';
import Editor from '@/components/Editor';
import type { RawEditorSettings } from 'tinymce/tinymce.d';
import ProForm, { ProFormDigit } from '@ant-design/pro-form';
import type { ProFormDigitProps } from '@ant-design/pro-form/lib/components/Digit';
import DigitRange from './DigitRange';
import type { InternalNamePath, NamePath } from 'antd/lib/form/interface';

type ProFormItemProps<T = Record<string, any>> = {
  fieldProps?: FieldProps & T;
  placeholder?: string | string[];
  disabled?: boolean;
  /**
   * @type auto 使用组件默认的宽度
   * @type xs=104px 适用于短数字、短文本或选项。
   * @type sm=216px 适用于较短字段录入、如姓名、电话、ID 等。
   * @type md=328px 标准宽度，适用于大部分字段长度。
   * @type lg=440px 适用于较长字段录入，如长网址、标签组、文件路径等。
   * @type xl=552px 适用于长文本录入，如长链接、描述、备注等，通常搭配自适应多行输入框或定高文本域使用。
   */
  width?: number | 'sm' | 'md' | 'xl' | 'xs' | 'lg';
  /** 设置到 ProField 上面的 Props，内部属性 */
  proFieldProps?: ProFieldProps;
} & FormItemProps;

type MultipleImageUploadFieldProps = {
  fieldProps?: FieldProps & {
    fieldsName?: { id: any; url: string };
    directoryPath?: string; // 自定义文件夹名称
    maxCount?: number; // 限制图片数量
    limit?: number; // 限制大小，单位 MB
  };
};

type EditorFieldProps = {
  fieldProps?: FieldProps & RawEditorSettings;
};

type CascaderFieldProps = {
  fieldProps?: FieldProps & CascaderProps;
};

type TreeFieldProps = {
  fieldProps?: FieldProps & TreeSelectProps<'showTreeIcon'>;
};

/**
 * @create 2021/09/09 10:44
 * @creator 潜
 * @description ProForm专用单图上传组件，封装成ProForm使用的ProFormField，使用类似ProFormText等
 * @example <ProFormSingleImageUpload label="单图上传" name="image" />
 */
export const ProFormSingleImageUpload = createField<ProFormItemProps>(
  ({ fieldProps, proFieldProps, ...rest }: ProFormItemProps) => {
    return (
      <ProField
        mode="edit"
        renderFormItem={(text, props) => (
          <SingleImageUpload initialValue={fieldProps?.value as string} tips={rest.placeholder as string} {...props} />
        )}
        fieldProps={{
          ...fieldProps,
          onChange: (...restParams: any) => {
            (fieldProps?.onChange as any)?.(...restParams);
            (rest as any)?.onChange?.(...restParams);
          },
        }}
        {...proFieldProps}
      />
    );
  },
);

/**
 * @create 2021/09/09 10:32
 * @creator 潜
 * @description ProForm专用多图上传组件，封装成ProForm使用的ProFormField，使用类似ProFormText等
 * @example <ProFormMultipleImageUpload label="多图上传" name="images" fieldProps={{ onChange: (urls: string[], files: UploadFile[]) => console.log(urls, files) }} />
 */
export const ProFormMultipleImageUpload = createField<ProFormItemProps & MultipleImageUploadFieldProps>(
  ({ fieldProps, proFieldProps, ...rest }: ProFormItemProps & MultipleImageUploadFieldProps) => {
    return (
      <ProField
        mode="edit"
        renderFormItem={(text, props) => (
          // @ts-ignore
          <MultipleImageUpload {...props} />
        )}
        fieldProps={{
          ...fieldProps,
          onChange: (...restParams: any) => {
            (fieldProps?.onChange as any)?.(...restParams);
            (rest as any)?.onChange?.(...restParams);
          },
        }}
        {...proFieldProps}
      />
    );
  },
);

/**
 * @create 2021/09/09 10:57
 * @creator 潜
 * @description ProForm专用富文本插件，封装成ProForm使用的ProFormField，使用类似ProFormText等
 * @example <ProFormEditor label="富文本" name="editor" />
 */
export const ProFormEditor = createField<ProFormItemProps & EditorFieldProps>(
  ({ fieldProps, proFieldProps, ...rest }: ProFormItemProps & EditorFieldProps) => {
    return (
      <ProField
        mode="edit"
        renderFormItem={(text, props) => <Editor {...props} />}
        fieldProps={{
          ...fieldProps,
          onChange: (...restParams: any) => {
            (fieldProps?.onChange as any)?.(...restParams);
            (rest as any)?.onChange?.(...restParams);
          },
        }}
        {...proFieldProps}
      />
    );
  },
);

/**
 * @create 2021/10/19 17:11
 * @creator 潜
 * @description ProForm专用Cascader组件
 * @example <ProFormCascader label="富文本" name="editor" />
 */
export const ProFormCascader = createField<ProFormItemProps & CascaderFieldProps>(
  ({ fieldProps, proFieldProps, ...rest }: ProFormItemProps & CascaderFieldProps) => {
    return (
      <ProField
        mode="edit"
        // @ts-ignore
        renderFormItem={(text, props) => <Cascader defaultValue={fieldProps?.value} {...props} />}
        fieldProps={{
          ...fieldProps,
          onChange: (...restParams: any) => {
            (fieldProps?.onChange as any)?.(...restParams);
            (rest as any)?.onChange?.(...restParams);
          },
        }}
        {...proFieldProps}
      />
    );
  },
);

/**
 * @create 2021/10/19 17:11
 * @modify 2021/10/20 14:34
 * @creator 潜
 * @description ProForm专用Cascader组件
 * @example <ProFormCascader label="富文本" name="editor" />
 */
// export const ProFormTree: FC<ProFormItemProps & TreeFieldProps> = props => {
//   const { fieldProps, placeholder, ...itemProps } = props;
//   console.log('fieldProps', props);
//   return (
//     <ProForm.Item {...itemProps}>
//       <TreeSelect
//         placeholder={placeholder}
//         {...fieldProps}
//         // 默认tree组件取id、name、children字段
//         // @ts-ignore
//         fieldNames={fieldProps?.fieldNames || { title: 'name', key: 'id', children: 'children' }}
//         treeData={fieldProps?.options}
//       />
//     </ProForm.Item>
//   );
// };
export const ProFormTree = createField<ProFormItemProps & TreeFieldProps>(
  ({ fieldProps, proFieldProps, ...rest }: ProFormItemProps & CascaderFieldProps) => {
    return (
      <ProField
        mode="edit"
        // @ts-ignore
        renderFormItem={(text, props) => (
          <TreeSelect
            defaultValue={fieldProps?.value}
            {...props}
            // 默认tree组件取id、name、children字段
            // @ts-ignore
            fieldNames={rest?.fieldNames ?? fieldProps.fieldNames ?? { label: 'name', key: 'id', children: 'children' }}
            treeData={rest?.options ?? fieldProps?.options}
          />
        )}
        fieldProps={{
          ...fieldProps,
          onChange: (...restParams: any) => {
            (fieldProps?.onChange as any)?.(...restParams);
            (rest as any)?.onChange?.(...restParams);
          },
        }}
        {...proFieldProps}
      />
    );
  },
);

/**
 * @create 2021/11/11 14:25
 * @creator 潜
 * @description ProForm专用Number组件，不用Digit是因为他的addonBefore/addonAfter封装的很烂，无法改样式
 * @example <ProFormNumber label="富文本" name="editor" />
 */
export const ProFormNumber: FC<ProFormDigitProps> = props => {
  const { label, name, rules, labelCol, addonAfter, addonBefore, labelAlign, fieldProps, ...rest } = props;
  return (
    <ProForm.Item label={label} name={name} rules={rules} labelCol={labelCol} labelAlign={labelAlign}>
      <InputNumber
        style={{ width: rest.width ?? '100%' }}
        {...fieldProps}
        addonAfter={addonAfter ?? fieldProps?.addonAfter}
        addonBefore={addonBefore ?? fieldProps?.addonBefore}
      />
    </ProForm.Item>
  );
  // const { addonBefore, addonAfter, ...otherProps } = props;

  // return (
  //   <div
  //     className={classNames(
  //       styles['pro-form-number'],
  //       addonBefore ? styles['has-before'] : '',
  //       addonAfter ? styles['has-after'] : '',
  //     )}>
  //     {addonBefore && <div className={styles['addon-before']}>{addonBefore}</div>}
  //     <div className={styles['number-content']}>
  //       <ProFormDigit {...otherProps} />
  //     </div>
  //     {addonAfter && <div className={styles['addon-after']}>{addonAfter}</div>}
  //   </div>
  // );
};

/**
 * @creator 潜
 * @create 2021/12/24 10:29
 * @description ProForm专用的数值区间选择器
 * @example <ProFormDigitRange/>
 */
type DigitRangeProps = ProFormItemProps & {
  initialValue?: number[] | string[];
};
export const ProFormDigitRange = createField<DigitRangeProps>(
  ({ name, label, initialValue, fieldProps, proFieldProps, ...rest }: ProFormItemProps) => {
    return (
      <ProField
        mode="edit"
        renderFormItem={() => <DigitRange initialValue={initialValue} />}
        fieldProps={{
          ...fieldProps,
          onChange: (...restParams: any) => {
            (fieldProps?.onChange as any)?.(...restParams);
            (rest as any)?.onChange?.(...restParams);
          },
        }}
        name={name || 'product_info'}
        label={label || 'SKU信息'}
        {...proFieldProps}
      />
    );
  },
);
