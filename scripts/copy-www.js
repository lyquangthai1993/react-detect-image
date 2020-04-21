const copy = require('copy');

const isWin = /^win/.test(process.platform);

copy('build/**/*', 'www', function(err, files) {
  if(err) {
    console.log('COPY ERROR', err);
  }
});
