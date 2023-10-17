public class Triangolo {
    public int base;
    public int altezza;
    public int area;
    public int perimetro;
    public int lato1;
    public int lato2;

    Triangolo() {

    }

    Triangolo(int base, int altezza) {
        this.base = base;
        this.altezza = altezza;
    }

    Triangolo(int base, int lato1, int lato2) {
        this.base = base;
        this.lato1 = lato1;
        this.lato2 = lato2;
    }

    /*public void calcolaArea() {
        area = (base * altezza) / 2;
    }

    public void mostraArea() {
        System.out.println("Area del triangolo di dimensioni " + base + "x" + altezza + " : "
                + area );
    }
    */
    public void calcolaPerimetro() {
        perimetro = base + lato1 + lato2;
    }

    public void mostraPerimetro() {
        System.out.println("Perimetro del triangolo di base " + base +  " e lati "
                + lato1 + " e " + lato2 + " : " + perimetro );
    }
}
