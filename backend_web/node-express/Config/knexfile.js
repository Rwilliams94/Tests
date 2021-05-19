module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "../backend_base.sqlite3",
    },
    useNullAsDefault: true,
  },
};
