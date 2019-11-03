const express = require('express');
const router = express.Router();
const {check, validationResult } = require('express-validator/check');
const County = require('../../models/County');
const auth = require('../../middleware/auth');

//@route POST api/county
//@desc test
//@access Public
router.post('/',[
    check('name', 'Name is Required').not().isEmpty(),
    check('rainfall', 'Inches of rainfall Required').not().isEmpty(),
    check('winds', 'Wind speed is Required').not().isEmpty(),
    check('recovered', 'Status of recovery Required').not().optional(),
    check('hurricaneSeason', 'Status of Hurricane Required').not().optional()
], async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }

    const { name , rainfall, winds, recovered, hurricaneSeason } = req.body;

    try {
        let countyName = await County.findOne({ name });
        
        if (countName) {
            return res.status(400).json({ errors: [{ msg: 'County Already Exists'}] });
        }

        newCounty = new County({
            name,
            rainfall,
            winds,
            recovered,
            hurricaneSeason
        });

        await newCounty.save();

        res.send('County Route')

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }


    res.send('County Route')
});

// @route GET api/county/name
// @desc gets information about county
// @access Private 
router.get('/name', auth, async (req, res) => {
    try {
        const requestedCounty = await County.fineOne({ name: req.body.name}).populate('name', ['rainfall', 'winds', 'recovered', 'hurricaneSeason']);

        if(!requestedCounty) {
            return res.status(400).json({ msg: 'There is no county'});
        }

        res.json(requestedCounty);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})



module.exports = router;