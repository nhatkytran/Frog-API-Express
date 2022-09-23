const fs = require('fs');

const filename = `${__dirname}/../dev-data/frogs.json`;

const frogs = JSON.parse(fs.readFileSync(filename, 'utf-8'));

exports.convertIDToNumber = (req, res, next, value) => {
  const id = Number(value);

  if (!id)
    return res.status(400).json({
      status: 'fail',
      message: 'Can not convert ID to number format!',
    });

  req.params.id = id;
  next();
};

exports.checkID = (req, res, next, __) => {
  const frogData = frogs.find(frog => frog.id === req.params.id);

  if (!frogData)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

  next();
};

exports.checkNewFrog = (req, res, next) => {
  const frogData = req.body;

  if (!('name' in frogData) || !('king' in frogData))
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid new frog!',
    });

  next();
};

exports.getAllFrogs = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    result: frogs.length,
    data: { frogs },
  });
};

exports.getFrog = (req, res) => {
  const frogData = frogs.find(frog => frog.id === req.params.id);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: { frog: frogData },
  });
};

exports.addFrog = (req, res) => {
  const id = frogs.at(-1).id + 1;
  const newFrog = { id, ...req.body };

  frogs.push(newFrog);
  fs.writeFile(filename, JSON.stringify(frogs), 'utf-8', error => {
    if (error) {
      console.error(error);
      frogs.pop();
      return res.status(500).json({
        status: 'fail',
        message: 'Can not save data!',
      });
    }

    res.status(201).json({
      status: 'success',
      createdAt: req.requestTime,
      data: { newFrog },
    });
  });
};
