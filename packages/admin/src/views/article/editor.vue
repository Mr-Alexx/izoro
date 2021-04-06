<template>
  <div class="editor base-box">
    <!-- <el-row :gutter="20" class="editor-header">
      <el-col :xs="24" :sm="12">
        <el-input placeholder="请输入标题" />
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-button type="primary">Test</el-button>
      </el-col>
    </el-row> -->
    <el-card>
      <div slot="header">
        <el-button type="primary" @click="saveDraft">保存</el-button>
      </div>
      <el-form :model="form" :rules="rules" label-width="100px">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" class="base-box--bottom">
            <el-form-item prop="title" label="标题">
              <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item prop="cover" label="封面图">
              <el-input v-model="form.cover" />
            </el-form-item>
            <el-form-item prop="summary" label="小结">
              <el-input v-model="form.summary" type="textarea" />
            </el-form-item>

            <el-row :gutter="20">
              <el-col :xs="24" :sm="12">
                <el-form-item label="密码">
                  <el-input v-model="form.password" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :sm="12">
                <el-form-item label="是否发布">
                  <el-switch v-model="form.status" :active-value="1" :inactive-value="0" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>

          <el-col :xs="24" :sm="12" class="base-box--bottom">
            <el-form-item label="SEO标题">
              <el-input v-model="form.seo_title" />
            </el-form-item>
            <el-form-item label="SEO关键字">
              <el-input v-model="form.seo_keyword" type="textarea" />
            </el-form-item>
            <el-form-item label="SEO描述">
              <el-input v-model="form.seo_description" type="textarea" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <Editor
      ref="editor"
      :value="value"
      :plugins="plugins"
      :toolbar-items="[]"
      :editor-config="config"
      :locale="locale"
      class="editor-wrapper"
      @change="handleChange"
    />
  </div>
</template>

<script>
// 配置 https://codemirror.net/doc/manual.html#config
import 'bytemd/dist/index.min.css'
// import zhHans from 'bytemd/lib/locales/zh_Hans.json' // 基础语言包（看源码找到的...）
import zh from './zh' // 整合的语言包
import { getProcessor } from 'bytemd'
import { Editor } from '@bytemd/vue'
import highlight from '@bytemd/plugin-highlight'
import math from '@bytemd/plugin-math'
// import mermaid from '@bytemd/plugin-mermaid'
import gfm from '@bytemd/plugin-gfm'
import breaks from '@bytemd/plugin-breaks'
import frontmatter from '@bytemd/plugin-frontmatter'
import axios from 'axios'
import setStyleConfig from './codemirror-plugins/set-style-config'
import themes from './codemirror-plugins/themes'
import highlights from './codemirror-plugins/highlights'
import { debounce } from '@/utils'

function themeSelectPlugin () {
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
                click (codemirrorInstance) {
                  console.log(codemirrorInstance)
                  setStyleConfig(codemirrorInstance, { name: 'theme', value: theme })
                  // 设置主题css
                  const themeEl = document.head.querySelector('#theme')
                  const cssRoot = `/css/juejin-markdown-theme/${theme}.min.css`
                  console.log(cssRoot)
                  if (themeEl) {
                    themeEl.setAttribute('href', cssRoot)
                  } else {
                    const link = document.createElement('link')
                    link.setAttribute('rel', 'stylesheet')
                    link.setAttribute('href', cssRoot)
                    link.setAttribute('id', 'theme')
                    document.head.prepend(link)
                  }
                }
              }
            }
          })
        }
      }
    ]
  }
}

function highlightSelectPlugin () {
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
                click (codemirrorInstance) {
                  // 设置highlight
                  setStyleConfig(codemirrorInstance, { name: 'highlight', value: highlight })
                  // 添加样式
                  const highlightEl = document.head.querySelector('#highlight')
                  const cssRoot = `/css/highlight/${highlight}.min.css`
                  if (highlightEl) {
                    highlightEl.setAttribute('href', cssRoot)
                  } else {
                    const link = document.createElement('link')
                    link.setAttribute('rel', 'stylesheet')
                    link.setAttribute('href', cssRoot)
                    link.setAttribute('id', 'highlight')
                    document.head.append(link)
                  }
                }
              }
            }
          })
        }
      }
    ]
  }
}

export default {
  components: {
    Editor
    // Viewer
  },
  data () {
    return {
      value: '404',
      plugins: [
        highlight(),
        math({ locale: zh.math }),
        gfm({ locale: zh.gfm }),
        breaks(),
        frontmatter(),
        themeSelectPlugin(),
        highlightSelectPlugin()
      ],
      config: {},
      locale: zh.default,
      uploadImages () {
        console.log('upload')
      },
      form: {
        title: '',
        cover: '',
        summary: ''
      },
      rules: {
        title: [{ required: true, message: '请填写标题', trigger: 'blur' }],
        cover: [{ required: true, message: '请选择封面图', trigger: 'blur' }],
        summary: [{ required: true, message: '请填写文章小结', trigger: 'blur' }]
      }
    }
  },
  async created () {
    axios.get('/example.md').then(res => {
      this.value = res.data
    })
  },
  methods: {
    handleChange (v) {
      this.value = v
      this.handleChangeStyle()
    },
    handleChangeStyle: debounce(function () {
      this.changeStyle()
      this.saveDraft()
    }, 1000),
    changeStyle () {
      const lines = this.value.split('\n')

      if (
        lines[0].match(/---/) &&
        lines.filter(line => line.match(/---/)).length >= 2
      ) {
        const themeLine = lines.filter(line => line.indexOf('theme: ') > -1)[0]
        const highlightLine = lines.filter(line => line.indexOf('highlight: ') > -1)[0]
        const theme = themeLine.substring(6).trim() || 'juejin'
        const highlight = highlightLine.substring(10).trim()

        this.createLink('theme', `/css/juejin-markdown-theme/${theme}.min.css`)
        this.createLink('highlight', `/css/highlight/${highlight}.min.css`)
      }
    },
    createLink (type, root) {
      const link = document.createElement('link')
      link.setAttribute('rel', 'stylesheet')
      link.setAttribute('href', root)
      link.setAttribute('id', type)
      document.head.append(link)
    },
    /**
     * @desc 存草稿
     */
    saveDraft () {
      const { contents, frontmatter } = getProcessor({ value: this.value, plugins: this.plugins }).processSync(this.value)
      console.log('html', contents)
      console.log('theme', frontmatter.theme, frontmatter.highlight)
    }
  }
}
</script>

<style lang="scss" scoped>
$header-height: 50px;

.editor {
  box-sizing: border-box;
  overflow: hidden;
  height: 100vh;
  // display: flex;
  // flex-direction: column;

  .editor-header {
    height: $header-height;
    display: flex;
    align-items: center;
  }

  .editor-wrapper {
    flex: 1;
  }
}
>>>.bytemd {
  // height: 90vh !important;
  height: calc(100vh - #{$header-height})// 100% !important;
}
>>>.bytemd-fullscreen.bytemd {
  z-index: 99999;
}
</style>

<style lang="scss">
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
::-webkit-scrollbar-thumb {
  background-color: #dcdfe6; // #c9cdd4;
  outline: none;
  // border-radius: 3px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: none;
  box-shadow: none;
  // border-radius: 3px;
}
</style>
