module.exports = {
    apps : [{
      name   : "ganache",
      script : "ganache.js",
      cron_restart: "0 0 * * *",
    }],
}