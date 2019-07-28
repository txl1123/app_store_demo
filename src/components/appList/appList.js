import React from 'react'
// import './appList.scss'
import { getAppList } from '../../api/index'
class AppList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      list: []
    }
  }
  render () {
    return (
      <div className="app_list">
        <div className="app_item">
          <span className="item_no">1</span>
          <div className="item_img"></div>
          <div className="item_info">
            <p className="item_name"></p>
            <p className="item_intro"></p>
            <p className="item_price"></p>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount(){
    this.getData()
  }
  getData () {
    getAppList({_page : this.state.page}).then(res => {
      console.log(res)
      this.setState({
        list: res
      })
    })
  }
}
export default AppList
