import { themes, highlights } from './select-options';

function editHeaderConfig({ editor, codemirror, replaceLines }, { name, value }) {
  name = name || 'theme';
  value = value || 'cyanosis';

  const doc = editor.doc.children[0];
  const lines = (doc || {}).lines;
  let headerConfigLineTexts = [];
  let lastIndex = 0;

  // 如果有设置了header_includes
  // ---
  // theme: juejin
  // ---
  // 找出配置，修改配置；
  // 否则，直接在顶部添加
  if (doc && lines[0].text === '---' && lines.filter(line => line.text === '---').length >= 2) {
    for (let i = 0, len = lines.length; i < len; i++) {
      if (lines[i].text === '---' && i !== 0) {
        lastIndex = i;
        break;
      }
    }
    // 保存header设置行，并且移除空行
    headerConfigLineTexts = doc.lines.slice(0, lastIndex + 1).map(line => line.text);
    const existNameIndex = headerConfigLineTexts.findIndex(text => text.indexOf(name) > -1);
    const newConfigText = `${name}: ${value}`;
    if (existNameIndex !== -1) {
      headerConfigLineTexts[existNameIndex] = newConfigText;
    } else {
      headerConfigLineTexts.splice(headerConfigLineTexts.length - 2, 0, newConfigText);
    }
  } else {
    headerConfigLineTexts = ['---', `${name}: ${value}`, '---'];
  }

  const range = [codemirror.Pos(0, lastIndex), codemirror.Pos(0, lines.length)];
  console.log('headerConfigLineTexts', lastIndex, headerConfigLineTexts, range);
  const newRange = headerConfigLineTexts.filter(text => !!text).concat(editor.getRange(...range).split('\n'));
  editor.replaceRange(newRange.join('\n'), ...range);
  // 保持光标聚焦
  editor.focus();
}

/**
 * 主题选择插件
 */
export function themeSelectPlugin() {
  return {
    actions: [
      {
        icon: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1615626469740" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="929" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M529.28450378 228.16310942h-301.64928059c-24.88606564 0-45.24739209-20.36132644-45.2473921-45.24739209s20.36132644-45.24739209 45.2473921-45.24739209h301.64928059c24.88606564 0 45.24739209 20.36132644 45.24739208 45.24739209s-20.36132644 45.24739209-45.24739208 45.24739209zM649.94421602 424.23514181h-422.30899283c-24.88606564 0-45.24739209-20.36132644-45.2473921-45.24739208s20.36132644-45.24739209 45.2473921-45.2473921h422.30899283c24.88606564 0 45.24739209 20.36132644 45.24739209 45.2473921s-20.36132644 45.24739209-45.24739209 45.24739208z" fill="#333333" p-id="930"></path><path d="M511.36653651 18.18504521c-360.28990075 0-493.63396523 315.23858069-493.63396524 492.02014157s128.15569686 495.23270641 483.13657027 495.23270644c0 0 88.23241457 1.53841133 88.23241458-78.05175137 0-79.60524515-39.68196286-54.17621079-39.68196286-111.44432671a75.894959 75.894959 0 0 1 58.7461974-82.80272753c71.9131885 5.95757328 144.30901585 0.01508246 214.29164893-17.58615306a286.05401279 286.05401279 0 0 0 182.51289722-259.28263914C982.25614597 202.65866275 765.88311701 10.64381318 511.36653651 18.18504521zM210.44121419 511.81901043a86.03037482 86.03037482 0 1 1 85.6985606-86.0002099 85.84938527 85.84938527 0 0 1-85.6985606 86.0002099z m161.65384948-212.81356746a86.01529237 86.01529237 0 1 1 85.71364306-86.00020991 85.86446772 85.86446772 0 0 1-85.69856061 86.07562223v-0.07541232z m274.8929894 0a86.03037482 86.03037482 0 1 1 85.6985606-86.00020991 85.87955019 85.87955019 0 0 1-85.57790089 86.07562223l-0.12065971-0.07541232z m163.20734326 212.81356746a86.03037482 86.03037482 0 1 1 85.69856063-86.0002099 85.89463264 85.89463264 0 0 1-85.69856063 86.0002099z m0 0" fill="#333333" p-id="931"></path></svg>',
        handler: {
          type: 'dropdown',
          actions: Object.keys(themes).map(theme => {
            return {
              title: theme,
              icon: '',
              cheatsheet: '',
              handler: {
                type: 'action',
                click(codemirrorInstance) {
                  editHeaderConfig(codemirrorInstance, { name: 'theme', value: theme });
                  // 设置主题css
                  const themeEl = document.head.querySelector('#theme');
                  const cssRoot = `/css/juejin-markdown-theme/${theme}.min.css`;
                  if (themeEl) {
                    themeEl.setAttribute('href', cssRoot);
                  } else {
                    const link = document.createElement('link');
                    link.setAttribute('rel', 'stylesheet');
                    link.setAttribute('href', cssRoot);
                    link.setAttribute('id', 'theme');
                    document.head.prepend(link);
                  }
                },
              },
            };
          }),
        },
      },
    ],
  };
}

/**
 * 代码高亮主题选择插件
 */
export function highlightSelectPlugin() {
  return {
    actions: [
      {
        icon: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1615626337759" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1054" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"><defs><style type="text/css"></style></defs><path d="M251.456 93.728L80 251.408l157.728 171.456 528 569.136 171.408-150.864zM148.592 251.408l96-82.272 96 96-96 82.272-96-96z m233.136 562.32l-27.408 61.728-61.728 6.864 48 41.136L326.864 992l54.864-27.408L436.592 992l-6.864-68.592 41.136-48-61.728-6.864-27.408-54.864z m-212.592-281.136l-41.136 96-96 13.728 68.592 68.592-13.728 102.864 82.272-48 82.272 48-13.728-102.864 68.592-68.592-96-13.728zM800 32l-54.864 123.408L614.864 176l96 96-20.592 137.136 116.592-68.592 116.592 68.592L902.864 272 992 176l-130.272-20.592L800 32z" p-id="1055"></path></svg>',
        handler: {
          type: 'dropdown',
          actions: highlights.map(highlight => {
            return {
              title: highlight,
              handler: {
                type: 'action',
                click(codemirrorInstance) {
                  // 设置highlight
                  editHeaderConfig(codemirrorInstance, { name: 'highlight', value: highlight });
                  // 添加样式
                  const highlightEl = document.head.querySelector('#highlight');
                  const cssRoot = `/css/highlight/${highlight}.min.css`;
                  if (highlightEl) {
                    highlightEl.setAttribute('href', cssRoot);
                  } else {
                    const link = document.createElement('link');
                    link.setAttribute('rel', 'stylesheet');
                    link.setAttribute('href', cssRoot);
                    link.setAttribute('id', 'highlight');
                    document.head.append(link);
                  }
                },
              },
            };
          }),
        },
      },
    ],
  };
}
