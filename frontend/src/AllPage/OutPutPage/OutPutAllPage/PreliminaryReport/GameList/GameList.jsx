import { OptionFunc } from '../../../Functions/OptionFunc/OptionFunc'
import { useNavigate } from 'react-router-dom'

const goToPage = () => {
    console.log("移動します")
}

const GameList = () => {
    //ページ遷移用
    const navigate = useNavigate()
    const PageTransition = (url) => {
        navigate(url)
    }

    //オプションメニューのための配列作るよ
    const optionArray = [{ name: "過去データ", url: "/PastDataHome" }]


    return (
        <>
            <OptionFunc
                menuName={"メニュー"}
                optionArray={optionArray}
                PageTransition={PageTransition}
            ></OptionFunc>

            <div class="whole">
                <div class="date">
                    {/* <!-- <input type="date" name="today" id="today"> --> */}
                    10月30日(日)
                </div>
                <div class='targetModules'>
                    <div class='gameName'>春季中国地区高等学校野球島根県大会　東部地区</div>
                    <div class="displayGames" onClick={goToPage}>
                        <div class='gameDetaile'>
                            <div class='gameRound'>3回戦</div>
                            <div class='gameCard'>
                                <div class='firstAttackTeam, teamName'>平田</div>
                                <div class='gameScore'>
                                    <div class='firstAttackTeamScore'>1</div>
                                    <div class='gameState'>5回裏</div>
                                    <div class='secondAttackTeamScore'>3</div>
                                </div>
                                <div class='secondAttackTeam, teamName'>出雲</div>
                            </div>
                            <div class="gamePlace">浜山公園野球場</div>
                        </div>
                        <p></p>

                    </div>
                </div>
            </div>
        </>

    );
}

export default GameList;
