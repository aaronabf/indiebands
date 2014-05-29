<?php

// Declare database constants
define('HOST', '127.0.0.1');
define('DBNAME', 'testing');
define('USERNAME', 'aaron');
define('PASSWORD', 'aaronsql');

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

// Randomly select a band from the database
try
{
  // THIS IS SUUUUUPER SLOW AND INNEFICIENT, BUT WE'LL FIX IT LATER
  $sql = 'SELECT * FROM bands
          ORDER BY RAND() LIMIT 0,1';
  $result = $pdo->query($sql)->fetch();
  echo json_encode($result);
}
catch (PDOException $e)
{
  echo 'Error searching cheese: ' . $e->getMessage();
  exit();
}
