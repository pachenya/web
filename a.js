const DEBUGOPT = 1;
const apW = 128, apH = 128;
let IS_SMAPHO = 0;

const app = new PIXI.Application(
  {
    width: apW,
    height: apH,
    antialiasing: false,
    transparent: false,
    resolution: 1
    // resizeTo: window
  }
);

document.body.appendChild(app.view);

// window.innerWidth
if (isSma()) {
  IS_SMAPHO = 1;
} else {
  IS_SMAPHO = 0;
}
app.view.setAttribute("width",
  apW);
app.view.setAttribute("height",
  apH);
if (IS_SMAPHO) {
  let w = window.innerWidth-5;
  let h = window.innerHeight-5;
  if (w > h) {
    w = h;
  } else if (h > w) {
    h = w;
  }
  app.view.style.width = w + "px";
  app.view.style.height = h + "px";
  app.view.style.margin = "auto";
} else {
  let w = window.innerWidth-5;
  let h = window.innerHeight-5;
  if (w > h) {
    w = h;
  } else if (h > w) {
    h = w;
  }
  app.view.style.width = String(w) + "px";
  app.view.style.height = String(h) + "px";
  app.view.style.margin = "auto";
}

//
// Game
//
let TextureCache = PIXI.utils.TextureCache;
let Rectangle = PIXI.Rectangle;
let Sprite = PIXI.Sprite;
let key1, key2;
let scoreText;
let msgText;
let clcText;
let score = 0, score_height = 0;
let msgCnt = 0;
let theClock = 0;

const MUKI_L = 0, MUKI_R = 1;
const N_BXS = 8, N_BYS = 100;

let p, prect, gameScene, id, teki;
let jumpcnt = 0, jumpMax = 2;
let baseTexture, pTexture;
let pCameraY = N_BYS*16 - 100;
let blo = new Array(N_BYS);
for (let y = 0; y < N_BYS; y++) {
  blo[y] = new Array(N_BXS);
  for (x = 0; x < N_BXS; x++) {
    blo[y][x] = 0;
  }
}
const N_BTXES = 5, N_ITENUM = 13;
let bloTexture = [], blo_idx = [];
let iteTexture = [], ite_idx = [];
let item = [];

let texture, secondTexture, titleTexture, tekiTexture, endTexture, endingTexture;
let endPict, endPF;
let titlegamen;
const loader = PIXI.Loader.shared;

// Load images
loader
.add('pictitle', 'title.png')
.add('pic01', 'pacma_tohka.png')
.add('picend', 'picend.png')
.add('endingpict', 'endingpict.png')
.add('enemy', 'teki.png')
.load(setup);

// Load sounds
const sLoader = new PIXI.Loader();
sLoader
.add('s_jump', 'se_jump_short.mp3')
.add('s_bgm01', 'sht_a02.mp3')
.add('s_ending', 'arasuji_08.mp3')
.add('coin', 'se_coinget_1.mp3')
.add('s_hissatsu', 'se_zusyunzusyun.mp3')
.load(sndLoaded);

function sndLoaded() {
  dprt('snd setup end.')
  startup_it();
}

