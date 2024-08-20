const express = require('express');
const router = express();

const {create,destroy,update,find,index} = require('./controller');

router.post('/talents', create)
router.get('/talents', index);
router.get('/talents/:id', find);
router.delete('/talents/:id', destroy);
router.put('/talents/:id', update)

module.exports = router;