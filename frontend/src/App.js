
/*
import React from 'react';
import './App.css';

function App() {
 let items =[
  {"name":"いちご", "price": "100"},
  {"name": "りんご", "price":"150"},
  {"name":"バナナ", "price":"230"}
 ]

 return (
  <div className="App container">
    <table className="table table-striped">
      <tbody>
        {items.map((value)=> (
        <tr>
          <th scope="row">{value.name}</th>
          <tb>{value.price}円</tb>
        </tr>
        ))}
      </tbody>
    </table>
    <Clock />
  </div>
 )
}

class Clock extends React.Component {
  render() {
    return <p>コンポーネントだよ</p>
  }
}



export default App;
*/
/*
import { Top, Login, TodoList, Home, Input_mode} from './components/index';
import React, { Component } from 'react'
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route path='/top' component={Top} />
        <Route path='/home' component={Home} />
        <Route path='/todo' component={TodoList} />
        <Route path='/input_mode' component={Input_mode} />
      </Switch>
      
    <button>
      <Link to='/'>Back To Login</Link>
      </button>
    </BrowserRouter>
  );
};
*/

import { Top, Login, TodoList, Home, Input_mode, Pre_Input, InputSchool, Input_Tournament, Input_Member, Sokuho_Input, NotFound, TournamentNamber} from './components/index';
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
        <Route path={'/home/input_mode/sokuho_input/'} element={<Sokuho_Input/>} />
        <Route path={'/home/input_mode/pre_input/'} element={<Pre_Input/>} />
        <Route path={'/home/input_mode/pre_input/input_tournament/'} element={<Input_Tournament/>} />
        <Route path={'/home/input_mode/pre_input/inputschool/'} element={<InputSchool/>} />
        <Route path={'/home/input_mode/pre_input/input_member/'} element={<Input_Member/>} />
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