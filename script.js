let songIndex=0;

let audioElement=new Audio("songs/1.mp3");
let masterPlay=document.getElementById("masterPlay");
let myProgressBar=document.getElementById("myProgressBar");
let gif=document.getElementById("gif");
let backwardSong=document.getElementById("backwardSong");
let forwardSong=document.getElementById("forwardSong");

let songItemsContainer=document.querySelector(".songItems");
let songTime=document.getElementById("currentMusicTime");

let aboutSections=document.querySelectorAll("nav ul li a");


// Songs List
const songs=[
  {songName:"Barsaat Aa Gayi",filePath:"songs/1.mp3",coverPath:"covers/1.jpg",time:"3:40"},
  {songName:"Chaand se pyara mukhda",filePath:"songs/2.mp3",coverPath:"covers/2.jpg",time:"3:19"},
  {songName:"Dilbara",filePath:"songs/3.mp3",coverPath:"covers/3.jpg",time:"2:36"},
  {songName:"Ek Tu Hi Hai",filePath:"songs/4.mp3",coverPath:"covers/4.jpg",time:"3:19"},
  {songName:"Issa Vibe Bloddy Daddy",filePath:"songs/5.mp3",coverPath:"covers/5.jpg",time:"2:27"},
  {songName:"Pehli Barish Mein",filePath:"songs/6.mp3",coverPath:"covers/6.jpg",time:"4:00"},
  {songName:"Sun Sajni",filePath:"songs/7.mp3",coverPath:"covers/7.jpg",time:"4:26"},
  {songName:"Teri Main Hogayi",filePath:"songs/8.mp3",coverPath:"covers/8.jpg",time:"3:26"}
]
// For Showing the Songs detail on the Page
let songsHtml="";
songs.forEach((song,i)=>{
  songsHtml+=`
      <div class="songItem">
        <img src=${song.coverPath} alt="songItemCover" width="36px">
        <span class="songName">${song.songName}</span>
        <span class="songTime">${song.time}<span><i id="${i}" class="fa-solid songPlayItem fa-circle-play"></i></span></span>
      </div>
  `
});
songItemsContainer.innerHTML=songsHtml;
let singleSongBtns=document.querySelectorAll(".songTime i");
let songItems=Array.from(document.getElementsByClassName("songItem"));


// About Section
aboutSections.forEach((aboutSection)=>{
  aboutSection.addEventListener(('click'),()=>{
    gif.style.opacity=0;
    singleSongBtns[songIndex].classList.add("fa-circle-play");
    singleSongBtns[songIndex].classList.remove("fa-circle-pause");
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  })
});


// Play and Paused songs
masterPlay.addEventListener('click',()=>{
  if(audioElement.paused || audioElement.currentTime<=0){
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity=1;
    singleSongBtns[songIndex].classList.add("fa-circle-pause");
    singleSongBtns[songIndex].classList.remove("fa-circle-play");
  }
  else{
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity=0;
    singleSongBtns[songIndex].classList.remove("fa-circle-pause");
    singleSongBtns[songIndex].classList.add("fa-circle-play");
  }
})

//work on progressBar
audioElement.addEventListener('timeupdate',()=>{
  let minutes=Math.floor(audioElement.currentTime/60);
  minutes=minutes<=9?"0"+minutes:minutes;
  let seconds=Math.floor(audioElement.currentTime%60);
  seconds=seconds<=9?"0"+seconds:seconds;
  songTime.innerHTML=` - ${minutes}:${seconds}`
  
  progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
  if(progress===100){
    songTime.innerHTML=" - 00:00";
    songIndex=(songIndex<songs.length-1)?songIndex+=1:0;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.play();
    document.getElementById("currentMusicPlay").innerText=songs[songIndex].songName;
    singleSongBtns[songIndex].classList.remove("fa-circle-play");
    singleSongBtns[songIndex].classList.add("fa-circle-pause");
    if(songIndex>0){
      singleSongBtns[songIndex-1].classList.add("fa-circle-play");
      singleSongBtns[songIndex-1].classList.remove("fa-circle-pause");
    }else{
      singleSongBtns[songs.length-1].classList.add("fa-circle-play");
      singleSongBtns[songs.length-1].classList.remove("fa-circle-pause");
    }
  }
  myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
  audioElement.currentTime=(myProgressBar.value*audioElement.duration)/100;
})

// Work on Next Song
forwardSong.addEventListener('click',()=>{
  gif.style.opacity=1;
  singleSongBtns[songIndex].classList.remove("fa-circle-pause");
  singleSongBtns[songIndex].classList.add("fa-circle-play");
  if(songIndex>=songs.length-1){
    songIndex=0;
    singleSongBtns[songIndex].classList.add("fa-circle-pause");
    singleSongBtns[songIndex].classList.remove("fa-circle-play");
  }else{
    songIndex+=1;
    singleSongBtns[songIndex].classList.add("fa-circle-pause");
    singleSongBtns[songIndex].classList.remove("fa-circle-play");
  }
  audioElement.currentTime=0;
  audioElement.src=`songs/${songIndex+1}.mp3`;
  masterPlay.classList.add("fa-circle-pause");
  masterPlay.classList.remove("fa-circle-play");
  audioElement.play();

  document.getElementById("currentMusicPlay").innerText=songs[songIndex].songName;
});

// Work on previous Song
backwardSong.addEventListener('click',()=>{
    gif.style.opacity=1;
    singleSongBtns[songIndex].classList.remove("fa-circle-pause");
    singleSongBtns[songIndex].classList.add("fa-circle-play");
  if(songIndex<=0){
    songIndex=songs.length-1;
    singleSongBtns[songIndex].classList.remove("fa-circle-play");
    singleSongBtns[songIndex].classList.add("fa-circle-pause");
  }else{
    songIndex-=1;
    singleSongBtns[songIndex].classList.remove("fa-circle-play");
    singleSongBtns[songIndex].classList.add("fa-circle-pause");
  }
  audioElement.currentTime=0;
  audioElement.src=`songs/${songIndex+1}.mp3`;
  masterPlay.classList.add("fa-circle-pause");
  masterPlay.classList.remove("fa-circle-play");
  audioElement.play();
  document.getElementById("currentMusicPlay").innerText=songs[songIndex].songName;
});

// work on play all Music which are available
const makeAllPlay=()=>{
  Array.from(document.getElementsByClassName("songPlayItem")).forEach((element)=>{
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  })
}
Array.from(document.getElementsByClassName("songPlayItem")).forEach((element)=>{
  element.addEventListener('click',(e)=>{
    makeAllPlay();
    songIndex=parseInt(e.target.id);
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");
    audioElement.currentTime=0;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterPlay.classList.add("fa-circle-pause");
    masterPlay.classList.remove("fa-circle-play");
    audioElement.play();
    document.getElementById("currentMusicPlay").innerText=songs[songIndex].songName;
    gif.style.opacity=1;
  })
})
