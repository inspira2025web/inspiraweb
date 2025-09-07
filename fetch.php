<?php
header('Content-Type: application/json');

$host = "localhost";
$db   = "cbeydepb_lamp";
$user = "cbeydepb_lamp";
$pass = "37zS6HGVejxwJ3JMLwjn";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT lamp_number, is_lit FROM lamps ORDER BY lamp_number");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
