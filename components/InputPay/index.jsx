import { View,Text } from '@tarojs/components'
import Taro, { Component } from '@tarojs/taro'
// import classNames from 'classnames'
// import { AtIcon } from 'taro-ui'
import './index.scss'

class InputPay extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      focus:false
    }
  }
  componentWillMount(){
    setTimeout(()=>{
      this.setState({
        focus:true
      })
    },500)
  }
  inputFocus(){
    this.setState({
      focus:true
    })
  }
  render(){
    return (
      <View className='price-input' >
        <Text className='label'>{this.props.label}:</Text>
        <Text className='icon'>{this.props.icon}</Text>
          <View className='input-body' onClick={this.inputFocus.bind(this)}>
            {this.props.price}
            {(!this.props.sending)&&this.state.focus&&<Text class='cursor'></Text>}
          </View>
      </View>
    )
  }
}

export default InputPay
