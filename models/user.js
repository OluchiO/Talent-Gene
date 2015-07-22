var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

var userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String
    }


});

// SPECIAL METHOD FOR GENERATING HASH

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// SPECIAL METHOD TO CHECK IF PASSWORD IS VALID 

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);

}

// SPECIAL METHOD TO CREATE MONGOOSE MODEL

module.exports = mongoose.model("User", userSchema);
