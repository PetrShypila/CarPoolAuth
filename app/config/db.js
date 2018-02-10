/* eslint-disable no-console */
import mongoose from 'mongoose';
import colors from 'colors';

mongoose.connect('mongodb://petr:G190419g@ds229008.mlab.com:29008/heroku_lvt3mrbd', { useMongoClient: true });
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'.red));
db.once('open', () => { console.log("Successfully connected to DB!\n".blue); });

export default mongoose;
