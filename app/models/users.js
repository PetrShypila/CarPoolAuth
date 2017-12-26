import bcrypt from 'bcrypt';
import config from '../config';

const {db} = config;

const UserSchema = new db.Schema({
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    phone: Number,
    password: String
});

UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

export default db.model('user', UserSchema);
