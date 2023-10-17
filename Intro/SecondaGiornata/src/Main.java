/*istanziare un array di anagrafiche, ognuna con valori arbitrari
//un metodo che mi dice se uno è bambino(<15), ragazzo(15-30), uomo(30+) in base all'età
un display delle anagrafiche che mi dice quanti sono bambini, ragazzi e uomini
 */


public class Main {
    public static void main(String[] args) {
        /*
        Anagrafica [] arrayAnagrafiche = new Anagrafica [6];
        arrayAnagrafiche[0] = new Anagrafica("NomeUno", "CognomeUno", 5);
        arrayAnagrafiche[1] = new Anagrafica("NomeDue", "CognomeDue", 11);
        arrayAnagrafiche[2] = new Anagrafica("NomeTre", "CognomeTre", 29);
        arrayAnagrafiche[3] = new Anagrafica("NomeQuattro", "CognomeQuattro", 31);
        arrayAnagrafiche[4] = new Anagrafica("NomeCinque", "CognomeCinque", 50);
        arrayAnagrafiche[5] = new Anagrafica("NomeSei", "CognomeSei", 66);
        int numBambini = 0;
        int numRagazzi = 0;
        int numAdulti = 0;
        int numAnziani = 0;
        for(Anagrafica anagrafica : arrayAnagrafiche) {
            switch (anagrafica.anzianita) {
                case "bambino" -> numBambini++;
                case "ragazzo" -> numRagazzi++;
                case "uomo" -> numAdulti++;
                case "anziano" -> numAnziani++;
            }
        }

        System.out.println("Numero bambini : " + numBambini + "\nNumero ragazzi : " + numRagazzi +
                "\nNumero adulti : " + numAdulti + "\nNumero anziani : " + numAnziani);

         */
        EsameDato [] esamiUno = new EsameDato[3];
        esamiUno[0] = new EsameDato("Analisi", true);
        esamiUno[1] = new EsameDato("Programmazione", false);
        esamiUno[2] = new EsameDato("Reti", true);

        EsameDato [] esamiDue = new EsameDato[3];
        esamiDue[0] = new EsameDato("Analisi", true);
        esamiDue[1] = new EsameDato("Chimica", true);
        esamiDue[2] = new EsameDato("Termodinamica", true);

        EsameDato [] esamiTre = new EsameDato[5];
        esamiTre[0] = new EsameDato("Analisi", false);
        esamiTre[1] = new EsameDato("Letteratura", false);
        esamiTre[2] = new EsameDato("Boooh", true);
        esamiTre[3] = new EsameDato("Geometria Analitica", true);
        esamiTre[4] = new EsameDato("Analisi II", false);

        Studente [] arrayStudenti = new Studente [3];
        arrayStudenti[0] = new Studente("NomeUno", "CognomeUno", 19, 123456, esamiUno);
        arrayStudenti[1] = new Studente("NomeDue", "CognomeDue", 20, 296387, esamiDue);
        arrayStudenti[2] = new Studente("NomeTre", "CognomeTre", 18, 147758, esamiTre);

        for(Studente studente : arrayStudenti) {
            int superati = studente.contaEsamiSuperati();
            int bocciati = studente.contaEsamiNonSuperati();
            System.out.println("Studente : " + studente.nome + " " + studente.cognome +
                    "\nEsami dati : " + studente.esami.length +
                    "\nEsami superati : " + superati + "\nEsami non superati : " + bocciati + "\n");
        }
    }
}