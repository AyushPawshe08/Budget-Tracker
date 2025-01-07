const mongoose = require('mongoose');

const userSchema =  mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pic : {
    type:String,
    default:"https://img.freepik.com/free-psd/3d-icon-social-media-app_23-2150049569.jpg?t=st=1734100706~exp=1734104306~hmac=ce227bd60933649bbf8ddb707d19022808fe2a2159f7b670fda873b897641f29&w=740"
  }
});

module.exports = mongoose.model('user', userSchema);
