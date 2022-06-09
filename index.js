//pravimo ekran

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

c.fillRect(0, 0, canvas.width, canvas.height)

//Izrada boraca

const gravity = 0.5

class Sprite {
    constructor({pozicija, brzina, boja = 'red', offset}){
        this.pozicija = pozicija
        this.brzina = brzina
        this.width = 50
        this.height = 150
        this.lastKey
        this.rangeNapad = {
            pozicija: {
                x: this.pozicija.x,
                y: this.pozicija.y
            },
            offset,
            width: 100,
            height: 50
        }
        this.boja = boja
        this.napada
    }
    draw() {
        c.fillStyle = this.boja
        c.fillRect(this.pozicija.x, this.pozicija.y, this.width, this.height)

        // Range napada
        if(this.napada) {
        c.fillStyle = 'green'
        c.fillRect(
            this.rangeNapad.pozicija.x,
            this.rangeNapad.pozicija.y,
            this.rangeNapad.width,
            this.rangeNapad.height
            )
    }
    }


    update(){
        this.draw()
        this.rangeNapad.pozicija.x = this.pozicija - this.rangeNapad.offset.x
        this.rangeNapad.pozicija.y = this.pozicija

        this.pozicija.x += this.brzina.x
        this.pozicija.y += this.brzina.y

        if (this.pozicija.y + this.height + this.brzina.y >= canvas.height) {
            this.brzina.y = 0
        } else this.brzina.y += gravity
    }
    napada() {
        this.napada = true
        setTimeout(() => {
           this.napada = false 
        }, 100);
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
    },
    offset: {
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
},
boja: 'blue',
offset: {
    x: -50,
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

  function sudarKocki({ kocka1, kocka2}) {
      return(
        kocka1.rangeNapad.pozicija.x + kocka1.rangeNapad.width >= kocka2.pozicija.x &&
        kocka1.rangeNapad.pozicija.x <= kocka2.pozicija.x + kocka2.width &&
        kocka1.rangeNapad.pozicija.y + kocka1.rangeNapad.height >= kocka2.pozicija.y 
        && kocka1.rangeNapad.pozicija.y <= kocka2.pozicija.y + kocka2.height
      )
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
// Sudar
if (sudarKocki({
    kocka1: igrac,
    kocka2: protivnik
  }) &&
  igrac.napada
    ){
        igrac.napada = false
console.log(`go`)
}
if (sudarKocki({
    kocka1: protivnik,
    kocka2: igrac
  }) &&
  protivnik.napada
    ){
        igrac.napada = false
console.log(`napad prosao`)
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
            case ' ':
            igrac.napada()
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
                    case 'ArrowDown':
                        protivnik.napada = true
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