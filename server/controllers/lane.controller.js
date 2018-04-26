import Lane from '../models/lane';
import uuid from 'uuid';

export function getLanes(req, res) {
	Lane.find().exec((err, lanes) => {
		if (err) {
			res.status(500).send(err);
		}
		res.json({ lanes });
	});
}

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }

  const newLane = new Lane(req.body);

  newLane.notes = [];

  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json(saved);
  });
}

export function editLane(req, res) {
	let editedLane = prompt('Please enter column name');
  editedLane.id = uuid();
  if (!req.body.name) {
    	res.status(403).end();
  	}
  res.json(editedLane);
}

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    }

    lane.remove(() => {
      res.status(200).end();
    });
  });
}