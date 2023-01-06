
//各種ページのインポート
import {RefSchool, RefTournamentSchool} from './PageIndex';
  
  //import { OutPutGame } from './AllPage/OutPutGame/OutPutGame'
  
  import React from 'react'
  import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
  import './App.css';
// import RefTournamentMember from './RefTournamentMember/RefTournamentMember';
  
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
            {/* 選手情報参照画面 */}
            <Route path={routeUrl + '/ref_school'} element={<RefSchool />} />

             {/*大会登録選手情報参照画面*/}
             <Route path={routeUrl + '/ref_Pschool'} element={<RefTournamentSchool />} />
          </Routes>
        </BrowserRouter>
  

      </div>
    );
  };
  
  export default App;