'use client';
import { useState, useEffect } from 'react';
import Header from '../Header';

// Define the fund type and structure
type FundType = 'FPV' | 'FIC';
type Fund = { name: string; cost: number };

// Options for FPV and FIC funds
const fundOptions: Record<FundType, Fund[]> = {
  FPV: [
    { name: 'FPV_BTG_PACTUAL_RECAUDADORA', cost: 75000 },
    { name: 'FPV_BTG_PACTUAL_ECOPETROL', cost: 125000 },
    { name: 'FPV_BTG_PACTUAL_DINAMICA', cost: 100000 },
  ],
  FIC: [
    { name: 'DEUDARIVADA', cost: 50000 },
    { name: 'FDO-ACCIONES', cost: 250000 },
  ],
};

export default function FundsPage() {
  const [selectedFundType, setSelectedFundType] = useState<FundType>('FPV');
  const [selectedFund, setSelectedFund] = useState<Fund | null>(null);
  const [balance, setBalance] = useState<number>(500000);
  const [subscriptions, setSubscriptions] = useState<Fund[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [email, setEmail] = useState<string>(''); 

  const fetchUserData = async (email: string) => {
    const res = await fetch('/api/users?email=' + encodeURIComponent(email));
    if (res.ok) {
      const data = await res.json();
      setBalance(data.balance);
      setSubscriptions(data.subscriptions);
      setErrorMessage('');
    } else {
      setErrorMessage('Email de usuario no encontrado, será registrado al suscribir un primer fondo');
      setBalance(500000);
      setSubscriptions([]);
    }
  };

  useEffect(() => {
    if (email) {
        fetchUserData(email);
    }
  }, [email]);

  const handleFundChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const fund = fundOptions[selectedFundType].find(f => f.name === event.target.value);
    setSelectedFund(fund || null);
  };

  const subscribeToFund = async () => {
    if (!selectedFund || !email) return;

    const res = await fetch('/api/funds', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify({
        type: selectedFundType,
        fundName: selectedFund.name,
        cost: selectedFund.cost,
        email, // email para notificaciones
      }),
    });

    const data = await res.json();

    if (res.status === 200) { 
      setBalance(data.balance);
      setSubscriptions([...subscriptions, selectedFund]);
      setErrorMessage('');
    } else {
      if (data.message.includes('saldo') || data.message.includes('repeated')) {
        alert(data.message);
      } else {
        setErrorMessage(data.message); 
      }
    }
  };

  const cancelSubscription = async (fundName: string) => {
    const res = await fetch('/api/funds', {
      method: 'DELETE',
      body: JSON.stringify({ fundName, email }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    if (res.status === 200) {
      setBalance(data.balance);
      setSubscriptions(subscriptions.filter(sub => sub.name !== fundName));
    } else {
      alert(data.message); 
    }
  };

  return (
    <>
    <Header />
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-60 text-black">
      <h1 className="text-3xl font-bold text-center mb-4">Suscripción de fondos</h1>
      <p className="text-lg text-center mb-6">Balance: {balance} COP</p>

      <div className="mb-4">
        <label htmlFor="fund-type" className="block text-sm font-medium text-gray-700">Tipo de Fondo:</label>
        <select
          id="fund-type"
          value={selectedFundType}
          onChange={e => setSelectedFundType(e.target.value as FundType)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500"
        >
          <option value="FPV">FPV</option>
          <option value="FIC">FIC</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="fund-subtype" className="block text-sm font-medium text-gray-700">Sub-tipo de Fondo:</label>
        <select id="fund-subtype" onChange={handleFundChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500">
          <option value="">Seleccione un Fondo</option>
          {fundOptions[selectedFundType].map(fund => (
            <option key={fund.name} value={fund.name}>{fund.name}</option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email para notificaciones:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Ingrese su correo electrónico"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:border-blue-500 focus:ring focus:ring-blue-500"
          required
        />
      </div>

      <button
        onClick={subscribeToFund}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Suscribir Fondo
      </button>

      {/* <button
        onClick={() => fetchUserData(email)}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mt-4"
      >
        Validar Email
      </button> */}
      
      {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}

      <h2 className="text-2xl font-bold mt-6">Sus Suscripciones</h2>
      <ul className="mt-4 border-t border-gray-300 pt-4">
        {subscriptions.map(sub => (
          <li key={sub.name} className="flex justify-between items-center py-2">
            <span>{sub.name} - {sub.cost} COP</span>
            <button
              onClick={() => cancelSubscription(sub.name)}
              className="ml-4 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
            >
              Cancelar
            </button>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
