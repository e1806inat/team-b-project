import React from 'react'
import DasekiHistory from './DasekiHistory'

const DasekiHistoryList = ({ dasekiesInfo , gameData, score}) => {
  //n回最後の打席情報だけdasekiesInfo[0]['inning']を残し他はnullにする
  //これによって出力の際に複数回【n回表】or【n回裏】が表示されない

  const dasekiLen = dasekiesInfo.length;

  //console.log(dasekiLen)

  let inningArray = new Array(dasekiLen).fill(0);

  if (dasekiLen >= 1) {
    //console.log('aaaa');
    var tmp = dasekiesInfo[0]['inning'];
    var cnt = 0;
    var ind = 0;
    for (var value of dasekiesInfo) {
      if (tmp === value['inning'] && cnt !== 0) {
        //dasekiesInfo[ind]['inning'] = null;
        inningArray[ind] = null;
      } else {
        tmp = value['inning'];
        cnt = 0;
      }
      ind++;
      cnt++;
    }
  }

  inningArray.reverse();
  //console.log(dasekiesInfo)

  return dasekiesInfo.map((dasekiInfo) => <DasekiHistory dasekiInfo={dasekiInfo} gameData={gameData} score={score} inningArray={inningArray}/>);
};

export default DasekiHistoryList;