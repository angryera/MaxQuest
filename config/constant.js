//Account
const signup = "PLAYER_SIGNUP";
const login = "PLAYER_LOGIN";
//Global Chat
const sendglobalchat = "PLAYER_SEND_GLOBAL_CHAT";
const receiveglobalchatlist = "PLAYER_GET_GLOBAL_CHATLIST";
const receiveglobalchatlistcount = "PLAYER_GET_GLOBAL_CHATLISTCOUNT";
const updateglobalchattime = "PLAYER_UPDATE_GLOBAL_CHATTIME";
//Character
const setselectedcharacter = "PLAYER_SET_SELECTED_CHARACTER";
const upgradecharacter = "PLAYER_UPGRADE_CHARACTER";
const getupgradecharacters = "PLAYER_GET_UPGRADE_CHARACTERS";
//Weapon
const upgradeweapon = "PLAYER_UPGRADE_WEAPON";
const getupgradeweapons = "PLAYER_GET_UPGRADE_WEAPONS";
const selectweapon = "PLAYER_SELECT_WEAPON";

//Puzzle
const getPuzzle = "GET_PUZZLE";
const getMasterPuzzle = "GET_MASTER_PUZZLE";
const changePuzzle = "CHANGE_PUZZLE";
const checkAnswer = "CHECK_ANSWER";


//NewYork Time
const getNYTime = "GET_NEW_YORK_TIME";
const waitStartTime = "WAIT_START_TIME";

module.exports = {login, signup, sendglobalchat, receiveglobalchatlist, receiveglobalchatlistcount, updateglobalchattime, setselectedcharacter, upgradecharacter, getupgradecharacters, upgradeweapon, getupgradeweapons, selectweapon, getPuzzle, getMasterPuzzle, changePuzzle, checkAnswer, getNYTime, waitStartTime};