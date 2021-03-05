chrome.browserAction.onClicked.addListener(function (e) {
  window.open('http://easydoc.top/')
})

chrome.runtime.onConnect.addListener(function (port) {
  console.debug('connect:', port)
  if (port.name = 'easydoc') {
    port.onMessage.addListener(function (msg) {
      var id = msg.id
      var version = msg && msg.data && msg.data.version || ''
      var promise
      if (version === 2) {
        promise = sendAxiosRequest(msg.data.config)
      } else {
        promise = sendRequest(msg)
      }
      promise.then(function (data) {
        console.debug('ret:', data)
        new Promise(resolve => {
          if (data && data.data instanceof Blob) {
            data.isBlob = true
            resolve(this.convertBlobAsDataURL(data.data).then(dataurl => {
              data.data = dataurl
            }))
          }
          resolve()
        }).then(() => {
          if (typeof msg.success === 'function') {
            msg.success(data)
          }
          port.postMessage({
            id: id,
            result: 0,
            data: data
          })
        })
      }).catch(function (error) {
        console.debug(error)
        port.postMessage({
          id: id,
          result: -1,
          data: error,
          message: error.message,
          stack: error.stack
        })
      })
    })
  }
})

function sendAxiosRequest (config) {
  const { file } = config || {}
  if (file && Object.keys(file).length > 0) {
    const blob = convertDataURLAsBlob(file.data)
    config.data = new File([blob], file.name, { type: file.type })
  }
  // æ˜¯å¦formdata body
  if (config.isFormData === true) {
    const formData = new FormData()
    Object.keys(config.data).forEach(k => {
      const v = config.data[k]
      if (v.type === 'file') {
        const blob = convertDataURLAsBlob(v.data)
        v.data = new File([blob], v.name, { type: blob.type })
      }
      formData.append(k, v.data)
    })
    config.data = formData
    delete config.isFormData
  }
  return axios.request(config)
}

function sendRequest (msg) {
  var config = msg.data.config
  var bodyParams = msg.data.params.bodyParams
  var urlParams = msg.data.params.urlParams
  var headerParams = msg.data.params.headerParams
  var bodyType = msg.data.params.bodyType

  config.params = mapParamsToObject(urlParams)
  config.headers = mapParamsToObject(headerParams)
  // config.url = config.url + '?' + getUrlByParams(urlParams);

  // å°è£…bodyå‚æ•°
  switch (bodyType) {
    case 'formUrlEncoded':
      // x-www-form-urlencoded
      // config.data = mapParamsToObject(bodyParams);
      config.data = getUrlByParams(bodyParams)
      break
    case 'formData':
      // form-data
      bodyParams.forEach(param => {
        if (param.fileName) {
          try {
            const blob = convertDataURLAsBlob(param.value)
            param.value = new File([blob], param.fileName, { type: blob.type })
          } catch (e) {
            console.error(e)
            param.value = ''
          }
        }
      })
      config.data = mapParamsToFormData(bodyParams)
      break
      // case 'raw':
      //     //raw
      //     config.data = bodyParams;
      //     break;
    case 'binary':
      const blob = convertDataURLAsBlob(bodyParams.dataURL)
      config.data = new File([blob], bodyParams.fileName, { type: blob.type })
      break
    default:
      // raw or other
      config.data = bodyParams
      break
  }
  console.debug('request config :', config)
  return axios.request(config)
}

function mapParamsToObject (params) {
  // æ˜ å°„å‚æ•°ä¸ºå¯¹è±¡
  const obj = {}
  if (params && params.length > 0) {
    params.forEach((param) => {
      if (param.required === true && param.name !== '') {
        obj[param.name] = param.value
      }
    })
  }
  return obj
}
function mapParamsToFormData (params) {
  const formData = new FormData()
  if (params && params.length > 0) {
    params.forEach((param) => {
      if (param.required === true && param.name !== '') {
        formData.append(param.name, param.value)
      }
    })
  }
  return formData
}

// here
function getUrlByParams (params) {
  let urlStr = ''
  params.forEach((param, index) => {
    if (param.required === true && param.name !== '') {
      if (index !== 0) {
        urlStr += '&'
      }
      urlStr += param.name + '=' + param.value
    }
  })
  return urlStr
}

function convertDataURLAsBlob (dataurl) {
  const arr = dataurl.split(',')
  if (arr.length < 2) {
    return new Blob()
  }
  const mimeRes = arr[0].match(/:(.*?);/)
  const mime = mimeRes ? mimeRes[1] : ''
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

function convertBlobAsDataURL (blob) {
  return new Promise((resolve, reject) => {
    if (blob instanceof Blob) {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve(e.target.result)
      }
      reader.readAsDataURL(blob)
    } else {
      reject('å‚æ•°ä¸æ˜¯Blob Prototype')
    }
  })
}
