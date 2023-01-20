import React from 'react'
import DasekiHistory from './DasekiHistory'

const DasekiHistoryList = ({ dasekiesInfo , gameData, score, scoreState1, scoreState2}) => {
  //n回最後の打席情報だけdasekiesInfo[0]['inning']を残し他はnullにする
  //これによって出力の際に複数回【n回表】or【n回裏】が表示されない
  if (dasekiesInfo.length >= 1) {
    //console.log('aaaa');
    var tmp = dasekiesInfo[0]['inning'];
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

  return dasekiesInfo.map((dasekiInfo) => <DasekiHistory dasekiInfo={dasekiInfo} gameData={gameData} score={score}  scoreState1={scoreState1} scoreState2={scoreState2}/>);
};

export default DasekiHistoryList;