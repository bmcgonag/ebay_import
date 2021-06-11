import { Meter } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const ImportData = new Mongo.Collection('import_data');

ImportData.allow({
    insert: function(userId, doc){
        // if use id exists, allow insert
        return !!userId;
    },
});

Meteor.methods({
    "import_parsedData" (results) {
        check(results, Object);

        let importedOn = new Date();

        return ImportData.insert({
            resultObject: results,
            importedOn: importedOn
        });
    },
});