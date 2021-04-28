const csvtojson = require("csvtojson");
const mongodb = require("mongodb").MongoClient;

// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb+srv://emmacary17:CBSWP151515@cluster0.dzzcs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

csvtojson()
  .fromFile("companies.csv")
  .then(csvData => {
    console.log(csvData);

    mongodb.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err, client) => {
        if (err) throw err;
        client
          .db("companies")
          .collection("companies")
          .insertMany(csvData, (err, res) => {
            if (err) throw err;
            console.log(`Inserted: ${res.insertedCount} rows`);
            client.close();
          });
      }
    );
  });

