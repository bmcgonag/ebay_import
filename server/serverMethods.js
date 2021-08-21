import { Meter } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { DBConnect } from '../imports/api/dbConnection';
import mysql from 'mysql2';

Meteor.methods({
    'test.connection' () {
        let dbConn = DBConnect.findOne({});

        const connection = mysql.createConnection({
            host: dbConn.dbhost,
            user: dbConn.dbuser,
            password: dbConn.dbpass,
            database: dbConn.dbname
        });

        connection.query(
            "SELECT version();",
                function(err, results, fields) {
                    if (err) {
                        console.log("Error on DB Connection Test: " + err);
                    } else {
                        console.log("DB Connection Test Succeeded: ");
                        console.dir(results);
                    }
                }
        );
    },
    'saveDataToMariaDB' () {
        let dataToImport = ImportData.find({}).fetch();

        let numberFiles = dataToImport.length;

        let dbConn = DBConnect.findOne({});

        const connection = mysql.createConnection({
            host: dbConn.dbhost,
            user: dbConn.dbuser,
            password: dbConn.dbpass,
            database: dbConn.dbname
        });

        for (i = 0; i < numberFiles; i++) {
            connection.query(
                "UPDATE ebay_info SET `Sales Record Number` = " + dataToImport[i].SalesRecordNumber + ",`Order Number` = " + dataToImport[i].OrderNumber + ",`Buyer Username` = " + dataToImport[i].BuyerUsername + ",`Buyer Name` = " + dataToImport[i].BuyerName + ",`Buyer Note` = " + dataToImport[i].BuyerNote + ",`Buyer Address 1` = " + dataToImport[i].BuyerAddress1 + ",`Buyer Address 2` = " + dataToImport[i].BuyerAddress2 + ",`Buyer City` = " + dataToImport[i].BuyerCity + ",`Buyer State` = " + dataToImport[i].BuyerState + ",`Buyer Zip` = " + dataToImport[i].BuyerZip + ",`Buyer Country` = " + dataToImport[i].BuyerCountry + ",`Ship To Name` =  " + dataToImport[i].ShipToName + ",`Ship To Phone` = " + dataToImport[i].ShipToPhone + ",`Ship To Address 1` = " + dataToImport[i].ShipToAddress1 + ",`Ship To Address 2` = " + dataToImport[i].ShipToAddress2 + ",`Ship To City` = " + dataToImport[i].ShipToCity + ",`Ship To State` = " + dataToImport[i].ShipToState + ",`Ship To Zip` = " + dataToImport[i].ShipToZip + ",`Ship To Country` = " + dataToImport[i].ShipToCounty + ",`Item Number` = " + dataToImport[i].ItemNumber + ",`Item Title` = " + dataToImport[i].ItemTitle+ ",`Size` = " + dataToImport[i].Size + ",`Custom Label` = " + dataToImport[i].CustomLabel + ",`Sold Via Promoted Listings` = " + dataToImport[i].SoldViaPromotedListings + ",`Quantity` = " + dataToImport[i].Quantity + ",`Sold For` =  " + dataToImport[i].SoldFor + ",`Shipping and Handling` = " + dataToImport[i].ShippingAndHandling + ",`Seller Collected Tax` = " + dataToImport[i].SellerCollectedTax + ",`eBay Collected Tax` = " + dataToImport[i].eBayCollectedTax + ",`Total Price` = " + dataToImport[i].TotalPrice + ",`Payment Method` = " + dataToImport[i].PaymentMethod + ",`Sale Date` = " + dataToImport[i].SaleDate + ",`Year` = " + dataToImport[i].Year + ",`SaleDayName` = " + dataToImport[i].SaleDayName + ",`SaleMonthName` = " + dataToImport[i].SaleMonthName + ",`Paid On Date` = " + dataToImport[i].PaidOnDate + ",`Ship By Date` = " + dataToImport[i].ShipByDate + ",`Minimum Estimated Delivery Date` = " + dataToImport[i].MinimumEstimatedDeliveryData + ",`Maximum Estimated Delivery Date` = " + dataToImport[i].MaximumEstimatedDeliveryDate + ",`Shipped On Date` = " + dataToImport[i].ShippedOnDate + ",`Feedback Left` = " + dataToImport[i].FeedbackLeft + ",`Feedback Received` = " + dataToImport[i].FeedbackReceived + ",`My Item Note` = " + dataToImport[i].MyItemNote + ",`PayPal Transaction ID` = " + dataToImport[i].PayPalTransactionID + ",`Shipping Service` = " + dataToImport[i].ShippingService + ",`Tracking Number` = " + dataToImport[i].TrackingNumber + ",`Transaction ID` = " + dataToImport[i].TransactionID + ",`Variation Details` = " + dataToImport[i].VariationDetails + ",`Global Shipping Program` = " + dataToImport[i].GlobalShippingProgram + ",`Global Shipping Reference ID` = " + dataToImport[i].GlobalShippingReferenceID + ",`Click And Collect` = " + dataToImport[i].ClickAndCollect + ",`Click And Collect Reference Number` = " + dataToImport[i].ClickAndCollectReferenceNumber + ",`eBay Plus` = " + dataToImport[i].eBayPlus + ",`eBay Collected Tax And Fees Included in Total` = " + dataToImport[i].eBayCollectedTaxAndFeesInTotal,
                    function(err, results, fields) {
                        if (err) {
                            console.log("Error uploading to mariadb: " + err);
                        } else {
                            console.log(results);
                            console.log(fields);
                        } 
                    }
            );
        }
    },
});