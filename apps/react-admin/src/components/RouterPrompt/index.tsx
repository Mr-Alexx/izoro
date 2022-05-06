/**
 * @description 页面刷新、离开、前进、后退拦截组件
 * 监听页面跳转是否需要保存信息
 */
import { Modal } from 'antd';
import { Prompt, useHistory } from 'react-router';
import type { FC } from 'react';
import { memo } from 'react';
import { useState, useEffect } from 'react';
import NavigationPrompt from 'react-router-navigation-prompt';
import { BrowserRouter } from 'react-router-dom';

type IRouterPromptProps = {
  children?: any;
  when: boolean;
  title?: string;
  content?: string;
  onOk?: () => void;
};

// const RouterPrompt = memo((props: IRouterPromptProps) => {
//   const { when, children } = props;
//   return (
//     <BrowserRouter>
//       <NavigationPrompt when={when}>
//         {({ onConfirm, onCancel }) => {
//           console.log(324);
//           Modal.confirm({
//             title: title || '信息还没保存，确定离开吗？',
//             content: content || '离开后编辑的表单内容将不保留',
//             okText: '狠心离开',
//             cancelText: '再想想',
//             onOk: onConfirm,
//             onCancel,
//           });
//         }}
//       </NavigationPrompt>
//       {children}
//     </BrowserRouter>
//   );
// });

const RouterPrompt: FC<IRouterPromptProps> = props => {
  const { when, title, content, onOk, children } = props;
  const history = useHistory();
  const [isBlock, setIsBlock] = useState(when);

  const handleClick = (location: any, action: string, type: string) => {
    setIsBlock(false);
    if (props.onOk && type === 'ok') {
      onOk?.();
    }
    console.log(location, action, type);
    if (type === 'cancel') {
      return;
    }
    console.log(2);
    setTimeout(() => {
      if (action === 'POP') {
        history.goBack();
      } else if (action === 'PUSH') {
        history.push(location);
      } else {
        history.replace(location);
      }
    }, 100);
  };

  const beforeLeave = (e: Record<string, any>) => {
    // Modal.confirm({
    //   title: '确定？',
    // });
    if (!when) {
      return;
    }
    const msg = '确定要离开此页吗?\n\n你修改的内容将不会被保存.';
    e.returnValue = msg;
    // return msg;
  };

  useEffect(() => {
    console.log(123);
    setIsBlock(when);
    window.addEventListener('beforeunload', beforeLeave);
    // 销毁页面时移除事件
    return () => {
      window.removeEventListener('beforeunload', beforeLeave);
    };
  }, [when]);

  return (
    <>
      {children}
      {/* Prompt无法插入子元素，不能作为外层元素 */}
      <Prompt
        when={isBlock}
        message={(location, action) => {
          if (!isBlock) {
            return true;
          }
          Modal.confirm({
            title: title || '信息还没保存，确定离开吗？',
            content: content || '离开后编辑的表单内容将不保留',
            okText: '狠心离开',
            cancelText: '再想想',
            onOk: () => handleClick(location, action, 'ok'),
            onCancel: () => handleClick(location, action, 'cancel'),
          });
          return false;
        }}></Prompt>
    </>
  );
};

export default RouterPrompt;
