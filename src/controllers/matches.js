const Match = require('../models/Matches');

exports.getMatches = async (req, res) => {
    try {
        const matches = await Match.find();
        res.status(200).json(matches);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

exports.createMatch = async (req, res) => {
    const match = new Match({
        date: req.body.date,
        homeTeam: req.body.homeTeam,
        awayTeam: req.body.awayTeam,
    });

    try {
        const newMatch = await match.save();
        res.status(201).json(newMatch);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

exports.updateMatch = async (req, res) => {
    try {
        Match.updateOne({ _id: req.params.id }, req.body, (err, result) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else if (result.matchedCount === 0) {
                res.status(404).json({ message: "Match not found" });
            } else {
                res.status(200).json({ message: "Match updated" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.deleteMatch = async (req, res) => {
    try {
        Match.deleteOne({ _id: req.params.id }, (err, result) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else if (result.deletedCount === 0) {
                res.status(404).json({ message: "Match not found" });
            } else {
                res.status(200).json({ message: "Match deleted" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.addUserResult = async (req, res) => {
    try {
        Match.updateOne({ _id: req.params.id }, { $push: { usersResults: req.body } }, (err, result) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else if (result.matchedCount === 0) {
                res.status(404).json({ message: "Match not found" });
            } else {
                res.status(200).json({ message: "User result added" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.updateUserResult = async (req, res) => {
    try {
        Match.updateOne({ "usersResults._id": req.params.id },
        { $set:{
                "usersResults.$.homeScore": req.body.homeScore,
                "usersResults.$.awayScore": req.body.awayScore
            }
        }, (err, result) => {
            if (err) {
                res.status(500).json({ message: err.message });
            } else if (result.matchedCount === 0) {
                res.status(404).json({ message: "Match not found" });
            } else {
                res.status(200).json({ message: "User result updated" });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}