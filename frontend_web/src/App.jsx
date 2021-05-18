import React, { useState, useEffect } from "react";
import "./App.css";
import CompanyList from "./Components/CompanyList";
import CompanyDetails from "./Components/CompanyDetails";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const hidden = useSelector((state) => state.hidden);

  const [popUp, setPopUp] = useState(false);

  // Initial pull from local storage

  useEffect(() => {
    const hiddenList = localStorage.getItem("hidden");
    if (hiddenList.length !== 0) dispatch({ type: "SET", payload: hiddenList });
  }, [dispatch]);

  // local storage update

  useEffect(() => {
    localStorage.setItem("hidden", JSON.stringify(hidden));
  }, [hidden]);

  // pop up functions

  function handleClosePopUp() {
    setPopUp(false);
  }

  function handleOpenPopUp() {
    setPopUp(true);
  }

  return (
    <div className="App">
      <div className="title flex">
        <h1 className="main-title">Sharework Company List</h1>
      </div>

      <CompanyList openPopUp={handleOpenPopUp} />

      <CompanyDetails closePopUp={handleClosePopUp} popUp={popUp} />
    </div>
  );
}

export default App;
