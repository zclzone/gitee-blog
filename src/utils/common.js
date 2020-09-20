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



export {
  to,
  guid,
  utf8ToBase64,
  base64ToUtf8
}