
export class Submission {
    constructor(concursante, problema, tiempo, l) {
        this.concursante = concursante;
        this.problema = problema;
        this.tiempo = tiempo;
        this.l = l
    }


    

    toString() {
        return this.concursante + " " + this.problema + " " + this.tiempo + " " + this.l;
    }    
}