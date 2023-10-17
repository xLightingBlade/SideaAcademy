import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.stream.JsonReader;

import java.io.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Scanner;

public class Gara {
    private String circuito;
    private Date dataGara;
    private int numGiri;
    private int numPiloti = 0;
    private Pilota[] pilotiGara;
    private String nomeVincitore = null;
    private List<Pilota> classifica = new ArrayList<>();
    private List<Pilota> grigliaPartenza = new ArrayList<>();


    Gara() {

    }

    public Gara(String circuito, int numGiri, Date dataGara) throws IOException {
        this.circuito = circuito;
        this.numGiri = numGiri;
        this.dataGara = dataGara;
        creaFilePartecipanti();
    }

    public Gara(String circuito, int numGiri, Pilota[] pilotiGara) {
        this.circuito = circuito;
        this.numGiri = numGiri;
        this.pilotiGara = pilotiGara;
        this.numPiloti = pilotiGara.length;
        this.dataGara = new Date();
    }

    public String getCircuito() {
        return circuito;
    }

    public void setCircuito(String circuito) {
        this.circuito = circuito;
    }

    public Date getDataGara() {
        return dataGara;
    }

    public void setDataGara(Date dataGara) {
        this.dataGara = dataGara;
    }

    public int getNumPiloti() {
        return numPiloti;
    }

    public void setNumPiloti(int numPiloti) {
        this.numPiloti = numPiloti;
    }

    public Pilota[] getPilotiGara() {
        return pilotiGara;
    }

    public void setPilotiGara(Pilota[] pilotiGara) {
        this.pilotiGara = pilotiGara;
    }

    public int getNumGiri() {
        return numGiri;
    }

    public void setNumGiri(int numGiri) {
        this.numGiri = numGiri;
    }

    public String getNomeVincitore() {
        return nomeVincitore;
    }

    public void setNomeVincitore(String nomeVincitore) {
        this.nomeVincitore = nomeVincitore;
    }

    public List<Pilota> getClassifica() {
        return classifica;
    }

    public void setClassifica(List<Pilota> classifica) {
        this.classifica = classifica;
    }

    private void creaFilePartecipanti() throws IOException {
        String filePath = "src/partecipanti.txt";
        BufferedReader reader = new BufferedReader(new FileReader(filePath));
        while(reader.readLine() != null) {
            numPiloti++;
        }
        reader.close();

        reader = new BufferedReader(new FileReader(filePath));
        Scanner s = new Scanner(reader);
        popolaPiloti(s, numPiloti);
    }

    public void apriJsonPartecipanti(String filePath) throws IOException, ParseException {
        Gson g = new Gson();
        File f = new File(filePath);
        JsonReader jr = new JsonReader(new FileReader(f));
        JsonObject jo = g.fromJson(jr, JsonObject.class);
        popolaPilotiDaJson(jo);

    }

    private void popolaPilotiDaJson(JsonObject jo) throws ParseException {
        JsonArray arrayPartecipanti = jo.getAsJsonArray("pilotiGara");
        circuito = jo.get("circuito").getAsString();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy/MM/dd");
        dataGara = formatter.parse(jo.get("dataGara").getAsString());
        numGiri = jo.get("numGiri").getAsInt();

        numPiloti = arrayPartecipanti.size();
        Pilota[] piloti = new Pilota[numPiloti];
        int idx = 0;
        for(JsonElement pilota : arrayPartecipanti) {
            JsonObject oggPilota = pilota.getAsJsonObject();
            String nome = oggPilota.get("nome").getAsString();
            String scuderia = oggPilota.get("scuderia").getAsString();
            String nomeMonoposto = oggPilota.get("nomeMonoposto").getAsString();
            String nomeCostruttore = oggPilota.get("costruttore").getAsString();
            int velocita = oggPilota.get("velocitaMonoposto").getAsInt();
            piloti[idx] = new Pilota(nome, scuderia, new Monoposto(nomeMonoposto, nomeCostruttore, velocita));
            idx++;
        }
        this.pilotiGara = piloti;
    }

    private void popolaPiloti(Scanner s, int numPiloti) {
        Pilota[] piloti = new Pilota[numPiloti];
        int idx = 0;
        while(s.hasNextLine() && idx < numPiloti) {
            String[] riga = s.nextLine().split(",");
            Monoposto m = new Monoposto(riga[2], riga[3], Integer.parseInt(riga[4]));
            piloti[idx] = new Pilota(riga[0], riga[1], m);
            idx++;
        }
        s.close();
        this.pilotiGara = piloti;
        //grigliaPartenza();
    }

    public void creaJsonInformazioniGara() throws IOException {
        TextToJson t = new TextToJson();
        t.esegui(this);
    }


    /*
    public void grigliaPartenza() {
        int i = 0;
        int idx;
        idx = (int) (Math.random() * numPiloti);
        do {
            if(!pilotiGara[idx].isPronto()) {
                grigliaPartenza.add(pilotiGara[idx]);
                pilotiGara[idx].setArrivato(true);
                i++;
            }
            idx = (int) (Math.random() * numPiloti);
        }while(i < numPiloti);
    }
     */

    public void corriGara() {
        int i = 0;
        int idx;
        idx = (int) (Math.random() * numPiloti);
        do {
            if(!pilotiGara[idx].isArrivato()) {
                classifica.add(pilotiGara[idx]);
                pilotiGara[idx].setArrivato(true);
                i++;
            }
            idx = (int) (Math.random() * numPiloti);
        }while(i < numPiloti);
        nomeVincitore = classifica.get(0).getNome();
        mostraVincitore();
    }

    public void mostraVincitore() {
        System.out.println("Data di oggi : " + new SimpleDateFormat("yyyy/MM/dd").format(dataGara));
        System.out.println("Il vincitore del Gran Premio in " + circuito + " è il pilota " + classifica.get(0).getNome() +
                " della scuderia " + classifica.get(0).getScuderia());
    }

    public void scriviRisultatoSuFile() throws IOException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        File fileRisultato = new File("src/risultato"+sdf.format(dataGara)+".txt");
        BufferedWriter writer = new BufferedWriter(new FileWriter(fileRisultato));
        writer.append("RISULTATI GP ").append(circuito).append("\n");
        int i = 1;
        for(Pilota p : classifica) {
            writer.append(Integer.toString(i)).append(")").append(p.getNome()).append(", ").append(p.getScuderia()).append("\n");
            i++;
        }
        writer.close();
    }
}
