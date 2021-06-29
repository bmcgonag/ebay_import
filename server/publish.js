import { ImportData } from '../imports/api/importData';

Meteor.publish("importObject", function() {
    try {
        return ImportData.find({}, { limit: 250 });  
    } catch (error) {
        console.log("Error publishing importData: " + error);
    }
});