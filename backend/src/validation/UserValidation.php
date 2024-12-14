<?php

class Validation {
    public static function validateEmail($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL);
    }

    public static function validateContact($contact) {
        return preg_match('/^\d{10}$/', $contact);
    }

    public static function validatePassword($password) {
        return strlen($password) >= 8;
    }
}