function setup() {
  dprt('setup.')

  add_stars();

  titleTexture = TextureCache['pictitle'];
  // texture = PIXI.Texture.from('pic01');
  texture = TextureCache['pic01'];
  // create a second texture
  tekiTexture = TextureCache['enemy'];
  endTexture = TextureCache['picend'];
  endingTexture = TextureCache['endingpict'];
  for (let i = 0; i < N_BTXES; i++) {
    let tmpr = new Rectangle((4+i)*16, 8*16, 16, 16);
    let tmpt = new PIXI.Texture(texture, tmpr);
    bloTexture.push(tmpt);
  }
  let tmpr2 = new Rectangle(4*16, 8*16, 16, 16);
  bloTexture.frame = tmpr2;
  for (let y = 0; y < N_BYS; y++) {
    for (x = 0; x < N_BXS; x++) {
      let mtmp = new Sprite(bloTexture[0]);
      blo[y][x] = mtmp;
      app.stage.addChild(mtmp);
      mtmp.x = x*16;
      mtmp.y = y*16;
      if (y < 1) {
        mtmp.visible = true;
      }
    }
  }
  build_map();

  for (let i = 0; i < N_ITENUM; i++) {
    let tmpr = new Rectangle((i+5)*16, 11*16, 16, 16);
    let tmpt = new PIXI.Texture(texture, tmpr);
    iteTexture.push(tmpt);
  }
  let tmpr1 = new Rectangle(5*16, 11*16, 16, 16);
  iteTexture.frame = tmpr1;
  for (let i = 0; i < N_ITENUM; i++) {
    let itmp = new Sprite(iteTexture[i]);
    item.push(itmp);
    app.stage.addChild(itmp);
    itmp.ly = (2 + rn0(N_BYS - 4)) * 16;
    itmp.lx = rn0(N_BXS)*16;
    itmp.visible = true;
  }

  prect = new Rectangle(0,
    0,
    16*20,
    16*4);
  pTexture = new PIXI.Texture(texture,
    prect);
  p = new Sprite(pTexture);
  plidx2sp(0);

  app.stage.addChild(p);
  p.x = apW/2;
  p.y = 128 - 16 - 1;
  p.oldy = p.y;
  p.ly = N_BYS * 16 - 16;
  p.vx = 0;
  p.vy = 0;
  p.muki = MUKI_L;
  p.pictnum = 0;
  p.frmcnt = 0;
  p.frm = 0;
  score_height = Math.floor(N_BYS-2 - (p.ly / 16));

  teki = new Sprite(tekiTexture);
  app.stage.addChild(teki);
  teki.ly = -20;
  teki.lx = apW/2 - 8;
  teki.y = -16;
  teki.x = teki.lx;

  // titlegamen
  dprt('setup title.')
  titlegamen = new Sprite(titleTexture);
  app.stage.addChild(titlegamen);

  endPict = new Sprite(endTexture);
  app.stage.addChild(endPict);
  endPict.scale.x = 0.5;
  endPict.scale.y = 0.5;
  endPict.visible = false;

  endPF = new Sprite(endingTexture);
  app.stage.addChild(endPF);
  endPF.visible = false;

  const styleScore = new PIXI.TextStyle({
    dropShadow: true,
    dropShadowDistance: 1,
    fill: [
      "white",
      "lime"
    ],
    fontSize: 10,
    fontVariant: "small-caps"
  });
  scoreText = new PIXI.Text('Score: 00000', styleScore);
  app.stage.addChild(scoreText);

  const styleMsg = new PIXI.TextStyle({
    dropShadow: true,
    dropShadowDistance: 1,
    fill: [
      "white",
      "lime"
    ],
    fontSize: 10,
    fontVariant: "small-caps"
  });
  msgText = new PIXI.Text('Loadong...', styleMsg);
  app.stage.addChild(msgText);
  msgText.position.x = 1;
  msgText.position.y = 95;
  clcText = new PIXI.Text('', styleMsg);
  app.stage.addChild(clcText);
  clcText.position.x = 1;
  clcText.position.y = 95+10;

  dprt('setup end.')

  startup_it();
}

function addmsg(s) {
  msgText.text = s;
  msgCnt = 60*5;
  msgText.visible = true;
}
function do_msg() {
  if (msgCnt > 0) {
    msgCnt--;
    if (msgCnt <= 0) {
      msgText.visible = false;
    }
  }
}

let startCnt = 0;
const N_S = 2;
function startup_it() {
  startCnt++;
  if (startCnt < N_S) {
    return;
  }
  addEventListener("pointerdown", onClick);
  addEventListener("keydown", gkFunc);
  // mainloop
  state = gTitle;
  app.ticker.add(delta => gameLoop(delta));
}

// player to spriteidx
function plidx2sp(n) {
  prect.x = (n%20) * 16;
  prect.y = Math.floor(n/20) * 16;
  prect.width = 16;
  prect.height = 16;
  pTexture.frame = prect;
}

function gameLoop(delta) {
  state(delta);
}

