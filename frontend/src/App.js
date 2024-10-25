import './App.css';
import './components/TodoListTable';
import TodoListTable from './components/TodoListTable';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoListTable />
      </header>
    </div>
  );
}

export default App;
