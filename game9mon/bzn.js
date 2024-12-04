//
// @alicebecky10
//

let nowplaying=false;
const mMusic = new Audio('Images_no_voc.mp3');
mMusic.loop = true;
function MusicToggle(){
  nowplaying = !nowplaying;
  if (nowplaying) {
    mMusic.play();
  } else {
    mMusic.pause();
  }
}

let msglog = ["Game Start", "----"];
let d = null;
let bfld = ""; // button field.
let nowprt = 0;

window.onload = function(){
  d    = document.getElementById("bgame");
  bfld = document.getElementById("btnfld");
};

function sleep(ms) {
   return new Promise(function(resolve) {
      setTimeout(function() {resolve()}, ms);
   });
}

let temmetsuflg = 0;
function do_temmetsu() {
  if (d==null) {return;}
  let s = d.innerHTML;
  if (temmetsuflg==0) {
    s = s.replace("■","□");
    temmetsuflg = 1;
  } else {
    s = s.replace("□","■");
    temmetsuflg = 0;
  }
  d.innerHTML = s;
}
setInterval(do_temmetsu, 500);

async function prt(s) {
  msglog.push(s);
  if (d!=null && !nowprt) {
    nowprt = 1;
    d.innerHTML = "";
    ss = "";
    for(let i=0;i<s.length;i++) {
      ss += s[i];
      d.innerHTML = ss + "■";
      await sleep(60);
    }
  }
  await sleep(100);
  nowprt = 0;
}

async function hello_world() {
  clsele();
  if (nowprt == 0) {
    prt("プレゼンテッド・バイ＿　　　　ベッキー42号＿　　　　　HAHAHA!!＿");
  }
  while(nowprt) {
    await sleep(1500);
  }
  await sleep(1500);
  if (nowprt == 0) {
    prt("上の音符ボタンで音楽を流そう！　流したかったらね。");
  }
  while(nowprt) {
    await sleep(1500);
  }
  addsele(1,"はじめから");
  addsele(1,"New Game");
  addsele(1,"Start Game");
}

let n_sele = 0;
let seleidtmp = [];
let selebtntmp = [];
function clsele() {
  bfld.innerHTML = "";
  n_sele = 0;
  seleidtmp　= [];
  selebtntmp = [];
}

function addsele(v,s) {
  seleidtmp[n_sele] = n_sele;
  selebtntmp[n_sele] = s;
  bfld.innerHTML += "<span class=\"btns\" onclick=do_button(" + v + "," + n_sele + ")>" + s +"</span><br />";
  n_sele += 1;
}

function print_msglog() {
  if (!d) return;
  if (nowprt) return;
  let s = "";
  msglog.forEach(function(element){s+=element+"<br />";});
  d.innerHTML = s;
}

//
// main game
//
function do_button(v, seleid){
  if (v==0) {
    clsele();
    hello_world();
  } else {
    msglog.push("[" + selebtntmp[seleid] + "]");
    aabbcc(v);
  }
}

/*
async function dummmy_00(v) {
  if (nowprt == 0) {
    clsele();
    switch(v) {
      case 1:
        prt("森のなかかな？");
        while(nowprt) {
          await sleep(100);
        }
        addsele(1, "Neru.");
        addsele(2, "Miru.");
        break;
      case 2:
        prt("森のなかだ。");
        while(nowprt) {
          await sleep(100);
        }
        addsele(1, "Neru.");
        break;
      default:
        break;
    }
  }
}
*/