function init_ender() {
  addmsg('F.P.B. !!');
  endPict.visible = true;
  teki.visible = false;
  p.visible = false;
  score += 3333;
  for (let i = 0; i < N_ITENUM; i++) {
    item[i].visible = false;
  }
  for (let i = 0; i < N_BYS-2; i++) {
    for (let j = 0; j < N_BXS; j++) {
      blo[i][j].visible = false;
    }
  }
  PIXI.sound.stop('s_bgm01');
}

let endingClc = 0;
function gEnding() {
  do_stars(1);
  endingClc++;
  let i = (227-apH) - Math.floor(endingClc/5);
  if (i < 0) {
    i = 0;
  }
  endPF.y = -i;
  msgText.text = 'Thanks for Playing!';
  let tmp = ('00000' + String(score)).slice(-5);
  scoreText.text = 'Score: ' + tmp;
  msgText.visible = true;
}

let enderClock = 0;
const ENDTIME = 60*5;
const GOTO_END_TIME = 60 * 8;
function gEnder() {
  do_msg();
  if (enderClock < GOTO_END_TIME) {
    enderClock++;
    switch (enderClock) {
      case 60*1:
        addmsg('- Final -');
        break;
      case 60*2:
        addmsg('- Russian -');
        break;
      case 60*3:
        addmsg('-- Buster!!! --');
        break;
      case ENDTIME:
        PIXI.sound.play('s_hissatsu');
        break;
      case ENDTIME+5:
        PIXI.sound.play('s_hissatsu');
        break;
      case ENDTIME+10:
        PIXI.sound.play('s_hissatsu');
        break;
    }
    if (enderClock >= ENDTIME) {
      do_stars(1);
      endPict.y = 0;
      endPict.x = 0;
      endPict.y += rn0(11) - 5;
      endPict.x += rn0(7) - 3;
    } else {
      do_stars(-1);
    }
  } else if (enderClock == GOTO_END_TIME) {
    endPict.visible = false;
    endPF.visible = true;
    state = gEnding;
    let toptions = {
      loop: true,
      singleInstance: true
    };
    PIXI.sound.play('s_ending', toptions);
  }
}

function gTitle() {
  if (startCnt < 2) {
    key2 = 0;
    key1 = 0;
    return;
  } else {
    msgText.text = 'Tap to Start';
  }
  if (key2 || key1) {
    let toptions = {
      loop: true,
      singleInstance: true
    };
    PIXI.sound.play('s_bgm01', toptions);

    key1 = 0;
    key2 = 0;
    state = gPlay;
    addmsg("Let us go");
    titlegamen.visible = false;
  }
}

