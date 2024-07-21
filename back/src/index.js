import app from "./app.js"

app.listen(process.env.PORT || 4444, err => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});
