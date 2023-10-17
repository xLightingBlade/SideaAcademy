import java.util.Objects;

public class Monoposto {
    private String nomeMonoposto;
    private String costruttore;
    private int velocitaMax;

    Monoposto() {

    }

    public Monoposto(String nome, String costruttore, int velocitaMax) {
        nomeMonoposto = nome;
        this.costruttore = costruttore;
        this.velocitaMax = velocitaMax;
    }


    public String getNomeMonoposto() {
        return nomeMonoposto;
    }

    public void setNomeMonoposto(String nomeMonoposto) {
        this.nomeMonoposto = nomeMonoposto;
    }

    public String getCostruttore() {
        return costruttore;
    }

    public void setCostruttore(String costruttore) {
        this.costruttore = costruttore;
    }

    public int getVelocitaMax() {
        return velocitaMax;
    }

    public void setVelocitaMax(int velocitaMax) {
        this.velocitaMax = velocitaMax;
    }


    @Override
    public String toString() {
        return "Nome Monoposto : " + nomeMonoposto + " Costruttore " + costruttore +
                " Velocita massima : " + velocitaMax;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Monoposto monoposto = (Monoposto) o;
        return velocitaMax == monoposto.velocitaMax && Objects.equals(nomeMonoposto, monoposto.nomeMonoposto) && Objects.equals(costruttore, monoposto.costruttore);
    }

    @Override
    public int hashCode() {
        return Objects.hash(nomeMonoposto, costruttore, velocitaMax);
    }
}
