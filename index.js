//pravimo ekran

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

//Izrada boraca

const gravity = 0.5

class Sprite {
    constructor({pozicija, brzina}){
        this.pozicija = pozicija
        this.brzina = brzina
        this.height = 150
        this.lastKey
    }
    draw() {
        c.fillStyle = `red`
        c.fillRect(this.pozicija.x, this.pozicija.y, 50, 150)
    }
    update(){
        this.draw()

        this.pozicija.x += this.brzina.x
        this.pozicija.y += this.brzina.y

        if (this.pozicija.y + this.height + this.brzina.y >= canvas.height) {
            this.brzina.y = 0
        } else this.brzina.y += gravity
    }
}

const igrac = new Sprite({
    pozicija: {
        x:0,
    y:0
    },
    brzina: {
        x:0,
        y:0
    }
    })

const protivnik = new Sprite({
    pozicija: {
    x:400,
y:100
},
brzina: {
    x:0,
    y:0
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

function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = `black`
    c.fillRect(0, 0, canvas.width, canvas.height)
    igrac.update()
    protivnik.update()

    igrac.brzina.x = 0
    protivnik.brzina.x = 0

 // Kretanje igraca
    if (keys.a.pressed && igrac.lastKey === 'a') {
        igrac.brzina.x = -5
     } else if (keys.d.pressed && igrac.lastKey === 'd') {
                igrac.brzina.x = 5
            }
//Kretanje protivnika
    if (keys.ArrowLeft.pressed && protivnik.lastKey === 'ArrowLeft') {
         protivnik.brzina.x = -5
     } else if (keys.ArrowRight.pressed && protivnik.lastKey === 'ArrowRight') {
         protivnik.brzina.x = 5
      }
        }

animate()

window.addEventListener('keydown', (event) => {
    console.log(event.key)
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
    }
    console.log(event.key)
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

    console.log(event.key)
})