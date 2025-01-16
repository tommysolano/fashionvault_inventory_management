import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Routes from "./router/Routes";
import "./assets/css/App.css";

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content h-screen w-4/5 flex flex-col">
          <Routes />
        </div>
      </div>
    </Router>
  );
};

export default App;
