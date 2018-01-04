const path        = require('path');
const express     = require('express');
const app         = express();
const publicPath  = path.join(__dirname, '..', 'public');
// Get port from Heroku's process. Otherwise use 3000.
const port        = process.env.PORT || 3000;

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  // If the path is not found, just render index page. This is the same as 'devServer: {historyApiFallback: true}'
  // in webpack.config.js. It will make the router catch everything and process our single page app's requests.
  res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
  console.log('Server is up!');
});
