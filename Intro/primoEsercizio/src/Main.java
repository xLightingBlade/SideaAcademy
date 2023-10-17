public class Main {
    public static void main(String[] args) {
/*        Triangolo t1 = new Triangolo(10, 15);
//        Rettangolo r1 = new Rettangolo(5, 8);
//        t1.calcolaArea();
//        r1.calcolaArea();
//        t1.mostraArea();
          r1.mostraArea(); */

        Triangolo t2 = new Triangolo(4,6,7);
        Rettangolo r2 = new Rettangolo(5,7);
        t2.calcolaPerimetro();
        r2.calcolaPerimetro();
        t2.mostraPerimetro();
        r2.mostraPerimetro();
    }
}