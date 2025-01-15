import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Routes from "./router/Routes";
import "./assets/css/App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes />
        </div>
      </div>
    </Router>
  );
};

export default App;
