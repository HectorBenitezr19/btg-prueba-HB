// models/user.js
import mongoose from 'mongoose';

const subscriptionSchema = new mongoose.Schema({
    name: String,
    cost: Number,
});

const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    balance: { type: Number, default: 500000 },
    subscriptions: [subscriptionSchema],
});

export default mongoose.models.User || mongoose.model('User', userSchema);
