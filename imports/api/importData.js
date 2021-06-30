import { Meter } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import dayjs from 'dayjs';
import mysql from 'mysql2';

export const ImportData = new Mongo.Collection('import_data');

ImportData.allow({
    insert: function(userId, doc){
        // if use id exists, allow insert
        return !!userId;
    },
});

Meteor.methods({
    "import_parsedData" (results) {
        // check(results, Object);

        let importedOn = new Date();

        for (i = 0; i < results.data.length; i++) {
            // check for size info in Title
            let size = "";
            let sizeExists = results.data[i].['Item Title'].split(' - ');
            if (sizeExists.length > 1) {
                let sizeMightBe = sizeExists[sizeExists.length - 1];
                switch(sizeMightBe) {
                    case "XC":
                        size = "XS"
                        break
                    case "XXC":
                        size = "2XS"
                        break
                    case "C":
                        size = "S"
                        break
                    case "A":
                        size = "M"
                        break
                    case "G":
                        size = "L"
                        break
                    case "XG":
                        size = "XL"
                        break
                    case "XXG":
                        size = "2X"
                        break
                    case "2XG":
                        size = "2X"
                        break
                    case "XXXG":
                        size = "3X"
                        break
                    case "XXXXG":
                        size = "4X"
                        break
                    case "3XG":
                        size = "3X"
                        break
                    case "4XG":
                        size = "4X"
                        break
                    default:
                        break
                }
            }
            
  
            let size2 = "";
            let sizeExists2 = results.data[i].['Item Title'].split(' ');
            for (j=0; j < sizeExists2.length; j++) {
                switch(sizeExists2[j]) {
                    case "XSmall":
                        size2 = "XS";
                        break;
                    case "Small":
                        size2 = "S";
                        break;
                    case "00":
                        size2 = "XS";
                        break;
                    case "0":
                        size2 = "XS";
                        break;
                    case "1":
                        size2 = "XS";
                        break;
                    case "2":
                        size2 = "XS";
                        break;
                    case "3":
                        size2 = "S";
                        break;
                    case "4":
                        size2 = "S";
                        break;
                    case "5":
                        size2 = "S";
                        break;
                    case "SP":
                        size2 = "S";
                        break;
                    case "6":
                        size2 = "M";
                        break;
                    case "7":
                        size2 = "M";
                        break;
                    case "8":
                        size2 = "M";
                        break;
                    case "9":
                        size2 = "M";
                        break;
                    case "10":
                        size2 = "M";
                        break;
                    case "11":
                        size2 = "M";
                        break;
                    case "Med":
                        size2 = "M";
                        break;
                    case "Medium":
                        size2 = "M";
                        break;
                    case "12":
                        size2 = "L";
                        break;
                    case "13":
                        size2 = "L";
                        break;
                    case "14":
                        size2 = "L";
                        break;
                    case "Large":
                        size2 = "L";
                        break;
                    case "15":
                        size2 = "XL";
                        break;
                    case "XL":
                        size2 = "XL";
                        break;
                    case "16":
                        size2 = "XL";
                        break;
                    case "XLarge":
                        size2 = "XL";
                        break;
                    case "X-Large":
                        size2 = "XL";
                        break;
                    case "XL":
                        size2 = "XL";
                        break;
                    case "17":
                        size2 = "2X";
                        break;
                    case "2X":
                        size2 = "2X";
                        break;
                    case "18":
                        size2 = "2X";
                        break;
                    case "19":
                        size2 = "2X";
                        break;
                    case "20":
                        size2 = "2X";
                        break;
                    case "2XL":
                        size2 = "2X";
                        break;
                    case "3X":
                        size2 = "3X";
                        break;
                    case "3XL":
                        size2 = "3X";
                        break;
                    case "3X-Large":
                        size2 = "3X";
                        break;
                    case "21":
                        size2 = "3X";
                        break;
                    case "22":
                        size2 = "3X";
                        break;
                    case "23":
                        size2 = "3X";
                        break;
                    case "24":
                        size2 = "3X";
                        break;
                    default:
                        break;
                }
            }

            if (size == "") {
                if (size2 == "") {
                    size = "";
                } else {
                    size = size2;
                }
            }

            let ebayTax = parseFloat(results.data[i].['eBay Collected Tax'].substring(1));
            let SandH = parseFloat(results.data[i].['Shipping And Handling'].substring(1));
            let soldFor = parseFloat((results.data[i].['Sold For']).substring(1));
            let sellerTax = parseFloat((results.data[i].['Seller Collected Tax']).substring(1));
            let total = parseFloat(results.data[i].['Total Price'].substring(1));

            if (typeof ebayTax != "number") {
                ebayTax = 0.00;
            }

            if (typeof SandH != "number") {
                ebayTax = 0.00;
            }

            if (typeof soldFor != "number") {
                soldFor = 0.00;
            }

            if (typeof sellerTax != "number") {
                sellerTax = 0.00;
            }

            if (typeof total != "number") {
                total = 0.00;
            }

            ImportData.insert({
                SalesRecordNumber: results.data[i].['Sales Record Number'],
                BuyerAddress1: results.data[i].['Buyer Address 1'],
                BuyerAddress2: results.data[i].['Buyer Address 2'],
                BuyerCity: results.data[i].['Buyer City'],
                BuyerState: results.data[i].['Buyer State'],
                BuyerZip: results.data[i].['Buyer Zip'],
                BuyerCounty: results.data[i].['Buyer Country'],
                BuyerName: results.data[i].['Buyer Name'],
                BuyerEmail: results.data[i].['Buyer Email'],
                BuyerNote: results.data[i].['Buyer Note'],
                BuyerUsername: results.data[i].['Buyer Username'],
                CustomLabel: results.data[i].['Custom Label'],
                ItemNumber: results.data[i].['Item Number'],
                ItemTitle: results.data[i].['Item Title'],
                Size: size,
                FeedbackLeft: results.data[i].['Feedback Left'],
                FeedbackReceived: results.data[i].['Feedback Received'],
                MaximumEstimatedDeliveryDate: dayjs(results.data[i].['Maximum Estimated Delivery Date']).format('YYYY-MM-DD'),
                MinimumEstimatedDeliveryData: dayjs(results.data[i].['Minimum Estimated Delivery Date']).format('YYYY-MM-DD'),
                MyItemNote: results.data[i].['My Item Note'],
                OrderNumber: results.data[i].['Order Number'],
                PaidOnDate: dayjs(results.data[i].['Paid On Date']).format('YYYY-MM-DD'),
                PayPalTransactionID: results.data[i].['PayPal Transaction ID'],
                PaymentMethod: results.data[i].['Payment Method'],
                Quantity: results.data[i].Quantity,
                SaleDate: dayjs(results.data[i].['Sale Date']).format('YYYY-MM-DD'),
                ShipByDate: dayjs(results.data[i].['Ship By Date']).format('YYYY-MM-DD'),
                ShipToAddress1: results.data[i].['Ship To Address 1'],
                ShipToAddress2: results.data[i].['Ship To Address 2'],
                ShipToCity: results.data[i].['Ship To City'],
                ShipToState: results.data[i].['Ship To State'],
                ShipToZip: results.data[i].['Ship To Zip'],
                ShipToCountry: results.data[i].['Ship To Country'],
                ShipToName: results.data[i].['Ship To Name'],
                ShipToPhone: results.data[i].['Ship To Phone'],
                ShippedOnDate: dayjs(results.data[i].['Shipped On Date']).format('YYYY-MM-DD'),
                eBayCollectedTax: ebayTax,
                ShippingAndHandling: SandH,
                ShippingService: results.data[i].['Shipping Service'],
                SoldFor: soldFor,
                SoldViaPromotedListings: results.data[i].['Sold Via Promoted Listings'],
                TotalPrice: total,
                TrackingNumber: results.data[i].['Tracking Number'],
                TransactionID: results.data[i].['Transaction ID'],
                eBayCollectedTaxAndFeesInTotal: results.data[i].['eBay Collected Tax and Fees Included in Total'],
                eBayPlus: results.data[i].['eBay Plus'],
                SellerCollectedTax: sellerTax,
                VariationDetails: results.data[i].['Variation Details'],
                GlobalShippingProgram: results.data[i].['GlobalShippingProgram'],
                GlobalShippingReferenceID: results.data[i].['Global Shipping Reference ID'],
                ClickAndCollect: results.data[i].['Click And Collect'],
                ClickAndCollectReferenceNumber: results.data[i].['Click And Collect Reference Number'],
                Year: dayjs(results.data[i].['Sale Date']).format('YYYY'),
                SaleDayName: dayjs(results.data[i].['Sale Date']).format('dddd'),
                SaleMonthName: dayjs(results.data[i].['Sale Date']).format('MMMM'),
            });
        }
    },
    'fix_duplicate_srn' () {
        let imported = ImportData.find({}).fetch();
        let numRet = imported.length;
        // console.dir(imported);
        // console.log("Length: " + numRet);

        let j = 0;
        for (i = 0; i < numRet; i++) {
            let k = i+1;
            if (i != (numRet-1)) {
                if (imported[i].SalesRecordNumber == imported[k].SalesRecordNumber) {
                    j++;
                    ImportData.update({ _id: imported[i+1]._id }, 
                        {
                            $set: {
                                SalesRecordNumber: imported[i+1].SalesRecordNumber + ("000" + j),
                            },
                        });
                }
            }
        }
    },
    'update_size' (itemid, sizeEntered) {
        check(itemid, String);
        check(sizeEntered, String);

        return ImportData.update({ _id: itemid }, {
            $set: {
                Size: sizeEntered,
            },
        });
    },
    'pullDataFromMariaDB' (dbhost, dbuser, dbpass, dbname) {
        check(dbuser, String); // brian
        check(dbhost, String); // 192.168.7.125
        check(dbpass, String); // R3tr0gr4de! 
        check(dbname, String); // ebay_data
        
        // connect to mariadb
        const connection = mysql.createConnection({
            host: dbhost,
            user: dbuser,
            password: dbpass,
            database: dbname
        });

        const bound = Meteor.bindEnvironment((callback) => {callback();});

        connection.query(
          'SELECT * from ebay_info',
          function(err, results, fields) {
            bound(() => {
              if (err) {
                  console.log("Error pulling data: " + err);
              } else  {
                  console.dir(results.length);
                  // console.dir(fields);
                  console.log(results[0].['Sales Record Number']);
                  Meteor.call('saveDataToMongo', results, function(err, result) {
                      if (err) {
                          console.log("Error calling Mongo to save db data: " + err);
                      } else {
                          console.log("Successfully called the method and saved data to Mongo.");
                      }
                  });
              }
            });
          });
    },
    'saveDataToMongo' (results) {
        for (i=0; i<results.length; i++) {

            let ebayTax = results[i].EbayCollectedTax;
            let SandH = results[i].ShippingAndHandling;
            let soldFor = results[i].SoldFor;
            let sellerTax = results[i].SellerCollectedTax;
            let total = results[i].TotalPrice;

            if (typeof ebayTax != "number") {
                ebayTax = 0.00;
            }

            if (typeof SandH != "number") {
                ebayTax = 0.00;
            }

            if (typeof soldFor != "number") {
                soldFor = 0.00;
            }

            if (typeof sellerTax != "number") {
                sellerTax = 0.00;
            }

            if (typeof total != "number") {
                total = 0.00;
            }

            ImportData.insert({
                SalesRecordNumber: results[i].['Sales Record Number'],
                BuyerAddress1: results[i].['Buyer Address 1'],
                BuyerAddress2: results[i].['Buyer Address 2'],
                BuyerCity: results[i].['Buyer City'],
                BuyerState: results[i].['Buyer State'],
                BuyerZip: results[i].['Buyer Zip'],
                BuyerCounty: results[i].['Buyer Country'],
                BuyerName: results[i].['Buyer Name'],
                BuyerEmail: results[i].['Buyer Email'],
                BuyerNote: results[i].['Buyer Note'],
                BuyerUsername: results[i].['Buyer Username'],
                CustomLabel: results[i].['Custom Label'],
                ItemNumber: results[i].['Item Number'],
                ItemTitle: results[i].['Item Title'],
                Size: results[i].Size,
                FeedbackLeft: results[i].['Feedback Left'],
                FeedbackReceived: results[i].['Feedback Received'],
                MaximumEstimatedDeliveryDate: dayjs(results[i].['Maximum Estimated Delivery Date']).format('YYYY-MM-DD'),
                MinimumEstimatedDeliveryData: dayjs(results[i].['Minimum Estimated Delivery Date']).format('YYYY-MM-DD'),
                MyItemNote: results[i].['My Item Note'],
                OrderNumber: results[i].['Order Number'],
                PaidOnDate: dayjs(results[i].['Paid On Date']).format('YYYY-MM-DD'),
                PayPalTransactionID: results[i].['PayPal Transaction ID'],
                PaymentMethod: results[i].['Payment Method'],
                Quantity: results[i].Quantity,
                SaleDate: dayjs(results[i].['Sale Date']).format('YYYY-MM-DD'),
                ShipByDate: dayjs(results[i].['Ship By Date']).format('YYYY-MM-DD'),
                ShipToAddress1: results[i].['Ship To Address 1'],
                ShipToAddress2: results[i].['Ship To Address 2'],
                ShipToCity: results[i].['Ship To City'],
                ShipToState: results[i].['Ship To State'],
                ShipToZip: results[i].['Ship To Zip'],
                ShipToCountry: results[i].['Ship To Country'],
                ShipToName: results[i].['Ship To Name'],
                ShipToPhone: results[i].['Ship To Phone'],
                ShippedOnDate: dayjs(results[i].['Shipped On Date']).format('YYYY-MM-DD'),
                eBayCollectedTax: ebayTax,
                ShippingAndHandling: SandH,
                ShippingService: results[i].['Shipping Service'],
                SoldFor: soldFor,
                SoldViaPromotedListings: results[i].['Sold Via Promoted Listings'],
                TotalPrice: total,
                TrackingNumber: results[i].['Tracking Number'],
                TransactionID: results[i].['Transaction ID'],
                eBayCollectedTaxAndFeesInTotal: results[i].['eBay Collected Tax and Fees Included in Total'],
                eBayPlus: results[i].['eBay Plus'],
                SellerCollectedTax: sellerTax,
                VariationDetails: results[i].['Variation Details'],
                GlobalShippingProgram: results[i].['GlobalShippingProgram'],
                GlobalShippingReferenceID: results[i].['Global Shipping Reference ID'],
                ClickAndCollect: results[i].['Click And Collect'],
                ClickAndCollectReferenceNumber: results[i].['Click And Collect Reference Number'],
                Year: dayjs(results[i].['Sale Date']).format('YYYY'),
                SaleDayName: dayjs(results[i].['Sale Date']).format('dddd'),
                SaleMonthName: dayjs(results[i].['Sale Date']).format('MMMM'),
            });
        }
    },
    'convertOldData' (itemId, newSoldFor, neweBayCollectedTax, newShippingAndHandling, newSellerCollectedTax, newTotalPrice) {
        check(itemId, String);
        check(newSoldFor, Number);
        check(neweBayCollectedTax, Number);
        check(newShippingAndHandling, Number);
        check(newSellerCollectedTax, Number);
        check(newTotalPrice, Number);

        ImportData.update({ _id: itemId }, {
            $set: {
                SoldFor: newSoldFor,
                eBayCollectedTax: neweBayCollectedTax,
                ShippingAndHandling: newShippingAndHandling,
                SellerCollectedTax: newSellerCollectedTax,
                TotalPrice: newTotalPrice,
            }
        });
    },
    'removeTheData' () {
        return ImportData.remove({});
    },
});