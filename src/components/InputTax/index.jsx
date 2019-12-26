import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtInput, AtButton } from 'taro-ui'

class InputTax extends Component {
  constructor () {
    super(...arguments)
    this.state = {
    }
  }
  componentWillMount () {}

  componentDidMount () {}

  componentDidShow () {}

  componentDidHide () {}

  formDataChange(value){
    this.props.onChange(value)
  }
  // 点击查询税号按钮
  searchTaxHandle(){
    Taro.navigateTo({
      url: '/pages/tianyancha/tianyancha?enterpriseName='+this.props.enterpriseName
    })
  }
  render () {
        {
        return !this.props.show?null:<View>
          <AtInput
            name={this.props.name}
            title={this.props.title}
            type={this.props.type}
            placeholder={this.props.placeholder}
            value={this.props.value}
            onChange={this.formDataChange.bind(this)}
          >
          {this.props.butShow&& <AtButton className='but-r'  onClick={this.searchTaxHandle.bind(this)}type='primary' size='small'>查询税号</AtButton>}
          </AtInput>
        </View>
      }
  }
}
export default InputTax
