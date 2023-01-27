
//各種ページのインポート
import {
  Top, Login, Home,
  InputSchool, Input_Tournament, InputMember, Sokuho_Input_Makegame,
  InputPlayGame, NotFound, Register, StartingMember,
  SokuhoSelectTournament,
} from './AllPage/PageIndex';

import {
  OutPutHome, GameList, Bulletin, SlcTournamentForT, SlcTournamentForP, RefSchool
} from "./AllPage/OutPutPage/PageIndex"

import { routeUrl } from './DB/communication';

import { OutPutGame } from './AllPage/OutPutGame/OutPutGame'

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
          <Route path={routeUrl + '/'} element={<Top />} />
          <Route path={routeUrl + '/login'} element={<Login />} />
          <Route path={routeUrl + '/home/'} element={<Home />} />
          <Route path={routeUrl + '/j_R4_team_b/frontend/'} element={<Home />} />

          {/* 事前入力 */}
          <Route path={routeUrl + '/home/pre_input/input_tournament/'} element={<Input_Tournament />} />
          <Route path={routeUrl + '/home/pre_input/input_tournament/inputschool/'} element={<InputSchool />} />
          <Route path={routeUrl + '/home/pre_input/input_tournament/inputschool/InputMember/'} element={<InputMember />} />

          {/* 速報入力 */}
          <Route path={routeUrl + '/home/sokuho/sokuho_select_tournament/'} element={< SokuhoSelectTournament />} />
          <Route path={routeUrl + '/home/sokuho/sokuho_select_tournament/sokuho_input_makegame/'} element={<Sokuho_Input_Makegame />} />
          <Route path={routeUrl + '/home/sokuho/sokuho_select_tournament/sokuho_input_makegame/starting_member'} element={<StartingMember />} />
          <Route path={routeUrl + '/home/sokuho/sokuho_select_tournament/sokuho_input_makegame/starting_member/InputPlayGame/'} element={<InputPlayGame />} />
          <Route path={routeUrl + '/home/InputPlayGame/'} element={<InputPlayGame />} />

          {/* アカウント登録 */}
          <Route path={routeUrl + '/home/acount_register'} element={<Register />} />

          {/* 顧客用画面 */}
          <Route path={routeUrl + '/home/output_game/'} element={<OutPutGame />} />
          <Route path={routeUrl + '/home/OutputHome/'} element={<OutPutHome />} />
          <Route path={routeUrl + '/home/OutputHome/GameList'} element={<GameList />} />
          <Route path={routeUrl + '/home/OutputHome/GameList/Bulletin'} element={<Bulletin />} />

          {/* 速報閲覧 */}
          <Route path={routeUrl + '/home/OutputHome/SelectTournament'} element={<SlcTournamentForT />} />
          <Route path={routeUrl + '/home/OutputHome/SelectTournament/GameList'} element={<GameList />} />

          {/* 過去データ参照（選手全体から探す） */}
          <Route path={routeUrl + '/home/OutputHome/RefHistoricalData/RefSchool'} element={<RefSchool />} />

          {/* 過去データ参照（大会から探す） */}
          <Route path={routeUrl + '/home/OutputHome/RefHistoricalData/SelectTournament'} element={<SlcTournamentForP />} />


          <Route path={'*'} element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {console.log(routeUrl)}
    </div>
  );
};

export default App;