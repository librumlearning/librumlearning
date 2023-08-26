<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $vorname = $_POST["vorname"];
    $nachname = $_POST["nachname"];
    $email = $_POST["email"];
    $nachricht = $_POST["nachricht"];
    
    $empfaenger = "bartosch.ruszkowski@gmail.com";
    $betreff = "Kontaktformular von $vorname $nachname";
    $nachricht = "Von: $email\n\n$nachricht";
    
    mail($empfaenger, $betreff, $nachricht);
    
    echo "Nachricht wurde gesendet. Vielen Dank!";
}
?>
