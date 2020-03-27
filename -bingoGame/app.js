const sbmtBtn = document.querySelector('.container .content .numInput .sbmt-btn'),
      inpt = document.querySelector('.container .content .numInput .inpt'),
      boxeElm = Array.from(document.querySelectorAll('.container .content .boxes .box')),
      playingNum = document.querySelector('.info .info-cont .playing-num '),
      chosenNum = document.querySelector('.info .info-cont .chkd-num'),
      undoBtn = document.querySelector('.info .info-cont .undo'),
      theWord=Array.from(document.querySelector('.word').children);
let ourArr = [],
    chosen = [],
    rotate= 360,
    undoThis,
    binRow=[],
    binCol=[],
    bingo=[],
    k=0;
class theGame{
  static undo(){
    if(chosen === []){
      console.log(false)
    }else{
      undoThis = chosen.pop();
      boxeElm.forEach((box)=>{
        if(parseInt(box.innerHTML) === undoThis){
          box.classList.remove('checked')
          playingNum.innerHTML = (parseInt(playingNum.innerHTML) - 1)
        }
      })
      UI.showChosen()      
    }
  }
  static gameStart(){
    let numArr = [],
          i;
    for(i = 1; i <= 25; i++){
      numArr.push(i);
    }
    return numArr
  }
  static shffl(ar, cb){
    let i, j, x;
    for(i = (ar.length -1); i >= 0; i--){
      j = Math.floor(Math.random() * (i + 1));
      // console.log(i)
      // console.log(j)
      x = ar[i];
      ar[i] = ar[j];
      ar[j] = x;
    }
    cb(ar)
  }
  static chck(){
    let val = inpt.value;
    if(Math.floor(val) < 26 && Math.floor(val) > 0){
      // console.log(Math.floor(val))
      return true;
    } else {
      return false;
    }
  }
  static clrBin(){
    binRow=[]
    // console.log(binRow)
    // console.log(i)
    binCol=[]
    // console.log(binCol)
    // console.log(i)
    bingo=[]
    // console.log(bingo)
    k=0
  }
  static testRows(){
    let i = 1,n = 0,x;
    for(i; i < 22; (i=i+5)){
      x=i;
      // console.log(i)
      n=0;
      for(x;x < i+5;x++){
        if(document.getElementById(`box-${x}`).classList.contains('checked')){
          n=n+1;
        }
        // console.log(x)
      }
      binRow.push(n)
      // console.log(binRow)
    }
    // console.log(binRow)
  }
  static testCol(){
    let i = 1,n = 0,x;
    for(i; i < 6; (i=i+1)){
      x=i;
      // console.log(i)
      n=0;
      for(x;x < 26;x=x+5){
        if(document.getElementById(`box-${x}`).classList.contains('checked')){
          // console.log(document.getElementById(`box-${x}`))
          n=n+1;
        }
        // console.log(x)
      }
      binCol.push(n)
      // console.log(bingo)
    }
    // console.log(binCol)
  }
  static bingo(){
    bingo= binCol.concat(binRow);
    // console.log(bingo);
    bingo.forEach((one)=>{
      if(one===5){
        k=k+1;
        // console.log(k)
        theWord[k-1].classList.add('mrkd')
      }
      
    })


  }
}
/*
function gameStart(){
  let numArr = [],
        i;
  for(i = 1; i <= 25; i++){
    numArr.push(i);
  }
  return numArr
}

function shffl(ar, cb){
  let i, j, x;
  for(i = (ar.length -1); i >= 0; i--){
    j = Math.floor(Math.random() * (i + 1));
    // console.log(i)
    // console.log(j)
    x = ar[i];
    ar[i] = ar[j];
    ar[j] = x;
  }
  cb(ar)
}
// console.log(gameStart())
*/
class LS{
  static saveToLS(some){
    // console.log(some)
    localStorage.setItem('numbers', JSON.stringify(some))
    ourArr = some;
  }
}
class something {
  static chckIn(trgt){
    
  }
}
class UI {
  static nonChosen(){
    if(chosen.includes(Math.floor(inpt.value))){
      return true;
    } else {
      return false;
    }
  }
  static clrInpt(){
    inpt.value = '';
  }
  static showChosen(){
    chosenNum.innerHTML = JSON.stringify(chosen)
  }
  static chckVal(){
    boxeElm.forEach((box)=>{
      if(parseInt(box.innerHTML) === Math.floor(inpt.value)){
        box.classList.add('checked')
        playingNum.innerHTML = (parseInt(playingNum.innerHTML) + 1)
      }
    })
    chosen.push(Math.floor(inpt.value))
    UI.showChosen();
    theGame.testCol();
    theGame.testRows();
    theGame.bingo();
    // console.log(k)
    theGame.clrBin();
    UI.clrInpt();
    UI.disable();
  }
  static showInUI(){
    theGame.shffl(theGame.gameStart(), LS.saveToLS)
    
    boxeElm.forEach((box, ind) => {
      box.innerHTML = ourArr[ind]
    })
  }
  static disable(){
    let huh=theWord.every((ltr)=>{
      return ltr.classList.contains('mrkd')
    });
    if(huh){
      inpt.disabled= true;
      sbmtBtn.innerHTML = 'Replay';
    }
  }
}      
UI.showInUI()
UI.showChosen()

sbmtBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if(e.target.innerHTML === 'Replay'){
    if(window.confirm('Replay the game!')){
      location.reload()
    }
  }
  if(theGame.chck() && !UI.nonChosen()){
    // console.log('hey')
    UI.chckVal()
    inpt.focus()
  }else{
    console.log('noo')
    console.log(UI.nonChosen())
    inpt.focus()
  }
})

undoBtn.addEventListener('click', (e) => {
  e.preventDefault()
      rotate = rotate + 360;
  e.target.style.transform = `rotate(-${rotate}deg)`;
  theGame.undo()
})











/*
function testRows(){
  let i = 1,n = 0,x;
  for(i; i < 22; (i=i+5)){
    x=i;
    // console.log(i)
    n=0;
    for(x;x < i+5;x++){
      if(document.getElementById(`box-${x}`).classList.contains('box')){
        n=n+1;
      }
      // console.log(x)
    }
    bingo.push(n)
    // console.log(bingo)
  }
  console.log(bingo)
  bingo=[]
  console.log(bingo)
  // console.log(i)
}
function testCol(){
  let i = 1,n = 0,x;
  for(i; i < 6; (i=i+1)){
    x=i;
    // console.log(i)
    n=0;
    for(x;x < 26;x=x+5){
      if(document.getElementById(`box-${x}`).classList.contains('box')){
        console.log(document.getElementById(`box-${x}`))
        n=n+1;
      }
      // console.log(x)
    }
    bingo.push(n)
    // console.log(bingo)
  }
  console.log(bingo)
  bingo=[]
  console.log(bingo)
  // console.log(i)
}
*/
theGame.testRows()
theGame.testCol()