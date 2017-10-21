CREATE DATABASE deallo;
USE deallo;

-- -----------------------------------------------------
-- Table userAccounts
-- -----------------------------------------------------
CREATE TABLE userAccounts(
accountID INT NOT NULL AUTO_INCREMENT,
username VARCHAR(20) NOT NULL,
password VARCHAR(20) NOT NULL,
firstName VARCHAR(20) NOT NULL,
lastName VARCHAR(20) NOT NULL,
address VARCHAR(255) NOT NULL,
postcode INT NOT NULL,
state VARCHAR(255) NOT NULL,
country VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL,
phoneNumber VARCHAR(50),
accountType VARCHAR(10) NOT NULL,
CHECK (accountType = 'Normal' OR accountType = 'Admin'),
PRIMARY KEY (accountID)
);

INSERT INTO userAccounts
(username,password,firstName,lastName,address,postcode,state,country,email,phoneNumber,accountType)
VALUES
("James Brooke","ongchin","James","Brooke","75, Lorong Keranji 4A2, Tabuan Desa Indah","93350","Sarawak","Malaysia",
"sheldon.jam.cam@gmail.com","019562578","Normal");

-- -----------------------------------------------------
-- Table category
-- -----------------------------------------------------
CREATE TABLE category(
categoryID VARCHAR(5) NOT NULL,
categoryName VARCHAR(255) NOT NULL,
PRIMARY KEY(categoryID)
);

INSERT INTO category 
(categoryID,categoryName)
VALUES 
("CLOTH","Clothing"),
("ACCES","Accessories"),
("JEWEL","Jewelry"),
("CRAFT","Craft Supplies"),
("ROOM", "Bedding/Room Décor"),
("TOYS", "Soft Toys"),
("ARTS", "Vintage Arts"),
("WEDD", "Wedding accessories");

-- -----------------------------------------------------
-- Table products
-- -----------------------------------------------------
CREATE TABLE products(
productID INT NOT NULL AUTO_INCREMENT,
productName VARCHAR(255) NOT NULL,
price FLOAT NOT NULL,
shippingPrice FLOAT NOT NULL,
stock INT NOT NULL,
dateAdded DATETIME NOT NULL,
categoryID VARCHAR(5) NOT NULL,
description VARCHAR(255) NOT NULL,
extraDetails TEXT,
accountID INT NOT NULL,
image BLOB,
PRIMARY KEY(productID),
FOREIGN KEY(categoryID) REFERENCES category (categoryID),
FOREIGN KEY(accountID) REFERENCES userAccounts (accountID)
);

INSERT INTO products 
(productName,price,shippingPrice,stock,dateAdded,categoryID,description,extraDetails,accountID)
VALUES 
("A piece of cloth","12.00","0.0","10",NOW(),"CLOTH","Your mom is a monkey and she is like super hairy and smelly","also your dad is like mega skinny, 
like a stick, like those obelisk in eygpt lol","1");


-- -----------------------------------------------------
-- Table productRatings
-- -----------------------------------------------------
CREATE TABLE productRatings(
ratingID INT NOT NULL AUTO_INCREMENT,
productID INT NOT NULL,
rating INT NOT NULL,
comment VARCHAR(255),
PRIMARY KEY(ratingID),
FOREIGN KEY(productID) REFERENCES products(productID)
);
