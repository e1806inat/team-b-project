import React from 'react'
import DasekiHistory from './DasekiHistory'

const DasekiHistoryList = ({dasekiesInfo}) => {
    return dasekiesInfo.map((dasekiInfo) => <DasekiHistory dasekiInfo={dasekiInfo}/>);
  };
  
  export default DasekiHistoryList;