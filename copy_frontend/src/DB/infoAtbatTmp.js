const infoAtbatTmp = [
    {

    "table_name":"testdesu",
 
    "at_bat_id":"1", 
 
    "inning":"１回表",
 
    "game_id":"1",
 
    "school_id":"1",
 
    "player_id":"1", 
 
    "score":"0", 
 
    "total_score":"0",
 
    "outcount":"1", 
 
    "base":"000", 
 
    "text_inf":"三振", 
 
    "pass":"0", 
 
    "touched_coordinate":"123-456", 
 
    "ball_kind":"NULL"
 
 },
 {

    "table_name":"testdesu",
 
    "at_bat_id":"2", 
 
    "inning":"１回表",
 
    "game_id":"1",
 
    "school_id":"1",
 
    "player_id":"2", 
 
    "score":"0", 
 
    "total_score":"0",
 
    "outcount":"1", 
 
    "base":"001", 
 
    "text_inf":"ライト　ヒット", 
 
    "pass":"0", 
 
    "touched_coordinate":"123-456", 
 
    "ball_kind":"ゴロ"
 
 },
 {

    "table_name":"testdesu",
 
    "at_bat_id":"3", 
 
    "inning":"１回表",
 
    "game_id":"1",
 
    "school_id":"1",
 
    "player_id":"3", 
 
    "score":"0", 
 
    "total_score":"0",
 
    "outcount":"1", 
 
    "base":"110", 
 
    "text_inf":"レフト　ツーベース　ヒット", 
 
    "pass":"0", 
 
    "touched_coordinate":"123-456", 
 
    "ball_kind":"NULL"
 
 },
 {

    "table_name":"testdesu",
 
    "at_bat_id":"4", 
 
    "inning":"１回表",
 
    "game_id":"1",
 
    "school_id":"1",
 
    "player_id":"4", 
 
    "score":"0", 
 
    "total_score":"0",
 
    "outcount":"2", 
 
    "base":"110", 
 
    "text_inf":"センター　アウト", 
 
    "pass":"0", 
 
    "touched_coordinate":"123-456", 
 
    "ball_kind":"フライ"
 
 },
 {

    "table_name":"testdesu",
 
    "at_bat_id":"5", 
 
    "inning":"１回表",
 
    "game_id":"1",
 
    "school_id":"1",
 
    "player_id":"5", 
 
    "score":"1", 
 
    "total_score":"1",
 
    "outcount":"2", 
 
    "base":"101", 
 
    "text_inf":"センター　ヒット", 
 
    "pass":"0", 
 
    "touched_coordinate":"123-456", 
 
    "ball_kind":"ゴロ"
 
 },
 {

    "table_name":"testdesu",
 
    "at_bat_id":"6", 
 
    "inning":"１回表",
 
    "game_id":"1",
 
    "school_id":"1",
 
    "player_id":"6", 
 
    "score":"1", 
 
    "total_score":"0",
 
    "outcount":"3", 
 
    "base":"101", 
 
    "text_inf":"ライト　アウト", 
 
    "pass":"0", 
 
    "touched_coordinate":"123-456", 
 
    "ball_kind":"NULL"
 
 },
 {

    "table_name":"testdesu",
 
    "at_bat_id":"7", 
 
    "inning":"１回裏",
 
    "game_id":"1",
 
    "school_id":"2",
 
    "player_id":"7", 
 
    "score":"0", 
 
    "total_score":"0",
 
    "outcount":"1", 
 
    "base":"000", 
 
    "text_inf":"三振", 
 
    "pass":"0", 
 
    "touched_coordinate":"123-456", 
 
    "ball_kind":"NULL"
 
 },
 {

    "table_name":"testdesu",
 
    "at_bat_id":"8", 
 
    "inning":"１回裏",
 
    "game_id":"1",
 
    "school_id":"2",
 
    "player_id":"8", 
 
    "score":"0", 
 
    "total_score":"0",
 
    "outcount":"2", 
 
    "base":"000", 
 
    "text_inf":"三振", 
 
    "pass":"0", 
 
    "touched_coordinate":"123-456", 
 
    "ball_kind":"NULL"
 
 },
 {

    "table_name":"testdesu",
 
    "at_bat_id":"9", 
 
    "inning":"１回裏",
 
    "game_id":"1",
 
    "school_id":"2",
 
    "player_id":"9", 
 
    "score":"0", 
 
    "total_score":"0",
 
    "outcount":"3", 
 
    "base":"000", 
 
    "text_inf":"三振", 
 
    "pass":"0", 
 
    "touched_coordinate":"123-456", 
 
    "ball_kind":"NULL"
 
 },

]

/*
insert into testdesu values ("1", "１回表", "1", "1", "1", "0", "0", "1", "000", "三振", "0", "123-456", "NULL");
insert into testdesu values ("2", "１回表", "1", "1", "2", "0", "0", "1", "001", "ライト　ヒット", "0", "123-456", "ゴロ");
insert into testdesu values ("3", "１回表", "1", "1", "3", "0", "0", "1", "110", "レフト　ツーベース　ヒット", "0", "123-456", "NULL");
insert into testdesu values ("4", "１回表", "1", "1", "4", "0", "0", "2", "110", "センター　アウト", "0", "123-456", "フライ");
insert into testdesu values ("5", "１回表", "1", "1", "5", "1", "1", "2", "101", "センター　ヒット", "0", "123-456", "ゴロ");
insert into testdesu values ("6", "１回表", "1", "1", "6", "0", "1", "3", "101", "ライト　アウト", "0", "123-456", "NULL");
insert into testdesu values ("1", "１回裏", "1", "2", "1", "0", "0", "1", "000", "三振", "0", "123-456", "NULL");
insert into testdesu values ("2", "１回裏", "1", "2", "2", "0", "0", "2", "000", "三振", "0", "123-456", "NULL");
insert into testdesu values ("3", "１回裏", "1", "2", "3", "0", "0", "3", "000", "三振", "0", "123-456", "NULL");
*/

/*
create table test_pbl.t_tmp_bat(
at_bat_id int not null, 
inning varchar(5), 
game_id int not null, 
school_id int not null,
player_id int not null,
score int,
total_score int,
outcount int, 
base char(3), 
text_inf varchar(300), 
pass bool, 
touched_coordinate varchar(100), 
ball_kind varchar(10), 
*/