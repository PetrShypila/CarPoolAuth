/* eslint-disable no-console */
import mongoose from 'mongoose';
import colors from 'colors';

mongoose.connect('mongodb://localhost:27017/Auth', { useMongoClient: true });
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'.red));
db.once('open', () => { console.log("Successfully connected to DB!\n".blue); });

export default mongoose;
