export default {
  // codemirror基础翻译，源码位置 bytemd/lib/locales/zh_Hans.json
  default: {
    toolbar: {
      write: '编辑',
      preview: '预览',
      source: '源代码',
      exitFullscreen: '退出全屏',
      fullscreen: '全屏',
      closeToc: '关闭目录',
      toc: '目录',
      closeHelp: '关闭帮助',
      help: '帮助',
      exitPreviewOnly: '恢复默认',
      previewOnly: '仅预览区',
      exitWriteOnly: '恢复默认',
      writeOnly: '仅编辑区'
    },
    action: {
      hr: '分割线',
      olItem: '项目',
      ol: '有序列表',
      ulItem: '项目',
      ul: '无序列表',
      codeLang: '编程语言',
      codeBlock: '代码块',
      codeText: '代码',
      code: '代码',
      imageTitle: '图片描述',
      imageAlt: 'alt',
      image: '图片',
      linkText: '链接描述',
      link: '链接',
      quotedText: '引用文本',
      quote: '引用',
      italicText: '斜体文本',
      italic: '斜体',
      boldText: '粗体文本',
      bold: '粗体',
      headingText: '标题',
      h6: '六级标题',
      h5: '五级标题',
      h4: '四级标题',
      h3: '三级标题',
      h2: '二级标题',
      h1: '一级标题'
    },
    status: {
      top: '回到顶部',
      sync: '同步滚动',
      lines: '行数',
      words: '字数'
    },
    sidebar: {
      shortcuts: '快捷键',
      cheatsheet: 'Markdown语法',
      toc: '目录'
    }
  },

  // math插件翻译，源码位置 @bytemd/plugin-math/lib/locales/zh_Hans.json
  math: {
    blockText: '公式',
    block: '块级公式',
    inlineText: '公式',
    inline: '行内公式'
  },

  // gfm插件翻译，源码位置 @bytemd/plugin-gfm/lib/locales/zh_Hans.json
  gfm: {
    tableHeading: '标题',
    table: '表格',
    taskText: '待办事项',
    task: '任务列表',
    strikeText: '文本',
    strike: '删除线'
  }
}
