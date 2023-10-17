import java.util.Arrays;

public class Studente extends Anagrafica {

    public int matricola;
    public EsameDato[] esami;

    Studente() {
        super();
    }

    Studente(String nome, String cognome, int eta) {
        super(nome,cognome,eta);
    }

    Studente(String nome, String cognome, int eta, int matricola) {
        super(nome,cognome,eta);
        this.matricola = matricola;
    }

    Studente(String nome, String cognome, int eta, int matricola, EsameDato[] esami) {
        super(nome,cognome,eta);
        this.matricola = matricola;
        this.esami = Arrays.copyOf(esami, esami.length);
    }

    public int contaEsamiSuperati() {
        int n = 0;
        for(EsameDato esame : esami) {
            if (esame.passato) {
                n++;
            }
        }
        return n;
    }

    public int contaEsamiNonSuperati() {
        int n = 0;
        for(EsameDato esame : esami) {
            if (!esame.passato) {
                n++;
            }
        }
        return n;
    }

}
