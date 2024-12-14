<?php

class User {
    private $conn;
    private $table = "users";

    public $id;
    public $name;
    public $email;
    public $password;
    public $dob;
    public $contact_no;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create() {
        $query = "INSERT INTO " . $this->table . " (name, email, password, dob, contact_no) VALUES (:name, :email, :password, :dob, :contact_no)";
        $stmt = $this->conn->prepare($query);

        $this->password = password_hash($this->password, PASSWORD_BCRYPT);

        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":password", $this->password);
        $stmt->bindParam(":dob", $this->dob);
        $stmt->bindParam(":contact_no", $this->contact_no);

        return $stmt->execute();
    }

    public function read() {
        $query = "SELECT id, name, email, dob, contact_no, created_at, updated_at FROM " . $this->table;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt;
    }

    public function update() {
        $query = "UPDATE " . $this->table . " SET name = :name, email = :email, dob = :dob, contact_no = :contact_no WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":name", $this->name);
        $stmt->bindParam(":email", $this->email);
        $stmt->bindParam(":dob", $this->dob);
        $stmt->bindParam(":contact_no", $this->contact_no);

        return $stmt->execute();
    }

    public function delete() {
        $query = "DELETE FROM " . $this->table . " WHERE id = :id";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":id", $this->id);

        return $stmt->execute();
    }
}
