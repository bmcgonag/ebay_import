import { Dayjs } from 'dayjs';
import { ImportData } from '../../imports/api/importData.js';

Template.convertData.onCreated(function() {
    this.subscribe("importObject");
});

Template.convertData.onRendered(function() {
    Session.set("showDataNow", false);
});

Template.convertData.helpers({
    convertSuccess: function() {
        return Session.get("dataconverted");
    },
});

Template.convertData.events({
    'click #convertData' (event) {
        event.preventDefault();

        let coll = ImportData.find({}).fetch();
        let collLen = coll.length;

        for (i=0; i < collLen; i++) {
                if (typeof coll[i].SoldFor == "string") {
                let newSoldFor = parseFloat((coll[i].SoldFor).split('$'));
                let neweBayCollectedTax = parseFloat((coll[i].eBayCollectedTax).split('$'));
                let newShippingAndHandling = parseFloat((coll[i].ShippingAndHandling).split('$'));
                let newTotalPrice = parseFloat((coll[i].TotalPrice).split('$'));
                let newSellerCollectedTax = parseFloat((coll[i].SellerCollectedTax).split('$'));
                let DataSuccess = 0;
                let itemId = coll[i]._id;
                // console.log("Orig VAlue: " + coll[i].SoldFor + " | new value: " + newSoldFor + " with Id: " + itemId);
                Meteor.call("convertOldData", itemId, newSoldFor, neweBayCollectedTax, newShippingAndHandling, newSellerCollectedTax, newTotalPrice, function(err, result) {
                    if (err) {
                        console.log("Error converting data: " + err);
                    } else {
                        console.log("Data successfully converted.");
                    }
                });
            };
        }

    },
});