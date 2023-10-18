const { io } = require('../bjApp');
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcryptjs');


const deck = require('../controllers/deck.controller');
//const db = require('../config/db');
const { login, signup} = require("../config/constant");


io.on('connection', (socket) => {

    console.log('Player connected', socket.id);
    socket.isReady = false;
    socket.emit('player:connected', { 'message': 'Welcome 1.2 Local' });
       
    
 
    socket.on(login, async function (data) {
        console.log("this is login_____", data);
        const { username, password } = data;
        
    });
    socket.on(signup, async function (data) {
        console.log(data);
        const { email, username, password } = data;
       
    });
    socket.on('GET_RANDOM_REEL_VALUES', async function (data) {

       const words = ["banana", "crown", "belly", "crystal", "freespins", "grape", "seven", "star", "strawberry"];
       //const words = ["banana", "banana", "banana", "banana", "banana", "grape", "seven", "star", "strawberry"];

        // Function to generate a random group of words
        function generateRandomGroup(words, groupSize) {
          const randomGroup = [];
          while (randomGroup.length < groupSize) {
            const randomIndex = Math.floor(Math.random() * words.length);
            randomGroup.push(words[randomIndex]);
          }
          return randomGroup;
        }

        // Generate three groups of 25 words each
        const group1 = generateRandomGroup(words, 25);
        const group2 = generateRandomGroup(words, 25);
        const group3 = generateRandomGroup(words, 25);

        // Log the generated groups
        console.log("Group 1:", group1);
        console.log("Group 2:", group2);
        console.log("Group 3:", group3);    
        socket.emit('GET_RANDOM_REEL_VALUES', { success: true, data: { reel1: group1, reel2: group2, reel3:group3 } });
  


    });
    socket.on('CHECK_RESULT_WITH_PAYLINE', async function (data) {

        const { slotResult } = data;

        console.log("slotResult", slotResult);
        // Function to calculate the total count of "freespins" in slotResult
        function getFreeSpinsCount() {
            return slotResult.filter(word => word === "freespins").length;
        }

        // Check if any element in slotResult contains "freespins"
        const hasFreespins = slotResult.some(word => word === "freespins");

        // Define the rule functions
        function rule1() {
            return slotResult[1] === slotResult[4] && slotResult[4] === slotResult[7] && slotResult[1] !== "freespins" ? true : false;
        }

        function rule2() {
            return slotResult[0] === slotResult[3] && slotResult[3] === slotResult[6] && slotResult[0] !== "freespins" ? true : false;
        }

        function rule3() {
            return slotResult[2] === slotResult[5] && slotResult[5] === slotResult[8] && slotResult[2] !== "freespins" ? true : false;
        }

        function rule4() {
            return slotResult[0] === slotResult[4] && slotResult[4] === slotResult[6] && slotResult[0] !== "freespins" ? true : false;
        }

        function rule5() {
            return slotResult[2] === slotResult[4] && slotResult[4] === slotResult[8] && slotResult[2] !== "freespins" ? true : false;
        }
        function rule6() {
            return slotResult[1] === slotResult[3] && slotResult[3] === slotResult[7] && slotResult[1] !== "freespins" ? true : false;
        }
        function rule7() {
            return slotResult[1] === slotResult[5] && slotResult[5] === slotResult[7] && slotResult[1] !== "freespins" ? true : false;
        }
        function rule8(){
            const targetValue1 = slotResult[0]; // The value to compare against
            const targetValue2 = slotResult[1]; // The value to compare against
            const targetValue3 = slotResult[2]; // The value to compare against
            const positions1 = [];
            const positions2 = [];
            const positions3 = [];
            const lastPositions = [];
            // Loop through the array to find positions with the same value
            for (let i = 0; i < slotResult.length; i++) {
                if (slotResult[i] === targetValue1) {
                    positions1.push(i);
                }else if(slotResult[i] === targetValue2){
                    positions2.push(i);
                }else if(slotResult[i] === targetValue3){
                    positions3.push(i);
                }
            }
            // Function to check if a set of positions meets the condition
            function checkCondition(positions) {
                return (
                    (positions.includes(3) || positions.includes(4) || positions.includes(5)) &&
                    (positions.includes(6) || positions.includes(7) || positions.includes(8))
                );
            }

            // Check condition for positions1 and add to lastPositions if met
            if (checkCondition(positions1)) {
                lastPositions.push(...positions1);
            }

            // Check condition for positions2 and add to lastPositions if met
            if (checkCondition(positions2)) {
                lastPositions.push(...positions2);
            }

            // Check condition for positions3 and add to lastPositions if met
            if (checkCondition(positions3)) {
                lastPositions.push(...positions3);
            }

            console.log(lastPositions);
            return lastPositions


        }

        // Check the rules
        const result1 = rule1();
        const result2 = rule2();
        const result3 = rule3();
        const result4 = rule4();
        const result5 = rule5();
        const result6 = rule6();
        const result7 = rule7();
        const result8 = rule8();

        // Send the results to the client
        socket.emit('CHECK_RESULT_WITH_PAYLINE', {
            success: true,
            data: {
                paylines: {
                    rule1: result1,
                    rule2: result2,
                    rule3: result3,
                    rule4: result4,
                    rule5: result5,
                    rule6: result6,
                    rule7: result7,
                    rule8: result8,

                },
                freeSpinCount: getFreeSpinsCount()
            }
        });
  
    });
    
    
    
    socket.on('disconnect', function () {
        console.log(socket.username ? socket.username : socket.id, 'is disconnected');
        let room = socket.myRoom;
        let gameIndex = socket.gameIndex;
        let username = socket.username;

        try {
            if (gameIndex < 0 || typeof gameIndex === 'undefined') {
                console.log(socket.username ? socket.username : socket.id, 'Was not part of a room');
                return;
            }
            console.log('my room was', room, games.length);

            if (!games[gameIndex].isOnPlay) {
                var index = games[gameIndex].players.indexOf(socket);
                if (index > -1) {
                    games[gameIndex].players.splice(index, 1);
                }
                console.log("disconnected" + username);
            }
            else {
                socket.isLeave = true;
                console.log("disconnected1" + username);

            }

            io.emit('room:list', { "rooms": GetPublicRooms() });
            let seat = socket.seat;
            games[gameIndex].roomBroadCast('player:leave', { seat });
            //EraseEmptyRooms();
        } catch (err) {
            console.log(err);
        }
    });

    socket.on('player:leave', function () {
        try {
            console.log('ALV', socket.username ? socket.username : socket.id, 'exit the room');
            let room = socket.myRoom;
            console.log('leaved the room', room);
            let i = socket.gameIndex;


           
        } catch (err) {
            console.log(err);
        }
    });
   
    
    socket.on('room:sync', () => {
        games[socket.gameIndex].roomBroadCast('room:sync', { 'players': GetPlayersInfoFromRoom(socket.gameIndex) });
    });
});


