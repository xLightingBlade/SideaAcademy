package geometria;

//mi immagino un parallelepipedo di facce rettangolari, per questo esercizio
public class Parallelepipedo extends FigureGeometriche {

    public Parallelepipedo(double base, double altezza, double profondita) {
        super(base, altezza, profondita);
        calcolaArea();
        calcolaVolume();
    }

    @Override
    public void calcolaArea() {
        this.area = 2 * ((this.base * this.profondita) + (this.base * this.altezza) +
                (this.profondita * this.altezza));
    }

    @Override
    public void calcolaVolume() {
        this.volume = this.base * this.altezza * this.profondita;
    }

}
