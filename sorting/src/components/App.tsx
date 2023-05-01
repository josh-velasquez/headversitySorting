// import Header from './Header'
import Omnisort from "./Omnisort";
import NavBar from "./NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Documentation from "./Documentation";
import "../styling.css";
import { Provider } from "react-redux";
import { store } from "../state";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Omnisort />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Provider>
  );
};
export default App;