function gPlay(delta) {
  let flag_p_jumping = true;
  p.vy += 0.1;
  const pVYMax = 11;
  if (p.vy > pVYMax) {
    p.vy = pVYMax;
  }

  // count_score
  let tmpple = Math.floor(N_BYS-2 - (p.ly / 16));
  if (tmpple > score_height) {
    score += (tmpple - score_height)*10;
    score_height = tmpple;
  }

  // itemhitcheck
  for (let i = 0; i < N_ITENUM; i++) {
    let itmp = item[i];
    if (!itmp.visible) {
      continue;
    }
    let x1 = p.x + 4,
    x2 = p.x + 12;
    if (x1 + 4 < itmp.lx+16 && x2 > itmp.lx &&
      p.ly +16 > itmp.ly && p.ly < itmp.ly + 16) {
      itmp.visible = false;
      score += 100;
      addmsg("You've got an item.");
      PIXI.sound.play('coin');
    }
  }

  // endcheck
  if (p.ly < teki.ly + 16 && p.x < teki.lx + 16 && p.x + 16 > teki.lx) {
    // endgame
    init_ender();
    state = gEnder;
    dprt('end')
    return;
  }

  const pJPY = -2.2,
  pJPX = 0.7;
  if (key1) {
    key1 = 0;
    pjump(-pJPX, pJPY);
  } else if (key2) {
    key2 = 0;
    pjump(pJPX, pJPY);
  }
  p.x += p.vx;
  p.ly += p.vy;
  if (p.ly > (N_BYS-2) * 16) {
    p.vy = 0;
    p.ly = (N_BYS-2) * 16;
    jumpcnt = 0;
    flag_p_jumping = false;
  }
  if (p.x < 0) {
    p.x = 0;
    p.vx = -p.vx;
  } else if (p.x > apW - 16) {
    p.x = apW - 16;
    p.vx = -p.vx;
  }
  if (p.vy > 0) {
    let rval = p_hit_blo();
    if (rval) {
      // start walking
      p.vy = 0;
      jumpcnt = 0;
      flag_p_jumping = false;
    }
  }
  p.oldy = p.ly;
  do_camera();

  // pictnum
  if (p.vx < 0) {
    p.muki = MUKI_L;
  } else if (p.vx > 0) {
    p.muki = MUKI_R;
  }
  p.frmcnt++;
  const fwait = 6,
  fnum = 4,
  fpics = [0,
    1,
    0,
    2];
  if (p.frmcnt >= fwait*fnum) {
    p.frmcnt = 0;
  }
  p.pictnum = fpics[Math.floor(p.frmcnt / fwait)]
  if (flag_p_jumping) {
    p.pictnum = 1;
  }
  if (p.muki == MUKI_R) {
    p.pictnum = p.pictnum + 20;
  }
  plidx2sp(p.pictnum);

  let tmp = ('00000' + String(score)).slice(-5);
  scoreText.text = 'Score: ' + tmp;

  theClock++;
  let tmp_minute = ('000' + String(Math.floor((theClock / 60)/60))).slice(-3);
  let tmp_sec = ('00' + String(Math.floor(theClock / 60)%60)).slice(-2);
  clcText.text = 'T:' + tmp_minute + ':' + tmp_sec;
  do_stars(1);
  do_msg();
}

function pjump(vx, vy) {
  if (jumpcnt < jumpMax) {
    jumpcnt++;
    p.vy = vy;
    p.vx = vx;
    PIXI.sound.play('s_jump');
  }
}

function p_hit_blo(w = 12, h = 16) {
  if (p.vy < 0) {
    return 0;
  }
  let tNextY = p.ly + h;
  let tBloOldY = p.oldy + h - 0.0001;
  let tBloY = Math.floor(tNextY / 16);
  if (tBloY < 0 || tBloY >= N_BYS) {
    return 0;
  }
  if (Math.floor(tBloOldY/16) == Math.floor(tNextY/16)) {
    return 0;
  }
  let x_cen = p.x + (16 / 2);
  let x1 = x_cen - w/2;
  let x2 = x_cen + w/2;
  for (let x = 0; x < 8; x++) {
    let btmp = blo[tBloY][x];
    if (btmp.visible == false) {
      continue;
    }
    if (x*16 < x2 && x*16+16 > x1) {
      let yy = tBloY * 16 - h;
      p.ly = yy;
      p.vy = 0;
      return 1;
    }
  }
  return 0;
}

function do_p_up(sa) {
  p.ly -= sa;
}

function do_camera_blo() {
  for (let y = 0; y < N_BYS; y++) {
    for (x = 0; x < N_BXS; x++) {
      blo[y][x].y = -pCameraY+16*(y);
    }
  }
  teki.y = teki.ly - pCameraY;
}

function do_camera_ite() {
  for (let i = 0; i < N_ITENUM; i++) {
    itmp = item[i];
    itmp.y = itmp.ly -pCameraY;
    itmp.x = itmp.lx;
  }
}

function do_camera() {
  pCameraY = p.ly - apH/2+16;
  if (pCameraY > (N_BYS)*16 - apH) {
    pCameraY = (N_BYS)*16 - apH;
  }
  p.y = p.ly - pCameraY;
  do_camera_blo();
  do_camera_ite();
}

const N_STARS = 50;
let stars = [];

