import List from './features/list/List';
import Filter from './features/list/Filter';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Star Wars Catalogue</h1>
      <div className="appMain">
        <Filter />
        <List />
      </div>
    </div>
  );
}

export default App;
