<?php
require_once 'src/backend/config/database.php';

$db = new Database();
$conn = $db->getConnection();

try {
    // Check if table exists
    $result = $conn->query("SHOW TABLES LIKE 'enrollments'");
    if ($result->rowCount() == 0) {
        echo "Table 'enrollments' does not exist\n";
        exit();
    }

    // Check table structure
    $result = $conn->query("DESCRIBE enrollments");
    echo "Table structure:\n";
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        echo $row['Field'] . " - " . $row['Type'] . "\n";
    }

    // Check current data
    $result = $conn->query("SELECT id, first_name, last_name, status, updated_at FROM enrollments LIMIT 5");
    echo "\nCurrent enrollments:\n";
    while ($row = $result->fetch(PDO::FETCH_ASSOC)) {
        echo "ID: " . $row['id'] . ", Name: " . $row['first_name'] . " " . $row['last_name'] . ", Status: " . $row['status'] . ", Updated: " . $row['updated_at'] . "\n";
    }

} catch(Exception $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
