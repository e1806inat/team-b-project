import React from 'react'
import DasekiHistory from './DasekiHistory'

const DasekiHistoryList = ({ dasekiesInfo }) => {
  console.log(dasekiesInfo)
  if (dasekiesInfo.length >= 1) {
    //console.log('aaaa');
    var tmp = dasekiesInfo[0]['inning'];
    console.log(tmp);
    var cnt = 0;
    var ind = 0;
    for (var value of dasekiesInfo) {
      if (tmp === value['inning'] && cnt !== 0) {
        dasekiesInfo[ind]['inning'] = null;
      } else {
        tmp = value['inning'];
        cnt = 0;
      }
      ind++;
      cnt++;
    }
  }

  console.log(dasekiesInfo)

  return dasekiesInfo.map((dasekiInfo) => <DasekiHistory dasekiInfo={dasekiInfo} />);
};

export default DasekiHistoryList;