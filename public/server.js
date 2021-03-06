var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var dotenv = require('dotenv')
var app = express();
var compiler = webpack(config);

dotenv.load({path:'../.env'})

if (process.env.ENV !== 'PROD') {
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/assets', express.static('assets'));
app.use('/dist', express.static('dist'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, function(err) {
    if (err) {
        console.log(err);
        return;
    }

    console.log('Serving RAB site...');
});
