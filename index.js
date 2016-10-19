'use strict';
const alfy = require('alfy');
const rp = require('request-promise');

const options = {
  uri: `https:\/\/search.maven.org/solrsearch/select?q=guice&rows=20&wt=json`,
  qs: {
    'q': alfy.input,
    'rows': 20,
    'wt': 'json'
  },
  json: true
};

rp(options)
  .then(function(data) {
    const items = data.response.docs.map(x => ({
      title: x.id,
      subtitle: x.latestVersion,
      arg: `${x.g}|${x.a}|${x.latestVersion}|jar`
    }));
    alfy.output(items);
  })
  .catch(function(err) {
    alfy.error(err);
  });
