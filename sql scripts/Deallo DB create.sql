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
Email VARCHAR(255) NOT NULL,
phoneNumber VARCHAR(50),
CHECK (accountType = 'Normal' OR accountType = 'Admin'),
PRIMARY KEY (accountID)
);

-- -----------------------------------------------------
-- Table category
-- -----------------------------------------------------
CREATE TABLE category(
categoryID VARCHAR(5) NOT NULL,
categoryName VARCHAR(255) NOT NULL,
PRIMARY KEY(categoryID)
);

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
PRIMARY KEY(productID),
FOREIGN KEY(categoryID) REFERENCES category (categoryID),
FOREIGN KEY(accountID) REFERENCES userAccounts (accountID)
);

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
