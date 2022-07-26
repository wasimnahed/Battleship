let shipSelected=5
let times=1
let gridComplete=false
//<------------------------------Game Logic Here--------------------------->

let winner
 
function ship(battleship){//take in battleship as an gameboard1 with each position having true(numbert hit) or false(hit)
    let sunk=false
    let ln=battleship.length
    const hit = (target) => {
        const index=findIndex(target,battleship)
        battleship[index].hit = true;
        return battleship
    }
    const isSunk= ()=>{// checks if all positions have been hit
        let count=0
        for(let i=0;i<ln;i++){
            if(battleship[i].hit==true){
                count=count+1
            }
        }
        if(count == ln){
            return true
        }
        else if (count != ln){
            return false
        }
    }
    return { battleship,ln, sunk, hit, isSunk }
}

//store ships in an gameboard1 

function gameboard(){
    let array = createArray()
    return {array}
}

function checkShips(){
    let array1=player1.array
    let array2=player2.array
    let unSunk=0
    for(let i=0;i<100;i++){
        if(array2[i].block=="ship" && array2[i].hit==false){
                unSunk=unSunk+1
        }
    }
    if(unSunk>0){
        return false
    }
    else{
        winner=player1.playerName
        return true
    }
}

let computerArray = []
function makeArray(){
    for(let i=1;i<=100;i++){
        computerArray[i]=i
    }
}

function computerHit(){
    let array1=player1.array
    let max=computerArray.length-1
    function generateRandomInteger(max) {
        return Math.floor(Math.random() * max);
    }
    let chosenNumber=generateRandomInteger(max)
    let chosenStrike=computerArray[chosenNumber]//stores strike location in a var
    computerArray.splice(chosenNumber,1)//deletes number from array so that it won't be selected again
    array1[chosenStrike].hit=true
    let playerGrid=document.querySelector(".playerGrid")
    deleteGrid(playerGrid)
    createGrids(player1.array,"player1")
}
function createShip(length,startChar,number){
    let i
    let array=[]
    for(i=0;i<length;i++){
        if(i>0){ startChar=String.fromCharCode((startChar.charCodeAt())+i)}
        let coordinate=String(startChar)+String(number)
        array[i]={pos:coordinate, hit:false, type:"ship"}
    }
    return array
}

function createArray(){//creates an array for the game
    let i,j
    let array=[]
    let indexCounter=0
        for(i=97;i<107;i++){
            let char=String.fromCharCode(i)
            char=char.toUpperCase()
            for(j=1;j<=10;j++){
                array[indexCounter]={pos: String(char)+String(j),hit:false, block:"ocean",status:"enabled"}
                indexCounter=indexCounter+1
            }
        }
    return array
}

function findIndex(element,arr){
    let ln= arr.length
    for(let i=0;i<ln;i++){//searches gameboard1 for matching element and returns its index
        if(arr[i].pos == element){
            return i        //returns i as the index of the element found
        }
    }
}
function findElement(coordinate,array,term){
    let index=findIndex(coordinate,array)
    if(term=="block"){return array[index].block}
    if(term=="hit"){return array[index].hit}
    if(term=="status"){return array[index].status}
}

function createPlayer(name){
    let array=gameboard().array
    let points=0
    let wins=0
    let playerName=name
    return { array,playerName, wins, points }
}

//<-----------------DOM LOGIC HERRE---------------------->

let player1
let player2
let player1Attack
let player2Attack
const start=document.querySelector('.start-button')
const continueBtn=document.querySelector('.continue-btn')
const sidebar=document.querySelector('.sidebar')
const sidebarClosebtn=document.querySelector('.close-sidebar')
const sidebarOpenBtn=document.querySelector('.open-sidebar')
const sidebarText=document.querySelector('.links')
const gameBar=document.querySelector('.info-card')
const gameBarText=document.querySelector('.opponent-info')
let selected=false
let gameStart=false //used to play animations on the sidebar 

const btns=document.querySelectorAll('.btn')