/*
General functions
*/
function FirstDeal(index) {
    console.log('On Inital Deal');
    InitialDeal(index);
    let timeOut = setTimeout(() => {
        clearTimeout(timeOut);
        CheckInsurance(index);

    }, 3500);
}




function GetPublicRooms() {

    var publicRooms = [];
    for (let i = 0; i < games.length; i++) {

        if (games[i].isPrivate) {
            console.log('Game is private, so lets continue');
            continue;
        }

        let creator = games[i].creator;
        let maxPlayer = games[i].maxPlayer;
        let roomName = games[i].room;
        let members = games[i].players.length;
        let bet = games[i].bet;
        publicRooms.push({ creator, maxPlayer, roomName, members, bet });
    }
    console.log("roomList", publicRooms);
    return publicRooms;
}

function GetGameIndex(room) {
    for (let i = 0; i < games.length; i++)
        if (games[i].room == room)
            return i;
    return -1;
}
function GetPlayerIndexWithUserName(index, userName) {
    for (let i = 0; i < games[index].players.length; i++)
        if (games[index].players[i].username == userName)
            return i;
    return -1;
}



function GetPlayersInfoFromRoom(i) {
    let players = [];
    for (let j = 0; j < games[i].players.length; j++) {
        let username = games[i].players[j].username;
        players.push({ username });
    }
    return players;
}

function SetSocketPropierties(socket, data) {
    socket.username = data.username;
    socket.hand = [];
    socket.playerInfo = {};
    socket.seat = -1;
    socket.isReady = false;
    socket.isEnded = false;
    socket.score = 0;
    socket.looseScore = 0;
    socket.looseTurn = 0;
    socket.winningTurn = 0;
    socket.isPass = false;
    socket.isLeave = false;
    socket.id = data.id;
    socket.eventId = data.eventId;
    socket.eventTime = data.eventTime;
}