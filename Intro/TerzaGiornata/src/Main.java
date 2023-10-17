import geometria.*;

public class Main {
    public static void main(String[] args) {
        Rettangolo r1 = new Rettangolo(10.0, 8.0);
        System.out.println("Base del rettangolo : " + r1.getBase() + " Altezza : " + r1.getAltezza());
        System.out.println("Area del rettangolo : " + r1.getArea());
        System.out.println("Volume del rettangolo : " + r1.getVolume());

        Parallelepipedo p1 = new Parallelepipedo(7.0, 3.0, 2.0);
        System.out.println("\nBase del parallelepipedo : " + p1.getBase() + " Altezza : " + p1.getAltezza() +
                " Profondita : " + p1.getProfondita());
        System.out.println("Area totale del parallelepipedo : " + p1.getArea());
        System.out.println("Volume del parallelepipedo : " + p1.getVolume());
    }
}