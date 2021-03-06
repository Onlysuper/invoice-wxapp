import Taro, { Component } from '@tarojs/taro'
import { View} from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtGrid,AtList,AtListItem} from 'taro-ui'
// import { add, minus, asyncAdd } from '../../actions/counter'
import { dispatchCustomer }  from '@actions/invoice_common'

import './index.scss'

@connect(({ invoice_common }) => ({
  storeCustomer:invoice_common.storeCustomer // 商户信息
}), {dispatchCustomer})
class Index extends Component {
  constructor(){
    super(...arguments)
    this.state={
      customerData:{}
    }
  }
  componentWillMount () {
    // 获取商户信息
    this.getCustomerData()
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  config = {
    navigationBarTitleText: '首页'
  }
   // 获取商户信息
   getCustomerData(){
    this.props.dispatchCustomer({
      randomCode:'1488c58f'
    }).then((res)=>{
      this.setState({
        customerData:res
      })
    })
  }
  // 跳转
   go(path){
    Taro.navigateTo({
      url: path
    })
  }
   // 点击grid
  gridClick(item){
    let path = item.path;
    this.go(path);
  }
  render () {
    return (
      <View className='home-page'>
        <View className='home-head'>
          <AtGrid onClick={this.gridClick.bind(this)} columnNum={2} data={
                [
                  {
                    image: 'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
                    value: '我要付钱',
                    path:'/pages/payment/index'
                  },
                  {
                    image: 'https://img30.360buyimg.com/jdphoto/s72x72_jfs/t5770/97/5184449507/2423/294d5f95/595c3b4dNbc6bc95d.png',
                    value: '我要开票',
                    // path:'/pages/invoice-electric/invoice-electric' //电子发票
                    path:'/pages/quick-invoice/quick-invoice' // 快速开票
                  }
                ]
        } />
        </View>
        <View className='home-body'>
        <AtList>
            <AtListItem
              title={this.state.customerData.entName}
              // note='描述信息'
              // extraText='详细信息'
              arrow='right'
              thumb='http://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png'
              // iconInfo={{ size: 25,color: '#FF4949', value: 'bookmark', }}
            />
        </AtList>
        </View>
      </View>
    )
  }
}

export default Index
