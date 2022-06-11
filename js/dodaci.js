function sudarKocki({ kocka1, kocka2}) {
    return(
      kocka1.rangeNapad.position.x + kocka1.rangeNapad.width >= kocka2.position.x &&
      kocka1.rangeNapad.position.x <= kocka2.position.x + kocka2.width &&
      kocka1.rangeNapad.position.y + kocka1.rangeNapad.height >= kocka2.position.y 
      && kocka1.rangeNapad.position.y <= kocka2.position.y + kocka2.height
    )
}

function pobednikPartije({igrac, protivnik, timerId}) {
  clearTimeout(timerId)
  document.querySelector('#tekstSredina').style.display = 'flex'
  if (igrac.zivot === protivnik.zivot) {
      document.querySelector('#tekstSredina').innerHTML = 'Nereseno'
  } else if (igrac.zivot > protivnik.zivot) {
      document.querySelector('#tekstSredina').innerHTML = 'Igrac je pobedio'
  } else if (igrac.zivot < protivnik.zivot) {
      document.querySelector('#tekstSredina').innerHTML = 'Protivnik je pobedio'
  }
}

let timer = 60
function smanjiTimer() {

if (timer > 0) {
 timerId=setTimeout(smanjiTimer, 1000)
  timer--
  document.querySelector('#vreme').innerHTML = timer
}
if (timer === 0) {
 
pobednikPartije({igrac, protivnik, timerId})

}
}