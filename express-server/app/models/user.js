var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;

var userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, default: false }
});

userSchema.pre('save', function(next){
  var user = this;
  if (!user.isModified('password'))
  {
    console.log('password is not modified');
    return next();
  } 

  bcrypt.hash(user.password, null, null, function(err, hash){
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.validPassword = function(candidatePassword, cb) {
  console.log('checking password against', this.password);
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) return cb(err);
    cb(null, isMatch);
  });
}

module.exports = mongoose.model('User', userSchema);