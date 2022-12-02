const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    homeTeam: {
        type: String,
        required: true,
        maxLength: 50,
    },
    awayTeam: {
        type: String,
        required: true,
        maxLength: 50,
    },
    homeScore: {
        type: Number,
        default: 0,
        required: true,
    },
    awayScore: {
        type: Number,
        default: 0,
        required: true,
    },
    usersResults: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
            userName: {
                type: String,
                required: true,
                maxLength: 50,
            },
            homeScore: {
                type: Number,
                default: 0,
                required: true,
            },
            awayScore: {
                type: Number,
                default: 0,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model("Match", MatchSchema);