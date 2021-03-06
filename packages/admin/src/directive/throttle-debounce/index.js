/**
 * @date 2020/04/28 14:37
 * @author 潜
 * @description 封装debounce和throttle指令
 * debounce默认处理click方法
 *
 * 参照 https://github.com/gerryli0214 项目
 * 待研究
 * @use 使用方法
 * 1. <button v-debounce="handleClick">xx</button>
 * 2. <button v-debounce.click="handleClick">xx</button>
 * 1和2等价
 * 3. <button v-debounce.dbclick="handleXX">xx</button>
 * 4. <button v-debounce="{ event: 'click', args: 'xx', fun: 'handleClick' }"></button>
 * 5. <button v-debounce="handleClick(item, i)">xx</button> // 待实现
 */
import { isFunction, isObject, makeMap, debounce, throttle } from '@/utils'

function noop () {}

const directives = {}
// 存储指令所需参数
let eventParams = {}
// 支持事件对象
const hasEventKey = makeMap('click,dblclick,keyup,keydown,keypress,mouseup,mousedown,mouseover,mouseleave,scroll')

directives.install = function (Vue) {
  Vue.directive('debounce', {
    bind (el, binding, vnode) {
      console.log(binding)
      const defaultConfig = initEventParams(binding)
      console.log('config', defaultConfig)
      eventParams = defaultConfig
      bindElementEvent(el, vnode.context, 'debounce')
    },
    update (el, binding, vnode) {
      const defaultConfig = initEventParams(binding)
      eventParams = defaultConfig
    }
  })

  Vue.directive('throttle', {
    bind (el, binding, vnode) {
      const defaultConfig = initEventParams(binding)
      eventParams = defaultConfig
      bindElementEvent(el, vnode.context, 'throttle')
    },
    update (el, binding, vnode) {
      const defaultConfig = initEventParams(binding)
      eventParams = defaultConfig
    }
  })
}
// 初始化指令参数
function initEventParams (binding) {
  const defaultConfig = {
    fun: '',
    event: 'click',
    args: '',
    wait: 200,
    modifiers: {}
  }
  const modifierList = Object.keys(binding.modifiers).filter(key => binding.modifiers[key])
  defaultConfig.modifierList = binding.modifiers
  if (modifierList.length > 0) {
    const eventArr = modifierList.filter(vv => hasEventKey(vv))
    defaultConfig.event = eventArr.length === 0 ? 'click' : modifierList[0]
  }
  if (isObject(binding.value)) {
    Object.assign(defaultConfig, binding.value)
  } else if (isFunction(binding.value)) {
    defaultConfig.fun = binding.expression
  }
  return defaultConfig
}

function bindElementEvent (el, context, type) {
  const { fun, event, args, wait, modifiers } = eventParams
  if (!isFunction(context[fun])) {
    console.warn(`方法名【${fun}】在组件中未定义`)
    return
  }
  el.removeEventListener(event, noop)
  if (type === 'debounce') {
    el.addEventListener(event, debounce(e => {
      if (modifiers.stop) e.stopPropagation()
      if (modifiers.prev) e.preventDefault()
      context[fun].call(null, e, args)
    }, wait))
  } else if (type === 'throttle') {
    el.addEventListener(event, throttle(e => {
      if (modifiers.stop) e.stopPropagation()
      if (modifiers.prev) e.preventDefault()
      context[fun].call(null, e, args)
    }, wait))
  }
}

export default directives
