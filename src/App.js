
//各種ページのインポート
import {
  Top, Login, Home, Input_mode, Pre_Input,
  InputSchool, Input_Tournament, InputMember, Sokuho_Input_Makegame,
  InputPlayGame, NotFound, TournamentNamber, Register, StartingMember,
} from './AllPage/PageIndex';

import { OutPutGame } from './AllPage/OutPutGame/OutPutGame'

import React from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import './App.css';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<Top />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/home/'} element={<Home />} />

          {/* 事前入力 */}
          <Route path={'/home/pre_input/input_tournament/'} element={<Input_Tournament />} />
          <Route path={'/home/pre_input/input_tournament/:tournament/inputschool/'} element={<InputSchool />} />
          <Route path={'/home/pre_input/input_tournament/:tournament/inputschool/:school/InputMember/'} element={<InputMember />} />

          {/* 速報入力 */}
          <Route path={'/home/sokuho/sokuho_input_makegame/'} element={<Sokuho_Input_Makegame />} />
          <Route path={'/home/sokuho/sokuho_input_makegame/:vs/starting_member'} element={<StartingMember />} />
          <Route path={'/home/InputPlayGame/'} element={<InputPlayGame />} />

          {/* アカウント登録 */}
          <Route path={'/home/acount_register'} element={<Register />} />

          {/* 出力画面 */}
          <Route path={'/home/output_game/'} element={<OutPutGame />} />


          <Route path={'/home/input_mode/'} element={<Input_mode />} />
          <Route path={'/home/input_mode/sokuho_input_makegame/'} element={<Sokuho_Input_Makegame />} />
          <Route path={'/home/input_mode/pre_input/'} element={<Pre_Input />} />
          <Route path={'/home/input_mode/pre_input/input_tournament/'} element={<Input_Tournament />} />
          <Route path={'/home/input_mode/pre_input/inputschool/'} element={<InputSchool />} />
          <Route path={'/home/input_mode/pre_input/InputMember/'} element={<InputMember />} />
          <Route path={'/home/input_mode/pre_input/input_tournament/TournamentNamber/:id/'} element={<TournamentNamber />} />
          <Route path={'/home/input_mode/Sokuho_Input_Makegame/InputPlayGame/:id/'} element={<InputPlayGame />} />

          <Route path={'*'} element={<NotFound />} />
        </Routes>
        <button>
          <Link to={'/login'}>Back To Login</Link>
        </button>
      </BrowserRouter>





    </div>
  );
};

export default App;