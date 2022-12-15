import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


const Home = () => {
  //ページ遷移用
  const navigate = useNavigate()
  const PageTransition = (url) => {
    navigate(url)
  }

  //とりあえず出力に遷移
  useEffect(() => {
    PageTransition("OutPutHome")
  })


}

export default Home;
