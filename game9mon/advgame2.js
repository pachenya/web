let ingameflg=0;

function rnd(n) {
  return Math.floor(Math.random()*n);
}

function ads_aux(s1,s2,an) {
  anw=1;
  if (rnd(2)==1) {
    addsele(an,s1);
    addsele(anw,s2);
  } else {
    addsele(anw,s2);
    addsele(an,s1);
  }
}

async function aabbcc(v) {
if (nowprt == 0) {
    clsele();
switch(v) {
case 0:prt("damii...");while(nowprt){await sleep(100);}
addsele(1,"OK");break;case 1:prt("きみは奇妙な夢から目覚めた。");while(nowprt){await sleep(100);}
  if (!ingameflg) {
    addsele(2,"ここはどこだろうか？");addsele(14,"まだ寝てたいな");
  } else {
    addsele(15,"奇妙な声が……");
  }
break;case 2:prt("周りを見渡すと、これがまたよくある話で、きみは森の中にいる。...........");while(nowprt){await sleep(100);}
addsele(3,"まさかだろ...");addsele(14,"まあいいや寝るか...");break;case 3:prt("「森の中ですわ〜！」");while(nowprt){await sleep(100);}
addsele(4,"そんな。でも。");break;
case 4:
  ingameflg=1;
  prt("森の中だった。木漏れ日がキレイで、暖かい風が木々を揺らしている。快適な森の中だ。");while(nowprt){await sleep(100);}
addsele(15,"何かが問いかけてくる...");break;case 14:prt("Zzz...");while(nowprt){await sleep(100);}
addsele(1,"...");break;
  case 15:
    {
      let t01=rnd(4)+7;
      let ans011=t01**t01;
      let ans012=t01**t01;
      if (rnd(2)) {
        ans012+=10;
      } else {
        ans012-=10;
      }
      prt("壱. "+t01+"の"+t01+"乗は？");
      while(nowprt){await sleep(100);}
      ads_aux(String(ans011),String(ans012),16);
    }
    break;
    case 16:
      {
      let t01=rnd(6)+13;
      let ans011=t01**2;
      let ans012=(t01+1)**2;
      prt("弐. "+t01+"の2乗は？");
      while(nowprt){await sleep(100);}
      ads_aux(String(ans011),String(ans012),17);
      }
      break;
    case 17:
      {
      let t01=12345679,t2=(rnd(8)+1);
      let ans011=t01*(t2*9);
      let ans012=t01*(t2+1)*9;
      prt("参. "+t01+"かける"+(t2*9)+"は？");
      while(nowprt){await sleep(100);}
      ads_aux(String(ans011),String(ans012),18);
      }
      break;
    case 18:
      {
      let t01="四. "+ "「むかつく」とはどういうことか表しなさい。";
      let ans011="知るか、テメーで考えろ！";
      let ans012="Feel so good.";
      prt(t01);
      while(nowprt){await sleep(100);}
      ads_aux(String(ans011),String(ans012),19);
      }
      break;
    case 19:
      {
      let t01="伍. √3914128969は？";
      let ans011="62563";
      let ans012="191919";
      prt(t01);
      while(nowprt){await sleep(100);}
      ads_aux(String(ans011),String(ans012),20);
      }
      break;
    case 20:
    {
      let t01=rnd(3)+12;
      let ans011=t01**t01;
      let ans012=t01**t01;
      if (rnd(2)) {
        ans012+=10;
      } else {
        ans012-=10;
      }
      prt("六. "+t01+"の"+t01+"乗は？");
      while(nowprt){await sleep(100);}
      ads_aux(String(ans011),String(ans012),21);
    }
    break;
    case 21:
      {
      let t01="七. ";
      let dicem=6;
      let dn=rnd(10)+5;
      let ans011=(dicem+dicem*dn) / 2;
      let ans012=(dicem+dicem*dn) / 2;
      if (rnd(2)) {
        ans012+=2;
      } else {
        ans012-=2;
      }
      prt(t01+String(dicem)+"d"+String(dn)+"の期待値は？");
      while(nowprt){await sleep(100);}
      ads_aux(String(ans011),String(ans012),22);
      }
      break;
    case 22:
    {
      let t01=rnd(3)+12;
      let ans011="3.141592653589793238462643383279502884197169...";
      let ans012="3.141592653589793239462643383279502884297169...";
      prt("八. 円周率は？");
      while(nowprt){await sleep(100);}
      ads_aux(String(ans011),String(ans012),23);
    }
    break;
    case 23:
    {
      let bai=42+rnd(42);
      let tsikkusu = 69*bai;
      let tnainn = 69*bai;
      if (rnd(2)) {
        tnainn +=2;
      } else {
        tnainn -=2;
      }
      let ans011=tsikkusu + " / " + bai;
      let ans012=tnainn  + " / " +  bai;
      prt("九. 究極の問いに対する究極の答えの一つ、愛の形は？");
      while(nowprt){await sleep(100);}
      ads_aux(String(ans011),String(ans012),24);
    }
    break;
    case 24:
      {
        prt("霧が晴れていく......あなたは光りに包まれた。");
        while(nowprt){await sleep(100);}
        addsele(25,"...")
      }
      break;
    case 25:
      {
        prt("You win................... *CONGRATULATIONS*　　　　　　遊んでくれてありがとう！");
        while(nowprt){await sleep(100);}
        addsele(4242,"...")
      }
      break;
case 4242:{prt("＊＊＊エンディング＊＊＊");while(nowprt){await sleep(100);}addsele(4242+1,".........")} break;case 4243:{prt("＊キャスト＊");while(nowprt){await sleep(100);}addsele(4243+1,".........")} break;case 4244:{prt("入れ墨の囚人：b42nd");while(nowprt){await sleep(100);}addsele(4244+1,".........")} break;case 4245:{prt("隊長：b42nd");while(nowprt){await sleep(100);}addsele(4245+1,".........")} break;case 4246:{prt("イギー：b42nd");while(nowprt){await sleep(100);}addsele(4246+1,".........")} break;case 4247:{prt("なますてまそ：b42nd");while(nowprt){await sleep(100);}addsele(4247+1,".........")} break;case 4248:{prt("ナマステマン：b42nd");while(nowprt){await sleep(100);}addsele(4248+1,".........")} break;case 4249:{prt("ビーンペーストブレッドパーソン：b42nd");while(nowprt){await sleep(100);}addsele(4249+1,".........")} break;case 4250:{prt("アンパン：b42nd");while(nowprt){await sleep(100);}addsele(4250+1,".........")} break;case 4251:{prt("クターストーン：b42nd");while(nowprt){await sleep(100);}addsele(4251+1,".........")} break;case 4252:{prt("＊脚本＊");while(nowprt){await sleep(100);}addsele(4252+1,".........")} break;case 4253:{prt("メインシナリオ：b42nd");while(nowprt){await sleep(100);}addsele(4253+1,".........")} break;case 4254:{prt("シナリオ：b42nd");while(nowprt){await sleep(100);}addsele(4254+1,".........")} break;case 4255:{prt("フライドシナリオ：b42nd");while(nowprt){await sleep(100);}addsele(4255+1,".........")} break;case 4256:{prt("フライド：b42nd");while(nowprt){await sleep(100);}addsele(4256+1,".........")} break;case 4257:{prt("サブシナリオ：b42nd");while(nowprt){await sleep(100);}addsele(4257+1,".........")} break;case 4258:{prt("脚色：b42nd");while(nowprt){await sleep(100);}addsele(4258+1,".........")} break;case 4259:{prt("タイピング：b42nd");while(nowprt){await sleep(100);}addsele(4259+1,".........")} break;case 4260:{prt("インプット：b42nd");while(nowprt){await sleep(100);}addsele(4260+1,".........")} break;case 4261:{prt("アイス：b42nd");while(nowprt){await sleep(100);}addsele(4261+1,".........")} break;case 4262:{prt("ホッターマンやりたい：b42nd");while(nowprt){await sleep(100);}addsele(4262+1,".........")} break;case 4263:{prt("チョコミントアイス：b42nd");while(nowprt){await sleep(100);}addsele(4263+1,".........")} break;case 4264:{prt("ジャモカアーモンドファッジ：b42nd");while(nowprt){await sleep(100);}addsele(4264+1,".........")} break;case 4265:{prt("ヴァニラ・アイス：b42nd");while(nowprt){await sleep(100);}addsele(4265+1,".........")} break;case 4266:{prt("＊スタッフ＊");while(nowprt){await sleep(100);}addsele(4266+1,".........")} break;case 4267:{prt("アニマルトレイナー：b42nd");while(nowprt){await sleep(100);}addsele(4267+1,".........")} break;case 4268:{prt("モンハンアディクト：b42nd");while(nowprt){await sleep(100);}addsele(4268+1,".........")} break;case 4269:{prt("シレン６プレイヤー：b42nd");while(nowprt){await sleep(100);}addsele(4269+1,".........")} break;case 4270:{prt("Androidユーザー：b42nd");while(nowprt){await sleep(100);}addsele(4270+1,".........")} break;case 4271:{prt("蕎麦イーター：b42nd");while(nowprt){await sleep(100);}addsele(4271+1,".........")} break;case 4272:{prt("デバッグ：b42nd");while(nowprt){await sleep(100);}addsele(4272+1,".........")} break;case 4273:{prt("デバッグ補佐：b42nd");while(nowprt){await sleep(100);}addsele(4273+1,".........")} break;case 4274:{prt("人間凶器：b42nd");while(nowprt){await sleep(100);}addsele(4274+1,".........")} break;case 4275:{prt("伝説の人工無脳：b42nd");while(nowprt){await sleep(100);}addsele(4275+1,".........")} break;case 4276:{prt("テストプレイヤー：b42nd");while(nowprt){await sleep(100);}addsele(4276+1,".........")} break;case 4277:{prt("将棋監修：b42nd");while(nowprt){await sleep(100);}addsele(4277+1,".........")} break;case 4278:{prt("時代考証監修：b42nd");while(nowprt){await sleep(100);}addsele(4278+1,".........")} break;case 4279:{prt("アイス監修：b42nd");while(nowprt){await sleep(100);}addsele(4279+1,".........")} break;case 4280:{prt("キリ番ゲット：b42nd");while(nowprt){await sleep(100);}addsele(4280+1,".........")} break;case 4281:{prt("ドノヴァン使い：b42nd");while(nowprt){await sleep(100);}addsele(4281+1,".........")} break;case 4282:{prt("ドランク：b42nd");while(nowprt){await sleep(100);}addsele(4282+1,".........")} break;case 4283:{prt("タイムウェイスター：b42nd");while(nowprt){await sleep(100);}addsele(4283+1,".........")} break;case 4284:{prt("プログラム：b42nd");while(nowprt){await sleep(100);}addsele(4284+1,".........")} break;case 4285:{prt("(※このゲームの制作において、いかなる自然界の動物も傷つけられてはいません)");while(nowprt){await sleep(100);}addsele(4285+1,".........")} break;case 4286:{prt("Thank you for playing!");while(nowprt){await sleep(100);}addsele(4286+1,".........")} break;case 4287:{prt("企画：b42nd");while(nowprt){await sleep(100);}addsele(4287+1,".........")} break;case 4288:{prt("制作：b42nd");while(nowprt){await sleep(100);}addsele(4288+1,".........")} break;case 4289:{prt("企画制作：b42nd");while(nowprt){await sleep(100);}addsele(4289+1,".........")} break;case 4290:{prt("監督：Aki Kuhid");while(nowprt){await sleep(100);}addsele(4290+1,".........")} break;

default:
  prt("「森の中ですわ〜！」");while(nowprt){await sleep(100);}
  addsele(14,"まだ寝てたいな")
break;
}
}
}

let iscr = 0;
var startscroll = function () {
    scrollTo(0, iscr);
    iscr += 5;
    if (window.pageYOffset >= document.documentElement.scrollHeight - document.documentElement.clientHeight) {
    }else{
        window.requestAnimationFrame(startscroll);
    }
};

/*
      prt("");
      while(nowprt){await sleep(100);}
while(nowprt){await sleep(100);}
*/