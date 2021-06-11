import { ImportData } from '../imports/api/importData';

Meteor.publish("importObject", function() {
    try {
        return Interfaces.find({});  
    } catch (error) {
        console.log("Error publishing importData: " + error);
    }
});