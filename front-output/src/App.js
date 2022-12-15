import { BrowserRouter, Route, Routes } from 'react-router-dom'

//各種ページのインポート
import {
  Home, OutPutHome, PastDataHome,
} from './AllPages/pageIndex';


const App = () => {
  return (
    <>

      <div>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Home />} />

            {/* 出力画面 */}
            <Route path={'/OutPutHome/'} element={<OutPutHome />} />

            {/* 過去データ参照 */}
            <Route path={'/PastDataHome/'} element={<PastDataHome />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>

  );
}

export default App;
