USE deallo;

-- gets monthly average spent and total spent
CREATE VIEW UserFinanceLog AS
SELECT accountID, MONTHNAME(dateTimePurchase) AS Month,
YEAR(dateTimePurchase), 
AVG(totalSales) AS AvgMonthlyPurchases, 
SUM(totalSales) As TotalMonthSpent
FROM productSales
GROUP BY accountID, MONTH(dateTimePurchase)
ORDER BY dateTimePurchase DESC;

-- Selects using the view
-- change $userID with any of given users.
SELECT * FROM UserFinanceLog
WHERE accountID = $accountID;


--
SELECT orders.orderID, userAccounts.firstName, userAccounts.lastname,
userAccounts.address, userAccounts.postcode, userAccounts.state, userAccounts.country,
userAccounts.email, userAccounts.phoneNumber, 
products.productName, orders.quantity, orders.orderDate
FROM orders
INNER JOIN userAccounts ON orders.accountID=userAccounts.accountID
INNER JOIN products ON orders.productID=products.productID;