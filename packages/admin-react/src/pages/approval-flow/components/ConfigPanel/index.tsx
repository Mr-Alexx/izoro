import React, { useEffect, useState } from 'react';
import FlowGraph from '../Graph';
import styles from './index.less';
import { NodeTypes } from '../../constants';
import Approver from './Approver';
import Expression from './Expression';
import Method from './Method';
import type { FC } from 'react';
import { Menu, Dropdown } from 'antd';
import type { EdgeView } from '@antv/x6';
import { Graph, ToolsView } from '@antv/x6';
import ReactDom from 'react-dom';

class ContextMenuTool extends ToolsView.ToolItem<EdgeView, ContextMenuToolOptions> {
  private knob: HTMLDivElement;

  render() {
    super.render();
    this.knob = ToolsView.createElement('div', false) as HTMLDivElement;
    this.knob.style.position = 'absolute';
    this.container.appendChild(this.knob);
    this.updatePosition(this.options);
    setTimeout(() => {
      this.toggleTooltip(true);
    });
    return this;
  }

  private toggleTooltip(visible: boolean) {
    ReactDom.unmountComponentAtNode(this.knob);
    document.removeEventListener('mousedown', this.onMouseDown);

    if (visible) {
      ReactDom.render(
        <Dropdown visible={true} trigger={['contextMenu']} overlay={this.options.menu}>
          <a />
        </Dropdown>,
        this.knob,
      );
      document.addEventListener('mousedown', this.onMouseDown);
    }
  }

  private updatePosition(pos?: { x: number; y: number }) {
    const { style } = this.knob;
    if (pos) {
      style.left = `${pos.x}px`;
      style.top = `${pos.y}px`;
    } else {
      style.left = '-1000px';
      style.top = '-1000px';
    }
  }

  private onMouseDown = (e: MouseEvent) => {
    setTimeout(() => {
      this.updatePosition();
      this.toggleTooltip(false);
      if (this.options.onHide) {
        this.options.onHide.call(this);
      }
    }, 200);
  };
}

ContextMenuTool.config({
  tagName: 'div',
  isSVGElement: false,
});

export interface ContextMenuToolOptions extends ToolsView.ToolItem.Options {
  x: number;
  y: number;
  menu?: Menu | (() => Menu);
  onHide?: (this: ContextMenuTool) => void;
}

Graph.registerEdgeTool('contextmenu', ContextMenuTool, true);
Graph.registerNodeTool('contextmenu', ContextMenuTool, true);

// 右键菜单
type ContextProps = {
  onClick: () => void;
};
const ContextMenu: FC<ContextProps> = props => {
  const { onClick } = props;
  return (
    <Menu onClick={onClick}>
      <Menu.Item>移除</Menu.Item>
    </Menu>
  );
};

const ConfigPanel: FC = () => {
  const [type, setType] = useState<string>(NodeTypes.START);
  const [id, setId] = useState('');
  /**
   * @description 移除节点
   * @param {string} cellId
   */
  const deleteCell = (cellId: string) => {
    const { graph } = FlowGraph;
    graph.removeCell(cellId);
  };

  useEffect(() => {
    const { graph } = FlowGraph;
    // 监听鼠标左键
    graph.on('cell:click', ({ cell }) => {
      /* eslint-disable-next-line */
      const { type } = cell.toJSON();
      // 确保点击的自定义的节点
      if (![NodeTypes.APPROVER, NodeTypes.EXPRESSION, NodeTypes.METHOD].includes(type)) {
        return;
      }
      setType(type);
      setId(cell.id);
    });
    // 监听鼠标右键
    graph.on('cell:contextmenu', ({ cell, e }) => {
      /* eslint-disable-next-line */
      const { type, id } = cell.toJSON();
      // 确保点击的自定义的节点
      if (![NodeTypes.APPROVER, NodeTypes.EXPRESSION, NodeTypes.METHOD].includes(type)) {
        return;
      }
      const p = graph.clientToGraph(e.clientX, e.clientY);
      cell.addTools([
        {
          name: 'contextmenu',
          args: {
            menu: <ContextMenu onClick={() => deleteCell(id as string)} />,
            x: p.x,
            y: p.y,
            onHide() {
              this.cell.removeTools();
            },
          },
        },
      ]);
    });
  }, []);

  /**
   * @description 清除id，解决DrawerForm关闭时id还存在的问题
   */
  const closeModal = () => {
    // 先取消cell选中
    const { graph } = FlowGraph;
    const cell = graph.getCellById(id as string);
    graph.unselect(cell);
    setId('');
  };

  return (
    // div className={styles.config}
    <>
      {type === NodeTypes.APPROVER && <Approver id={id} onClose={closeModal} />}
      {type === NodeTypes.EXPRESSION && <Expression id={id} onClose={closeModal} />}
      {type === NodeTypes.METHOD && <Method id={id} onClose={closeModal} />}
    </>
  );
};

export default ConfigPanel;
