import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minLength: 3,
            maxLength: 55,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            validate: [validator.isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 6,
        },
        picture: {
            type: String,
            default: './uploads/profil/random-user.png',
        },
        bio: {
            type: String,
            max: 1024,
        },
        followers: {
            type: [String],
        },
        following: {
            type: [String],
        },
        likes: {
            type: [String],
        },
    },
    {
        timestamps: true,
    },
);

// play function before save into display: 'block',
userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// userSchema.pre('save', function (next) {
//     return new Promise((resolve, reject) => {
//         bcrypt.hash(this.password, 12, (error, hashedPassword) => {
//             if (error) {
//                 reject(error);
//             } else {
//                 this.password = hashedPassword;
//                 next();
//                 resolve();
//             }
//         });
//     });
// });

const UserModel = mongoose.model('user', userSchema);

export default UserModel;
