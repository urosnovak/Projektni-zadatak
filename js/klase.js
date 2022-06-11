
class Sprite {
    constructor({pozicija}){
        this.pozicija = pozicija
        this.width = 50
        this.height = 150
      
    }
    draw() {

    }


    update(){
        this.draw()

    }
  
}
class Borac {
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
        this.zivot = 100
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