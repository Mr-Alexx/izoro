export default {
  cells: [
    {
      shape: 'edge',
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
      id: '40a8e588-a199-4552-a49c-5db999a1d49b',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '废弃',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '8f79106a-560c-4379-bc1c-04a695326de6',
          next_node_name: '结束节点',
        },
      },
      source: {
        cell: '111ce8aa-8316-4ec8-be67-d324a9b423ef',
        port: 'be552508-a460-403f-a37a-7b453ad7d364',
      },
      target: {
        cell: '8f79106a-560c-4379-bc1c-04a695326de6',
        port: '702c154b-0b47-494a-b436-834a3072b135',
      },
    },
    {
      shape: 'edge',
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
      id: '47f5b7ac-bc9a-40da-9022-86b51394613b',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '确认',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: 'e36c40f0-3c52-474f-a1a7-3b9d28803ade',
          next_node_name: '已确认',
        },
      },
      source: {
        cell: '111ce8aa-8316-4ec8-be67-d324a9b423ef',
        port: '7876a9b8-6c51-44a4-886e-1ebfc288c9f0',
      },
      target: {
        cell: 'e36c40f0-3c52-474f-a1a7-3b9d28803ade',
        port: '94412cbf-7309-4681-86a6-8780a6772735',
      },
    },
    {
      shape: 'edge',
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
      id: '25efa077-99d2-4d24-8887-730806d6cc03',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '指定询价人',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '5b83405e-58a1-4363-a89a-5877ea1f86f3',
          next_node_name: '已指派',
        },
      },
      source: {
        cell: 'e36c40f0-3c52-474f-a1a7-3b9d28803ade',
        port: '372bd2d2-344e-400a-bd32-c6d2d03c43fc',
      },
      target: {
        cell: '5b83405e-58a1-4363-a89a-5877ea1f86f3',
        port: '94412cbf-7309-4681-86a6-8780a6772735',
      },
    },
    {
      shape: 'edge',
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
      id: 'a0b5c7a9-32bf-4ee9-b064-098a68d91b5a',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '接受',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '4616b8ad-da03-4601-b059-36d5b6fb470f',
          next_node_name: '询价中',
        },
      },
      source: {
        cell: '5b83405e-58a1-4363-a89a-5877ea1f86f3',
        port: '45d138c9-e733-4c89-af61-d0255a18a234',
      },
      target: {
        cell: '4616b8ad-da03-4601-b059-36d5b6fb470f',
        port: '94412cbf-7309-4681-86a6-8780a6772735',
      },
    },
    {
      shape: 'edge',
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
      id: 'f12dc19c-ff5a-466e-958a-2325dd5839e3',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '已询价',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '63bef001-28c7-48a9-9efb-9dc779486108',
          next_node_name: '结束节点',
        },
      },
      source: {
        cell: '4616b8ad-da03-4601-b059-36d5b6fb470f',
        port: 'ded2caa5-3e38-4418-bc96-5d407860644f',
      },
      target: {
        cell: '63bef001-28c7-48a9-9efb-9dc779486108',
        port: '702c154b-0b47-494a-b436-834a3072b135',
      },
    },
    {
      shape: 'edge',
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
      id: '32f65e42-2140-4060-851e-aa0407ba420e',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '废弃',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '63bef001-28c7-48a9-9efb-9dc779486108',
          next_node_name: '结束节点',
        },
      },
      source: {
        cell: '4616b8ad-da03-4601-b059-36d5b6fb470f',
        port: '2ffe38ff-a956-4ac5-a134-bd807a241965',
      },
      target: {
        cell: '63bef001-28c7-48a9-9efb-9dc779486108',
        port: '48c664fe-7244-4651-a46c-4bf1660ecb0a',
      },
    },
    {
      shape: 'edge',
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
      id: '41d6ed9a-3150-46ee-8a76-b7c614d22d50',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '拒绝',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: 'e36c40f0-3c52-474f-a1a7-3b9d28803ade',
          next_node_name: '已确认',
        },
      },
      source: {
        cell: '5b83405e-58a1-4363-a89a-5877ea1f86f3',
        port: '0583675f-0ed2-44b3-967e-39e5f571668f',
      },
      target: {
        cell: 'e36c40f0-3c52-474f-a1a7-3b9d28803ade',
        port: '662a02c1-8c1e-4998-a0c6-8d784f342880',
      },
      tools: {
        items: [
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
        ],
        name: null,
      },
    },
    {
      shape: 'edge',
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
      id: 'bb902d74-02f3-4b3a-8f37-833b8673b187',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '废弃',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '63bef001-28c7-48a9-9efb-9dc779486108',
          next_node_name: '结束节点',
        },
      },
      source: {
        cell: '5b83405e-58a1-4363-a89a-5877ea1f86f3',
        port: '93dd52bb-7f2e-4d9e-b245-7bb378f5bfd3',
      },
      target: {
        cell: '63bef001-28c7-48a9-9efb-9dc779486108',
        port: '48c664fe-7244-4651-a46c-4bf1660ecb0a',
      },
    },
    {
      shape: 'edge',
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
      id: 'd9f57f1f-ff16-4109-8992-8e100a97404a',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '返回新单',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '111ce8aa-8316-4ec8-be67-d324a9b423ef',
          next_node_name: '新单审核',
        },
      },
      source: {
        cell: 'e36c40f0-3c52-474f-a1a7-3b9d28803ade',
        port: '678b5cc2-33de-4430-951a-19dd1a2c4042',
      },
      target: {
        cell: '111ce8aa-8316-4ec8-be67-d324a9b423ef',
        port: '94412cbf-7309-4681-86a6-8780a6772735',
      },
    },
    {
      shape: 'edge',
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
      id: 'f65ccbc9-26be-4502-9a60-742f0a682ca5',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '废弃',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '8f79106a-560c-4379-bc1c-04a695326de6',
          next_node_name: '结束节点',
        },
      },
      source: {
        cell: 'e36c40f0-3c52-474f-a1a7-3b9d28803ade',
        port: 'a72d2edb-0916-4b55-900a-e620f269d868',
      },
      target: {
        cell: '8f79106a-560c-4379-bc1c-04a695326de6',
        port: 'd6727b27-2319-4106-9206-171d7231adbb',
      },
    },
    {
      shape: 'edge',
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
      id: '43162f49-f5d0-4beb-9d65-ca5caa910003',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '申请认领',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '5ace6267-3e91-4121-9f91-11211f832cf8',
          next_node_name: '确认认领',
        },
      },
      source: {
        cell: '42e435a2-d142-4c11-91c3-04ce0bee9e1b',
        port: '901cb550-10e9-4988-8c23-664df9f773a1',
      },
      target: {
        cell: '5ace6267-3e91-4121-9f91-11211f832cf8',
        port: '94412cbf-7309-4681-86a6-8780a6772735',
      },
    },
    {
      shape: 'edge',
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
      id: '5836911f-f79d-45a1-a9e8-3741a4008c1d',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '确认',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '6d45bfea-6970-484f-84c9-8117beb77acd',
          next_node_name: '初审',
        },
      },
      source: {
        cell: '5ace6267-3e91-4121-9f91-11211f832cf8',
        port: '81e6fc8f-088e-4a32-bb22-a105d5d55815',
      },
      target: {
        cell: '6d45bfea-6970-484f-84c9-8117beb77acd',
        port: '94412cbf-7309-4681-86a6-8780a6772735',
      },
    },
    {
      shape: 'edge',
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
      id: '9bcf7d4d-4df9-4c76-8553-052d94c00973',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '废弃',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '00455736-9372-487b-8050-753f6b45a82e',
          next_node_name: '结束节点',
        },
      },
      source: {
        cell: '6d45bfea-6970-484f-84c9-8117beb77acd',
        port: '34313716-29b9-404a-a090-f24aac9511f1',
      },
      target: {
        cell: '00455736-9372-487b-8050-753f6b45a82e',
        port: '702c154b-0b47-494a-b436-834a3072b135',
      },
    },
    {
      shape: 'edge',
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
      id: '43be3fba-c462-43a9-af0b-42d4f9f5c9dd',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '拒绝',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '00455736-9372-487b-8050-753f6b45a82e',
          next_node_name: '结束节点',
        },
      },
      source: {
        cell: '5ace6267-3e91-4121-9f91-11211f832cf8',
        port: '5e29da3a-5b4d-4184-ac61-9516e7f85c49',
      },
      target: {
        cell: '00455736-9372-487b-8050-753f6b45a82e',
        port: '702c154b-0b47-494a-b436-834a3072b135',
      },
    },
    {
      shape: 'edge',
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
      id: '990b2b33-99bd-46aa-a7d5-8926a4a00d60',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '废弃',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '00455736-9372-487b-8050-753f6b45a82e',
          next_node_name: '结束节点',
        },
      },
      source: {
        cell: 'd02891ce-7cbf-4672-8e04-f6c68f40149c',
        port: '1c18ceea-a68f-40fd-a213-58ad64921857',
      },
      target: {
        cell: '00455736-9372-487b-8050-753f6b45a82e',
        port: 'd6727b27-2319-4106-9206-171d7231adbb',
      },
    },
    {
      shape: 'edge',
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
      id: '1f74b3c1-4ac3-4219-adec-6e207ce1adc8',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '通过',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: 'd02891ce-7cbf-4672-8e04-f6c68f40149c',
          next_node_name: '复审',
        },
      },
      source: {
        cell: '6d45bfea-6970-484f-84c9-8117beb77acd',
        port: '3f2d22ba-29de-4929-a22b-35d10b9aa592',
      },
      target: {
        cell: 'd02891ce-7cbf-4672-8e04-f6c68f40149c',
        port: '94412cbf-7309-4681-86a6-8780a6772735',
      },
    },
    {
      shape: 'edge',
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
      id: '9f0ea654-355f-430c-9e4e-312f6e217f19',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '通过',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '45bd093a-26fb-43ad-9ec2-b19c4847fdbc',
          next_node_name: '结束节点',
        },
      },
      source: {
        cell: 'd02891ce-7cbf-4672-8e04-f6c68f40149c',
        port: 'cba59439-1039-447a-a425-371fb2accd30',
      },
      target: {
        cell: '45bd093a-26fb-43ad-9ec2-b19c4847fdbc',
        port: '702c154b-0b47-494a-b436-834a3072b135',
      },
    },
    {
      shape: 'edge',
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
      id: 'de711dde-ce81-46ee-a728-1842580f3d78',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '拒绝',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '63848c9b-adf2-4101-a41f-052618c25d93',
          next_node_name: '驳回认领',
        },
      },
      source: {
        cell: 'd02891ce-7cbf-4672-8e04-f6c68f40149c',
        port: '34055b84-5eae-4072-95fe-fa2dd1cebdd6',
      },
      target: {
        cell: '63848c9b-adf2-4101-a41f-052618c25d93',
        port: '94412cbf-7309-4681-86a6-8780a6772735',
      },
    },
    {
      shape: 'edge',
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
      id: '61a079e4-b168-4540-b3f1-eba20fee99ac',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '认领',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '45bd093a-26fb-43ad-9ec2-b19c4847fdbc',
          next_node_name: '结束节点',
        },
      },
      source: {
        cell: '63848c9b-adf2-4101-a41f-052618c25d93',
        port: '9e28db0e-ecd9-4704-b8bb-edc8c2fe822a',
      },
      target: {
        cell: '45bd093a-26fb-43ad-9ec2-b19c4847fdbc',
        port: '48c664fe-7244-4651-a46c-4bf1660ecb0a',
      },
    },
    {
      shape: 'edge',
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
      id: '0f00bda5-8c5c-47b0-b762-22d12db84b8c',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '废弃',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '45bd093a-26fb-43ad-9ec2-b19c4847fdbc',
          next_node_name: '结束节点',
        },
      },
      source: {
        cell: '63848c9b-adf2-4101-a41f-052618c25d93',
        port: '7c345e8b-2a30-42b3-a51f-2b97c3b066ab',
      },
      target: {
        cell: '45bd093a-26fb-43ad-9ec2-b19c4847fdbc',
        port: '48c664fe-7244-4651-a46c-4bf1660ecb0a',
      },
    },
    {
      shape: 'edge',
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
      id: '23cf637b-a498-4c56-b3fb-811aace4a193',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      labels: [
        {
          attrs: {
            label: {
              text: '拒绝',
              fill: '#fff',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
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
      data: {
        source: {
          next_node: '63848c9b-adf2-4101-a41f-052618c25d93',
          next_node_name: '驳回认领',
        },
      },
      source: {
        cell: '6d45bfea-6970-484f-84c9-8117beb77acd',
        port: '47955aff-6cd8-4a39-91c7-4f4dff057d91',
      },
      target: {
        cell: '63848c9b-adf2-4101-a41f-052618c25d93',
        port: '94412cbf-7309-4681-86a6-8780a6772735',
      },
    },
    {
      shape: 'edge',
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
      id: '87ccd358-c66a-40ee-8e66-d7d17c102b86',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      source: {
        cell: '34531738-8fa1-481a-861f-8ee3cdc36587',
        port: '8c03fd52-08f3-48fb-b389-7cbe70c26ba4',
      },
      target: {
        cell: '2bb86e6c-f0e3-4f3e-97ff-87da014bd562',
        port: 'b03d50aa-4f65-43a4-bbc8-8f58f0942ffa',
      },
    },
    {
      shape: 'edge',
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
      id: 'f9842dba-9333-472f-ab47-6029c57a2d27',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      source: {
        cell: '2bb86e6c-f0e3-4f3e-97ff-87da014bd562',
        port: '24641502-89ab-4627-be71-5e6b6d792967',
      },
      target: {
        cell: '111ce8aa-8316-4ec8-be67-d324a9b423ef',
        port: '94412cbf-7309-4681-86a6-8780a6772735',
      },
      labels: [
        {
          attrs: {
            label: {
              text: 'status > 5',
              fill: '#333',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
            },
            body: {
              ref: 'label',
              fill: '#ffc069',
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
      data: {
        source: {
          next_node: '111ce8aa-8316-4ec8-be67-d324a9b423ef',
          next_node_name: '新单审核',
        },
      },
    },
    {
      shape: 'edge',
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
      id: '2f383e1b-6c0f-4d97-a9e6-2c9b580c3838',
      router: {
        name: 'manhattan',
      },
      zIndex: 0,
      source: {
        cell: '2bb86e6c-f0e3-4f3e-97ff-87da014bd562',
        port: '83318cbe-bd62-4308-8828-32f9ec325882',
      },
      target: {
        cell: '42e435a2-d142-4c11-91c3-04ce0bee9e1b',
        port: '94412cbf-7309-4681-86a6-8780a6772735',
      },
      labels: [
        {
          attrs: {
            label: {
              text: 'status >= 5',
              fill: '#333',
              fontSize: 12,
              textAnchor: 'middle',
              textVerticalAnchor: 'middle',
            },
            body: {
              ref: 'label',
              fill: '#ffc069',
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
      data: {
        source: {
          next_node: '42e435a2-d142-4c11-91c3-04ce0bee9e1b',
          next_node_name: '已询价',
        },
      },
    },
    {
      position: {
        x: 500,
        y: 20,
      },
      size: {
        width: 80,
        height: 42,
      },
      shape: 'start-node',
      type: '开始节点',
      data: {
        form: {
          type: 4,
          next_node: '2bb86e6c-f0e3-4f3e-97ff-87da014bd562',
        },
      },
      ports: {
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
            id: '67567735-37cf-47cc-bbb4-3954b28a544c',
          },
          {
            group: 'right',
            id: 'ac87a9a4-b36b-454b-8cc7-b1999bdac46f',
          },
          {
            group: 'left',
            id: '83476f8b-d969-4368-a4c2-1c8781b53bc7',
          },
          {
            group: 'bottom',
            id: '8c03fd52-08f3-48fb-b389-7cbe70c26ba4',
            connectEdgeId: 'c7687df0-1f2f-4f8a-aedf-9d1d447df080',
          },
        ],
      },
      id: '34531738-8fa1-481a-861f-8ee3cdc36587',
      zIndex: 1,
    },
    {
      position: {
        x: 440,
        y: 112,
      },
      size: {
        width: 200,
        height: 68,
      },
      attrs: {
        title: {
          text: '系统接管',
        },
      },
      shape: 'expression-node',
      type: '条件节点（表达式）',
      data: {
        form: {
          type: 1,
          condition: {
            type: 1,
            expression: [
              {
                id: '24641502-89ab-4627-be71-5e6b6d792967',
                field: 'status',
                comparer: '>',
                value: '5',
                next_node: '111ce8aa-8316-4ec8-be67-d324a9b423ef',
                index: 0,
                next_node_name: '新单审核',
              },
              {
                id: '83318cbe-bd62-4308-8828-32f9ec325882',
                field: 'status',
                comparer: '>=',
                value: '5',
                next_node: '42e435a2-d142-4c11-91c3-04ce0bee9e1b',
                index: 1,
                next_node_name: '已询价',
              },
            ],
          },
        },
      },
      ports: {
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
            id: 'b03d50aa-4f65-43a4-bbc8-8f58f0942ffa',
          },
          {
            group: 'right',
            id: 'e8f36b48-2cde-410c-a52b-6a59a4b80f27',
          },
          {
            group: 'left',
            id: 'd8c3a136-8c77-445b-8eff-cc6109a31edf',
          },
          {
            id: '24641502-89ab-4627-be71-5e6b6d792967',
            group: 'bottom',
            type: 'expression',
            attrs: {
              text: {
                text: 'status > 5',
              },
            },
            connectEdgeId: 'f9842dba-9333-472f-ab47-6029c57a2d27',
          },
          {
            id: '83318cbe-bd62-4308-8828-32f9ec325882',
            group: 'bottom',
            type: 'expression',
            attrs: {
              text: {
                text: 'status >= 5',
              },
            },
            connectEdgeId: '2f383e1b-6c0f-4d97-a9e6-2c9b580c3838',
          },
        ],
      },
      id: '2bb86e6c-f0e3-4f3e-97ff-87da014bd562',
      zIndex: 3,
    },
    {
      position: {
        x: 180,
        y: 260,
      },
      size: {
        width: 200,
        height: 68,
      },
      attrs: {
        text: {
          text: '审批人：潜1, 潜2',
        },
        title: {
          text: '新单审核',
        },
      },
      shape: 'approval-node',
      type: '审批节点',
      data: {
        form: {
          type: 2,
          approver_type: 1,
          business_status: 2,
          approver_ids: [1, 2],
          action: [
            {
              button_id: '7876a9b8-6c51-44a4-886e-1ebfc288c9f0',
              button_name: '确认',
              rpc: 'users',
              method: 'getUsers',
              next_node: 'e36c40f0-3c52-474f-a1a7-3b9d28803ade',
              index: 0,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '已确认',
            },
            {
              button_id: 'be552508-a460-403f-a37a-7b453ad7d364',
              button_name: '废弃',
              rpc: 'users',
              method: 'getUsers',
              next_node: '8f79106a-560c-4379-bc1c-04a695326de6',
              index: 1,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '结束节点',
            },
          ],
        },
      },
      ports: {
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
            id: '94412cbf-7309-4681-86a6-8780a6772735',
          },
          {
            group: 'right',
            id: 'b7440dcd-0f09-4c16-a476-b629ded256e2',
          },
          {
            group: 'left',
            id: '662a02c1-8c1e-4998-a0c6-8d784f342880',
          },
          {
            id: '7876a9b8-6c51-44a4-886e-1ebfc288c9f0',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '确认',
              },
            },
            connectEdgeId: '47f5b7ac-bc9a-40da-9022-86b51394613b',
          },
          {
            id: 'be552508-a460-403f-a37a-7b453ad7d364',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '废弃',
              },
            },
            connectEdgeId: '40a8e588-a199-4552-a49c-5db999a1d49b',
          },
        ],
      },
      id: '111ce8aa-8316-4ec8-be67-d324a9b423ef',
      zIndex: 4,
    },
    {
      position: {
        x: 130,
        y: 452,
      },
      size: {
        width: 200,
        height: 68,
      },
      attrs: {
        text: {
          text: '审批人：潜1, 潜2',
        },
        title: {
          text: '已确认',
        },
      },
      shape: 'approval-node',
      type: '审批节点',
      data: {
        form: {
          type: 2,
          approver_type: 1,
          business_status: 2,
          approver_ids: [1, 2],
          action: [
            {
              button_id: '372bd2d2-344e-400a-bd32-c6d2d03c43fc',
              button_name: '指定询价人',
              rpc: 'users',
              method: 'getUsers',
              next_node: '5b83405e-58a1-4363-a89a-5877ea1f86f3',
              index: 0,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '已指派',
            },
            {
              button_id: '678b5cc2-33de-4430-951a-19dd1a2c4042',
              button_name: '返回新单',
              rpc: 'users',
              method: 'getUsers',
              next_node: '111ce8aa-8316-4ec8-be67-d324a9b423ef',
              index: 1,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '新单审核',
            },
            {
              button_id: 'a72d2edb-0916-4b55-900a-e620f269d868',
              button_name: '废弃',
              rpc: 'system',
              method: 'addXX',
              next_node: '8f79106a-560c-4379-bc1c-04a695326de6',
              index: 2,
              rpcAndMethod: ['system', 'addXX'],
              next_node_name: '结束节点',
            },
          ],
        },
      },
      ports: {
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
            id: '94412cbf-7309-4681-86a6-8780a6772735',
          },
          {
            group: 'right',
            id: 'b7440dcd-0f09-4c16-a476-b629ded256e2',
          },
          {
            group: 'left',
            id: '662a02c1-8c1e-4998-a0c6-8d784f342880',
          },
          {
            id: '372bd2d2-344e-400a-bd32-c6d2d03c43fc',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '指定询价人',
              },
            },
            connectEdgeId: '25efa077-99d2-4d24-8887-730806d6cc03',
          },
          {
            id: '678b5cc2-33de-4430-951a-19dd1a2c4042',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '返回新单',
              },
            },
            connectEdgeId: 'd9f57f1f-ff16-4109-8992-8e100a97404a',
          },
          {
            id: 'a72d2edb-0916-4b55-900a-e620f269d868',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '废弃',
              },
            },
            connectEdgeId: 'f65ccbc9-26be-4502-9a60-742f0a682ca5',
          },
        ],
      },
      id: 'e36c40f0-3c52-474f-a1a7-3b9d28803ade',
      zIndex: 6,
    },
    {
      position: {
        x: 40,
        y: 650,
      },
      size: {
        width: 200,
        height: 68,
      },
      attrs: {
        text: {
          text: '审批人：潜1, 潜2',
        },
        title: {
          text: '已指派',
        },
      },
      shape: 'approval-node',
      type: '审批节点',
      data: {
        form: {
          type: 2,
          approver_type: 1,
          business_status: 2,
          approver_ids: [1, 2],
          action: [
            {
              button_id: '45d138c9-e733-4c89-af61-d0255a18a234',
              button_name: '接受',
              rpc: 'users',
              method: 'getUsers',
              next_node: '4616b8ad-da03-4601-b059-36d5b6fb470f',
              index: 0,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '询价中',
            },
            {
              button_id: '0583675f-0ed2-44b3-967e-39e5f571668f',
              button_name: '拒绝',
              rpc: 'users',
              method: 'getUsers',
              next_node: 'e36c40f0-3c52-474f-a1a7-3b9d28803ade',
              index: 1,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '已确认',
            },
            {
              button_id: '93dd52bb-7f2e-4d9e-b245-7bb378f5bfd3',
              button_name: '废弃',
              rpc: 'users',
              method: 'getUsers',
              next_node: '63bef001-28c7-48a9-9efb-9dc779486108',
              index: 2,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '结束节点',
            },
          ],
        },
      },
      ports: {
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
            id: '94412cbf-7309-4681-86a6-8780a6772735',
          },
          {
            group: 'right',
            id: 'b7440dcd-0f09-4c16-a476-b629ded256e2',
          },
          {
            group: 'left',
            id: '662a02c1-8c1e-4998-a0c6-8d784f342880',
          },
          {
            id: '45d138c9-e733-4c89-af61-d0255a18a234',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '接受',
              },
            },
            connectEdgeId: 'a0b5c7a9-32bf-4ee9-b064-098a68d91b5a',
          },
          {
            id: '0583675f-0ed2-44b3-967e-39e5f571668f',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '拒绝',
              },
            },
            connectEdgeId: '41d6ed9a-3150-46ee-8a76-b7c614d22d50',
          },
          {
            id: '93dd52bb-7f2e-4d9e-b245-7bb378f5bfd3',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '废弃',
              },
            },
            connectEdgeId: 'bb902d74-02f3-4b3a-8f37-833b8673b187',
          },
        ],
      },
      id: '5b83405e-58a1-4363-a89a-5877ea1f86f3',
      zIndex: 7,
    },
    {
      position: {
        x: -30,
        y: 850,
      },
      size: {
        width: 200,
        height: 68,
      },
      attrs: {
        text: {
          text: '审批人：潜1, 潜2',
        },
        title: {
          text: '询价中',
        },
      },
      shape: 'approval-node',
      type: '审批节点',
      data: {
        form: {
          type: 2,
          approver_type: 1,
          business_status: 2,
          approver_ids: [1, 2],
          action: [
            {
              button_id: 'ded2caa5-3e38-4418-bc96-5d407860644f',
              button_name: '已询价',
              rpc: 'users',
              method: 'getUsers',
              next_node: '63bef001-28c7-48a9-9efb-9dc779486108',
              index: 0,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '结束节点',
            },
            {
              button_id: '2ffe38ff-a956-4ac5-a134-bd807a241965',
              button_name: '废弃',
              rpc: 'users',
              method: 'getUsers',
              next_node: '63bef001-28c7-48a9-9efb-9dc779486108',
              index: 1,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '结束节点',
            },
          ],
        },
      },
      ports: {
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
            id: '94412cbf-7309-4681-86a6-8780a6772735',
          },
          {
            group: 'right',
            id: 'b7440dcd-0f09-4c16-a476-b629ded256e2',
          },
          {
            group: 'left',
            id: '662a02c1-8c1e-4998-a0c6-8d784f342880',
          },
          {
            id: 'ded2caa5-3e38-4418-bc96-5d407860644f',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '已询价',
              },
            },
            connectEdgeId: 'f12dc19c-ff5a-466e-958a-2325dd5839e3',
          },
          {
            id: '2ffe38ff-a956-4ac5-a134-bd807a241965',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '废弃',
              },
            },
            connectEdgeId: '32f65e42-2140-4060-851e-aa0407ba420e',
          },
        ],
      },
      id: '4616b8ad-da03-4601-b059-36d5b6fb470f',
      zIndex: 8,
    },
    {
      position: {
        x: 20,
        y: 1110,
      },
      size: {
        width: 80,
        height: 42,
      },
      shape: 'end-node',
      type: '结束节点',
      data: {
        form: {
          type: 3,
        },
      },
      ports: {
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
            id: '702c154b-0b47-494a-b436-834a3072b135',
          },
          {
            group: 'right',
            id: '48c664fe-7244-4651-a46c-4bf1660ecb0a',
          },
          {
            group: 'left',
            id: '85f2d2aa-5896-45c6-b590-9fee7cc2f4e6',
          },
          {
            group: 'bottom',
            id: 'd6727b27-2319-4106-9206-171d7231adbb',
          },
        ],
      },
      id: '63bef001-28c7-48a9-9efb-9dc779486108',
      zIndex: 9,
    },
    {
      position: {
        x: 410,
        y: 510,
      },
      size: {
        width: 80,
        height: 42,
      },
      shape: 'end-node',
      type: '结束节点',
      data: {
        form: {
          type: 3,
        },
      },
      ports: {
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
            id: '702c154b-0b47-494a-b436-834a3072b135',
          },
          {
            group: 'right',
            id: '48c664fe-7244-4651-a46c-4bf1660ecb0a',
          },
          {
            group: 'left',
            id: '85f2d2aa-5896-45c6-b590-9fee7cc2f4e6',
          },
          {
            group: 'bottom',
            id: 'd6727b27-2319-4106-9206-171d7231adbb',
          },
        ],
      },
      id: '8f79106a-560c-4379-bc1c-04a695326de6',
      zIndex: 10,
    },
    {
      position: {
        x: 680,
        y: 250,
      },
      size: {
        width: 200,
        height: 68,
      },
      attrs: {
        text: {
          text: '审批人：潜1, 潜2',
        },
        title: {
          text: '已询价',
        },
      },
      shape: 'approval-node',
      type: '审批节点',
      data: {
        form: {
          type: 2,
          approver_type: 1,
          approver_ids: [1, 2],
          business_status: 2,
          action: [
            {
              button_id: '901cb550-10e9-4988-8c23-664df9f773a1',
              button_name: '申请认领',
              rpc: 'users',
              method: 'getUsers',
              next_node: '5ace6267-3e91-4121-9f91-11211f832cf8',
              index: 0,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '确认认领',
            },
            {
              button_id: '26ee802f-27e8-4a87-a4b9-a572ef59e09f',
              button_name: '废弃',
              rpc: 'users',
              method: 'getUsers',
              index: 1,
              rpcAndMethod: ['users', 'getUsers'],
            },
          ],
        },
      },
      ports: {
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
            id: '94412cbf-7309-4681-86a6-8780a6772735',
          },
          {
            group: 'right',
            id: 'b7440dcd-0f09-4c16-a476-b629ded256e2',
          },
          {
            group: 'left',
            id: '662a02c1-8c1e-4998-a0c6-8d784f342880',
          },
          {
            id: '901cb550-10e9-4988-8c23-664df9f773a1',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '申请认领',
              },
            },
            connectEdgeId: '43162f49-f5d0-4beb-9d65-ca5caa910003',
          },
          {
            id: '26ee802f-27e8-4a87-a4b9-a572ef59e09f',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '废弃',
              },
            },
          },
        ],
      },
      id: '42e435a2-d142-4c11-91c3-04ce0bee9e1b',
      zIndex: 11,
    },
    {
      position: {
        x: 610,
        y: 442,
      },
      size: {
        width: 200,
        height: 68,
      },
      attrs: {
        text: {
          text: '审批人：潜1',
        },
        title: {
          text: '确认认领',
        },
      },
      shape: 'approval-node',
      type: '审批节点',
      data: {
        form: {
          type: 2,
          approver_type: 1,
          business_status: 2,
          approver_ids: [1],
          action: [
            {
              button_id: '81e6fc8f-088e-4a32-bb22-a105d5d55815',
              button_name: '确认',
              rpc: 'users',
              method: 'getUsers',
              next_node: '6d45bfea-6970-484f-84c9-8117beb77acd',
              index: 0,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '初审',
            },
            {
              button_id: '5e29da3a-5b4d-4184-ac61-9516e7f85c49',
              button_name: '拒绝',
              rpc: 'system',
              method: 'addXX',
              next_node: '00455736-9372-487b-8050-753f6b45a82e',
              index: 1,
              rpcAndMethod: ['system', 'addXX'],
              next_node_name: '结束节点',
            },
          ],
        },
      },
      ports: {
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
            id: '94412cbf-7309-4681-86a6-8780a6772735',
          },
          {
            group: 'right',
            id: 'b7440dcd-0f09-4c16-a476-b629ded256e2',
          },
          {
            group: 'left',
            id: '662a02c1-8c1e-4998-a0c6-8d784f342880',
          },
          {
            id: '81e6fc8f-088e-4a32-bb22-a105d5d55815',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '确认',
              },
            },
            connectEdgeId: '5836911f-f79d-45a1-a9e8-3741a4008c1d',
          },
          {
            id: '5e29da3a-5b4d-4184-ac61-9516e7f85c49',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '拒绝',
              },
            },
            connectEdgeId: '43be3fba-c462-43a9-af0b-42d4f9f5c9dd',
          },
        ],
      },
      id: '5ace6267-3e91-4121-9f91-11211f832cf8',
      zIndex: 12,
    },
    {
      position: {
        x: 550,
        y: 630,
      },
      size: {
        width: 200,
        height: 68,
      },
      attrs: {
        text: {
          text: '审批人：潜1',
        },
        title: {
          text: '初审',
        },
      },
      shape: 'approval-node',
      type: '审批节点',
      data: {
        form: {
          type: 2,
          approver_type: 1,
          business_status: 1,
          approver_ids: [1],
          action: [
            {
              button_id: '3f2d22ba-29de-4929-a22b-35d10b9aa592',
              button_name: '通过',
              rpc: 'users',
              method: 'getUsers',
              next_node: 'd02891ce-7cbf-4672-8e04-f6c68f40149c',
              index: 0,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '复审',
            },
            {
              button_id: '47955aff-6cd8-4a39-91c7-4f4dff057d91',
              button_name: '拒绝',
              rpc: 'users',
              method: 'getUsers',
              next_node: '63848c9b-adf2-4101-a41f-052618c25d93',
              index: 1,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '驳回认领',
            },
            {
              button_id: '34313716-29b9-404a-a090-f24aac9511f1',
              button_name: '废弃',
              rpc: 'users',
              method: 'getUsers',
              next_node: '00455736-9372-487b-8050-753f6b45a82e',
              index: 2,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '结束节点',
            },
          ],
        },
      },
      ports: {
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
            id: '94412cbf-7309-4681-86a6-8780a6772735',
          },
          {
            group: 'right',
            id: 'b7440dcd-0f09-4c16-a476-b629ded256e2',
          },
          {
            group: 'left',
            id: '662a02c1-8c1e-4998-a0c6-8d784f342880',
          },
          {
            id: '3f2d22ba-29de-4929-a22b-35d10b9aa592',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '通过',
              },
            },
            connectEdgeId: '1f74b3c1-4ac3-4219-adec-6e207ce1adc8',
          },
          {
            id: '47955aff-6cd8-4a39-91c7-4f4dff057d91',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '拒绝',
              },
            },
            connectEdgeId: '23cf637b-a498-4c56-b3fb-811aace4a193',
          },
          {
            id: '34313716-29b9-404a-a090-f24aac9511f1',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '废弃',
              },
            },
            connectEdgeId: '9bcf7d4d-4df9-4c76-8553-052d94c00973',
          },
        ],
      },
      id: '6d45bfea-6970-484f-84c9-8117beb77acd',
      zIndex: 13,
    },
    {
      position: {
        x: 810,
        y: 850,
      },
      size: {
        width: 80,
        height: 42,
      },
      shape: 'end-node',
      type: '结束节点',
      data: {
        form: {
          type: 3,
        },
      },
      ports: {
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
            id: '702c154b-0b47-494a-b436-834a3072b135',
          },
          {
            group: 'right',
            id: '48c664fe-7244-4651-a46c-4bf1660ecb0a',
          },
          {
            group: 'left',
            id: '85f2d2aa-5896-45c6-b590-9fee7cc2f4e6',
          },
          {
            group: 'bottom',
            id: 'd6727b27-2319-4106-9206-171d7231adbb',
          },
        ],
      },
      id: '00455736-9372-487b-8050-753f6b45a82e',
      zIndex: 14,
    },
    {
      position: {
        x: 500,
        y: 1303,
      },
      size: {
        width: 80,
        height: 42,
      },
      shape: 'end-node',
      type: '结束节点',
      data: {
        form: {
          type: 3,
        },
      },
      ports: {
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
            id: '702c154b-0b47-494a-b436-834a3072b135',
          },
          {
            group: 'right',
            id: '48c664fe-7244-4651-a46c-4bf1660ecb0a',
          },
          {
            group: 'left',
            id: '85f2d2aa-5896-45c6-b590-9fee7cc2f4e6',
          },
          {
            group: 'bottom',
            id: 'd6727b27-2319-4106-9206-171d7231adbb',
          },
        ],
      },
      id: '45bd093a-26fb-43ad-9ec2-b19c4847fdbc',
      zIndex: 20,
    },
    {
      position: {
        x: 340,
        y: 880,
      },
      size: {
        width: 200,
        height: 68,
      },
      attrs: {
        text: {
          text: '审批人：潜1',
        },
        title: {
          text: '复审',
        },
      },
      shape: 'approval-node',
      type: '审批节点',
      data: {
        form: {
          type: 2,
          approver_type: 1,
          business_status: 2,
          approver_ids: [1],
          action: [
            {
              button_id: 'cba59439-1039-447a-a425-371fb2accd30',
              button_name: '通过',
              rpc: 'users',
              method: 'getUsers',
              next_node: '45bd093a-26fb-43ad-9ec2-b19c4847fdbc',
              index: 0,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '结束节点',
            },
            {
              button_id: '34055b84-5eae-4072-95fe-fa2dd1cebdd6',
              button_name: '拒绝',
              rpc: 'users',
              method: 'getUsers',
              next_node: '63848c9b-adf2-4101-a41f-052618c25d93',
              index: 1,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '驳回认领',
            },
            {
              button_id: '1c18ceea-a68f-40fd-a213-58ad64921857',
              button_name: '废弃',
              rpc: 'system',
              method: 'addXX',
              next_node: '00455736-9372-487b-8050-753f6b45a82e',
              index: 2,
              rpcAndMethod: ['system', 'addXX'],
              next_node_name: '结束节点',
            },
          ],
        },
      },
      ports: {
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
            id: '94412cbf-7309-4681-86a6-8780a6772735',
          },
          {
            group: 'right',
            id: 'b7440dcd-0f09-4c16-a476-b629ded256e2',
          },
          {
            group: 'left',
            id: '662a02c1-8c1e-4998-a0c6-8d784f342880',
          },
          {
            id: 'cba59439-1039-447a-a425-371fb2accd30',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '通过',
              },
            },
            connectEdgeId: '9f0ea654-355f-430c-9e4e-312f6e217f19',
          },
          {
            id: '34055b84-5eae-4072-95fe-fa2dd1cebdd6',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '拒绝',
              },
            },
            connectEdgeId: 'de711dde-ce81-46ee-a728-1842580f3d78',
          },
          {
            id: '1c18ceea-a68f-40fd-a213-58ad64921857',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '废弃',
              },
            },
            connectEdgeId: '990b2b33-99bd-46aa-a7d5-8926a4a00d60',
          },
        ],
      },
      id: 'd02891ce-7cbf-4672-8e04-f6c68f40149c',
      zIndex: 21,
    },
    {
      position: {
        x: 550,
        y: 1042,
      },
      size: {
        width: 200,
        height: 68,
      },
      attrs: {
        text: {
          text: '审批人：潜1, 潜2',
        },
        title: {
          text: '驳回认领',
        },
      },
      shape: 'approval-node',
      type: '审批节点',
      data: {
        form: {
          type: 2,
          approver_type: 1,
          business_status: 2,
          approver_ids: [1, 2],
          action: [
            {
              button_id: '9e28db0e-ecd9-4704-b8bb-edc8c2fe822a',
              button_name: '认领',
              rpc: 'users',
              method: 'getUsers',
              next_node: '45bd093a-26fb-43ad-9ec2-b19c4847fdbc',
              index: 0,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '结束节点',
            },
            {
              button_id: '7c345e8b-2a30-42b3-a51f-2b97c3b066ab',
              button_name: '废弃',
              rpc: 'users',
              method: 'getUsers',
              next_node: '45bd093a-26fb-43ad-9ec2-b19c4847fdbc',
              index: 1,
              rpcAndMethod: ['users', 'getUsers'],
              next_node_name: '结束节点',
            },
          ],
        },
      },
      ports: {
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
            id: '94412cbf-7309-4681-86a6-8780a6772735',
          },
          {
            group: 'right',
            id: 'b7440dcd-0f09-4c16-a476-b629ded256e2',
          },
          {
            group: 'left',
            id: '662a02c1-8c1e-4998-a0c6-8d784f342880',
          },
          {
            id: '9e28db0e-ecd9-4704-b8bb-edc8c2fe822a',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '认领',
              },
            },
            connectEdgeId: '61a079e4-b168-4540-b3f1-eba20fee99ac',
          },
          {
            id: '7c345e8b-2a30-42b3-a51f-2b97c3b066ab',
            type: 'button',
            group: 'bottom',
            attrs: {
              text: {
                text: '废弃',
              },
            },
            connectEdgeId: '0f00bda5-8c5c-47b0-b762-22d12db84b8c',
          },
        ],
      },
      id: '63848c9b-adf2-4101-a41f-052618c25d93',
      zIndex: 22,
    },
  ],
};