function deleteGrid(grid){
    while(grid.hasChildNodes()){
        grid.removeChild(grid.lastChild)
    }
}
btns.forEach(btn =>{
    btn.addEventListener("click",()=>{
        console.log(btn.textContent.toLowerCase())
        if(btn.textContent.toLowerCase()=="computer"){
        selected=(btn.textContent).toLowerCase()
        refreshButtons()
        btn.style.backgroundColor="white"
        setTimeout(()=>{
            btn.style.backgroundColor="yellowgreen"
        },400)
        function refreshButtons(){
            document.querySelector('.human-btn').style.backgroundColor="black"
            document.querySelector('.computer-btn').style.backgroundColor="#779ECB"
        }}
        else{
            alert("Please Select Computer For Now, Multiplayer Is Still In Developement")
        }
    })
})

function checkPlayerInput(player){
    if(player=="player1"){
        if(document.querySelector('.player1-name').value=='' || document.querySelector('.player1-name').value=='Enter Your Name' || selected==false){
            return false
        }
    }
    if(player=="player2"){
        if(selected!=false){
        if(selected=="human"){
            if(document.querySelector('.player1-name').value=='' || selected==false){
                return false
            }
        }
        if(selected=="computer"){
            return true
        }
    }
    }
}

//button functions here
start.addEventListener("click",()=>{
    if(checkPlayerInput("player1")==false || checkPlayerInput("player2")==false){
        alert("Please Make Sure Everything Is Selected")
    }
    else{
        let player1name=document.querySelector('.player1-name').value
        let player2name
        if(selected=="computer"){player2name="computer"}
        player1=createPlayer(player1name) // creates player and array and grid
        player1Attack=gameboard()
        createGrids(player1.array,"default")
        player2=createPlayer(player2name)
        player2Attack=gameboard()
        if(player2name!="computer"){
            //countdown 3 sec and delete current grid items and constr new grid with player2 array
        }
        document.querySelector(".screen1").classList.add("hide")
        document.querySelector(".player1name").textContent=("general "+player1name)
        document.querySelector(".screen2").classList.remove("hide")
    }
})
continueBtn.addEventListener('click',()=>{
    if(continueBtn.style.color=="rgb(119, 158, 203)")
    {
    document.querySelector('.screen2').classList.add('hide')
    document.querySelector('.screen3').classList.remove('hide')//makes screen visible
    let defContainer=document.querySelector('.grids-container')
    deleteGrid(defContainer)
    sidebarClosebtn.style.color="red"
    gameStart=true
    sidebarText.classList.add('hide')
    sidebar.style.width="0%" //closes sidebar
    createGrids(player1.array,"player1")
    createGrids(player1Attack.array,"player1-attack")
    if(selected=="computer"){ //default array for now; random ship placements will be made later on
        player2=createPlayer('computer')
        player2.array=[
         {pos: "A1", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "A2", hit: false, block: "ship", status: "disabled"}
        ,{pos: "A3", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "A4", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "A5", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "A6", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "A7", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "A8", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "A9", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "A10", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "B1", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "B2", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "B3", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "B4", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "B5", hit: false, block: "ocean", status: "disabled"}
        , {pos: "B6", hit: false, block: "ocean", status: "disabled"}
        , {pos: "B7", hit: false, block: "ocean", status: "disabled"}
        , {pos: "B8", hit: false, block: "ship", status: "disabled"}
        , {pos: "B9", hit: false, block: "ocean", status: "disabled"}
        , {pos: "B10", hit: false, block: "ocean", status: "disabled"}
        , {pos: "C1", hit: false, block: "ocean", status: "disabled"}
        , {pos: "C2", hit: false, block: "ocean", status: "disabled"}
        , {pos: "C3", hit: false, block: "ocean", status: "disabled"}
        , {pos: "C4", hit: false, block: "ocean", status: "disabled"}
        , {pos: "C5", hit: false, block: "ocean", status: "disabled"}
        , {pos: "C6", hit: false, block: "ocean", status: "disabled"}
        , {pos: "C7", hit: false, block: "ocean", status: "disabled"}
        , {pos: "C8", hit: false, block: "ocean", status: "disabled"}
        , {pos: "C9", hit: false, block: "ocean", status: "disabled"}
        , {pos: "C10", hit: false, block: "ocean", status: "disabled"}
        , {pos: "D1", hit: false, block: "ocean", status: "disabled"}
        , {pos: "D2", hit: false, block: "ocean", status: "disabled"}
        , {pos: "D3", hit: false, block: "ocean", status: "disabled"}
        , {pos: "D4", hit: false, block: "ocean", status: "disabled"}
        , {pos: "D5", hit: false, block: "ocean", status: "disabled"}
        , {pos: "D6", hit: false, block: "ship", status: "disabled"}
        , {pos: "D7", hit: false, block: "ship", status: "disabled"}
        , {pos: "D8", hit: false, block: "ship", status: "disabled"}
        ,{pos: "D9", hit: false, block: "ship", status: "disabled"}
        , {pos: "D10", hit: false, block: "ocean", status: "disabled"}
        , {pos: "E1", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "E2", hit: false, block: "ship", status: "disabled"}
        ,{pos: "E3", hit: false, block: "ship", status: "disabled"}
        ,{pos: "E4", hit: false, block: "ship", status: "disabled"}
        ,{pos: "E5", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "E6", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "E7", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "E8", hit: false, block: "ocean", status: "disabled"}
        , {pos: "E9", hit: false, block: "ocean", status: "disabled"}
        , {pos: "E10", hit: false, block: "ocean", status: "disabled"}
        , {pos: "F1", hit: false, block: "ocean", status: "disabled"}
        , {pos: "F2", hit: false, block: "ocean", status: "disabled"}
        , {pos: "F3", hit: false, block: "ocean", status: "disabled"}
        , {pos: "F4", hit: false, block: "ocean", status: "disabled"}
        , {pos: "F5", hit: false, block: "ocean", status: "disabled"}
        , {pos: "F6", hit: false, block: "ocean", status: "disabled"}
        , {pos: "F7", hit: false, block: "ocean", status: "disabled"}
        , {pos: "F8", hit: false, block: "ocean", status: "disabled"}
        , {pos: "F9", hit: false, block: "ocean", status: "disabled"}
        , {pos: "F10", hit: false, block: "ocean", status: "disabled"}
        , {pos: "G1", hit: false, block: "ocean", status: "disabled"}
        , {pos: "G2", hit: false, block: "ocean", status: "disabled"}
        , {pos: "G3", hit: false, block: "ship", status: "disabled"}
        , {pos: "G4", hit: false, block: "ship", status: "disabled"}
        , {pos: "G5", hit: false, block: "ocean", status: "disabled"}
        , {pos: "G6", hit: false, block: "ocean", status: "disabled"}
        , {pos: "G7", hit: false, block: "ocean", status: "disabled"}
        , {pos: "G8", hit: false, block: "ocean", status: "disabled"}
        , {pos: "G9", hit: false, block: "ship", status: "disabled"}
        , {pos: "G10", hit: false, block: "ship", status: "disabled"}
        , {pos: "H1", hit: false, block: "ocean", status: "disabled"}
        , {pos: "H2", hit: false, block: "ocean", status: "disabled"}
        , {pos: "H3", hit: false, block: "ocean", status: "disabled"}
        , {pos: "H4", hit: false, block: "ocean", status: "disabled"}
        , {pos: "H5", hit: false, block: "ocean", status: "disabled"}
        , {pos: "H6", hit: false, block: "ocean", status: "disabled"}
        , {pos: "H7", hit: false, block: "ocean", status: "disabled"}
        , {pos: "H8", hit: false, block: "ocean", status: "disabled"}
        , {pos: "H9", hit: false, block: "ocean", status: "disabled"}
        , {pos: "H10", hit: false, block: "ocean", status: "disabled"}
        , {pos: "I1", hit: false, block: "ship", status: "disabled"}
        , {pos: "I2", hit: false, block: "ship", status: "disabled"}
        , {pos: "I3", hit: false, block: "ship", status: "disabled"}
        , {pos: "I4", hit: false, block: "ship", status: "disabled"}
        , {pos: "I5", hit: false, block: "ship", status: "disabled"}
        , {pos: "I6", hit: false, block: "ocean", status: "disabled"}
        , {pos: "I7", hit: false, block: "ocean", status: "disabled"}
        , {pos: "I8", hit: false, block: "ocean", status: "disabled"}
         ,{pos: "I9", hit: false, block: "ocean", status: "disabled"}
       ,  {pos: "I10", hit: false, block: "ocean", status: "disabled"}
       ,  {pos: "J1", hit: false, block: "ocean", status: "disabled"}
         ,{pos: "J2", hit: false, block: "ocean", status: "disabled"}
         ,{pos: "J3", hit: false, block: "ocean", status: "disabled"}
         ,{pos: "J4", hit: false, block: "ocean", status: "disabled"}
         ,{pos: "J5", hit: false, block: "ocean", status: "disabled"}
         ,{pos: "J6", hit: false, block: "ocean", status: "disabled"}
         ,{pos: "J7", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "J8", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "J9", hit: false, block: "ocean", status: "disabled"}
        ,{pos: "J10", hit: false, block: "ocean", status: "disabled"}
        ]
        makeArray()//makes array with numbers for computer to choose randomly and strike
    }
    setTimeout(() => {
        sidebar.classList.add('hide')
        gameBar.classList.remove('hide')
    }, 500);}
    else{
        alert("Please Make Sure You Have Placed All The Ships")
    }
})
sidebarOpenBtn.addEventListener('click',()=>{ //closes current game bar and opens sidebar
    gameBar.style.width="0%"
    gameBarText.classList.add('hide')
    sidebarText.classList.add('hide')
    setTimeout(() => {
        sidebar.classList.remove('hide')
        gameBar.classList.add('hide')
        gameBarText.classList.remove('hide')
    }, 500);
    setTimeout(() => {
        sidebar.style.width="100%"
        sidebarText.classList.remove('hide')
    }, 600);
})
sidebarClosebtn.addEventListener('click',()=>{
    if(gameStart==true){
        sidebar.style.width="0%"
        sidebarText.classList.add('hide')
        gameBarText.classList.add('hide')
        gameBar.classList.remove('hide')
    setTimeout(() => {
        sidebar.classList.add('hide')
        gameBar.style.width="100%"
    }, 500);}
    setTimeout(() => {
        gameBarText.classList.remove('hide')
    }, 600);
})


