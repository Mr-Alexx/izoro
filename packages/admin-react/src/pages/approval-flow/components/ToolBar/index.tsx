import React, { useEffect, useState } from 'react';
import { Toolbar } from '@antv/x6-react-components';
import FlowGraph from '../Graph';
import { DataUri } from '@antv/x6';
import {
  ClearOutlined,
  SaveOutlined,
  UndoOutlined,
  RedoOutlined,
  CopyOutlined,
  ScissorOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';
import '@antv/x6-react-components/es/toolbar/style/index.css';
import IconFont from './IconFont';

const { Item } = Toolbar;
const { Group } = Toolbar;

export default function () {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);

  const copy = () => {
    const { graph } = FlowGraph;
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.copy(cells);
    }
    return false;
  };

  const cut = () => {
    const { graph } = FlowGraph;
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.cut(cells);
    }
    return false;
  };

  const paste = () => {
    const { graph } = FlowGraph;
    if (!graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 });
      graph.cleanSelection();
      graph.select(cells);
    }
    return false;
  };

  const del = () => {
    const { graph } = FlowGraph;
    const cells = graph.getSelectedCells();
    if (cells.length) {
      graph.removeCells(cells);
    }
  };

  useEffect(() => {
    const { graph } = FlowGraph;
    const { history } = graph;
    setCanUndo(history.canUndo());
    setCanRedo(history.canRedo());
    history.on('change', () => {
      setCanUndo(history.canUndo());
      setCanRedo(history.canRedo());
    });

    graph.bindKey(['meta+z', 'ctrl+z'], () => {
      if (history.canUndo()) {
        history.undo();
      }
      return false;
    });
    graph.bindKey(['meta+shift+z', 'ctrl+y'], () => {
      if (history.canRedo()) {
        history.redo();
      }
      return false;
    });
    graph.bindKey(['meta+d', 'ctrl+d'], () => {
      graph.clearCells();
      return false;
    });
    graph.bindKey(['meta+s', 'ctrl+s'], () => {
      graph.toPNG((datauri: string) => {
        DataUri.downloadDataUri(datauri, 'chart.png');
      });
      return false;
    });
    graph.bindKey(['meta+c', 'ctrl+c'], copy);
    graph.bindKey(['meta+v', 'ctrl+v'], paste);
    graph.bindKey(['meta+x', 'ctrl+x'], cut);
    graph.bindKey(['del'], del);
  }, []);

  const handleClick = (name: string) => {
    const { graph } = FlowGraph;
    switch (name) {
      case 'undo':
        graph.history.undo();
        break;
      case 'redo':
        graph.history.redo();
        break;
      case 'clear':
        graph.clearCells();
        break;
      case 'delete':
        del();
        break;
      case 'save':
        graph.toPNG((datauri: string) => {
          DataUri.downloadDataUri(datauri, 'chart.png');
        });
        break;
      case 'copy':
        copy();
        break;
      case 'cut':
        cut();
        break;
      case 'paste':
        paste();
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <Toolbar hoverEffect={true} size="big" onClick={handleClick}>
        <Group>
          <Item name="clear" icon={<ClearOutlined />} tooltip="清空 (Cmd + D, Ctrl + D)" />
        </Group>
        <Group>
          <Item
            name="undo"
            tooltip="撤销 (Cmd + Z, Ctrl + Z)"
            // icon={<UndoOutlined />}
            icon={<IconFont type="icon-undo" />}
            disabled={!canUndo}
          />
          <Item
            name="redo"
            tooltip="恢复 (Cmd + Shift + Z, Ctrl + Y)"
            // icon={<RedoOutlined />}
            icon={<IconFont type="icon-redo" />}
            disabled={!canRedo}
          />
        </Group>
        <Group>
          <Item
            name="copy"
            tooltip="复制 (Cmd + C, Ctrl + C)"
            // icon={<CopyOutlined />}
            icon={<IconFont type="icon-copy" />}
          />
          <Item name="cut" tooltip="剪切 (Cmd + X, Ctrl + X)" icon={<ScissorOutlined />} />
          <Item name="paste" tooltip="粘贴 (Cmd + V, Ctrl + V)" icon={<SnippetsOutlined />} />
          <Item name="delete" tooltip="删除 (del, <-)" icon={<IconFont type="icon-delete" />} />
        </Group>
        <Group>
          <Item name="fitSize" tooltip="充满容器" icon={<IconFont type="icon-fit-map" />} />
          <Item name="actualSize" tooltip="实际尺寸" icon={<IconFont type="icon-actual-size" />} />
        </Group>
        <Group>
          <Item name="multiSelect" tooltip="多选容器" icon={<IconFont type="icon-multi-select" />} />
          <Item name="addGroup" tooltip="添加分组" icon={<IconFont type="icon-group" />} />
          <Item name="unGroup" tooltip="取消分组" icon={<IconFont type="icon-ungroup" />} />
        </Group>
        <Group>
          <Item name="save" icon={<SaveOutlined />} tooltip="保存 (Cmd + S, Ctrl + S)" />
        </Group>
      </Toolbar>
    </div>
  );
}
