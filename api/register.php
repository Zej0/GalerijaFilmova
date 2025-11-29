<?php
    require_once "db.php";

    $data = json_decode(file_get_contents("php://input"), true);

    $firstNamePattern = "/^[A-Z][a-z]{1,19}$/";
    $lastNamePattern = "/^[A-Z][a-z]{1,19}$/";
    $passwordPattern = "/^(?=.*[A-Z])(?=.*[a-z])(?=.*[\d])(?=.*[^\w\s]).{6,24}$/";
    $usernamePattern = "/^[A-Za-z_][A-Za-z0-9._-]{3,19}$/";
    
    if($data){
        $ime = trim($data["ime"] ?? '');
        $prezime = trim($data["prezime"] ?? '');
        $email = trim($data["email"] ?? '');
        $username = trim($data["username"] ?? '');
        $password = trim($data["password"] ?? '');
        $confirmPass = trim($data["confirmPass"] ?? '');
        $newsletter = $data["newsletter"] ? 1 : 0;

        if(preg_match($firstNamePattern, $ime) && preg_match($lastNamePattern, $prezime)
        && filter_var($email, FILTER_VALIDATE_EMAIL) && preg_match($usernamePattern, $username)
        && preg_match($passwordPattern, $password) && $confirmPass == $password){
            $statement = $conn -> prepare("INSERT INTO users (firstName, lastName, email, username, password, newsletter) VALUES (?,?,?,?,?,?)");
            $passwordHash = password_hash($password, PASSWORD_DEFAULT);
            if(!$statement){
                die("<p>Connection not established.</p>");
            }
            $statement -> bind_param("sssssi", $ime, $prezime, $email, $username, $passwordHash, $newsletter);
            if($statement -> execute()){
                echo json_encode(["status" => "ok"]);
            }
            else if($connection -> errno = 1062){
                echo json_encode(["status" => "error", "message" => "Username or email in use"]);
            }
            else{
                echo json_encode(["status" => "error", "message" => "Unexpected error"]);
            }
            exit;
        }
        else{
            echo json_encode(["status" => "error", "message" => "Invalid input"]);
        }
    }
    else{
        echo "Please turn on javascript";
    }
?>