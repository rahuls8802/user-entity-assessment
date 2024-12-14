<?php

require_once "../src/validation/UserValidation.php";

class UserController {
    private $db;
    private $user;

    public function __construct($db) {
        $this->db = $db;
        $this->user = new User($db);
    }

    public function handleRequest($requestMethod, $path) {
        header('Content-Type: application/json; charset=utf-8');
        switch ($path) {
            case '/api/v1/user/list':
                if ($requestMethod === 'GET') {
                    $this->getUsers();
                } else {
                    $this->methodNotAllowed();
                }
                break;

            case '/api/v1/user/add':
                if ($requestMethod === 'POST') {
                    $this->createUser();
                } else {
                    $this->methodNotAllowed();
                }
                break;

            case '/api/v1/user/update':
                if ($requestMethod === 'PUT') {
                    $this->updateUser();
                } else {
                    $this->methodNotAllowed();
                }
                break;

            case '/api/v1/user/delete':
                if ($requestMethod === 'DELETE') {
                    $this->deleteUser();
                } else {
                    $this->methodNotAllowed();
                }
                break;

            default:
                echo json_encode([
                    "data" => null,
                    "message" => "Invalid endpoint.",
                    "status" => false,
                    "status_code" => 404
                ]);
                break;
        }
    }

    private function getUsers() {
        $stmt = $this->user->read();
        $users = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode([
            "data" => $users,
            "message" => "Users retrieved successfully.",
            "status" => true,
            "status_code" => 200
        ]);
    }

    private function createUser() {
        $data = json_decode(file_get_contents("php://input"), true);

        if (!Validation::validateEmail($data['email']) ||
            !Validation::validateContact($data['contact_no']) ||
            !Validation::validatePassword($data['password'])) {
            echo json_encode([
                "data" => null,
                "message" => "Validation failed.",
                "status" => false,
                "status_code" => 400
            ]);
            return;
        }

        $this->user->name = $data['name'];
        $this->user->email = $data['email'];
        $this->user->password = $data['password'];
        $this->user->dob = $data['dob'];
        $this->user->contact_no = $data['contact_no'];

        if ($this->user->create()) {
            echo json_encode([
                "data" => $data,
                "message" => "User created successfully.",
                "status" => true,
                "status_code" => 201
            ]);
        } else {
            echo json_encode([
                "data" => null,
                "message" => "User creation failed.",
                "status" => false,
                "status_code" => 500
            ]);
        }
    }

    private function updateUser() {
        $data = json_decode(file_get_contents("php://input"), true);

        $this->user->id = $data['id'];
        $this->user->name = $data['name'];
        $this->user->email = $data['email'];
        $this->user->dob = $data['dob'];
        $this->user->contact_no = $data['contact_no'];

        if ($this->user->update()) {
            echo json_encode([
                "data" => $data,
                "message" => "User updated successfully.",
                "status" => true,
                "status_code" => 200
            ]);
        } else {
            echo json_encode([
                "data" => null,
                "message" => "User update failed.",
                "status" => false,
                "status_code" => 500
            ]);
        }
    }

    private function deleteUser() {
        $data = json_decode(file_get_contents("php://input"), true);

        $this->user->id = $data['id'];

        if ($this->user->delete()) {
            echo json_encode([
                "data" => ["id" => $data['id']],
                "message" => "User deleted successfully.",
                "status" => true,
                "status_code" => 200
            ]);
        } else {
            echo json_encode([
                "data" => null,
                "message" => "User deletion failed.",
                "status" => false,
                "status_code" => 500
            ]);
        }
    }

    private function methodNotAllowed() {
        echo json_encode([
            "data" => null,
            "message" => "Method not allowed.",
            "status" => false,
            "status_code" => 405
        ]);
    }
}
