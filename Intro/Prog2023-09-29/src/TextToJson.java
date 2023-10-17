import com.google.gson.stream.JsonWriter;

import java.io.FileWriter;
import java.io.IOException;
import java.text.SimpleDateFormat;

public class TextToJson {
    public void esegui(Gara gara) throws IOException {
        JsonWriter jwr = new JsonWriter(new FileWriter("src/partecipanti.json"));
        jwr.setIndent("     ");
        jwr.beginObject();
        jwr.name("circuito").value(gara.getCircuito());
        jwr.name("dataGara").value(new SimpleDateFormat("yyyy/MM/dd").format(gara.getDataGara()));
        jwr.name("numGiri").value(gara.getNumGiri());
        jwr.name("numPiloti").value(gara.getNumPiloti());
        jwr.name("pilotiGara");
        jwr.beginArray();
        for(Pilota p : gara.getPilotiGara()) {
            jwr.beginObject();
            jwr.name("nome").value(p.getNome());
            jwr.name("scuderia").value(p.getScuderia());
            jwr.name("nomeMonoposto").value(p.getAutoGuidata().getNomeMonoposto());
            jwr.name("costruttore").value(p.getAutoGuidata().getCostruttore());
            jwr.name("velocitaMonoposto").value(p.getAutoGuidata().getVelocitaMax());
            jwr.endObject();
        }
        jwr.endArray();
        jwr.endObject();
        jwr.close();
    }
}
