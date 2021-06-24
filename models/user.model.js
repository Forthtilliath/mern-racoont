import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 55,
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

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw { status: 401, message: 'Pseudo ou mot de passe incorrect !' }; // Mot de passe
    }
    throw { status: 401, message: 'Pseudo ou mot de passe incorrect !' }; // Pseudo
};
const UserModel = mongoose.model('user', userSchema);

export default UserModel;
