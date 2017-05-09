var redis = require("redis");
var port = 6379;
var host = "AMAZON ELASTICACHE CLUSTER URL";

var client = redis.createClient(port, host, {
  retryStrategy: function (times) {
    console.log('Lost Redis connection, reattempting');
    return Math.min(times * 2, 2000);
  },

  reconnectOnError: function (err) {
    if (err.message.slice(0, targetError.length) === 'READONLY') {
      // When a slave is promoted, we might get temporary errors saying
      // READONLY You can't write against a read only slave. Attempt to
      // reconnect if this happens.
      console.log('ElastiCache returned a READONLY error, reconnecting');
      return 2; // `1` means reconnect, `2` means reconnect and resend
      // the failed command
    }
  }
});
