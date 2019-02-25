module.exports = {
    host: "TeCambio.db.12097505.8fd.hostedresource.net",
    user: "TeCambio",
    password: "Cambio11!",
    database: "TeCambio",
    pool:{ maxConnections: 50, maxIdleTime: 30},
    typeCast: function (field, next) {
          // handle only BIT(1)
          if (field.type == "BIT" && field.length == 1) {
              var bit = field.string();
  
              return (bit === null) ? null : bit.charCodeAt(0);
          }
  
          // handle everything else as default
          return next();
      }
  };