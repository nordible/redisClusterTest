var RedisCluster = require('redis-cluster').clusterClient;
var redis = RedisCluster;
var redisPubSub = RedisCluster;
var redisHost = "localhost"; //change the host here
var redisPort = "6379"; //change the port here

var assert = require('assert');

var firstLink = redisHost + ":" + redisPort; // Used to discover the rest of the cluster 
new redis.clusterInstance(firstLink, function (err, r) {
  if (err) throw err;
  r.set('foo', 'bar', function (err, reply) {
    if (err) throw err;
    assert.equal(reply, 'OK');

    r.get('foo', function (err, reply) {
      if (err) throw err;
      assert.equal(reply, 'bar');
    });
  });
});

new redisPubSub.clusterInstance(firstLink, function (err, r) {
  r.subscribe('channel');

  for (var link in redisPubSub.redisLinks) {
    redisPubSub.redisLinks[link].link.on('message', function (channel, message) {
      // New message in a channel, necessarily 'channel' here because it's the only one we're subscribed to. 
    });
  }
});