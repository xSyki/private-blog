const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    login: {
        type: 'string',
        unique: true,
        required: [true, "Can't be blank"],
        index: true
    },

    password: {
        type: 'string',
        required: [true, "Can't be blank"]
    },

    tokens: [],

    articles: []
})

UserSchema.pre('save', function(next){
    const user = this;
    if(!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if(err) next(err);

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);

            user.password = hash;
            next();
        })
    })
})

UserSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.articles;
    return userObject;
}

UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jsonwebtoken.sign({id: user._id.toString()}, 'appSecret')
    user.tokens = user.tokens.concat({token});
    await user.save();
    return;
}

UserSchema.statics.findByCredentails = async function(login, password) {
    const user = await User.findOne({login});
    if(!user) throw new Error('Invalid login or password');
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('Invalid login or password');

    return user;
}

const User = mongoose.model('User', UserSchema);

module.exports = User;