function createGrids(array,grid){
    let grids
    if(grid=="default"){
        grids=document.querySelector('.grids-container')
    }
    else if(grid=="player1"){
        grids=document.querySelector(".playerGrid")
    }
    else if(grid=="player1-attack"){
        grids=document.querySelector(".attackGrid")
    }
    else if(grid=="player2"){
        grids=document.querySelector(".playerGrid")
    }
    else if(grid=="player2-attack"){
        grids=document.querySelector(".attackGrid")
    }
    grids.style.setProperty('--grid-rows',10)
    grids.style.setProperty('--grid-columns',10)
    let number=1
    let char=97  // declared outside forloop so that it increments
    for(let i = 0; i <=99; i++) {
        if(number==11){
            number=1
            char=char+1
        }
        let cell = document.createElement("div");
        cell.style.border = "1px solid black";
        let coordinate=String(String.fromCharCode(char).toUpperCase()+number)
        if(grid == "player1" || grid =="player2"){ //this is needed so that the highlight and hover functions don't affect
            cell.id='disabled'                  //both player and attack grids
        }
        else{
            cell.id=coordinate
        }
        cell.classList.add('grid-item');
        cell.style.cursor="pointer"
        let block=findElement(coordinate,array,"block")
        let hit=findElement(coordinate,array,"hit")
        if(grid!="player1" && grid!="player2"){
            cell.addEventListener("mouseover",()=>{
            let index=findIndex(cell.id,array)
            if(grid=="default"){
            if(array[index].status!="disabled" && array[index].block!="ship"){
                highlightGrids(cell.id,shipSelected,array,"default")
            }
            else{refreshGrid(array)}
            }
            if(grid=="player1-attack"){
                if(checkShips()==false){
                 highlightGrids(cell.id,1,array,"attack-grid")
            }
            }
        })
        cell.addEventListener('click', ()=>{
            if(grid=="default"){
                let number=parseInt((cell.id).charAt(1))
                let char=(cell.id).charAt(0)
            if(number==1){
                if(parseInt((cell.id).charAt(2))==0){
                    number=10
                }
            }
            let addition=number+shipSelected
            if(addition<=11){
                let isDisabled=checkPos(array,char,number)
                if(isDisabled==false){
                    updateGame(array,cell.id,shipSelected)
            }
            }}
            if(grid=="player1-attack"){
                if(checkShips()==false){
                if(selected=="computer"){
                    let index=findIndex(cell.id,array)
                    let hit=array[index].hit 
                    if(hit==false){
                        computerHit()//function for computer to mark hit
                    }
                }
                let index=findIndex(cell.id,array)
                array[index].hit=true //sets the hit value of that cell to true
                array[index].status="disabled"
                checkElement(cell.id,array,player2.array)
                refreshGrid(array)
                console.log(checkShips())
                if(checkShips()==true){
                    endArray(player1.array)
                    endArray(player2.array)
                    refreshGrid(player2.array)
                    document.querySelector('.winner').textContent="General " + winner+"!!";
                    setTimeout(() => {
                        document.querySelector('.screen3').style.opacity="0"
                    }, 500);
                    setTimeout(() => {
                    document.querySelector('.screen3').classList.add('hide')
                    document.querySelector('.screen4').classList.remove('hide')
                    }, 1500);
                }}
            }
            if(grid=="player2-attack"){
                let index=findIndex(cell.id,array)
                array[index].hit=true //sets the hit value of that cell to true
                array[index].status="disabled"
                checkElement(cell.id,array,player1.array)
                refreshGrid(array)
                //show attack on player 1's grid and also hit locations
            }
        }
        )}
        //these lines of code below give each grid their color
        if(block=="ocean" ){
           cell.style.backgroundColor="#779ECB"
        }
        if(block=="ocean" && hit==true){
            cell.style.backgroundColor="#292929"
        }
        if(block=="ship" && hit==false){
            cell.style.backgroundColor="yellowgreen"
        }
        if(block=="ship" && hit==true){
            cell.style.backgroundColor="red"
        }
        grids.appendChild(cell);
        number=number+1
        };
}

