import React, { useState, useEffect } from "react";
import "../Styles/CompanyDetails.css";
import { useSelector, useDispatch } from 'react-redux';
import api from "axios";

const CompanyDetails = ({ popUp, closePopUp }) => {
  const dispatch = useDispatch();
  const companyId = useSelector(state => state.companyId)

  const [company, setCompany] = useState(null);

  useEffect(() => {
    api
    .get(
      `http://localhost:3000/api/companies/${companyId}.json`
    )
    .then((dbRes) => {   
       setCompany(dbRes.data);
   
    })
    .catch((err) => console.log(err));
  }, [companyId]);

  // hide functions

  function handleHideCompany(id) {
    dispatch({ type: "HIDE", payload: id });
  }
  
  
  // API lag protection

  if (!company) return <div></div>;

  return (
    <div>
      <div className={`company-popup-container flex ${popUp ? "" : "hide"}`}>
        <div className="company-popup flex-col">
          <h1 className="popup-title">{company.name}</h1>
          <div className="popup-info flex-col">
            <h2 className="popup-subtitle">Company ID: {company.id}</h2>
            <h2 className="popup-subtitle">
              City: {company.city === "" ? "Unknown" : company.city}
            </h2>
            <h2 className="popup-subtitle">
              Website:{" "}
              {company.website === "" ? (
                "Unknown"
              ) : (
                <a
                  className="website-link"
                  target="_blank"
                  rel="noreferrer noopener"
                  href={company.website}
                >
                  {company.website}
                </a>
              )}
            </h2>
          </div>
          <div className="popup-close-box flex">
            <div
              className="close-box flex"
              onClick={() => {
                handleHideCompany(String(company.id));
              }}
            >
              <h1 className="close flex">Hide this Company</h1>
            </div>
            <div className="close-box flex" onClick={closePopUp}>
              <h1 className="close flex">Back</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
