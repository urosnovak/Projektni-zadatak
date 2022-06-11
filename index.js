//pravimo ekran

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

//Izrada boraca

const gravity = 0.5

const background = new Sprite({
    position: {
      x: 0,
      y: 0
    },
    imageSrc: './img/background mapa pravljena.png'
  })




const igrac = new Borac({
    position: {
        x:0,
    y:0
    },
    brzina: {
        x:0,
        y:0
    },
    offset: {
        x:0,
        y:0
    },
    imageSrc: './img/protivnik/Idle.png',
  framesMax: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 157
  },
  sprites: {
    idle: {
      imageSrc: './img/protivnik/Idle.png',
      framesMax: 8
    },
    run: {
      imageSrc: './img/protivnik/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/protivnik/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/protivnik/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/protivnik/Attack1.png',
      framesMax: 6
    },
    takeHit: {
      imageSrc: './img/protivnik/Take Hit - white silhouette.png',
      framesMax: 4
    },
    death: {
      imageSrc: './img/protivnik/Death.png',
      framesMax: 6
    }
  },
  rangeNapad: {
    offset: {
      x: 100,
      y: 50
    },
    width: 160,
    height: 50
  }

    })

const protivnik = new Borac({
    position: {
    x:400,
y:100
},
brzina: {
    x:0,
    y:0
},
color: 'blue',
offset: {
    x: -50,
    y:0
},
imageSrc: './img/igrac/Idle.png',
  framesMax: 4,
  scale: 2.5,
  offset: {
    x: 215,
    y: 167
  },
  sprites: {
    idle: {
      imageSrc: './img/igrac/Idle.png',
      framesMax: 4
    },
    run: {
      imageSrc: './img/igrac/Run.png',
      framesMax: 8
    },
    jump: {
      imageSrc: './img/igrac/Jump.png',
      framesMax: 2
    },
    fall: {
      imageSrc: './img/igrac/Fall.png',
      framesMax: 2
    },
    attack1: {
      imageSrc: './img/igrac/Attack1.png',
      framesMax: 4
    },
    takeHit: {
      imageSrc: './img/igrac/Take hit.png',
      framesMax: 3
    },
    death: {
      imageSrc: './img/igrac/Death.png',
      framesMax: 7
    }
  },
  rangeNapad: {
    offset: {
      x: -170,
      y: 50
    },
    width: 170,
    height: 50
  }
})

console.log(igrac)

const keys = {
    a: {
      pressed: false
    },
    d: {
      pressed: false
    },
    ArrowRight: {
        pressed: false
      },
      ArrowLeft: {
        pressed: false
      }
  }

  smanjiTimer()



function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = `black`
    c.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    c.fillStyle = 'rgba(255, 255, 255, 0.15)'
  c.fillRect(0, 0, canvas.width, canvas.height)
    igrac.update()
    protivnik.update()

    igrac.brzina.x = 0
    protivnik.brzina.x = 0

 // Kretanje igraca
    if (keys.a.pressed && igrac.lastKey === 'a') {
        igrac.brzina.x = -5
        igrac.switchSprite('run')
     } else if (keys.d.pressed && igrac.lastKey === 'd') {
                igrac.brzina.x = 5
                igrac.switchSprite('run')
            }
            else{
                igrac.switchSprite('idle')
            }
 // Skakanje igrac

 if (igrac.brzina.y < 0) {
    igrac.switchSprite('jump')
  } else if (igrac.brzina.y > 0) {
    igrac.switchSprite('fall')
  }

//Kretanje protivnika
    if (keys.ArrowLeft.pressed && protivnik.lastKey === 'ArrowLeft') {
         protivnik.brzina.x = -5
         protivnik.switchSprite('run')
     } else if (keys.ArrowRight.pressed && protivnik.lastKey === 'ArrowRight') {
         protivnik.brzina.x = 5
         protivnik.switchSprite('run')
      }else {
        protivnik.switchSprite('idle')
      }
// Skakanje protivnik

if (protivnik.brzina.y < 0) {
    protivnik.switchSprite('jump')
  } else if (protivnik.brzina.y > 0) {
    protivnik.switchSprite('fall')
  }

// Sudar i udarac
if (sudarKocki({
    kocka1: igrac,
    kocka2: protivnik
  }) &&
  igrac.napada &&
  igrac.framesCurrent === 4
    ){
        protivnik.takeHit()
        igrac.napada = false

        gsap.to('#healthProtivnik2', {
            width: protivnik.zivot + '%'
        })
}

// Igrac promasi udarac

if (igrac.napada && igrac.framesCurrent === 4) {
    igrac.napada = false
  }

  // Igrac prima udarac

if (sudarKocki({
    kocka1: protivnik,
    kocka2: igrac
  }) &&
  protivnik.napada &&
  protivnik.framesCurrent === 2
    ){
        igrac.takeHit()
        protivnik.napada = false

        gsap.to('#healthIgrac2', {
            width: igrac.zivot + '%'
        })
}

// Protivnik promasi udarac

if (protivnik.napada && protivnik.framesCurrent === 2) {
    protivnik.napada = false
  }

//kraj igre zavisno od zivota
if(protivnik.zivot <= 0 || igrac.zivot <= 0) {
pobednikPartije({igrac, protivnik, timerId})
}

        }

animate()

window.addEventListener('keydown', (event) => {
   if(!igrac.dead) {
    switch (event.key) {
        case 'd':
        keys.d.pressed = true
        igrac.lastKey = 'd'
        break
        case 'a':
         keys.a.pressed = true
         igrac.lastKey = 'a'
         break
         case 'w':
            igrac.brzina.y = -20
            break
            case ' ':
            igrac.napad()
            break

    }
}

 if (!protivnik.dead){
 switch (event.key) {
case 'ArrowRight':
 keys.ArrowRight.pressed = true
 protivnik.lastKey = 'ArrowRight'
 break
case 'ArrowLeft':
keys.ArrowLeft.pressed = true
protivnik.lastKey = 'ArrowLeft'
break
case 'ArrowUp':
 protivnik.brzina.y = -20
break
case 'ArrowDown':
protivnik.napad()
   break
    }
}
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
        break
        case 'a':
        keys.a.pressed = false
        break 
    }
    // Protivnik komande
    switch(event.key) {
        case 'ArrowRight':
        keys.ArrowRight.pressed = false
        break
        case 'ArrowLeft':
        keys.ArrowLeft.pressed = false
        break
    }
})