function refreshGrid(array){ // must be passed direct array value
    for(let i=0;i<100;i++){
        let id=array[i].pos
        let cell=document.getElementById(id)
        cell.textContent=""
        let block=findElement(id,array,"block")
        let status=findElement(id,array,"status")
        let hit=findElement(id,array,"hit")
        if(status=="disabled"){// shows a disabled cursor on hover
            cell.style.cursor="not-allowed"
        }
        if(status=="disabled" && block=="ocean" && hit==false){
            cell.style.backgroundColor="darkgrey"
        }
        if(hit==false){
            if(block=="ocean" && status=="enabled"){
                cell.style.backgroundColor="#779ECB"
            }
            if(block=="ship" && hit==false){
                cell.style.backgroundColor="tomato"
            }
        }
        if(hit==true){
            if(block=="ocean"){
                cell.style.backgroundColor="#292929"
                cell.textContent="X"
            }
            else if(block=="ship"){
                cell.style.backgroundColor="tomato"
            }
            else if(status=="disabled"){
                cell.style.backgroundColor="#292929"
            }
        }
    }
}
function checkElement(id,array1,array2){//compare hit location with other palyers array and return the type. Use this type for refresh grid!!
    let index=findIndex(id,array1)
    if(array2[index].block=="ship"){
        array1[index].block="ship"
        array2[index].hit=true

    }
    else{
        array1[index].block="ocean"
        array2[index].hit=true
    }
}

