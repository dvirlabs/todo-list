import './App.css';
import TodoListTable from './components/TodoListTable';
import InsertNewTask from './components/InsertNewTask';
import TodoListTitle from './components/TodoListTitle';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <ToastContainer
        toastClassName="toast-message"
        position="bottom-right"
        autoClose={3000}
        closeOnClick 
        rtl={true} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover
      />
        <TodoListTitle />
        <TodoListTable />
        <InsertNewTask />
      </header>
    </div>
  );
}

export default App;
