const router = require('express').Router()

module.exports = router

router.post('/', (req, res, next) => {
	req.session.ageVerif = { ageVerif: false }
	res.send(req.session.ageVerif)
})

router.get('/', (req, res, next) => {
	let ageVerif = req.session.ageVerif ? req.session.ageVerif : { ageVerif: true }
	res.send(ageVerif)
})
