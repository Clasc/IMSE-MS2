let res = [

  db.User.createIndex({ user_id: 1 }, { unique: true }),
  db.User.createIndex({ username: 1 }),

  db.Game.createIndex({ game_id: 1 }, { unique: true }),

  db.Rent.createIndex({ rent_id: 1 }, { unique: true }),
  // db.Rent.createIndex("ExtendIndex",{user_id:1, game_id:1, expiration_date:1}),
  // db.Rent.createIndex("ReportIndex",{user_id:1, start_date:1}),

  db.Subscription.createIndex({ subscription_id: 1 }, { unique: true }),

  db.Studio.createIndex({ studio_id: 1 }, { unique: true }),
];


printjson(res);

