/* Get Our Elements */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer'); // 影片
const progress = player.querySelector('.progress'); // 進度條
const progressBar = player.querySelector('.progress__filled'); // 進度條
const toggle = player.querySelector('.toggle'); // 暫停 播放鍵
const skipButtons = player.querySelectorAll('.skip'); // 快轉
const ranges = player.querySelectorAll('.player__slider'); // 聲音 速度

/* Build out functions */
function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  // video[method]() 將參數帶進去後執行
  // video.play() || video.pause()
  video[method]();
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  console.log(icon);
  toggle.textContent = icon;
}

function skip() {
 video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  // volume, playbackRate
  // 等於 video.volume video.playbackRate
  // 以下方法是透過中括號取值 (整合在一起) 較精簡
  video[this.name] = this.value;
}

function handleProgress() {
  // currentTime 現在時間
  // duration 總時間
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

/* Hook up the event listeners */
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
// 是因為影片狀態改變 按鈕圖案才更新

video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);

video.addEventListener('timeupdate', handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));

// 音量和速率都綁上change 和 mousemove
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
// mousemove 是連續觸發事件 有時候卡卡的 是因畫面更新趕不上
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

let mousedown = false;
// 按下true 放開false
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
// progress.addEventListener('mousemove', function(e) {
  // mousedown && scrub(e);
// }); 省略為以上函式
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
