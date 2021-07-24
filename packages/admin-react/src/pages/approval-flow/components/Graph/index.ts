import { Graph, Addon, Shape } from '@antv/x6';
import './shape';
import { getContainerSize, getLabels } from '../../utils';
import flowData from '../../test';
import { NodeTypes } from '../../constants';

// 右键菜单
// const menu =

export default class FlowGraph {
  public static graph: Graph;
  private static stencil: Addon.Stencil;
  private static readonly container = getContainerSize();

  public static init(id?: number | string) {
    this.graph = new Graph({
      scroller: {
        enabled: true, // Scroller 使画布具备滚动、平移、居中、缩放等能力
        pannable: true, // 是否启用画布平移能力（在空白位置按下鼠标后拖动平移画布），默认为 false。
        pageVisible: false, // 是否分页，默认为 false。
        pageBreak: false, // 是否显示分页符，默认为 false。
      },
      mousewheel: {
        enabled: true,
        modifiers: ['ctrl', 'meta'],
      },
      container: document.getElementById('container')!,
      // width: 1000, // 默认使用容器宽度
      // height: 800, // 默认使用容器高度
      width: this.container.width,
      height: this.container.height,
      grid: {
        size: 10,
        visible: true,
        type: 'mesh',
        args: [
          {
            color: '#d7d7d7',
            thickness: 1,
          },
          // {
          //   color: '#5F95FF',
          //   thickness: 1,
          //   factor: 4,
          // },
        ],
      },
      selecting: {
        enabled: true,
        multiple: true,
        rubberband: true,
        movable: true,
        showNodeSelectionBox: true,
        filter: ['groupNode'],
      },
      // 全局的连线规则
      connecting: {
        anchor: 'center',
        connectionPoint: 'anchor',
        allowBlank: true,
        highlight: true,
        snap: true,
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: '#5F95FF',
                strokeWidth: 1,
                targetMarker: {
                  name: 'classic',
                  size: 8,
                },
              },
            },
            router: {
              name: 'manhattan',
            },
            zIndex: 0,
          });
        },
        validateConnection({ sourceView, targetView, sourceMagnet, targetMagnet }) {
          if (sourceView === targetView) {
            return false;
          }
          if (!sourceMagnet) {
            return false;
          }
          if (!targetMagnet) {
            return false;
          }
          return true;
        },
      },
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: 'rgba(223,234,255)',
            },
          },
        },
      },
      snapline: true,
      history: true,
      clipboard: {
        enabled: true,
      },
      keyboard: {
        enabled: true,
      },
      embedding: {
        enabled: true,
        findParent({ node }) {
          const bbox = node.getBBox();
          return this.getNodes().filter(node => {
            // 只有 data.parent 为 true 的节点才是父节点
            const data = node.getData<any>();
            if (data && data.parent) {
              const targetBBox = node.getBBox();
              return bbox.isIntersectWithRect(targetBBox);
            }
            return false;
          });
        },
      },
    });
    this.initStencil();
    this.initShape();
    this.initGraphShape(id);
    this.initEvent();
    return this.graph;
  }

  private static initStencil() {
    this.stencil = new Addon.Stencil({
      target: this.graph,
      stencilGraphWidth: 238,
      // search: { rect: true },
      collapsable: false,
      title: '流程图',
      groups: [
        {
          name: 'basic',
          title: '基础节点',
          graphHeight: 180,
          layoutOptions: {
            columns: 1,
            marginX: 55,
          },
        },
        {
          name: 'execute',
          title: '执行节点',
          layoutOptions: {
            columns: 1,
            marginX: 55,
          },
          graphHeight: 100,
        },
        {
          name: 'condition',
          title: '条件节点',
          layoutOptions: {
            columns: 1,
            marginX: 55,
          },
          graphHeight: 200,
        },
      ],
    });
    const stencilContainer = document.querySelector('#stencil');
    stencilContainer?.appendChild(this.stencil.container);
  }

  private static initShape() {
    const { graph } = this;
    const StartNode = graph.createNode({
      shape: 'start-node',
    });
    const EndNode = graph.createNode({
      shape: 'end-node',
    });
    const AprrovalNode = graph.createNode({
      shape: 'approval-node',
    });
    const ExpressionNode = graph.createNode({
      shape: 'expression-node',
    });
    const MethodNode = graph.createNode({
      shape: 'execute-node',
    });

    this.stencil.load([StartNode, EndNode], 'basic');
    this.stencil.load([AprrovalNode], 'execute');
    this.stencil.load([ExpressionNode, MethodNode], 'condition');
  }

  private static initGraphShape(id?: number | string) {
    if (!id) {
      return;
    }
    // this.graph.fromJSON(graphData as any);
    const graphData = flowData.filter(v => v.id === Number(id))[0];
    // console.log(graphData);
    this.graph.fromJSON(graphData.data.front_end);
  }

  private static showPorts(ports: NodeListOf<SVGAElement>, show: boolean) {
    for (let i = 0, len = ports.length; i < len; i += 1) {
      ports[i].style.visibility = show ? 'visible' : 'hidden';
    }
  }

  private static initEvent() {
    const { graph } = this;
    const container = document.getElementById('container')!;

    graph.on('node:contextmenu', ({ cell, view }) => {
      const oldText = cell.attr('text/textWrap/text') as string;
      const elem = view.container.querySelector('.x6-edit-text') as HTMLElement;
      if (elem == null) {
        return;
      }
      cell.attr('text/style/display', 'none');
      if (elem) {
        elem.style.display = '';
        elem.contentEditable = 'true';
        elem.innerText = oldText;
        elem.focus();
      }
      const onBlur = () => {
        cell.attr('text/textWrap/text', elem.innerText);
        cell.attr('text/style/display', '');
        elem.style.display = 'none';
        elem.contentEditable = 'false';
      };
      elem.addEventListener('blur', () => {
        onBlur();
        elem.removeEventListener('blur', onBlur);
      });
    });
    // graph.on(
    //   'node:mouseenter',
    //   FunctionExt.debounce(() => {
    //     const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
    //     this.showPorts(ports, true);
    //   }),
    //   500,
    // );
    // graph.on('node:mouseleave', () => {
    //   const ports = container.querySelectorAll('.x6-port-body') as NodeListOf<SVGAElement>;
    //   this.showPorts(ports, false);
    // });

    graph.on('node:collapse', ({ node, e }) => {
      e.stopPropagation();
      node.toggleCollapse();
      const collapsed = node.isCollapsed();
      const cells = node.getDescendants();
      cells.forEach(n => {
        if (collapsed) {
          n.hide();
        } else {
          n.show();
        }
      });
    });

    graph.on('node:embedded', ({ cell }) => {
      if (cell.shape !== 'groupNode') {
        cell.toFront();
      }
    });

    // 以下两个事件很重要，节点自定义线连接时
    // 如果没有设置target节点，是不能再连接到其它节点的链接桩的
    // 需要设置以下两个事件
    graph.on('edge:mouseenter', ({ cell }) => {
      cell.addTools([
        {
          name: 'target-arrowhead',
          args: {
            attrs: {
              fill: 'red',
              line: {
                stoke: 'red',
              },
            },
          },
        },
      ]);
    });
    graph.on('edge:mouseleave', ({ cell }) => {
      cell.removeTools();
    });

    // 线连接触发的事件
    graph.on('edge:connected', ({ edge }) => {
      const { source, target, id } = edge.toJSON();
      const sourceId = source.cell;
      const sourcePortId = source.port;
      const targetId = target.cell;
      const sourceNode = graph.getCellById(sourceId);

      // 如果是开始节点，设置next_node
      if (sourceNode.toJSON()?.type === NodeTypes.START) {
        sourceNode.setData(
          {
            form: {
              type: 4,
              next_node: target.cell,
            },
          },
          { overwrite: true },
        );
        return;
      }

      // 获取链接桩的类型，只有是button、method、expression的时候，才给连接线添加文本说明
      // @ts-ignore
      const { type, attrs } = sourceNode.getPort(source.port);
      // 设置关联的edge id
      // @ts-ignore
      sourceNode.setPortProp(sourcePortId, 'connectEdgeId', id);
      if (!['button', 'method', 'expression'].includes(type)) {
        return;
      }
      // 设置连接线的文本
      const targetNode = graph.getCellById(target.cell);
      const targetNodeAttrs = targetNode.getAttrs();
      // @ts-ignore
      const nextNodeName = targetNodeAttrs?.text?.title?.text || targetNodeAttrs?.title?.text;
      edge.setLabels(
        getLabels({
          text: attrs.text.text,
          color: type === 'expression' ? '#333' : '#fff',
          background: type === 'button' ? '#1890ff' : type === 'expression' ? '#ffc069' : '#ff7875',
        }),
      );
      edge.setData({
        source: {
          // ...edge.getData().source,
          next_node: targetId,
          next_node_name: nextNodeName,
        },
      });
      const { form } = sourceNode.getData();
      if (type === 'button') {
        // 操作按钮，将源数据的按钮next_node 关联到 target的id
        form?.action?.forEach(v => {
          if (v.button_id === sourcePortId) {
            v.next_node = targetId;
            v.next_node_name = nextNodeName;
          }
        });
      } else if (type === 'method') {
        // 条件节点（方法调用形式），将源数据的call.result内的单个对象关联到target的id
        form?.condition.call.result.forEach(v => {
          if (v.id === sourcePortId) {
            v.next_node = targetId;
            v.next_node_name = nextNodeName;
          }
        });
      } else {
        // 条件节点（表达式形式），将源数据的expression内的单个对象关联到target的id
        form?.condition.expression.forEach(v => {
          if (v.id === sourcePortId) {
            v.next_node = targetId;
            v.next_node_name = nextNodeName;
          }
        });
      }

      sourceNode.setData({
        form,
      });
    });

    graph.bindKey('backspace', () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
    });
  }
}
