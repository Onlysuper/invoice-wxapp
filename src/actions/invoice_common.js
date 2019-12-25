import { createAction } from '@utils/redux'
import {
  API_CUSTOMER,
  API_CUSTOMER_ORDER
} from '@constants/apis'
import {
  COMMON_INVOICE_RECORD,
  COMMON_CUSTOMER,
  COMMON_CUSTOMER_ORDER
} from '@constants/invoice_common'

/**
 * 选择按钮需要开票记录
 * @param {*} payload
 */
export const dispatchCommonInvoiceRecord = payload=>{
  return {
    type:COMMON_INVOICE_RECORD,
    payload
  }
}
/**
 * 选择按钮需要开票记录
 * @param {*} payload
 */

export const dispatchCustomer = payload => createAction({
  type: COMMON_CUSTOMER,
  url: API_CUSTOMER,
  payload,
  // fetchOptions:{
  //   needAllCode:true
  // }
})
// 生成订单
export const dispatchCustomerOrder = payload => createAction({
  type: COMMON_CUSTOMER_ORDER,
  url: API_CUSTOMER_ORDER,
  method:'POST',
  payload,
  fetchOptions:{
    needAllCode:true
  }
})








