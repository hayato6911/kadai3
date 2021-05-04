'use strict';

/*letは固定のため。getElementByIdで各IDに仕掛ける*/
let timer = document.getElementById('timer');
let start = document.getElementById('start');
let stop = document.getElementById('stop');
let reset = document.getElementById('reset');

/*最初の段階の経過時間(elapsed)を0に設定　仮に１０００００とかにしちゃうと1分40秒から始まる*/
let elapsed = 0;

/*変数を入れないためnullを設定*/
let interval = null;

/*functionは関数は様々な処理を1つにまとめて、処理できる。同じ命令を何度も使いたい時に使うと思う*/
function time() {
  /*elapsed % 10以上にしてしまうとおかしくなってしまう。 */
  let milli = elapsed % 9;
  /*/1000 は1秒のこと。これは覚えるしかない。% 60 は６０秒経ったら0になる。*/
  /*逆に20とかに設定しちゃうと２０秒で0になるからストップウォッチとしてはおかしい。*/
  /*math.floorで小数点第一位で切り捨て*/
  let seconds = Math.floor(elapsed / 1000) % 60;
  /*(1000 * 60))の部分は６０秒経ったら、次に部分に1と表示させる。これが10に設定しちゃと１０秒で次の所に１と表示されてしまう。 */
  let minutes = Math.floor(elapsed / (1000 * 60)) % 60;
  let hours = Math.floor(elapsed / (1000 * 60 *60));

/*padStartで1桁しか数字を表さないようにする*/
  let m = milli.toString().padStart(1, '0');
  let min = minutes.toString().padStart(1, '0');
  let s = seconds.toString().padStart(1, '0');
  let h = hours.toString().padStart(1, '0');

/*0:0:0:0を示している。*/
    timer.textContent =`${h}:${min}:${s}.${m}`
;}
  
/*クリックの追加イベント。同じ命令を使いたいのでfunctionを使う*/
start.addEventListener('click', function() {
  /*有効な値を設定してないから、その位置に戻る。ということは1秒で止めたら、また1秒から始まるためなのかも*/
  if (interval !== null) { return; }
  
  /*new Dateだと現在の日時となる*/
      let startTime = new Date();

  interval = setInterval(function() {
    let stopTime = new Date();
    /*経過時間に今の時間を足す。 new Dateをstart_time、stop_timeにそれぞれ持っておき、その差分を経過時間として表示*/
    elapsed += stopTime - startTime;
    startTime = stopTime;
    time();
  }, 10);
});

stop.addEventListener('click', function() {
  clearInterval(interval);
  interval = null;
});

reset.addEventListener('click', function() {
  elapsed = 0;
  time();
});