function add_stars() {
  for (let i = 0; i < N_STARS; i++) {
    let x = 0,
    y = 0;
    let vy = Math.random()*2+0.7;
    let graphic = new PIXI.Graphics();
    graphic.lineStyle(1, 0xbbbbbb);
    graphic.beginFill(0xbbbbbb);
    graphic.drawRect(x, y, 1, 1);
    app.stage.addChild(graphic);
    let mtmp = new CStar(graphic, 0, vy);
    mtmp.g.y = Math.random()*apH-1;
    mtmp.g.x = Math.random()*apW;
    stars.push(mtmp);
  }
}

function do_stars(n) {
  for (let i = 0; i < stars.length; i++) {
    let m = stars[i];
    if (m) {
      if (n > 0) {
        m.g.y += m.vy;
        if (m.g.y >= apH + 10) {
          m.g.x = Math.random()*apW-0.1;
          m.vy = Math.random()*2+0.7;
          m.g.y = 0;
        }
      } else {
        m.g.y -= m.vy * 3;
        if (m.g.y < -1) {
          m.g.x = Math.random()*apW-0.1;
          m.vy = Math.random()*2+0.7;
          m.g.y = apH+2;
        }
      }
    }
  }
}

function bidx_to_blo_xy(x, y, idx) {
  blo[y][x].texture = bloTexture[idx];
}

function build_map() {
  for (let i = 0; i < N_BYS; i++) {
    let flgnoblo = true,
    flgnoblocnt = 0;
    for (let j = 0; j < N_BXS; j++) {
      //XXX
      let val = true;
      let perc = 15;
      if (i >= (N_BYS * 2) / 3) {
        prec = 20;
      } else if (i <= (N_BYS * 1) / 3) {
        prec = 10;
      }
      if (rn0(100) < perc) {
        val = true;
        flgnoblo = false;
        if (i < N_BYS/2) {
          bidx_to_blo_xy(j, i, 4);
        }
      } else {
        val = false;
      }
      if (i >= N_BYS - 1) {
        val = true;
        bidx_to_blo_xy(j, i, 1);
      }
      blo[i][j].visible = val;
    }
    if (flgnoblo) {
      flgnoblocnt++;
      if (flgnoblocnt >= 1) {
        flgnoblocnt = 0;
        i--;
      }
    }
  }
}

class CStar {
  constructor(g, vx, vy) {
    this.g = g;
    this.vx = vx;
    this.vy = vy;
  }
}

function rn0(n) {
  if (n <= 0) {
    return 0;
  } else {
    return Math.floor(Math.random()*n);
  }
  return 0;
}

function dprt(s) {
  if (DEBUGOPT) {
    console.log(s);
  }
}

function onClick(e) {
  let offsetX = e.offsetX; // =>要素左上からのx座標
  let offsetY = e.offsetY; // =>要素左上からのy座標
  let pageX = e.pageX; // =>ウィンドウ左上からのx座標
  let pageY = e.pageY; // =>ウィンドウ左上からのy座標
  let clientX = e.clientX; // =>ページ左上からのx座標
  let clientY = e.clientY; // =>ページ左上からのy座標
  // dprt('onClick e: (' + Math.floor(pageX) + ', ' + Math.floor(pageY) + ')');

  let w = window.innerWidth;
  if (pageX < w/2) {
    // dprt('Hidari');
    key1 = 1;
    // jumpChara(-3);
  } else {
    // dprt('Migi');
    key2 = 1;
    // jumpChara(3);
  }
}

function gkFunc(e) {
  switch (e.code) {
    case 'KeyA':
      key1 = 1;
      break;
    case 'KeyD':
      key2 = 1;
      break;
    // case 'KeyO':
    //   dprt('pCameraY: ' + Math.floor(pCameraY) + '; p.y: ' + Math.floor(p.y) + '; p.ly: ' + Math.floor(p.ly));
    //   break;
  }
  dprt('keycode == ' + e.code);
}

function isSma() {
  const ua = navigator.userAgent;
  let rval = 0;
  if (ua.indexOf('iPhone') > -1 || (ua.indexOf('Android') > -1 && ua.indexOf('Mobile') > -1)) {
    dprt('Sumapho(' + ua + ')');
    rval = 1;
  } else {
    dprt('Not sumapho(' + ua + ')');
  }
  return rval;
}