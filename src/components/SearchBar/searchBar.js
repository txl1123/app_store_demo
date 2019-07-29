import React, { Component } from 'react';
import './searchBar.scss'
import store from '../../store';
class SearchBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      q: ''
    }
  }
  render() {
    return (
      <div className="search_bar">
        <div className="s_wrap">
          <p className="s_placeholder" style={{display: this.state.q ? 'none': 'block'}}>搜索</p>
          <input className="s_inpt" value={this.state.q} onChange={this.inputChange}></input>
        </div>
      </div>
    );
  }
  inputChange = (e) => {
    // console.log(e.target.value)
    this.setState({
      q: e.target.value
    })
    const action = {
      type: 'CHANGE_QUERY',
      value: e.target.value
    }
    store.dispatch(action)
    window.scrollTo(0, 0)
  }

}
export default SearchBar