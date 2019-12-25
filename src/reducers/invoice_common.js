import { COMMON_INVOICE_RECORD,COMMON_CUSTOMER,COMMON_CUSTOMER_ORDER } from '@constants/invoice_common'

const INITIAL_STATE = {
  storeInvoiceRecords:"",
  storeCustomer:{},
  storeOrder:{},
}

export default function invoice_common (state = INITIAL_STATE, action) {
  switch (action.type) {
    case COMMON_INVOICE_RECORD: {
      return {
        ...state,
        storeInvoiceRecords:action.payload
      }
    }
    case COMMON_CUSTOMER: {
      return {
        ...state,
        storeCustomer:action.payload
      }
    }
    case COMMON_CUSTOMER_ORDER: {
      return {
        ...state,
        storeOrder:action.payload
      }
    }
    default:
      return state
  }
}
