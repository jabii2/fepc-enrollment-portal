<?php
require_once 'C:/xampp/htdocs/fepc-api/config/database.php';

try {
    $db = new Database();
    $conn = $db->getConnection();

    echo "Database connection successful!\n\n";

    $stmt = $conn->query('SELECT * FROM enrollments');
    $enrollments = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo "Enrollments in database:\n";
    echo "Total: " . count($enrollments) . "\n\n";

    foreach ($enrollments as $enrollment) {
        echo "ID: " . $enrollment['id'] . "\n";
        echo "Name: " . $enrollment['first_name'] . " " . $enrollment['last_name'] . "\n";
        echo "Status: " . $enrollment['status'] . "\n";
        echo "Created: " . $enrollment['created_at'] . "\n";
        echo "---\n";
    }

} catch(Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
