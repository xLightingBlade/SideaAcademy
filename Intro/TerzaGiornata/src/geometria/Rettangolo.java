package geometria;

public class Rettangolo extends FigureGeometriche {

    public Rettangolo(double base, double altezza) {
        super(base, altezza);
        calcolaArea();
        calcolaVolume();
    }

    @Override
    public void calcolaArea() {
        this.area = this.base * this.altezza;
    }

    @Override
    public void calcolaVolume() {
        this.volume = 0;
    }

}
