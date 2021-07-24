/**
 * @description 组合节点
 */
import { Graph, Dom } from '@antv/x6';
import '@antv/x6-react-shape';
import { NodeTypes } from '../../constants';

const PORTS = {
  groups: {
    top: {
      position: 'top',
      attrs: {
        circle: {
          r: 5,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: 'rgba(255, 255, 255, .8)',
        },
      },
    },
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 5,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: 'rgba(255, 255, 255, .8)',
        },
      },
    },
    bottom: {
      position: 'bottom',
      label: {
        position: 'bottom',
        markup: {
          tagName: 'text',
          selector: 'text',
          attrs: {
            fill: '#999',
            fontSize: 11,
          },
        },
      },
      attrs: {
        circle: {
          r: 5,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: 'rgba(255, 255, 255, .8)',
        },
      },
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 5,
          magnet: true,
          stroke: '#5F95FF',
          strokeWidth: 1,
          fill: 'rgba(255, 255, 255, .8)',
        },
      },
    },
  },
  items: [
    {
      group: 'top',
    },
    {
      group: 'right',
    },
    // {
    //   group: 'bottom',
    // },
    {
      group: 'left',
    },
  ],
};

export const FlowChartRect = Graph.registerNode('flow-chart-rect', {
  inherit: 'rect',
  width: 80,
  height: 42,
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      fill: 'rgba(95,149,255,0.05)',
    },
    fo: {
      refWidth: '100%',
      refHeight: '100%',
    },
    foBody: {
      xmlns: Dom.ns.xhtml,
      style: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    'edit-text': {
      contenteditable: 'false',
      class: 'x6-edit-text',
      style: {
        width: '100%',
        textAlign: 'center',
        fontSize: 12,
        color: 'rgba(0,0,0,0.85)',
      },
    },
    text: {
      fontSize: 12,
      fill: 'rgba(0,0,0,0.85)',
      textWrap: {
        text: '',
        width: -10,
      },
    },
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
    {
      tagName: 'foreignObject',
      selector: 'fo',
      children: [
        {
          ns: Dom.ns.xhtml,
          tagName: 'body',
          selector: 'foBody',
          children: [
            {
              tagName: 'div',
              selector: 'edit-text',
            },
          ],
        },
      ],
    },
  ],
  ports: {
    groups: PORTS.groups,
    items: [...PORTS.items, { group: 'bottom' }],
  },
});
// 开始节点
export const StartNode = Graph.registerNode('start-node', {
  inherit: 'flow-chart-rect',
  type: NodeTypes.START,
  attrs: {
    body: {
      rx: 24,
      ry: 24,
    },
    text: {
      title: {
        text: '开始节点',
      },
      textWrap: {
        text: '开始',
      },
    },
  },
  data: {
    form: {
      type: 4, // 节点类型（1 条件节点， 2 执行节点， 3 结束节点， 4 开始节点）
    },
  },
});
// 结束节点
export const EndNode = Graph.registerNode('end-node', {
  inherit: 'flow-chart-rect',
  type: NodeTypes.END,
  attrs: {
    body: {
      rx: 24,
      ry: 24,
    },
    text: {
      title: {
        text: '结束节点',
      },
      textWrap: {
        text: '结束',
      },
    },
  },
  data: {
    form: {
      type: 3, // 节点类型（1 条件节点， 2 执行节点， 3 结束节点， 4 开始节点）
    },
  },
});

// 审批节点 - 需要绑定审批人（需要点击按钮）
export const ApprovalNode = Graph.registerNode('approval-node', {
  inherit: 'rect',
  width: 200,
  height: 68,
  type: NodeTypes.APPROVER,
  data: {
    form: {},
  },
  attrs: {
    body: {
      stroke: '#5F95FF',
      strokeWidth: 1,
      // fill: 'rgba(95,149,255,0.05)',
      fill: '#fff',
    },
    head: {
      refWidth: '100%',
      stroke: 'transparent',
      height: 28,
      fill: 'rgb(95,149,255)',
    },
    title: {
      text: '审批节点',
      refX: 10,
      refY: 8,
      fill: '#ffffff',
      fontSize: 13,
      'text-anchor': 'start',
    },
    text: {
      text: '请设置审批人',
      refX: 8,
      refY: 45,
      fontSize: 12,
      fill: 'rgba(0,0,0,0.6)',
      'text-anchor': 'start',
    },
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'rect',
      selector: 'head',
    },
    {
      tagName: 'image',
      selector: 'image',
    },
    {
      tagName: 'text',
      selector: 'title',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
  ],
  ports: {
    ...PORTS,
  },
});

