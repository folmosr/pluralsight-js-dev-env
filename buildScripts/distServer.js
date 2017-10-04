import express from 'express';
import path from 'path';
import open from 'open';
import compression from 'compression';

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('/', function(req,res){
  res.sendFile(path.join(__dirname, '../dist/index.html'));
})

app.get('/users', function(req,res){
  res.json([
    {"id":92342274,"firstName":"Boris","lastName":"Effertz","email":"Stefanie16@hotmail.com"},
    {"id":98615295,"firstName":"Ollie","lastName":"Keeling","email":"Reva29@yahoo.com"},
    {"id":61995256,"firstName":"Daisy","lastName":"Ebert","email":"Freeman.Koelpin@hotmail.com"}
  ]);
})

app.listen(port, function(err) {
  if(err){
    console.log(err); // eslint-disable-line no-console
  } else {
    open('http://localhost:'+port);
  }
});
