//************************************************** 
//事前定義
//質問集
const Toi = ["坂の途中ですることではないな。なに？","高校の学年主任が言いそうなこと第91位は？","「でしょうね」と言わせてください",
             "サザエさんの次週予告がボツになった。どんなの？","PCのボタンを全て一斉に押すと何が起こる？",
             "3022年の日本で大流行。どんなの？","ジャニーズになるためには裏条件がある。なに？","若者たちを注意してください",
             "ドラえもんが最近悩んでいる事を教えてください"];
//今回は回答の点数を0点と5～10点の間にしておく
const Ten = [0,5,6,7,8,9,10]; 
let count = -1; //どの画像を遷移させるためのカウント変数
let Seni = 1; //この変数が1の時は画像がLoopして0の時はLoopしない
let Odai = 0; //出題されたお題の累計数をカウントする
let Tokuten = 0; //点数をカウントする
//Pdataには画像データが格納されている
const Pdata = ["./Ohgiri_1.jpg","./Ohgiri_2.jpg","./Ohgiri_3.jpg","./Ohgiri_4.jpg","./Ohgiri_5.jpg"];

//********************************************************************************************** 
function Final(){ //ボタンが押された一定時間後に問題を表示させる
    setTimeout(Question, 1000); //1000m秒は1秒
}
function FinalP(){
    Seni = 1; //画像遷移が実行されるようにしておく
    setTimeout(Hitokoto, 100); //100m秒は0.1秒
}

function Question() {
    let r = Math.floor( Math.random() * Toi.length ); //乱数を生成して整数値にする
    document.getElementById('textboxQ').value = Toi[r]; //画面に表示させる
}

function Hitokoto(){
    if(Seni == 1){ //変数Seniが1の時
        count++;
        if (count == Pdata.length){ //画像格納配列の最後まできたら先頭に戻る
        count = 0;
        }
        Pic.src = Pdata[count]; //画像を選ぶ
        setTimeout("Hitokoto()", 100); //自分を呼び出して再帰処理をしている。0.1秒毎に画像が切り替わる
    }
    else if(Seni == 0){ //0の時は何も実行しない
        return;
    }
}

function Stop(){
    Seni = 0; //画像Loopを停止させるために0にする
    let p = Math.floor(Math.random() * Pdata.length);
    Pic.src = Pdata[p]; //ランダムで選ばれた画像を画面に表示させる
}

function Ans(){
    let Text = document.getElementById('textboxA');
    let ANS = Text.value;
    Odai++; //累計お題数を1増加させる
    let s = Math.floor( Math.random() * (ANS.length ** 3)); //回答の文字列長を3乗した範囲から整数の乱数を取り出す
    let IPPON = ((ANS.length) * Math.pow(s,2)) % Ten.length; // (回答の文字列長 * sの2乗)を指定した点数配列の長さで割った余りを求める

    if(IPPON == 0){
        printMsg("ああっと、まさかの" + Ten[IPPON] + "本が出てしまいました。次の回答に期待しましょう");
    }
    else if(IPPON == 1){
        printMsg("ここは" + Ten[IPPON] + "点どまりでした");
    }
    else if(IPPON == 2){
        printMsg(Ten[IPPON] + "点という事で、回答のキレがなかったですね、、、");
    }
    else if(IPPON == 3){
        printMsg(Ten[IPPON] + "点!!  もう少しパンチがある回答が欲しいですね");
    }
    else if(IPPON == 4){
        printMsg("よかったですが" + Ten[IPPON] + "点でした");
    }
    else if(IPPON == 5){
        printMsg("僅かに届かず" + Ten[IPPON] + "点です");
    }
    else if(IPPON == 6){
        printMsg("お見事!!" + Ten[IPPON] +  "点で1本獲得です!!");
        Tokuten++; // 1本獲った時に1増加させる
    }

    //現在の成績を表示させる
    document.getElementById('Seiseki').innerHTML = Odai + "つの回答に対して" + Tokuten + "本獲得しています！！";
    //console.log(IPPON); //確認用
}

//**************************************************************************
//画面表示用
function printMsg(kekka){
    document.getElementById("Ohgiri").innerHTML = kekka;
}