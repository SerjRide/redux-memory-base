import React from 'react';

import './row.css';

const Row = ({ left, right }) => {
  return(
    <div className='row'>
    <div className="col-lg-1"></div>
      <div className="col-lg-5">
        {left}
      </div>
      <div className="col-lg-5">
        {right}
      </div>
      <div className="col-lg-1"></div>
    </div>
  )
};

export default Row;
