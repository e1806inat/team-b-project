import './Games.css';
import React from 'react';

{/*const Games = (props) => {
    return(
        <div>
            <h2>{props.Date}</h2>
            console.log(props.Date);
        </div>
    );
};*/}

function Games() {
    return(
        <div>
            <div className='targetModules'>
                <div className='gameName'>春季大会</div>
                <div className='gameDetaile'>
                    <div className='gamePlace'>浜山公園</div>
                    <div className='gameCard'>
                        <div className='firstAttackTeam'>平田</div>
                        <div className='gameScare'>
                            <div className='firstAttackTeamScore'>1</div>
                            <div className='gameState'>5会裏</div>
                            <div className='secondAttackTeamScore'>3</div>
                        </div>
                        <div className='secondAttackTeam'>出雲</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Games;