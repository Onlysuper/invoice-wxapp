import { View } from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'
import classNames from 'classnames'
import { AtIcon } from 'taro-ui'
import './index.scss'

class KeyboardPrice extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      payDis:false, // 支付按钮禁用
      open:false,
      values: [],
      maxMoney:999999999,
      numbers: [
        { name: "1" },
        { name: "2" },
        { name: "3" },
        { name: "4" },
        { name: "5" },
        { name: "6" },
        { name: "7" },
        { name: "8" },
        { name: "9" },
        { name: "0", full: true },
        { name: "." },
      ]
    }
  }
  componentWillMount(){
    this.setState({
      values:String(this.props.price).split("")
    })
    setTimeout(()=>{
      this.setState({
        open:true
      })
    },500)
  }
  componentWillReceiveProps(){
    this.setState({
      values:String(this.props.price).split("")
    })
    console.log('初始化2',this.state.values)
  }
  isMoneyRule(money) {
    if (money === '.') this.state.values.unshift("0") //处理首字母为 . 的情况 改为 0.
    this.payDisable = !Boolean(Number(money)) //处理没有输入金额的情况 禁用支付按钮 0 或 0.0 或 0.00的情况
    this.btnDisable = (money.split(".")[1] || "").length >= 2; //处理小数点【>=】两位的情况 禁用键盘
    return money;
  }
  handleDelete() {
    console.log('删除');
    let newValues=this.state.values;
    newValues.pop();
    this.setState({
      values: newValues
    })
    this.sendPrice();
  }
  numSelected(val){
      let newValues = this.state.values;
      let number = val;
      if (number === "." && newValues.indexOf(number) !== -1) return;//处理有多个小数点的情况 禁止push
      if (Number(newValues.join("") + number) > this.state.maxMoney) return;//处理最大金额 禁止push
      if (newValues.join("") === "0") this.handleDelete();//c循环删除 同时解决输入两个0 和 0和任意数字 的情况
      newValues.push(number);
      this.setState({
        values:newValues
      })
      this.sendPrice();
  }
  sendPrice(){
    let money = this.state.values.join("")
    this.props.onClickNum(money)
  }
  // 确认支付
  confirmPay(){
    this.props.onConfirm();
  }
  render(){
    return (
    <View className={classNames('keyboard-price',(!this.props.sending)&&this.state.open&&'show')}>
        {/* {this.state.values} */}
        <View className='numbers'>
          {
            this.state.numbers.map((item)=>{
              return (
                <View className={item.full?'full item':'item'} key={item.name} onClick={this.numSelected.bind(this,item.name)}>{item.name}</View>
              )
            })
          }
        </View>
        <View className='btns'>
          <View className='item delete-btn' onClick={this.handleDelete.bind(this)}>
            <AtIcon value='close' size='30' color='#666'></AtIcon>
          </View>
          <View onClick={this.confirmPay.bind(this)} className={classNames('item pay-btn',this.state.payDis&&'disable')}>确认支付</View>
        </View>
    </View>
    )
  }
}

export default KeyboardPrice
