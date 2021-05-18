import React, { useState, useEffect } from 'react';
import '../Styles/CompanyDetails.css';
import { useSelector, useDispatch } from 'react-redux';
import api from 'axios';

const CompanyDetails = () => {
  const dispatch = useDispatch();
  const companyId = useSelector(state => state.companyId);
  const popUp = useSelector(state => state.popUp);

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

  const handleHideCompany = (id) => {
    dispatch({ type: 'HIDE', payload: id });
    dispatch({ type: 'POPUPCLOSE'}); 
  }
  
  // pop up functions
  
  const handleClosePopUp = () => {
    dispatch({ type: 'POPUPCLOSE'}); 
  }
  
  // API lag protection

  if (!company) return <div></div>;

  const { city, website, id, name} = company

  return (
    <div>
      <div className={`company-popup-container flex ${popUp ? '' : 'hide'}`}>
        <div className='company-popup flex-col'>
          <h1 className='popup-title'>{name}</h1>
          <div className='popup-info flex-col'>
            <h2 className='popup-subtitle'>Company ID: {id}</h2>
            <h2 className='popup-subtitle'>
              City: {company.city === '' ? 'Unknown' : city}
            </h2>
            <h2 className='popup-subtitle'>
              Website:{' '}
              {website === '' ? (
                'Unknown'
              ) : (
                <a
                  className='website-link'
                  target='_blank'
                  rel='noreferrer noopener'
                  href={website}
                >
                  {website}
                </a>
              )}
            </h2>
          </div>
          <div className='popup-close-box flex'>
            <div
              className='close-box flex'
              onClick={() => {
                handleHideCompany(String(id));
              }}
            >
              <h1 className='close flex'>Hide this Company</h1>
            </div>
            <div className='close-box flex' onClick={handleClosePopUp}>
              <p className='close flex'>Back</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
