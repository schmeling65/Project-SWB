import * as  mongoose from 'mongoose';
import {counters} from './counters';

const init = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch((err) => {
      console.error('error: ' + err.stack);
      process.exit(1);
    });
  mongoose.connection.on('open', () => {
    console.log('connected to database');
    require("./predefine_data.ts")();
    })
  };

(mongoose as any).Promise = global.Promise;

module.exports = init;
