import java.io.IOException;
import java.text.ParseException;
import java.util.Date;

public class Main {
    public static void main(String[] args) {
        try {
            /*
            Gara gp1 = new Gara("Bahrain", 33, new Date());
            gp1.corriGara();
            gp1.scriviRisultatoSuFile();
            System.out.println("\nRISULTATI GP " + gp1.getCircuito() + "\n");
            int i = 1;
            for(Pilota p : gp1.getClassifica()) {
                System.out.println(i + ")" + p.getNome() + ", " + p.getScuderia());
                i++;
            }
            gp1.creaJsonInformazioniGara(); */
            Gara gp2 = new Gara();
            gp2.apriJsonPartecipanti("src/partecipanti.json");
            gp2.corriGara();
            gp2.scriviRisultatoSuFile();
            System.out.println("\nRISULTATI GP " + gp2.getCircuito() + "\n");
            int i = 1;
            for(Pilota p : gp2.getClassifica()) {
                System.out.println(i + ")" + p.getNome() + ", " + p.getScuderia());
                i++;
            }
        } catch (IOException | ParseException e) {
            throw new RuntimeException(e);
        }
    }
}