public class Anagrafica {
    //supponiamo di aver già calcolato l'età in base alla data di nascita(come ieri)
    public int eta;
    public String nome;
    public String cognome;
    public String anzianita;

    Anagrafica() {

    }

    Anagrafica(String nome, String cognome, int eta) {
        this.eta = eta;
        this.nome = nome;
        this.cognome = cognome;
        impostaAnzianita();
    }

    public void impostaAnzianita() {
        if(eta >= 0 && eta <= 15 ) {
            anzianita = "bambino";
        } else if(eta > 16 && eta <= 30) {
            anzianita = "ragazzo";
        } else if(eta >30 && eta <=60) {
            anzianita = "uomo";
        } else if(eta > 60) {
            anzianita = "anziano" ;
        } else {
            anzianita = "Non Disponibile";
        }
    }
}
