public class Pilota {
    private String nome;
    private String scuderia;
    private int punti = 0;
    private Monoposto autoGuidata;
    private long tempoInMillisec;
    private boolean arrivato = false;
    private boolean pronto = false;

    Pilota() {

    }

    public Pilota(String nome) {
        this.nome = nome;
    }

    public Pilota(String nome, String scuderia) {
        this.nome = nome;
        this.scuderia = scuderia;
    }

    public Pilota(String nome, String scuderia, Monoposto autoGuidata) {
        this.nome = nome;
        this.scuderia = scuderia;
        this.autoGuidata = autoGuidata;
    }

    public boolean isPronto() {
        return pronto;
    }

    public void setPronto(boolean pronto) {
        this.pronto = pronto;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getScuderia() {
        return scuderia;
    }

    public void setScuderia(String scuderia) {
        this.scuderia = scuderia;
    }

    public int getPunti() {
        return punti;
    }

    public void setPunti(int punti) {
        this.punti = punti;
    }

    public Monoposto getAutoGuidata() {
        return autoGuidata;
    }

    public void setAutoGuidata(Monoposto autoGuidata) {
        this.autoGuidata = autoGuidata;
    }

    public long getTempoInMillisec() {
        return tempoInMillisec;
    }

    public void setTempoInMillisec(long tempoInMillisec) {
        this.tempoInMillisec = tempoInMillisec;
    }

    public boolean isArrivato() {
        return arrivato;
    }

    public void setArrivato(boolean arrivato) {
        this.arrivato = arrivato;
    }
}
