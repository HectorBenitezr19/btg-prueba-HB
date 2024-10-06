import nodemailer from 'nodemailer';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/user';

// Email setup 
const transporter = nodemailer.createTransport({
    //service: 'gmail',
    service: 'ethereal',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

export async function POST(req) {
  await dbConnect();
  const { fundName, cost, email } = await req.json();

  // Crear o encontrar el usuario de email
  let user = await User.findOne({ email });
  if (!user) {
      // Crear un usuario de email si no existe
      user = new User({ email });
      await user.save();
  }

  // Validar si el subtipo de fondo ya está inscrito para evitar repeticiones
  const isSubscribed = user.subscriptions.some(sub => sub.name === fundName);
  if (isSubscribed) {
    return new Response(JSON.stringify({ message: `Ya está suscrito al fondo ${fundName}` }), { status: 400 });
  }

  // Validar el balance del usuario
  if (user.balance < cost) {
    return new Response(JSON.stringify({ message: `No tiene saldo disponible para vincularse al fondo ${fundName}` }), { status: 400 });
  }

  // Actualizar el balance por cada suscripción
  user.balance -= cost;
  user.subscriptions.push({ name: fundName, cost });
  await user.save();

  // Enviar notificación de suscripción por email
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `Suscripción a ${fundName}`,
    text: `Se ha vinculado con éxito al fondo ${fundName} con un costo de ${cost} COP.`,
  };

  await transporter.sendMail(mailOptions);

  return new Response(JSON.stringify({ message: 'Suscripción existosa', balance: user.balance }), {
    status: 200,
  });
}

export async function DELETE(req) {
  await dbConnect();
  const { fundName, email } = await req.json();

  const user = await User.findOne({ email });
  if (!user) return new Response('User not found', { status: 404 });

  // Retornar el costo de la suscripción
  const fundIndex = user.subscriptions.findIndex(sub => sub.name === fundName);
  if (fundIndex === -1) return new Response('Subscription not found', { status: 404 });

  const refundedAmount = user.subscriptions[fundIndex].cost;
  user.balance += refundedAmount;

  // Retirar la suscripción
  user.subscriptions.splice(fundIndex, 1);
  await user.save();

  return new Response(JSON.stringify({ message: 'Vinculación cancelada', balance: user.balance }), { status: 200 });
}
