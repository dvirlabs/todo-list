import './App.css';
import TodoListTable from './components/TodoListTable';
import InsertNewTask from './components/InsertNewTask';
import TodoListTitle from './components/TodoListTitle';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoListTitle />
        <TodoListTable />
        <InsertNewTask />
      </header>
    </div>
  );
}

export default App;
