import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';

export async function GET(req) {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');

    const user = await User.findOne({ email });
    if (!user) return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });

    return new Response(JSON.stringify({ balance: user.balance, subscriptions: user.subscriptions }), { status: 200 });
}
