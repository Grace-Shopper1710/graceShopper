const express = require('express')
const router = express.Router()

module.exports = router

router.use((req, res, next) => {
	if (!req.session.ageVerify) req.session.ageVerify = false
	next()
})

router.put('/', (req, res, next) => {
	req.session.ageVerify = true
	res.send(req.session.ageVerify)
})