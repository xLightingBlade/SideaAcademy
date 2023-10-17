import javax.swing.plaf.nimbus.State;
import java.sql.*;

public class Main {
    public static void main(String[] args) {
        String databaseURL = "jdbc:ucanaccess://c://Users//gabri//Documents//FormulaUno.accdb";
        String query = "SELECT * from Table1";

        try (Connection con = DriverManager.getConnection(databaseURL);
             Statement stmt = con.createStatement();
             ResultSet rs = stmt.executeQuery(query)) {
            while(rs.next()) {
                String nomePilota = rs.getString("NomePilota");
                String scuderiaPilota = rs.getString("Scuderia");
                double quota = rs.getDouble("Quota");
                System.out.println("Nome : " + nomePilota + " Scuderia : " + scuderiaPilota + " Quota : " + quota);
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}