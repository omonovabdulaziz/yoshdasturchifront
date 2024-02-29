import React from 'react';
import { Col, Row, Statistic } from 'antd';
import axios from 'axios';

const { Countdown } = Statistic;

const ContestDate = ({ endDate }) => {
  // console.log(props)
  const onChange = () => {
    // Handle countdown change if needed
  };

  return (
    <>
    <p>here</p>
      {/* {endDate && <Countdown title="Countdown" value={endDate} onChange={onChange} />} */}
    </>
  );
};


export default ContestDate;
