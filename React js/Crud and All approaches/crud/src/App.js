
import './App.css';
import { Link } from 'react-router-dom';
import MyRouter from './Router/mypath.js'

function App() {
  return (
    <div>
      <Link to="/">Student</Link>
      <Link to="/home">Home</Link>
      <MyRouter/>
    </div>
  );
}

export default App;
