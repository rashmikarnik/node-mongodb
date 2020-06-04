const MongoClient = require('mongodb').MongoClient;
/*mongodb is a driver and .MongoClient is a object */
const dboper = require('./operations');

/*url where mongo server is running */
const url = 'mongodb://localhost:27017/';
/*set database name to use*/
const dbname = 'nucampsite';

MongoClient.connect(url, { useUnifiedTopology: true }).then(client => {

    console.log('Connected correctly to server');
    const db = client.db(dbname);

    db.dropCollection('campsites')
        .then(result => {
            console.log('Dropped Collection', result);
        })
        .catch(err => console.log('No collection to drop.'));
    /*  const collection = db.collection('campsites'); */

    dboper.insertDocument(db, { name: "Breadcrumb Trail Campground", description: "Test" }, 'campsites')
        .then(result => {
            console.log('Insert Document:', result.ops);
            return dboper.findDocuments(db, 'campsites');
        })
        .then(docs => {
            console.log('Found Documents:', docs);
            return dboper.updateDocument(db, { name: "Breadcrumb Trail Campground" }, { description: "Updated Test description:" },
                'campsites')
        })
        .then(result => {
            console.log('Updated Document Count:', result.result.nModified);
            return dboper.findDocuments(db, 'campsites');
        })
        .then(docs => {
            console.log('Found Documents:', docs);
            return dboper.removeDocument(db, { name: "Breadcrumb Trail Campground" }, 'campsites');
        })
        .then(result => {
            console.log('Deleted Document Count:', result.deletedCount);
            return client.close();
        })
        .catch(err => {
            console.log(err);
            client.close();
        });
})

    .catch(err => console.log(err));