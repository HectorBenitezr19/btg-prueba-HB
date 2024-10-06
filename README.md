Este es un proyecto [Next.js](https://nextjs.org) con [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

Asegurese de ejecutar estos comandos dentro del folder 'btg-prueba-HB' donde está ubicado el Package.json, inicie con el servidor de desarrollo ejecutando en la terminal:

```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en su navegador para ver los resultados.

Puede iniciar modificaciones en `app/page.tsx`. Las actualizaciones se cargaran automáticamente al guardar.

La URL de la base de datos y las credenciales del ethereal email están en el archivo de variables de entorno .env. El mail ethereal es un placeholder de un mail real ya que por autenticaciones de nodemailer tuve una cuenta de outlook bloqueada al usarla para varias notificaciones de fondo suscrito.

Este proyecto usa [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para optimizar y cargar automáticamente [Geist](https://vercel.com/font), que es un nuevo font family para Vercel.

## Version en Deployment con Vercel
https://btg-prueba-hb-4wr7-3aumrg73o-hectorbenitezr19s-projects.vercel.app/funds

## Manual de Usuario de la versión en Deployment
1. Ingrese un email en el prompt "Email para notificaciones", ya que sin este campo lleno no podrá registrar fondos para suscribirse
2. Puede elegir entre dos tipos principales de fondos (FPV y FIC) donde cada uno tiene distintos subtipos de fondos para suscribirse
3. Tenga en cuenta que tiene un balance inicial de 500000COP y que cada subtipo de fondo tiene un costo
4. El sistema no le permitirá inscribir subtipos de fondos cuya suma supere el monto total que tiene de balance
5. El balance se irá actualizando a medida que se inscriba o cancele un subtipo de fondo donde el valor del fondo suscrito será debitado de su saldo y el valor de la suscripción del fondo cancelado le será acreditado en su balance

## Learn More
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy en Vercel

La forma más sencilla de hacer el deployment desde la consola de Vercel está en este link [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Revise la documentación [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) para más detalles.



