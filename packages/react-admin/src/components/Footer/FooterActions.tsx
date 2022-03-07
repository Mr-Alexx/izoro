import { FORM_ACTIONS } from '@/constants';
import type { SubmitterProps } from '@ant-design/pro-form/lib/components/Submitter';
import { FooterToolbar } from '@ant-design/pro-layout';
import { Button } from 'antd';
import { memo, useState, useMemo } from 'react';
import { useHistory } from 'react-router';

const FooterActions = memo(
  (
    props: SubmitterProps & {
      draftKey?: string;
      showDraft: boolean;
    },
  ) => {
    // @ts-ignore
    const { form, submit, showDraft } = props;
    const submitButtonProps = props.submitButtonProps as {
      loading: boolean;
    };

    const history = useHistory();
    const [action, setAction] = useState<FORM_ACTIONS>(FORM_ACTIONS.unknow);

    // 草稿中字段定义名称
    const _draftKey = useMemo(() => {
      return props.draftKey ?? 'is_draft';
    }, [props.draftKey]);

    const saveDraftLoading = useMemo(() => {
      return action === FORM_ACTIONS.saveDraft && submitButtonProps?.loading;
    }, [action, submitButtonProps?.loading]);

    const submitLoading = useMemo(() => {
      return action === FORM_ACTIONS.submit && submitButtonProps?.loading;
    }, [action, submitButtonProps?.loading]);

    return (
      <FooterToolbar style={{ paddingTop: 0, paddingBottom: 0 }}>
        <Button type="text" onClick={() => history.go(-1)}>
          返回
        </Button>
        {showDraft && (
          <Button
            loading={saveDraftLoading}
            disabled={submitLoading}
            onClick={async () => {
              setAction(FORM_ACTIONS.saveDraft);
              form?.setFieldsValue?.({ [_draftKey]: 1 });
              submit?.();
            }}>
            存草稿
          </Button>
        )}
        {showDraft && (
          <Button
            type="primary"
            loading={submitLoading}
            disabled={saveDraftLoading}
            onClick={async () => {
              setAction(FORM_ACTIONS.submit);
              form?.setFieldsValue?.({ [_draftKey]: 0 });
              submit?.();
            }}>
            提交
          </Button>
        )}
      </FooterToolbar>
    );
  },
);

export default FooterActions;