// 按钮节点（线形式）
export const ButtonLine = Graph.registerEdge('button-line', {
  labels: [
    {
      attrs: {
        label: {
          fill: '#fff',
          fontSize: 12,
          textAnchor: 'middle',
          textVerticalAnchor: 'middle',
        },
        line: {
          stroke: '#1890ff',
        },
        body: {
          ref: 'label',
          fill: '#1890ff',
          rx: 4,
          ry: 4,
          refWidth: '140%',
          refHeight: '140%',
          refX: '-20%',
          refY: '-20%',
        },
      },
    },
  ],
});

// 条件节点（表达式形式，取字段值判断）
export const ExpressionNode = Graph.registerNode('expression-node', {
  inherit: 'rect',
  width: 200,
  height: 68,
  type: NodeTypes.EXPRESSION,
  data: {
    form: {
      type: 1, // 节点类型（1 条件节点， 2 执行节点， 3 结束节点）
      condition: {
        type: 1, // 条件类型：1 表达式， 2 方法调用
        expression: [], // 表达式列表
      },
    },
  },
  attrs: {
    body: {
      stroke: '#ffc069',
      strokeWidth: 1,
      // fill: 'rgba(95,149,255,0.05)',
      fill: '#fff',
    },
    head: {
      refWidth: '100%',
      stroke: 'transparent',
      height: 28,
      fill: '#ffc069',
    },
    title: {
      text: '条件节点（表达式）',
      refX: 10,
      refY: 8,
      fill: '#ffffff',
      fontSize: 13,
      'text-anchor': 'start',
    },
    text: {
      text: '系统自动触发',
      refX: 8,
      refY: 45,
      fontSize: 12,
      fill: 'rgba(0,0,0,0.6)',
      'text-anchor': 'start',
    },
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'rect',
      selector: 'head',
    },
    {
      tagName: 'image',
      selector: 'image',
    },
    {
      tagName: 'text',
      selector: 'title',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
  ],
  ports: {
    ...PORTS,
  },
});

// 条件节点（条件值采用方法调用形式获取）
export const MethodNode = Graph.registerNode('execute-node', {
  inherit: 'rect',
  width: 200,
  height: 68,
  type: NodeTypes.METHOD,
  data: {
    form: {
      type: 1, // 节点类型（1 条件节点， 2 执行节点， 3 结束节点）
      condition: {
        type: 2, // 条件类型：1 表达式， 2 方法调用
        call: {
          rpcAndMethod: [],
          rpc: '',
          method: '',
          result: [], // 返回值
        },
      },
    },
  },
  attrs: {
    body: {
      stroke: '#ff7875',
      strokeWidth: 1,
      // fill: 'rgba(95,149,255,0.05)',
      fill: '#fff',
    },
    head: {
      refWidth: '100%',
      stroke: 'transparent',
      height: 28,
      fill: '#ff7875',
    },
    title: {
      text: '条件节点（方法调用）',
      refX: 10,
      refY: 8,
      fill: '#ffffff',
      fontSize: 13,
      'text-anchor': 'start',
    },
    text: {
      text: '请设置RPC和执行方法',
      refX: 8,
      refY: 45,
      fontSize: 12,
      fill: 'rgba(0,0,0,0.6)',
      'text-anchor': 'start',
    },
  },
  markup: [
    {
      tagName: 'rect',
      selector: 'body',
    },
    {
      tagName: 'rect',
      selector: 'head',
    },
    {
      tagName: 'image',
      selector: 'image',
    },
    {
      tagName: 'text',
      selector: 'title',
    },
    {
      tagName: 'text',
      selector: 'text',
    },
  ],
  ports: {
    ...PORTS,
  },
});
