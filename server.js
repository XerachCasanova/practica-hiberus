/*function requireHTTPS(req, res, next) {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
      return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}*/

import sslRedirect from 'heroku-ssl-redirect';
import express from 'express';


const app = express();
app.use(sslRedirect());

//app.use(requireHTTPS);
app.use(express.static('./dist/prueba-acceso'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/prueba-acceso/'}),
);

app.listen(process.env.PORT || 8080);