export default function setStyleConfig({ editor, codemirror }, { name, value }) {
  name = name || 'theme';
  value = value || 'juejin';

  const doc = editor.doc.children[0];
  const lines = (doc || {}).lines;
  if (doc && lines[0].text === '---' && lines.filter(line => line.text === '---').length >= 2) {
    let lastIndex = 0;
    for (let i = 0, len = lines.length; i < len; i++) {
      if (lines[i].text === '---' && i !== 0) {
        lastIndex = i;
        break;
      }
    }
    doc.lines.slice(0, lastIndex).forEach((line, i) => {
      if (line.text.indexOf(name) > -1) {
        editor.replaceRange(`${name}: ${value}`, codemirror.Pos(i, 0), codemirror.Pos(i));
      }
    });
  }
  // // 判断主题设置逻辑
  // // ① 第0行是否只有 ---，且
  // // ② 其后是否闭合的 ---
  // // ③ 找到闭合的 ---，记下行号 endLine
  // // ④ 默认获取前4行，作为主题判断依据

  // // 注意：第一样1-3列，即---
  // let range = [codemirror.Pos(0, 0), codemirror.Pos(0, 3)]
  // // 找出所有---的行，如何第一行存在则第二行为所有行的第二个元素
  // const configMarkTag = document.querySelectorAll('.CodeMirror-line .cm-def')

  // if (
  //   editor.getRange(...range).indexOf('---') > -1 &&
  //   configMarkTag.length >= 2
  // ) {
  //   // 找出结束行的行号
  //   const endLineMarkTag = configMarkTag[1]
  //   const endLineEl = endLineMarkTag.parentNode.parentNode
  //   const endLine = [].indexOf.call(endLineEl.parentNode.querySelectorAll(endLineEl.tagName), endLineEl)

  //   range = [codemirror.Pos(0, 3), codemirror.Pos(endLine, 3)]
  //   const lines = editor.getRange(...range).split('\n')
  //   // 将theme: xx替换为设置的值
  //   editor.replaceRange(lines.map(line => {
  //     if (line.indexOf(name) > -1) {
  //       return `${name}: ${value}`
  //     }
  //     return line
  //   }).join('\n'), ...range)
  // } else {
  //   // 没有配置，生成配置
  //   const newRange = ['---', `${name}: ${value}`, '---'].concat(editor.getRange(...range).split('\n'))
  //   editor.replaceRange(newRange.join('\n'), ...range)
  // }
  // 设置完后，聚焦到之前的光标位置
  // editor.focus()
}
