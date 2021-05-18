import React, { useEffect } from "react";
import "./App.css";
import CompanyList from "./Components/CompanyList";
import CompanyDetails from "./Components/CompanyDetails";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const hidden = useSelector((state) => state.hidden);

  // Initial pull from local storage

  useEffect(() => {
    const hiddenList = JSON.parse(localStorage.getItem("hidden"));
    if (hiddenList.length !== 0) dispatch({ type: "SET", payload: hiddenList });
  }, [dispatch]);

  // local storage update

  useEffect(() => {
    localStorage.setItem("hidden", JSON.stringify(hidden));
  }, [hidden]);

  return (
    <div className="App">
      <div className="title flex">
        <h1 className="main-title">Sharework Company List</h1>
      </div>

      <CompanyList />
      <CompanyDetails />
    </div>
  );
}

export default App;
