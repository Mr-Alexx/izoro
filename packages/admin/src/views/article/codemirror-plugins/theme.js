/**
 * @create 2021/03/12 17:33
 * @desc codemirror 主题选择插件
 * @author 潜
 * 参考 @bytemd/plugin-gfm 和 @bytemd/plugin-math 插件的实现
 */
// import remarkMath from 'remark-math'
const icon = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1615541875014" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="914" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64"><defs><style type="text/css"></style></defs><path d="M523.78317456 500.21682544l70.69905014 123.72333775 106.04857521-94.26540066 135.50651369-29.45793709-58.91587557-129.61492573 17.67476254-141.39810028-141.39810028 17.67476254-129.61492573-58.91587557-29.45793709 135.50651369-94.26540066 106.04857521 123.72333775 70.69905014z m-135.50651231 58.9158742L217.42062487 458.97571239l170.85603738-188.53079991 53.02428762-247.44667549 229.77191295 106.0485752L924.41112627 99.58887373l-29.45793846 253.33826345 106.0485752 229.77191295-247.44667549 53.02428762-188.53079991 170.85603738-94.26540066-164.96444941-353.49525068 353.4952507-82.48222472-82.48222609 353.4952507-353.49525069z" fill="#333333" p-id="915"></path></svg>'
import themes from './themes'
import setStyleConfig from './set-style-config'
export default function theme () {
  return {
    actions: [
      {
        icon,
        handler: {
          type: 'dropdown',
          actions: Object.keys(themes).map(theme => {
            return {
              title: theme,
              icon: '',
              cheatsheet: '',
              handler: {
                type: 'action',
                click (codemirrorInstance) {
                  setStyleConfig(codemirrorInstance, { name: 'theme', value: theme })
                }
              }
            }
          })
        }
      }
    ]
  }
}

// function createEditorUtils (codemirror, editor) {
//   return {
//     /**
//        * Wrap text with decorators, for example:
//        *
//        * `text -> *text*`
//        */
//     wrapText (before, after = before) {
//       const range = editor.somethingSelected()
//         ? editor.listSelections()[0] // only handle the first selection
//         : editor.findWordAt(editor.getCursor())
//       const from = range.from() // use from/to instead of anchor/head for reverse select
//       const to = range.to()
//       const text = editor.getRange(from, to)
//       const fromBefore = codemirror.Pos(from.line, from.ch - before.length)
//       const toAfter = codemirror.Pos(to.line, to.ch + after.length)
//       if (editor.getRange(fromBefore, from) === before &&
//               editor.getRange(to, toAfter) === after) {
//         editor.replaceRange(text, fromBefore, toAfter)
//         editor.setSelection(fromBefore, codemirror.Pos(fromBefore.line, fromBefore.ch + text.length))
//       } else {
//         editor.replaceRange(before + text + after, from, to)
//         // select the original text
//         const cursor = editor.getCursor()
//         editor.setSelection(codemirror.Pos(cursor.line, cursor.ch - after.length - text.length), codemirror.Pos(cursor.line, cursor.ch - after.length))
//       }
//     },
//     /**
//        * replace multiple lines
//        *
//        * `line -> # line`
//        */
//     replaceLines (replace) {
//       const [selection] = editor.listSelections()
//       const range = [
//         codemirror.Pos(selection.from().line, 0),
//         codemirror.Pos(selection.to().line)
//       ]
//       const lines = editor.getRange(...range).split('\n')
//       editor.replaceRange(lines.map(replace).join('\n'), ...range)
//       editor.setSelection(...range)
//     },
//     /**
//        * Append a block based on the cursor position
//        */
//     appendBlock (content) {
//       const cursor = editor.getCursor()
//       // find the first blank line
//       let emptyLine = -1
//       for (let i = cursor.line; i < editor.lineCount(); i++) {
//         if (!editor.getLine(i).trim()) {
//           emptyLine = i
//           break
//         }
//       }
//       if (emptyLine === -1) {
//         // insert a new line to the bottom
//         editor.replaceRange('\n', codemirror.Pos(editor.lineCount()))
//         emptyLine = editor.lineCount()
//       }
//       editor.replaceRange('\n' + content, codemirror.Pos(emptyLine))
//       return codemirror.Pos(emptyLine + 1, 0)
//     },
//     /**
//        * Triggers a virtual file input and let user select files
//        *
//        * https://www.npmjs.com/package/select-files
//        */
//     selectFiles
//   }
// }
