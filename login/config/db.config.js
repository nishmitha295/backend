module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "P@ssw0rd",      // make sure this is correct
    DB: "order_details",       // this database must exist
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  