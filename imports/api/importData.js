import { Meter } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import dayjs from 'dayjs';

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
                OrderNumbeer: results.data[i].['Order Number'],
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
                eBayCollectedTax: results.data[i].['eBay Collected Tax'],
                ShippingAndHandling: results.data[i].['Shipping And Handling'],
                ShippingService: results.data[i].['Shipping Service'],
                SoldFor: results.data[i].['Sold For'],
                SoldViaPromotedListings: results.data[i].['Sold Via Promoted Listings'],
                TotalPrice: results.data[i].['Total Price'],
                TrackingNumber: results.data[i].['Tracking Number'],
                TransactionID: results.data[i].['Transaction ID'],
                eBayCollectedTaxAndFeesInTotal: results.data[i].['eBay Collected Tax and Fees Included in Total'],
                eBayPlus: results.data[i].['eBay Plus'],
                SellerCollectedTax: results.data[i].['Seller Collected Tax'],
                VariationDetails: results.data[i].['Variation Details'],
                GlobalShippingProgram: results.data[i].['GlobalShippingProgram'],
                GlobalShippingReferenceID: results.data[i].['Global Shipping Reference ID'],
                ClickAndCollect: results.data[i].['Click And Collect'],
                ClickAndCollectReferenceNumbeer: results.data[i].['Click And Collect Reference Number'],
                Year: dayjs(results.data[i].['Sale Date']).format('YYYY'),
                SaleDayName: dayjs(results.data[i].['Sale Date']).format('dddd'),
                SaleMonthName: dayjs(results.data[i].['Sale Date']).format('MMMM'),
            });
        }
    },
    'fix_duplicate_srn' () {
        let imported = ImportData.find({}).fetch();
        let numRet = imported.length;
        console.dir(imported);
        console.log("Length: " + numRet);

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
});