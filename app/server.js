const express = require('express');
const app = express();
const port = process.env.PORT || 80;
const sha = process.env.COMMIT_SHA || 'local';

app.get('/', (req, res) => {
  res.send(`<h2>Hello from ECS Fargate!</h2><p>Commit: ${sha}</p>`);
});

app.get('/health', (req, res) => {
  res.json({status: 'ok'});
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
