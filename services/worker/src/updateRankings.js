function updateRankings(client) {
  const vars = {
    isWorker: true
  };
  const mutationQuery = `($isWorker: Boolean, $user_id: String, $rank: String){
    updateRanking: updateRanking(isWorker: $isWorker, user_id: $user_id, rank: $rank) {
        count
    }
  }`;

  // get all users finished transactions count

  return client.mutate(mutationQuery, vars).then(resp => {
    console.log('Expired ' + resp.expireSpot.count + ' spots at ' + moment().toISOString() + '.');
  });
}
module.exports = { updateRankings };
