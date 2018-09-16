CREATE TABLE results (
  id INT AUTO_INCREMENT,
  `date` VARCHAR(10),
  `time` VARCHAR(5),
  police_area VARCHAR(100),
  requester VARCHAR(100),
  checking_area VARCHAR(100),
  plate_no VARCHAR(100),
  `owner` VARCHAR(255),
  color VARCHAR(50),
  brand VARCHAR(100),
  model VARCHAR(100),
  `type` VARCHAR(100),
  id_no VARCHAR(15),
  `name` VARCHAR(255),
  result VARCHAR(10),
  checking VARCHAR(5),
  detail VARCHAR(100),
  PRIMARY KEY (id)
);

ALTER TABLE results CONVERT TO CHARACTER SET utf8 COLLATE utf8_general_ci;