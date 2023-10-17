package geometria;

public abstract class FigureGeometriche {
    protected double lato = 0;
    protected double base = 0;
    protected double altezza = 0;
    protected double profondita = 0;
    protected double area = 0;
    protected double volume = 0;

    FigureGeometriche() {
    }

    FigureGeometriche(double lato) {
        this.lato = lato;
    }

    FigureGeometriche(double base, double altezza, double profondita) {
        this.base = base;
        this.altezza = altezza;
        this.profondita = profondita;
    }

    FigureGeometriche(double base, double altezza) {
        this.base = base;
        this.altezza = altezza;
    }

    FigureGeometriche(double base, double altezza, double area, double volume) {
        this.base = base;
        this.altezza = altezza;
        this.area = area;
        this.volume = volume;
    }

    FigureGeometriche(double lato, double base, double altezza, double profondita,
                             double area, double volume) {
        this.lato = lato;
        this.base = base;
        this.altezza = altezza;
        this.profondita = profondita;
        this.area = area;
        this.volume = volume;
    }

    public double getBase() {
        return base;
    }
    public double getAltezza() {
        return altezza;
    }
    public double getArea() {
        return area;
    }
    public double getLato() {
        return lato;
    }
    public double getProfondita() {
        return profondita;
    }
    public double getVolume() {
        return volume;
    }


    public void setBase(double base) {
        this.base = base;
    }
    public void setAltezza(double altezza) {
        this.altezza = altezza;
    }
    public void setLato(double lato) {
        this.lato = lato;
    }
    public void setProfondita(double profondita) {
        this.profondita = profondita;
    }
    public void setarea(double area) {this.area = area;}
    public void setVolume(double volume) {this.volume = volume;}
    public abstract void calcolaArea();
    public abstract void calcolaVolume();



}
