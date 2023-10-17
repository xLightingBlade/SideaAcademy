import java.io.*;
import java.sql.*;

public class OperazioniDatabase {
    private String databaseURl;
    private Connection con;
    private Statement stmt;
    private PreparedStatement prStmt;
    private ResultSet rs;


    public void apriDatabase(String databaseURl, String username, String password) throws SQLException {
        con = DriverManager.getConnection(databaseURl, username, password);
    }

    public void chiudiDatabase() throws SQLException {
        con.close();
    }

    /*TODO : Separazione delle responsabilità, questa classe ha troppi compiti
    /Spostare la scrittura su metodo apposito */
    //TODO: Capire perchè il ResultSet è vuoto!

    public String eseguiQueryEsercizio(String nome) throws SQLException, IOException {
        String query = "SELECT * FROM corsisti";
        String risultato = null;
        stmt = con.createStatement();

        BufferedWriter writer = new BufferedWriter(new FileWriter("src/info.txt"));
        writer.append("Contenuto Database").append("\n");

        rs = stmt.executeQuery(query);
        while(rs.next()) {

            /* La println conferma che c'è un problema in come sono scritti i campi
            Infatti tra un nome e un cognome nel campo c'è qualcosa che non è uno spazio e che non viene rimoss
            Questo rovina l'esecuzione della query. Questo perchè ha copiaIncollato da excel il nome e cognome
             */
            System.out.println(rs.getString("nome").replace(" ", ""));

            //Infatti se cerco per ID non dà errore e funziona correttamente
            if(rs.getInt("id") == 1) {
                risultato = rs.getString("messaggio");
            } else {
                writer.append("ID : ").append(String.valueOf(rs.getInt("ID")));
                writer.append(" Nome : ").append(rs.getString("Nome"));
                writer.append(" Messaggio : ").append(rs.getString("Messaggio")).append("\n");
            }
        }
        writer.close();
        rs.close();
        stmt.close();
        return risultato;
    }


    // Sto metodo funge correttamente
    public String queryProva() throws SQLException {
        String risultato = null;
        String query = "SELECT * FROM corsisti";
        stmt = con.createStatement();
        rs = stmt.executeQuery(query);
        while(rs.next()) {
            risultato = rs.getString("Nome");
        }
        return risultato;
    }

}
