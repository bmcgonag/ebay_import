import { ImportData } from '../imports/api/importData';
import { DBConnect } from '../imports/api/dbConnection';

Meteor.publish("importObject", function() {
    try {
        return ImportData.find({}, { limit: 250 });  
    } catch (error) {
        console.log("Error publishing importData: " + error);
    }
});

Meteor.publish("savedCreds", function() {
    try {
        return DBConnect.find({});
    } catch (error) {
        console.log("Error publishing DB Connecting creds: " + error);
    }
});