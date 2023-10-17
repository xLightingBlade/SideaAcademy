/*classe con metodo apridb che prende percorso e passwd del db
//altro metodo per leggere dati del db
 L'esercizio è fare la query sul db, tirare fuori solo l'informazione
inerente al proprio nome/cognome, mostrarla a schermo.
Tutte le altre voci metterle in un file a parte
 */

import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;

public class Main {
    public static void main(String[] args) {
        try {
            OperazioniDatabase op = new OperazioniDatabase();
            String url = "jdbc:ucanaccess://c://Users//gabri//Documents//corsisti.accdb";
            String username = "user";
            String password = "password";
            op.apriDatabase(url, username, password);
            String nomeCercato = "Gabriele Nigro";

            String messaggioCercato = op.eseguiQueryEsercizio(nomeCercato);
            System.out.println("Messaggio : " + messaggioCercato);

            op.chiudiDatabase();

        } catch(SQLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}