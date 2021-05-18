import React, { useState, useEffect } from "react";
import "../Styles/CompanyList.css";
import api from "axios";
import { useSelector, useDispatch } from "react-redux";

const CompanyList = ({ openPopUp }) => {
  const dispatch = useDispatch();
  const hidden = useSelector((state) => state.hidden);

  const [companyList, setCompanyList] = useState([]);
  const [page, setPage] = useState(1);

  // API get request

  useEffect(() => {
    api
      .get(`http://localhost:3000/api/companies-${page}.json`)
      .then((dbRes) => {
        setCompanyList(dbRes.data.results);
      })
      .catch((err) => console.log(err));
  }, [page]);

  // Hide functions

  function handleHideCompany(id) {
    dispatch({ type: "HIDE", payload: id });
  }

  function handleReset() {
    dispatch({ type: "RESET" });
  }

  function handleUndo() {
    dispatch({ type: "UNDO" });
  }

  // Company details

  function handleSetCompany(id) {
    dispatch({ type: "COMPANYCHANGE", payload: id });
    openPopUp();
  }

  // Change page

  function handleMoveListPrev() {
    if (page === 1) return;
    setPage(page - 1);
  }

  function handleMoveListNext() {
    setPage(page + 1);
  }

  // API lag protection

  if (companyList.length === 0) return <div>loading...</div>;

  // console.log(hidden);

  return (
    <div className="companylist-main flex-col">
      <table className="company-table flex-col">
        <thead className="company-table-head flex">
          <tr className="company-table-row">
            <th className="company-table-title title-name">
              <h2>Company Name</h2>
            </th>
            <th className="company-table-title title-id">
              <h2>Company ID</h2>
            </th>
            <th className="company-table-title title-buttons flex">
              <p className="list-button smaller" onClick={handleUndo}>
                Undo hide
              </p>
              <p className="list-button smaller" onClick={handleReset}>
                Reset list
              </p>
            </th>
          </tr>
        </thead>
        <tbody className="company-table-body">
          {companyList.map((company) =>
            hidden.includes(company.id) ? (
              ""
            ) : (
              <tr className={`company-list-item flex`} key={company.id}>
                <td
                  className="company-list-name"
                  onClick={() => {
                    handleSetCompany(company.id);
                  }}
                >
                  <h3>{company.name}</h3>
                </td>
                <td
                  className="company-list-other"
                  onClick={() => {
                    handleSetCompany(company.id);
                  }}
                >
                  <h3>{company.id}</h3>
                </td>
                <td className="company-list-other">
                  <div
                    className={`company-list-button flex`}
                    onClick={() => {
                      handleHideCompany(company.id);
                    }}
                  >
                    Hide
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      <div className="pageLinks flex">
        <p className={`list-button`} onClick={handleMoveListPrev}>
          Previous
        </p>
        <p>Page {page}</p>
        <p className={`list-button`} onClick={handleMoveListNext}>
          Next
        </p>
      </div>
    </div>
  );
};

export default CompanyList;
