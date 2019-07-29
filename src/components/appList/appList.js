import React from 'react'
import './appList.scss'
import { getAppList } from '../../api'
import LazyLoad from '../LazyLoad'
import Placeholder from '../Placeholder'
import store from '../../store'
class AppList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1,
      list: [],
      hasMore: true,
      q: store.getState().queryVal || '',
      dpr: store.getState().dpr
    }
    store.subscribe(
      this.handleStoreChange
    )
  }
  render () {
    return (
      <div className="app_list">
        {
          this.state.list.map((item, index) => {
            return (
              <div className="app_item" key={item.id.attributes["im:id"]}>
                <span className="item_no">{ index + 1 }</span>
                {/* <div className="item_img" style={{ backgroundImage:'url('+ item["im:image"][0].label +')'}}> */}
                <div className="item_img">
                  <LazyLoad offset={50} placeholder={<Placeholder/>}>
                    <img className="list-img" alt="item" src={item["im:image"][this.state.dpr - 1].label}></img>
                  </LazyLoad>
                </div>
                <div className="item_info">
                  <p className="item_name">{ item["im:name"].label }</p>
                  <p className="item_category">{ item.category.attributes.label }</p>
                  <p className="item_price">
                  { parseFloat(item["im:price"].attributes.amount) === 0 ? '免费' : parseFloat(item["im:price"].attributes.amount) + item["im:price"].attributes.currency }
                  </p>
                </div>
              </div>
            )
          })
        }
        <div ref="wrapper"></div>
      </div>
    )
  }
  componentDidMount(){
    this.getData()
    // this.scrollInit()
    const wrapper = this.refs.wrapper
    let timeCount = null
    window.addEventListener('scroll', () => {
      if (!this.state.hasMore) {
        return false
      }
      if (timeCount) {
        clearTimeout(timeCount);
      }
      timeCount = setTimeout(() => {
        this.loadMore(wrapper)
      }, 50);
    }, false)
  }
  getData = () => {
    const params = {
      q: this.state.q,
      _page: this.state.page
    }
    getAppList(params).then(res => {
      console.log(res)
      if (!res.length) {
        return this.setState({
          hasMore: false
        })
      }
      let list = this.state.list
      list.push.apply(list, res)
      this.setState({
        list
      })
    })
  }
  loadMore(wrapper) {
    const top = wrapper.getBoundingClientRect().top;
    const windowHeight = window.screen.height;
    // console.log(top, windowHeight)
    if (top && top - 20 < windowHeight) {
      // 当 wrapper 已经被滚动到页面可视范围之内触发
      this.setState({
        page: this.state.page + 1
      }, () => {
        this.getData()
      })
    }
  }
  handleStoreChange = () => {
    // console.log(store.getState())
    this.setState({
      page: 1,
      list: [],
      hasMore: true,
      q: store.getState().queryVal || ''
    }, () => {
      this.getData()
    })
  }
}
export default AppList
