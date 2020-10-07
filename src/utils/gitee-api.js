import axios from '@/ajax/request'
import { getToken } from '@/utils/cookie-util'
import { to, utf8ToBase64, base64ToUtf8 } from '@/utils/common'

const { giteeApiOptions } = require('@/settings')
const { baseApiURL, owner, repo } = giteeApiOptions

const baseRepoURL = `${baseApiURL}/repos/${owner}/${repo}`

const giteeApi = {
  getFileSha: async (fileName) => {
    const [err, res] = await to(axios.get(`${baseRepoURL}/contents/${fileName}`))
    if (err) {
      return ''
    }
    if (!res.data.sha) {
      return ''
    }
    return res.data.sha
  },

  getFile: async (fileName) => {
    const [err, res] = await to(axios.get(`${baseRepoURL}/contents/${fileName}`))
    if (err) {
      return null
    }
    if (res.data.length) {
      return res.data
    }
    if (res.data.sha) {
      return {
        sha: res.data.sha,
        name: res.data.name,
        path: res.data.path,
        content: base64ToUtf8(res.data.content)
      }
    }
    return null
  },

  addFile: async (fileName, content) => {
    const sha = await giteeApi.getFileSha(fileName)
    if (sha) {
      return {
        status: 'Fail',
        msg: `已经存在 ${fileName}`
      }
    }
    content = utf8ToBase64(content)
    const data = { access_token: getToken(), message: `add ${fileName}`, content }
    const [err, res] = await to(axios.post(`${baseRepoURL}/contents/${fileName}`, data))
    if (err) {
      return {
        status: 'Fail',
        msg: `添加失败： ${err}`
      }
    }
    return {
      status: 'OK',
      msg: `添加成功： ${fileName}`,
    }
  },

  removeFile: async (fileName) => {
    const sha = await giteeApi.getFileSha(fileName)
    if (!sha) {
      return {
        status: 'Fail',
        msg: `不存在 ${fileName}`
      }
    }
    let params = { access_token: getToken(), message: `remove ${fileName}`, sha }
    const [err, res] = await to(axios.delete(`${baseRepoURL}/contents/${fileName}`, { params }))

    if (err) {
      return {
        status: 'Fail',
        msg: `删除失败： ${err}`
      }
    }
    return {
      status: 'OK',
      msg: `删除成功： ${fileName}`
    }
  },

  updateFile: async (fileName, sha, content) => {
    content = utf8ToBase64(content)
    const data = { access_token: getToken(), message: `update ${fileName}`, content, sha }
    const [err, res] = await to(axios.put(`${baseRepoURL}/contents/${fileName}`, data))
    if (err) {
      return {
        status: "Fail",
        msg: `更新失败： ${err}`
      }
    }
    return {
      status: 'OK',
      msg: `更新成功： ${fileName}`
    }
  },

  checkRepo: async _ => {
    const params = { access_token: getToken() }
    const [err, res] = await to(axios.get(baseRepoURL, { params }))
    if (err) {
      return false
    }
    return true
  },

  forkRepo: async _ => {
    const data = { access_token: getToken() }
    const [err, res] = await to(axios.post(`${baseApiURL}/repos/zclzone/gitee-db/forks`, data))
    if (err) {
      return {
        status: 'Fail'
      }
    }
    return {
      status: 'OK'
    }
  },
}

export {
  giteeApi
}