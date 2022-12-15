const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    {
        username: String, 
        name: String, 
        password: String
    }
)

UserSchema.pre('save', async function(next) {
    if (!this.isModified('password')) next();
    this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
    compareHash(hash) {
      return bcrypt.compare(hash, this.password);
    },
};

modules.exports = mongoose.model('Users', UserSchema)