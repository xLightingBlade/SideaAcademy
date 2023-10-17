public class Rettangolo {
    public int base;
    public int altezza;
    public int area;
    public int perimetro;

    Rettangolo() {

    }

    Rettangolo(int base, int altezza) {
        this.base = base;
        this.altezza = altezza;
    }
/*
    public void calcolaArea() {
        area = base * altezza;
    }

    public void mostraArea() {
        System.out.println("Area del rettangolo di dimensioni " + base + "x" + altezza + " : "
                + area );
    }
*/
    public void calcolaPerimetro() {
        perimetro = 2*base + 2*altezza;
    }

    public void mostraPerimetro() {
        System.out.println("Perimetro del rettangolo di lati " + base + " e " + altezza + " : "
                + perimetro );
    }
}
