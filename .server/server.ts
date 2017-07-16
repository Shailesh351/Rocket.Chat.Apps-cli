import { Orchestrator } from './orchestrator';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as socketIO from 'socket.io';

const app = express();

let orch = new Orchestrator();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'site')));

app.get('/loaded', (req, res) => {
    res.json({ rocketlets: orch.manager.get().map((rc) => rc.getName()) });
});

app.post('/load', (req, res) => {
    if (req.body.rocketletId) {
        res.status(501).json({ success: false, err: 'Coming soon.' });
    } else {
        orch = new Orchestrator();
        orch.loadAndUpdate()
            .then(() => res.json({ success: true }))
            .catch((err) => res.status(500).json({ success: false, err }));
    }
});

app.post('/event', (req, res) => {
    console.log(req.body, req.body.msg);
    res.json({ success: true });
});

const server = app.listen(3003, function _appListen() {
  console.log('Example app listening on port 3003!');
  console.log('http://localhost:3003/');

  orch.loadAndUpdate()
    .then(() => console.log('Completed the loading'))
    .catch((err) => console.warn('Errored loadAndUpdate:', err));
});

const io = socketIO.listen(server);

io.on('connection', (socket) => {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', (data) => {
    console.log(data);
  });
});
