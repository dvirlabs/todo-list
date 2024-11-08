import './App.css';
import './components/TodoListTable';
import TodoListTable from './components/TodoListTable';
import InsertNewTask from './components/InsertNewTask';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoListTable />
        <InsertNewTask />
      </header>
    </div>
  );
}

export default App;
