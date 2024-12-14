<?php

require_once "../config/database.php";
require_once "../src/model/User.php";
require_once "../src/controllers/UserController.php";

$database = new Database();
$db = $database->getConnection();

$requestMethod = $_SERVER["REQUEST_METHOD"];
$requestUri = $_SERVER["REQUEST_URI"];

$controller = new UserController($db);
$controller->handleRequest($requestMethod, parse_url($requestUri, PHP_URL_PATH));
