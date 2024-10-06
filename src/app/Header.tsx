import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="w-full bg-blue-600 text-white flex items-center p-4 shadow-md">
      <div className="flex items-center">
        <div className="w-16 h-10 mr-4 flex items-center justify-center">
          <img 
            src="https://www.btgpactual.com.co/sites/default/files/btg%20pactual%20-%20logo.png" 
            alt="BTG Pactual Logo" 
            className="w-full h-auto"
          />
        </div>
        <h1 className="text-xl font-bold">Prueba Técnica - Héctor Benítez Ramos</h1>
      </div>
    </header>
  );
};

export default Header;
