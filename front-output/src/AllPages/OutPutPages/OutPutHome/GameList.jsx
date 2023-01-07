import React from 'react'
import Game from './Game'

const GameList = ({ games, duringGames }) => {
  // for(var value of duringGame){
  //   Object.keys(games).find(key => games[key] === value.game_id);
  // }
  for (var value1 of duringGames) {
    var cnt = 0
    for (var value2 of games) {
      if (value1.game_id === value2.game_id) {
        games[cnt].tmp_table_name = value1.tmp_table_name;
      }
      cnt = cnt + 1;
    }
  }
  return games.map((game) => <Game game={game} />);
};

export default GameList;