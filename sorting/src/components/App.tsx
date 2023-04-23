// import Header from './Header'
import Omnisort from "./Omnisort";
import React from "react";
import NavBar from "./NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Documentation from "./Documentation";
import "../styling.css";
import { Provider } from "react-redux";
import { store } from "../state";

const App = () => {
  return (
    <Provider store={store}>
      <div style={{ backgroundColor: "#284b63", height: 1500 }}>
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

// class App extends React.Component {
//   render() {
//     return (
//       // 875

//     );
//   }
// }

export default App;
