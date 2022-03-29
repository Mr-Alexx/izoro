import { ReactNode, useEffect, useMemo } from 'react';
import ReactDOM from 'react-dom';
import { unmountComponentAtNode } from 'react-dom';
import classNames from 'classnames';

const ICON_CONFIG = {
  info: 'info-circle',
  success: 'check-circle',
  warning: 'exclamation-circle',
  error: 'message-error',
  loading: 'loading',
};

type MessageType = 'info' | 'success' | 'warning' | 'error' | 'loading';
type MessageFunctionParams = {
  type?: MessageType;
  content: ReactNode;
  duration?: number;
  onClose?: () => void;
};
type MessageProps = MessageFunctionParams & {
  rootDom?: HTMLElement; //这个用来干掉parentDom 这个可以常驻
  parentDom?: Element | DocumentFragment; //这个是挂载点 要unmount卸载 完毕后卸载挂载点 注意！一共2步卸载，别漏了
};
// type MessageApi = {
//   info: (content: ReactNode, duration?: number, onClose?: () => void) => void;
//   success: (content: ReactNode, duration?: number, onClose?: () => void) => void;
//   warning: (content: ReactNode, duration?: number, onClose?: () => void) => void;
//   error: (content: ReactNode, duration?: number, onClose?: () => void) => void;
//   loading: (content: ReactNode, duration?: number, onClose?: () => void) => void;
// };

/** 图标渲染 */
const Icon = ({ type = 'info' }: { type: MessageType }) => {
  const Path = useMemo(() => {
    let path;
    switch (type) {
      case 'success':
        path = (
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm193.5 301.7l-210.6 292a31.8 31.8 0 01-51.7 0L318.5 484.9c-3.8-5.3 0-12.7 6.5-12.7h46.9c10.2 0 19.9 4.9 25.9 13.3l71.2 98.8 157.2-218c6-8.3 15.6-13.3 25.9-13.3H699c6.5 0 10.3 7.4 6.5 12.7z" />
        );
        break;
      case 'warning':
        path = (
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm-32 232c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V296zm32 440a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
        );
        break;
      case 'error':
        path = (
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm165.4 618.2l-66-.3L512 563.4l-99.3 118.4-66.1.3c-4.4 0-8-3.5-8-8 0-1.9.7-3.7 1.9-5.2l130.1-155L340.5 359a8.32 8.32 0 01-1.9-5.2c0-4.4 3.6-8 8-8l66.1.3L512 464.6l99.3-118.4 66-.3c4.4 0 8 3.5 8 8 0 1.9-.7 3.7-1.9 5.2L553.5 514l130 155c1.2 1.5 1.9 3.3 1.9 5.2 0 4.4-3.6 8-8 8z" />
        );
        break;
      case 'loading':
        path = (
          <path d="M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" />
        );
        break;
      default:
        path = (
          <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 010-96 48.01 48.01 0 010 96z" />
        );
        break;
    }
    return path;
  }, [type]);

  return (
    <span
      role="img"
      aria-label={ICON_CONFIG[type]}
      className={classNames('iz-icon', `iz-icon-${ICON_CONFIG[type]}`, type === 'loading' ? 'iz-icon-spin' : '')}>
      <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon={ICON_CONFIG[type]}
        width="1em"
        height="1em"
        fill="currentColor"
        aria-hidden="true">
        {Path}
      </svg>
    </span>
  );
};

/** 提示渲染组件 */
const Message = (props: MessageProps) => {
  const { rootDom, parentDom, content, type = 'info', duration = 3000, onClose } = props;
  const hide = useMemo(() => {
    return () => {
      if (parentDom && rootDom) {
        unmountComponentAtNode(parentDom);
        rootDom.removeChild(parentDom);
      }
    };
  }, [parentDom, rootDom]);

  useEffect(() => {
    if (duration > 0) {
      setTimeout(() => {
        hide();
        onClose?.();
      }, duration);
    }
  }, [hide, duration, onClose]);
  return (
    <div className="iz-message-notice">
      <div className="iz-message-notice-content">
        <div className={classNames('iz-message-custom-content', `iz-message--${type}`)}>
          <Icon type={type} />
          <span>{content}</span>
        </div>
      </div>
    </div>
  );
};

let wrapper: HTMLElement;
const message = ({ ...props }: MessageFunctionParams) => {
  if (!document) {
    return;
  }
  if (!wrapper) {
    if (typeof document === 'undefined') {
      return;
    }
    if (!wrapper) {
      //如果有的话，说明已经调用过这个函数了，这个空div就可以一直复用
      const outerWrapper = document.createElement('div');
      wrapper = document.createElement('div');
      wrapper.className = 'iz-message';
      outerWrapper.appendChild(wrapper);
      if (document.body) {
        //挂body上
        document.body.appendChild(outerWrapper);
      }
    }
  }

  const parentNode = document.createElement('div');
  wrapper.appendChild(parentNode);
  ReactDOM.render(<Message {...props} rootDom={wrapper} parentDom={parentNode} />, parentNode);
};

// ['info', 'success', 'warning', 'error', 'loading'].forEach((type: MessageType) => {
//   message[type] = (content: ReactNode, duration?: number, onClose?: () => void) =>
//   message({
//     type,
//     content,
//     duration,
//     onClose,
//   });
// })

message.info = (content: ReactNode, duration?: number, onClose?: () => void) =>
  message({
    type: 'info',
    content,
    duration,
    onClose,
  });
message.success = (content: ReactNode, duration?: number, onClose?: () => void) =>
  message({
    type: 'success',
    content,
    duration,
    onClose,
  });
message.warning = (content: ReactNode, duration?: number, onClose?: () => void) =>
  message({
    type: 'warning',
    content,
    duration,
    onClose,
  });
message.error = (content: ReactNode, duration?: number, onClose?: () => void) =>
  message({
    type: 'error',
    content,
    duration,
    onClose,
  });
message.loading = (content: ReactNode, duration?: number, onClose?: () => void) =>
  message({
    type: 'loading',
    content,
    duration,
    onClose,
  });

export default message;
