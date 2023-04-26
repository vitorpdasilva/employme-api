const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
const User = require('../src/infra/database/models/User');

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true });

(async () => {
  try {
    const docs = await User.find({});

    for (let doc of docs) {
      console.log({ doc })
      if (doc.professional) {
        doc.professional = doc.professionalOverview;
        delete doc.professional;
        await doc.save();
      }
    }

    console.log('Update complete');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
