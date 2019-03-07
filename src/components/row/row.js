import React from 'react';

import './row.css';

const Row = ({ left, right }) => {
  return(
    <div className='row'>
    <div className="col-md-1"></div>
      <div className="col-md-5">
        {left}
      </div>
      <div className="col-md-5">
        {right}
      </div>
      <div className="col-md-1"></div>
    </div>
  )
};

export default Row;
