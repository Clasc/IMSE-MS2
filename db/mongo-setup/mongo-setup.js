let res = [
    db.createCollection("User", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
      }),

    db.createCollection("Game", function(err, res) {
        if (err) throw err;
        console.log("Collection Game created!");
      }),

    db.createCollection("Rent", function(err, res) {
        if (err) throw err;
        console.log("Collection created!");
      }),

    db.createCollection("Subscription", function(err, res) {
        if (err) throw err;
        console.log("Collection Subscription created!");
      }),

    db.createCollection("Studio", function(err, res) {
        if (err) throw err;
        console.log("Collection Studio created!");
      }),
];

printjson(res);

