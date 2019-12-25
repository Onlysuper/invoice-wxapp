import Taro from '@tarojs/taro'

const CODE_SUCCESS = '0' // 请求成功code
/**
 * 简易封装网络请求
 * // NOTE 需要注意 RN 不支持 *StorageSync，此处用 async/await 解决
 * @param {*} options
 */
export default async function fetch(options) {
  // needAllCode需要所有code
  const { url, payload, method = 'GET', needAllCode=false } = options
  const header={}
  if (method === 'POST') {
    header['content-type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    // header['content-type'] = 'application/json'
  }
  return Taro.request({
    url,
    method,
    data: payload,
    header
  }).then(async (res) => {
    const { resultCode, data } = res.data
    if (resultCode !== CODE_SUCCESS) {
      return Promise.reject(res.data)
    }
    if(needAllCode){
      return res.data
    }
    return data
  }).catch((err) => {
    Taro.showToast({
      title: err.resultMsg,
      icon:'none',
      duration: 2000
    })
  })
}
