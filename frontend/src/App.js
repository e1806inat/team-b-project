
//各種ページのインポート
import {
  Top, Login, Home,
  InputSchool, Input_Tournament, InputMember, Sokuho_Input_Makegame,
  InputPlayGame, NotFound, Register, StartingMember,
  SokuhoSelectTournament,
} from './AllPage/PageIndex';

import { OutPutGame } from './AllPage/OutPutGame/OutPutGame'

import React from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import './App.css';

//今回の開発で使えるサーバのurlを入力してください、「https: ~~~ ac.jp/ここのルートを指定する/」
//package.jsonも編集すること

// const routeUrl = "/j_R4_team_b/frontend"
// const routeUrl = "/team-b-project/frontend"
const routeUrl = ""


const App = () => {
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
          <Route path={routeUrl + '/home/pre_input/input_tournament/inputschool/:school/InputMember/'} element={<InputMember />} />

          {/* 速報入力 */}
          <Route path={routeUrl + '/home/sokuho/sokuho_select_tournament/'} element={< SokuhoSelectTournament />} />
          <Route path={routeUrl + '/home/sokuho/sokuho_select_tournament/sokuho_input_makegame/'} element={<Sokuho_Input_Makegame />} />
          <Route path={routeUrl + '/home/sokuho/sokuho_select_tournament/sokuho_input_makegame/starting_member'} element={<StartingMember />} />
          <Route path={routeUrl + '/home/sokuho/sokuho_select_tournament/sokuho_input_makegame/starting_member/InputPlayGame/'} element={<InputPlayGame />} />
          <Route path={routeUrl + '/home/InputPlayGame/'} element={<InputPlayGame />} />

          {/* アカウント登録 */}
          <Route path={routeUrl + '/home/acount_register'} element={<Register />} />

          {/* 出力画面 */}
          <Route path={routeUrl + '/home/output_game/'} element={<OutPutGame />} />

          <Route path={'*'} element={<NotFound />} />
        </Routes>
        <button>
          <Link to={routeUrl + '/login'}>Back To Login</Link>
        </button>
      </BrowserRouter>





    </div>
  );
};

export default App;