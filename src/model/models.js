/**
 * Created by sdiemert on 15-08-19.
 *
 * Contains models used by the query importer tool. These should reflect objects that are stored in the Mongo database.
 */

var mongoose = require("mongoose");

var querySchema = mongoose.Schema(
    {
        title               : String,
        _type               : {type: String, default: "Query"},
        description         : String,
        name  : String,
        display_name        : String,
        unit                : String,
        target              : {
            value      : String,
            reference  : String,
            description: String
        },
        query_type          : String,
        status              : String,
        panels: Array,
        contact             : String,
        definition          : String,
        visualization_labels: {
            x_axis: String,
            y_axis: String,
            title : String
        },
        map                 : String,
        reduce              : String,
        user_id             : mongoose.Schema.ObjectId
    }, {
        collection: 'queries'
    }
);

var functionSchema = mongoose.Schema(
    {
        name      : String,
        user_id   : mongoose.Schema.ObjectId,
        definition: String
    }, {
        collection: "library_functions"
    }
);

var userSchema = mongoose.Schema(
    {
        first_name: String,
        last_name : String,
        username  : String,
        admin     : Boolean
    }, {
        collection: "users"
    }
);

var init_models = function (conn) {

    var Query            = conn.model("Query", querySchema, "queries");
    var Library_Function = conn.model("LibraryFunction", functionSchema);
    var User             = conn.model("User", userSchema);

    return {Query: Query, Library_Function: Library_Function, User: User};

};

module.exports = {init: init_models};
