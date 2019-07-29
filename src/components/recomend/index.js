import React, { Component } from 'react';
import { getRecomendList } from '../../api'
import './index.scss'
import store from '../../store'

class Recomend extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      list: [],
      q: store.getState().queryVal || '',
      dpr: store.getState().dpr
    }
    store.subscribe(
      this.handleStoreChange
    )
  }
  render() {
    if (this.state.list.length) {
      return (
        <div className="recomend">
          <h2 className="r_title">推介</h2>
          <div className="recomend_list">
            <div className="recomend_wrap clearfloat">
            {
              this.state.list.map((item, index) => {
                return (
                  <div className="recomend_item" key={item.id.attributes["im:id"]}>
                    <div className="r_item_img" style={{ backgroundImage:'url('+ item["im:image"][this.state.dpr - 1].label +')'}}></div>
                    <p className="r_item_name">{ item["im:name"].label }</p>
                    <p className="r_item_category">{ item.category.attributes.label }</p>
                  </div>
                )
              })
            }
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="recomend"></div>
    }
  }
  componentDidMount(){
    this.getData()
  }
  getData = () => {
    const params = {
      q: this.state.q,
      _page: this.state.page
    }
    getRecomendList(params).then(res => {
      console.log(res)
      let list = this.state.list
      list.push.apply(list, res)
      this.setState({
        list
      })
    })
  }
  handleStoreChange = () => {
    // console.log(store.getState())
    this.setState({
      page: 1,
      list: [],
      q: store.getState().queryVal || ''
    }, () => {
      this.getData()
    })
  }
}
export default Recomend