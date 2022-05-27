var x=prompt('Welcome !! Please enter your name');
var num,usernum;
var bleep1=new Audio();
bleep1.src="/home/sparsh/Desktop/Speed_Typing_Game/button-2.mp3";
var bleep2=new Audio();
bleep2.src="/home/sparsh/Desktop/Speed_Typing_Game/applause4.mp3"
var score=[];
var counter=-1;

var avg=0;
var sum=0;
const averagediv=document.getElementById('avg');
const highdiv=document.getElementById('high');
const random_Quote_Api_Url = 'https://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quote-display');
const quoteInputElement=document.getElementById('quoteInput');
const timerElement=document.getElementById('timer');

quoteInputElement.addEventListener('input',()=>{
  var words=0;
  var mins=0;
  const arrayQuote=quoteDisplayElement.querySelectorAll('span')
  const arrayValue=quoteInputElement.value.split('')
  let correct=true
  arrayQuote.forEach((characterSpan,index)=>{
      const character=arrayValue[index]
      if(character==null){
          characterSpan.classList.remove('correct');
          characterSpan.classList.remove('incorrect');
          correct=false
      }
      else if(character===characterSpan.innerText){
          characterSpan.classList.add('correct')
          characterSpan.classList.remove('incorrect')
      }else{
        characterSpan.classList.add('incorrect')
        characterSpan.classList.remove('correct')
        correct=false
      }


  })
  if(correct) {
   counter++;
    for(var k=0;k<arrayQuote.length;k++){
      if(arrayQuote[k].innerHTML==' ')
      words++;
    }
    words++;
    console.log(words);
    mins=getTimerTime()/60;
    
    score[counter]=Math.ceil(words/mins);
    var highscore=score[0];
    sum+=score[counter];
    avg=Math.ceil(sum/score.length);
    for(j=0;j<score.length;j++){
      if (score[j]>highscore)
      highscore=score[j];
    }
    
    console.log(score);
    console.log(avg);
    function finished(){
    bleep2.play();
    
    quoteDisplayElement.innerText='Congratulations!! '+x+'    Your current score: '+Math.ceil(words/mins)+' wpm';
    highdiv.innerHTML='HIGH SCORE: '+highscore+' wpm';
    averagediv.innerHTML='AVERAGE SCORE: '+avg+' wpm';
    highdiv.style.display="block";
    averagediv.style.display="block";
    function numberGenerator(){
      num=Math.floor((Math.random()*10)+1);
    }
    document.getElementById('luck').style.display="block";
    numberGenerator();
    
  

    


    quoteInputElement.style.display='none';
    timerElement.style.display='none';
      //  renderNewQuote()
        
    }
    finished()
  }

})
function getRandomQuote(){
return fetch(random_Quote_Api_Url)
.then(response => response.json())
.then(data => data.content)


}

async function renderNewQuote(){
  document.getElementById('result').style.display="none";
  document.getElementById('luck').style.display="none";
  quoteDisplayElement.style.display='block';
  quoteInputElement.style.display='block';
  timerElement.style.display='block';
    const quote= await getRandomQuote()
    quoteDisplayElement.innerHTML='';
    quote.split('').forEach(character=>{
const characterSpan=document.createElement('span');

characterSpan.innerText=character
quoteDisplayElement.appendChild(characterSpan);

    })
    quoteInputElement.value=null;
    startTimer()
}
let startTime



function startTimer(){
    timerElement.innerText=0
    startTime = new Date()
    setInterval(()=>{
      timerElement.innerText=getTimerTime()
    },1000)

}
function getTimerTime(){
    return Math.floor((new Date()-startTime)/1000)
}

    function comparator(){
     usernum=document.getElementById('user-guess').value; 
      if(usernum==num)
      {
      sum+=10*score.length;
      avg=Math.ceil(sum/score.length);
      averagediv.innerHTML='AVERAGE SCORE: '+avg;
      document.getElementById('luck').style.display="none";
      //document.getElementById('result').innerHTML="Yipeeee Your guess was correct";
      document.getElementById('result').style.display="block";
      document.getElementById('won').style.display="block";
      document.getElementById('lose').style.display="none";
    
    }

      else{
      
      sum-=(10*score.length);
      avg=Math.ceil(sum/score.length);
      averagediv.innerHTML='AVERAGE SCORE: '+avg;
      document.getElementById('luck').style.display="none";
      //document.getElementById('result').innerHTML="Better luck next time";
      document.getElementById('result').style.display="block";
      document.getElementById('lose').style.display="block";
      document.getElementById('won').style.display="none";
      }
    }



//renderNewQuote();
