import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: '/', // api的base_url
  timeout: 15000, // 请求超时时间
  validateStatus: function(status) {
    return [200, 201, 204, 422, 401, 400, 404, 429, 403].indexOf(status) !== -1 // 默认的
  }
})

export default service