function updateGame(array,id,shipSelected){//updates game-array and refreshes grid to show placed ships; only for start grids
    let index=findIndex(id,array)
    if(array[index].status!="disabled"){
    let number=parseInt(id.charAt(1))
    if(number==1){
        if(parseInt(id.charAt(2))==0){
            number=10
        }
    }
    let char=id.charAt(0)
    let startBlock=number-1
    let endBlock=number+shipSelected
    if(startBlock<1){startBlock=0}
    if(endBlock==11){endBlock=10}
    for(let i=0;i<shipSelected;i++){
        let status=array[index].status
        if(status=="enabled"){
            array[index].block="ship"
            array[index].status="disabled"
            index=index+1
        }
    }
    disableBlocks(startBlock,endBlock,char,array)
    updateShip(array)
    refreshGrid(array)
}
}
function disableBlocks(start,end,char,array){//disables blocks around ship
    let i
    let ln=end
    if(start==0){i=1}
    else{i=start}
    let charAbv=false
    let charBelow=false
    if(char!="A"){charAbv=String.fromCharCode(char.charCodeAt()-1)}
    if(char!="J"){charBelow=String.fromCharCode(char.charCodeAt()+1)}
    if(start>0){array[findIndex(String(char+start),array)].status="disabled"}
    if(end<11){array[findIndex(String(char+end),array)].status="disabled"}//for start and end of current grids in the same line as the ship
    for(i;i<=ln;i++){
        if(charAbv != false){
            let upperCoordinate=String(charAbv+i)
            array[findIndex(upperCoordinate,array)].status="disabled"
        }
        if(charBelow != false){
            let lowerCoordinate=String(charBelow+i)
            array[findIndex(lowerCoordinate,array)].status="disabled"
        }
    }
}
function updateShip(array){
    if(shipSelected==5 || shipSelected==4 || shipSelected==3){
        shipSelected=shipSelected-1
        if(shipSelected==4){
            document.querySelector('#battleship').style.color="yellowgreen"
        }
        if(shipSelected==3){
            document.querySelector('#cruiser').style.color="yellowgreen"
        }
        if(shipSelected==2){
            document.querySelector('#submarine').style.color="yellowgreen"
        }
    }
    if(shipSelected==2 && times<=2){
        times=times+1
        shipSelected=2
    }
    else if(shipSelected==2 && times==3){
        shipSelected=1
        times=1
        document.querySelector('#destroyer').style.color="yellowgreen"
    }
    if(shipSelected==1 && times<=2){
        times=times+1
    }
    else if(shipSelected==1 && times==3){
        if(player2.playerName=="computer"){
            shipSelected=1
        }
        else{
            shipSelected=5
        }
        times=1
        document.querySelector('.continue-btn').style.color="#779ECB"
        endArray(array)
        gridComplete=true
        //function to move on to next step
    }
}
function endArray(array){
    let ln=array.length
    for(i=0;i<ln;i++){
        element=array[i]
        if(checkShips()==true){
            element.status="disabled"
        }
        if(checkShips()==false){
        if(element.block=="ocean" && element.status=="enabled" && element.hit==false){
            element.status="disabled"
        }}
    }
}
function highlightGrids(id,shipSelected,array,type){
    document.querySelector('.cell-selected').textContent=id
    let number=parseInt(id.charAt(1))
    refreshGrid(array)
    if(number==1){
        if(parseInt(id.charAt(2))==0){
            number=10
        }
    }
    let char=id.charAt(0)
    if(type=="default"){
        if(number+shipSelected>11){
        for(let i=number;i<11;i++){
            let no=number
            let coordinate=String(char+i)
            let cell=document.getElementById(coordinate)
            cell.style.backgroundColor="#292929"
            no=no+1
        }
    }
    if(number+shipSelected<12){//only allows to highlight grids if they are witihin the grid
        let isDisabled=checkPos(array,char,number)// checks if grid is not in the boundary of another ship
        if(isDisabled==false){
            let no=number
        for(let i=0;i<shipSelected;i++){//highlights grids with apppropriate colors by verifying status from gameboard array
            let coordinate=String(char+no)
            let block=findElement(coordinate,array,"block")
            let status=findElement(coordinate,array,"status")
            let cell=document.getElementById(coordinate)
            if(block=="ocean" && status!="disabled"){
            cell.style.backgroundColor="tomato"
            }
            if(status=="disabled" || block=="ship"){
                cell.style.cursor="not-allowed"
            }
            no=no+1
        }}
        else{ 
            let no=number
            for(let i=0;i<shipSelected;i++){
                let coordinate=String(char+no)
                let cell=document.getElementById(coordinate)
                cell.style.backgroundColor="#292929"
                no=no+1
            }
        }
    }}
    if(type=="attack-grid"){//has a color problem
        let no=number
        let coordinate=String(char+no)
        let cell=document.getElementById(coordinate)
        let hit=findElement(coordinate,array,"hit")
        let block=findElement(coordinate,array,"block")
        let status=findElement(coordinate,array,"status")
        if(hit==false){
            cell.style.backgroundColor="#292929"
            cell.textContent="X"
        }
        else if(hit==true){
            cell.style.backgroundColor="red"
        }
        //check if grid is already taken
    }
}

function checkPos(array,char,number){
    let no=number
    let disabled=0 //if greater than one then selected grid is in the boundary of another ship
    for(let i=0;i<shipSelected;i++){
        let coordinate=String(char+no)
        let status=findElement(coordinate,array,"status")
        if(status=="disabled"){
            disabled=disabled+1
        }
        no=no+1
    }
    if(disabled==0){
        return false
    }
    else if(disabled>0){
        return true
    }
}

function initializePlayArea(){

}