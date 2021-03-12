/**
 * @create 2021/03/12 17:33
 * @desc codemirror 主题选择插件
 * @author 潜
 * 参考 @bytemd/plugin-gfm 和 @bytemd/plugin-math 插件的实现
 */
// import remarkMath from 'remark-math'
const icon = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1615541875014" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="914" xmlns:xlink="http://www.w3.org/1999/xlink" width="64" height="64"><defs><style type="text/css"></style></defs><path d="M523.78317456 500.21682544l70.69905014 123.72333775 106.04857521-94.26540066 135.50651369-29.45793709-58.91587557-129.61492573 17.67476254-141.39810028-141.39810028 17.67476254-129.61492573-58.91587557-29.45793709 135.50651369-94.26540066 106.04857521 123.72333775 70.69905014z m-135.50651231 58.9158742L217.42062487 458.97571239l170.85603738-188.53079991 53.02428762-247.44667549 229.77191295 106.0485752L924.41112627 99.58887373l-29.45793846 253.33826345 106.0485752 229.77191295-247.44667549 53.02428762-188.53079991 170.85603738-94.26540066-164.96444941-353.49525068 353.4952507-82.48222472-82.48222609 353.4952507-353.49525069z" fill="#333333" p-id="915"></path></svg>'
import themes from './themes'
export default function theme ({ locale: _locale, katexOptions } = {}) {
  return {
    // remark: (p) => p.use(remarkMath),
    // viewerEffect ({ markdownBody }) {
    //   const renderMath = async (selector, displayMode) => {
    //     const els = markdownBody.querySelectorAll(selector)
    //     if (els.length === 0) { return }
    //     if (!katex) {
    //       katex = await import('katex')
    //     }
    //     els.forEach((el) => {
    //       katex.render(el.innerText, el, {
    //         ...katexOptions,
    //         throwOnError: false,
    //         displayMode
    //       })
    //     })
    //   }
    //   renderMath('.math.math-inline', false)
    //   renderMath('.math.math-display', true)
    // },
    actions: [
      {
        icon,
        handler: {
          type: 'dropdown',
          actions: Object.keys(themes).map(key => {
            return {
              title: key,
              icon: '',
              // cheatsheet: `---\n# themes:\ntheme: ${key}\n---\n`,
              cheatsheet: '',
              handler: {
                type: 'action',
                click ({ wrapText, editor }) {
                  wrapText(`---\n# themes:\ntheme: ${key}\n---\n`)
                  console.log(1)
                  // editor.focus()
                }
              }
            }
          })
          // actions: [
          //   {
          //     title: locale.inline,
          //     icon: icons.inline,
          //     cheatsheet: `$${locale.inlineText}$`,
          //     handler: {
          //       type: 'action',
          //       click ({ wrapText, editor }) {
          //         wrapText('$')
          //         editor.focus()
          //       }
          //     }
          //   },
          //   {
          //     title: locale.block,
          //     icon: icons.block,
          //     cheatsheet: `$$↵${locale.blockText}↵$$`,
          //     handler: {
          //       type: 'action',
          //       click ({ appendBlock, editor, codemirror }) {
          //         const { line } = appendBlock('$$\n\\TeX\n$$')
          //         editor.setSelection(codemirror.Pos(line + 1, 0), codemirror.Pos(line + 1, 4))
          //         editor.focus()
          //       }
          //     }
          //   }
          // ]
        }
      }
    ]
  }
}
