

import { Top, Login, TodoList, Home, Input_mode, Pre_Input, InputSchool, Input_Tournament, InputMember, Sokuho_Input_Makegame, NotFound, TournamentNamber} from './components/index';
import React from 'react'
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>      
        <Route path={'/'} element={<Top/>} />
        <Route path={'/login'} element={<Login/>} />
        <Route path={'/home/'} element={<Home/>} />
        <Route path={'/todo/'} element={<TodoList/>} />
        <Route path={'/home/input_mode/'} element={<Input_mode/>} />
        <Route path={'/home/input_mode/sokuho_input_makegame/'} element={<Sokuho_Input_Makegame/>} />
        <Route path={'/home/input_mode/pre_input/'} element={<Pre_Input/>} />
        <Route path={'/home/input_mode/pre_input/input_tournament/'} element={<Input_Tournament/>} />
        <Route path={'/home/input_mode/pre_input/inputschool/'} element={<InputSchool/>} />
        <Route path={'/home/input_mode/pre_input/InputMember/'} element={<InputMember/>} />
        <Route path={'/home/input_mode/pre_input/input_tournament/TournamentNamber/:id/'} element={<TournamentNamber/>} />

        <Route path={'*'} element={<NotFound />} />
      </Routes>
    <button>
      <Link to={'/login'}>Back To Login</Link>
      </button>
    </BrowserRouter>
  );
};

export default App;