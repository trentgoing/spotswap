const moment = require('moment');

function expireSpot (client) {
  const vars = {
    date: moment().toISOString(),
    isWorker: true
  };
  const mutationQuery = `($date: DateTime!, $isWorker: Boolean){
    expireSpot: expireSpot(date: $date,isWorker: $isWorker) {
        count
    }
  }`;

  return client.mutate(mutationQuery, vars).then(resp => {
    console.log('Expired ' + resp.expireSpot.count + ' spots at ' + moment().toISOString() + '.');
  });
}

module.exports = { expireSpot };
