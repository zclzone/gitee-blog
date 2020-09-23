import { Message, Notification } from 'element-ui'

const to = promise => {
  return promise.then(res => [null, res]).catch(err => [err])
}

const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

const utf8ToBase64 = (str) => {
  return btoa(unescape(encodeURIComponent(str)))
}

const base64ToUtf8 = (str) => {
  return decodeURIComponent(escape(atob(str)))
}

const eleNotification = (message, title = '提醒') => {
  Notification({
    title,
    dangerouslyUseHTMLString: true, //是否将 message 属性作为 HTML 片段处理
    duration: 0,
    message
  })
}

const eleMessage = (message, type = 'info') => {
  Message({
    type,
    message
  })
}



export {
  to,
  guid,
  utf8ToBase64,
  base64ToUtf8,
  eleNotification,
  eleMessage
}