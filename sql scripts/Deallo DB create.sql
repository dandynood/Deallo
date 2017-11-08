CREATE DATABASE deallo;
USE deallo;

-- -----------------------------------------------------
-- Table userAccounts
-- -----------------------------------------------------
CREATE TABLE userAccounts(
accountID INT NOT NULL AUTO_INCREMENT,
username VARCHAR(255) UNIQUE NOT NULL,
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

INSERT INTO userAccounts
(accountID,username,password,firstName,lastName,address,postcode,state,country,email,phoneNumber,accountType)
VALUES
("30","MrUglyManWhoIsFatAndUgly","123456","James","Brooke","Jalan Long, 52th tree on the right","93350","Sarawak","Malaysia",
"sheldon.jam.cam@hotmail.com","019562578","Normal");

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
discount FLOAT NOT NULL DEFAULT 0,
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
(productName,price,shippingPrice,discount,stock,dateAdded,categoryID,description,extraDetails,accountID)
VALUES 
("A piece of cloth","12.00","0.0","0","10",CURRENT_DATE,"CLOTH","Your mom is a monkey and she is like super hairy and smelly","also your dad is like mega skinny, 
like a stick, like those obelisk in eygpt lol","1"),
("A piece of noodles","12.00","0.0","0","10",CURRENT_DATE,"CLOTH","Some delicious piece of noodle","Please try because it's very delicious and you will like it, I gurantee it lol","1");


-- -----------------------------------------------------
-- Table productRatings
-- -----------------------------------------------------
CREATE TABLE productRatings(
ratingID INT NOT NULL AUTO_INCREMENT,
productID INT NOT NULL,
accountID INT NOT NULL,
rating FLOAT NOT NULL,
title VARCHAR(255) NOT NULL,
comment VARCHAR(255),
datePosted DATETIME NOT NULL,
PRIMARY KEY(ratingID),
FOREIGN KEY(productID) REFERENCES products(productID),
FOREIGN KEY(accountID) REFERENCES userAccounts (accountID)
);

INSERT INTO productRatings
(productID,accountID,rating,title,comment,datePosted)
VALUES
("1","1","5","This is a good piece of cloth","It's so good and silky",CURRENT_DATE),
("1","1","1","This is a terrible piece of cloth","The package felt it came straight out of north Korea",CURRENT_DATE);


CREATE TABLE orders(
orderID INT AUTO_INCREMENT NOT NULL,
accountID INT NOT NULL,
productID INT NOT NULL,
sellerID INT NOT NULL,
orderDate TIMESTAMP NOT NULL,
quantity INT NOT NULL,
discount FLOAT NOT NULL DEFAULT 0,
sales FLOAT NOT NULL, 
orderStatus BOOLEAN NOT NULL DEFAULT 0,
PRIMARY KEY(orderID, productID),
FOREIGN KEY(accountID) REFERENCES userAccounts(accountID),
FOREIGN KEY(productID) REFERENCES products(productID),
FOREIGN KEY(sellerID) REFERENCES products(accountID)
);

INSERT INTO orders 
(orderID, accountID, productID, sellerID, orderDate, quantity, discount, sales, orderStatus) 
VALUES
(1, 30, 1, 1, '2017-11-03 03:39:38', 2, 0, 24, 0),
(2, 30, 2, 1, '2017-11-04 03:39:38', 1, 0, 12, 0),
(3, 30, 2, 1, '2017-11-05 03:39:38', 1, 0.2, 9.6, 1),
(4, 30, 1, 1, '2017-11-08 03:39:38', 2, 0.5, 12, 1),
(5, 30, 1, 1, '2017-11-09 03:39:38', 2, 0, 24, 1),
(6, 30, 2, 1, '2017-11-10 03:39:38', 1, 0, 12, 1),
(7, 30, 2, 1, '2017-11-11 03:39:38', 1, 0, 12, 1),
(8, 30, 1, 1, '2017-11-12 03:39:39', 2, 0, 12, 1);


CREATE TABLE carts(
accountID INT NOT NULL,
productID INT NOT NULL,
quantity INT NOT NULL,
price INT NOT NULL,
PRIMARY KEY(accountID, productID),
FOREIGN KEY(productID) REFERENCES products(productID),
FOREIGN KEY(accountID) REFERENCES useraccounts(accountID)
);

CREATE TABLE images_tbl(
   img_id INT (255),
   img_name VARCHAR(500),
   img_path VARCHAR(200) NOT NULL,
   img_type VARCHAR(500),
   PRIMARY KEY (img_id)
);






