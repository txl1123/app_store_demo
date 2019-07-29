import React from 'react';
import AppList from './components/appList/appList'
import Recomend from './components/recomend'
import SearchBar from './components/SearchBar/searchBar'
function App() {
  return (
    <div className="App">
      <SearchBar></SearchBar>
      <Recomend></Recomend>
      <AppList></AppList>
    </div>
  );
}

export default App;
