
//各種ページのインポート

import {
  OutPutHome, GameList, Bulletin, BulletinPast, SlcTournamentForT, SlcTournamentForP, RefSchool, RefTournamentSchool, NotFound
} from "./AllPages/pageIndex"

import { routeUrl } from './DB/communication';

import { OutPutGame } from './AllPages/OutPutGame/OutPutGame'

import React from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import './App.css';

//今回の開発で使えるサーバのurlを入力してください、「https: ~~~ ac.jp/ここのルートを指定する/」
//package.jsonも編集すること

// const routeUrl = "/j_R4_team_b/frontend"
// const routeUrl = "/team-b-project/frontend"
// const routeUrl = ""


const App = () => {
  // const routeUrl = require("./DB/communication")

  return (
    <div>
      <BrowserRouter>
        <Routes>

          {/* 顧客用画面 */}
          {/* <Route path={routeUrl + '/'} element={<OutPutHome />} /> */}
          <Route path={routeUrl + '/home/output_game/'} element={<OutPutGame />} />

          <Route path={routeUrl + '/GameList'} element={<GameList />} />
          <Route path={routeUrl + '/GameList/Bulletin'} element={<Bulletin />} />
          <Route path={routeUrl + '/GameList/BulletinPast'} element={<BulletinPast />} />

          {/* 速報閲覧 */}
          <Route path={routeUrl + '/'} element={<SlcTournamentForT />} />

          <Route path={routeUrl + '/GameList'} element={<GameList />} />

          <Route path={routeUrl + '/GameList/Bulletin'} element={<Bulletin />} />

          {/* 過去データ参照（選手全体から探す） */}
          <Route path={routeUrl + '/RefHistoricalData/RefSchool'} element={<RefSchool />} />

          {/* 過去データ参照（大会から探す） */}
          <Route path={routeUrl + '/GameList/RefTournamentSchool'} element={<RefTournamentSchool />} />


          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {console.log(routeUrl)}
    </div>
  );
};

export default App;