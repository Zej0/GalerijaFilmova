<?php
    require_once "./db.php";
    $statement = $conn -> prepare("SELECT * FROM filmcards LIMIT 3");
    $statement -> execute();
    $result = $statement -> get_result();
    $movies = $result -> fetch_all(MYSQLI_ASSOC);

    header("Content-Type: application/json");
    echo json_encode($movies);
?>