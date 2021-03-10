import express from 'express';

const index = express.Router();

index.get('/', (req, res) => {
	res.send({ response: 'Yannick is a Nandury' }).status(200);
});

export default index;
