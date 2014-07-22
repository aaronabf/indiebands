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
  $error = new stdClass();
  $error->bandname = 'Error: unable to connect to the database server: ' . $e->getMessage();
  echo json_encode($error);
  exit();
}

// Randomly select a band from the database
try
{
  // Selects random row from database
  $sth = $pdo->query('SHOW TABLE STATUS');
  $size = $sth->fetch(PDO::FETCH_ASSOC)["Rows"];
  $offset = rand(1,$size);
  $sql = 'SELECT * FROM bands
          WHERE id=' . $offset;

  $result = $pdo->query($sql)->fetch();
  echo json_encode($result);
}
catch (PDOException $e)
{
  $error = new stdClass();
  $error->bandname = 'Error querying database: ' . $e->getMessage();
  echo json_encode($error);
  exit();
}
