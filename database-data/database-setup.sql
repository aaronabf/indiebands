# Create a simple table of bands

CREATE TABLE bands (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  cheesetype TEXT,
  cheesedate DATE NOT NULL
) DEFAULT CHARACTER SET utf8 ENGINE=InnoDB;
