import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({

    numbersPlayer: {
        goals: {
            type: Number,
            required: false,
        },
        assistance: {
            type: Number,
            required: false,
        },
        deflatedball: {
            type: Number,
            required: false,
        },
        wall: {
            type: Number,
            required: false,
        },
        goalkeeper: {
            type: Number,
            required: false,
        },
        star: {
            type: Number,
            required: false,
        },
        topscorer:{
            type: Number,
            required: false,
        }
    },
    apelido: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    profileImage: {
        type: String,
        require: false,
    },
    urlCover: {
        type: String,
        require: false,
    },
    url: {
        type: String,
        required: false
    },
    permission: {
        roles: {
            type: String,
            required: true,
            enum: ['user', 'admin', 'producer'],
            default: 'user'
        },
        plan: {
            type: String,
            required: false,
            enum: ['free', 'pro'],
            default: 'free'
        },
        roleTeam: {
            type: String,
            required: false,
            enum: ['member', 'admin', "not-team"],
            default: 'not-team'
        },
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        require: true,
        select: false,
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    passwordResetCode: {
        type: Number,
        select: false,
    },
    tokenNotifications: {
        type: String,
        required: false,
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

UsersSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password!, 15);
    this.password = hash;

    this.url = "./assets/avatar/default.png";

    this.numbersPlayer = {
        goals: 0,
        assistance: 0,
        deflatedball: 0,
        wall: 0,
        goalkeeper: 0,
        star: 0,
        topscorer: 0
    }

    next();
});

const Users = mongoose.model('Users', UsersSchema);

export { Users };
