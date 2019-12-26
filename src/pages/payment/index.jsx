import  Taro,{ Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import {
  AtAvatar,
  AtDivider
} from 'taro-ui'
import md5 from "js-md5";
import utils from "@utils/common.js"
import KeyboardPrice from "@components/KeyboardPrice"
import InputPay from "@components/InputPay"
// redux start
import { connect } from '@tarojs/redux'
import { dispatchCustomer,dispatchCustomerOrder }  from '@actions/invoice_common'
import './index.scss'

@connect(
  ({invoice_common}) => ({
    storeCustomer:invoice_common.storeCustomer // 商户信息
  }),
  {
    dispatchCustomer,
    dispatchCustomerOrder
  }
)
class Payment extends Component {
  constructor(){
    console.log('arguments',arguments)
    super(...arguments)
    this.state = {
      sending:false, // 发送中
      price:'',
      orderData:{
        comOrderNo : utils.randomDateNow(2),//16位
        companyNo : '10099998', // 写死的 测试环境跟生产环境区分
        signKey : 'RSGUVWXYZ0123456'// 写死的 测试环境跟生产环境区分
      }
    }
  }
  componentDidMount () {
    console.log('zzzzz');
    // 获取商户信息
    this.props.dispatchCustomer({
      randomCode:'1488c58f'
    }).then(()=>{
      // console.log(this.props.storeCustomer);
    })
  }
  componentDidShow () {}
  componentDidHide () {}
  config = {
    navigationBarTitleText: '付款'
  }
  selectedPriceNum(val){
    this.setState({
      price:val
    })
  }
  //生成微信 和 支付宝订单 接口参数
  createOrderParams(payType) {
    //按照自然升序排序，做url拼接后签名串str1应为：amount=1&&companyNo=10099999&customerNo=20028207&payType=WECHAT&qrcodeAuthCode=049504ede&service=trade.jsPay&userId=userId。
    //在结尾拼接signKey后，签名串str2应为：amount=1&&companyNo=10099999&customerNo=20028207&payType=WECHAT&qrcodeAuthCode=049504ede&service=trade.jsPay&userId=userId&key=123。
    //注意参数排序
    let price = this.state.price;
    let params = {}
    params["amount"] = utils.accMul(price, 100);
    params["comOrderNo"] = this.state.orderData.comOrderNo;
    params["companyNo"] = this.state.orderData.companyNo
    params["payType"] = payType;
    params["service"] = "trade.jsPay";
    params["userId"] = "oHHGmwBryETTaIw27Y-dn3Q4A5cw";
    params["customerNo"] = this.props.storeCustomer.customerNo;
    params["qrcodeAuthCode"] = this.props.storeCustomer.randomCode;
    //对象 字典序
    params = utils.sortByLetter(params);
    //生成签名
    params["signData"] = md5(this.joinUrlStr(params, this.state.orderData.signKey)).toUpperCase();
    return params;
  }
  joinUrlStr(params, signKey) {
    let str = "";
    for (let key in params) str += `${key}=${params[key]}&`
    str += `key=${signKey}`;
    return str;
  }
  Toast(title){
    Taro.showToast({
      title: title,
      duration: 2000
    }).then(res => console.log(res))
  }
   //获取订单接口
   checkOrderData(params) {
    //传入参数示例
    if (!params.customerNo) { this.Toast("未获取商户编号！"); return false; }
    if (!params.companyNo) { this.Toast("未获取机构编号！"); return false; }
    if (!params.payType) { this.Toast("未指定支付类型！"); return false; }
    if (!params.amount) { this.Toast("请填写支付金额！"); return false; }
    if (!params.qrcodeAuthCode) { this.Toast("未获得授权码编号！"); return false; }
    if (!params.userId) { this.Toast("未获得userId！"); return false; }
    if (!params.signData) { this.Toast("未获得签名信息！"); return false; }
    if (!params.comOrderNo) { this.Toast("未生成唯一订单号！"); return false; }
    if (!params.service) { this.Toast("service！"); return false; }
    return true
  }
  // 生成订单
  creatOrder(){
    let sendData = this.createOrderParams('WECHAT')
    if(this.checkOrderData(sendData)){
      this.setState({
        sending:true
      })
      this.props.dispatchCustomerOrder(sendData).then((res)=>{
        let payInfo = res.payInfo||false;
        if (typeof payInfo === "string") {
          // 调用微信支付
          this.wechatPay(JSON.parse(payInfo))
          // this.onBridgeReady(JSON.parse(payInfo));
        }
       // 支付信息推送成功
      //  data.payInfo
        setTimeout(()=>{
          this.setState({
            sending:false
          })
        },300)
      }).catch(()=>{
        setTimeout(()=>{
          this.setState({
            sending:false
          })
        },300)
      })
    }
  }
  // 微信支付
  wechatPay(wxSign){
    Taro.requestPayment({
      timeStamp:wxSign.timeStamp,//时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
      nonceStr:wxSign.nonceStr,//随机字符串，长度为32个字符以下。
      package:wxSign.package,//	统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
      signType:wxSign.signType,//	签名类型，默认为MD5，支持HMAC-SHA256和MD5。注意此处需与统一下单的签名类型一致
      paySign:wxSign.paySign//签名,具体签名方案参见微信公众号支付帮助文档;
    }).then(res=>{
      console.log('支付成功',res)
    }).catch(err=>{
      console.log('支付失败',err)
    })
  }
  render () {
    return (
      <View className='payment-page'>
        <View className='header'>
          <View className='user-top'>
              <View className='bs-flex-center'>
                  <AtAvatar image='https://jdc.jd.com/img/200' className='avatar' circle ></AtAvatar>
              </View>
              <View className='bs-text-center'>抓蛙部落阁</View>
          </View>
          <View className='bs-text-center'>付款</View>
          <AtDivider content='PAYMENT' fontColor='#2d8cf0' lineColor='#2d8cf0' />
          <InputPay label='消费金额' icon='¥' price={this.state.price} sending={this.state.sending}></InputPay>
        </View>
        <View className='bs-top-20'></View>
        <View className='body'>
        <KeyboardPrice
          price={this.state.price}
          sending={this.state.sending}
          onClickNum={this.selectedPriceNum.bind(this)}
          onConfirm={this.creatOrder.bind(this)
          }
        ></KeyboardPrice>
        </View>
      </View>
    )
  }
}
export default Payment
