<?php
    require_once("db.php");

    $data = json_decode(file_get_contents("php://input"), true);

    if($data){
        $username =  trim($data["username"] ?? '');
        $password = trim($data["password"] ?? '');

        $statement = $conn->prepare("SELECT password, isAdmin FROM users WHERE username = ?");
        $statement -> bind_param("s", $username);
        $statement -> execute();
        $result = $statement -> get_result();
        $user = $result -> fetch_assoc();

        if($user){
            if(password_verify($password, $user["password"])){
                echo json_encode(["status" => "ok", "isAdmin" => $user["isAdmin"]]);
                exit;
            }

        }
        echo json_encode(["status" => "inputErr"]);
    }
?>