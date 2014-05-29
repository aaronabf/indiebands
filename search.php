<?php

// Declare database constants
define('HOST', '127.0.0.1');
define('DBNAME', 'testing');
define('USERNAME', 'aaron');
define('PASSWORD', 'aaronsql');

// Read the input and parse the json
$request = json_decode(file_get_contents('php://input'));

// Establish connection with database
try
{
  $pdo = new PDO('mysql:host='.HOST.';dbname='.DBNAME, USERNAME, PASSWORD);
  $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
  $pdo->exec('SET NAMES "utf8"');
}
catch (PDOException $e)
{
  echo 'Error: unable to connect to the database server: ' . $e->getMessage();
  exit();
}

// Run search query through the database
try
{
  $sql = 'SELECT * FROM cheeses
          WHERE cheesetype LIKE "%' . $request->queryData .'%" ';
  $result = $pdo->query($sql);

  while ($row = $result->fetch()) {
    $cheeses[] = $row;
  }
  echo json_encode($cheeses);
}
catch (PDOException $e)
{
  echo 'Error searching cheese: ' . $e->getMessage();
  exit();
}
