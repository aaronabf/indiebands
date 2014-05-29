# Create a simple table of bands

CREATE TABLE bands (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  bandname TEXT,
  bandlink TEXT,
  bandreal INT
) DEFAULT CHARACTER SET utf8 ENGINE=InnoDB;
