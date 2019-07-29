import { createStore } from 'redux'

const defaultState = {
  dpr: window.devicePixelRatio || 1,
  queryVal: ''
}
// const actions = {
//   increase: () => ({type: 'CHANGE_QUERY'}),
//   decrease: () => ({type: 'DECREASE'})
// }
const reducer = (state = defaultState, action) => {
  if (action.type === 'CHANGE_QUERY') {
    const newState = JSON.parse(JSON.stringify(state))
    newState.queryVal = action.value
    return newState
  }
  return state
}

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())


export default store
