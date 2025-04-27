import React, { useState } from 'react';
import HeaderLog from '../component/NavLog'; // Asegúrate de la ruta correcta si es diferente

const restaurantesEjemplo = [
    { id: 1, nombre: 'Oregon', descripcion: 'Restaurante especializado en carnes a la parrilla y comida casera.' },
    { id: 2, nombre: 'Las Tinajas', descripcion: 'Comida chilena tradicional, en un ambiente familiar y acogedor.' },
    { id: 3, nombre: 'El Gaucho y la Nona', descripcion: 'Fusión de cocina argentina e italiana, con platos únicos.' },
  ];
  
  const mesasIniciales = {
    1: [
      { letra: 'A', sillas: 4, reservada: false },
      { letra: 'B', sillas: 2, reservada: false },
      { letra: 'C', sillas: 6, reservada: false },
    ],
    2: [
      { letra: 'D', sillas: 3, reservada: false },
      { letra: 'E', sillas: 5, reservada: false },
      { letra: 'F', sillas: 2, reservada: false },
    ],
    3: [
      { letra: 'G', sillas: 4, reservada: false },
      { letra: 'H', sillas: 6, reservada: false },
      { letra: 'I', sillas: 2, reservada: false },
    ],
  };
  
  const Reservas = () => {
    const [restauranteSeleccionado, setRestauranteSeleccionado] = useState(1);
    const [mesas, setMesas] = useState(mesasIniciales);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');
  
    const handleRestauranteChange = (e) => {
      setRestauranteSeleccionado(Number(e.target.value));
    };
  
    const abrirModal = (mesa) => {
      setMesaSeleccionada(mesa);
      setModalAbierto(true);
    };
  
    const cerrarModal = () => {
      setModalAbierto(false);
      setMesaSeleccionada(null);
      setFecha('');
      setHora('');
    };
  
    const reservarMesa = () => {
      if (!fecha || !hora) {
        alert('Por favor selecciona fecha y hora');
        return;
      }
      const nuevasMesas = { ...mesas };
      const indice = nuevasMesas[restauranteSeleccionado].findIndex(m => m.letra === mesaSeleccionada.letra);
      if (indice !== -1) {
        nuevasMesas[restauranteSeleccionado][indice].reservada = true;
        setMesas(nuevasMesas);
      }
      alert(`Mesa ${mesaSeleccionada.letra} reservada para el ${fecha} a las ${hora}`);
      cerrarModal();
    };
  
    const restauranteActual = restaurantesEjemplo.find(r => r.id === restauranteSeleccionado);
  
    return (
      <div className="min-h-screen bg-gray-100">
        <header className="relative z-20">
          <HeaderLog />
        </header>
  
        <div className="p-6 flex flex-col gap-6">
          {/* Barra de selección */}
          <div className="w-full flex justify-start">
            <select
              onChange={handleRestauranteChange}
              value={restauranteSeleccionado}
              className="p-3 rounded-md border-2 border-blue-600 text-blue-600 font-bold bg-white shadow-md"
            >
              {restaurantesEjemplo.map((restaurante) => (
                <option key={restaurante.id} value={restaurante.id}>
                  {restaurante.nombre}
                </option>
              ))}
            </select>
          </div>
  
          {/* Layout de Descripción y Mesas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-4">
            {/* Contenedor de Descripción */}
            <div className="col-span-1 bg-white border-2 border-blue-600 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-blue-600 mb-4">{restauranteActual.nombre}</h2>
              <p className="text-gray-700">{restauranteActual.descripcion}</p>
            </div>
  
            {/* Contenedor de Mesas */}
            <div className="col-span-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mesas[restauranteSeleccionado].map((mesa, index) => (
                <button
                  key={index}
                  onClick={() => abrirModal(mesa)}
                  disabled={mesa.reservada}
                  className={`flex items-center justify-center p-6 rounded-lg shadow-lg text-2xl font-bold transition duration-300
                    ${mesa.reservada ? 'bg-red-600 text-white cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}
                  `}
                >
                  {mesa.letra}/{mesa.sillas}
                </button>
              ))}
            </div>
          </div>
        </div>
  
        {/* Modal */}
        {modalAbierto && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-xl w-80 space-y-4 relative">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={cerrarModal}
              >
                ✕
              </button>
  
              <h2 className="text-xl font-bold text-center">Reservar Mesa {mesaSeleccionada.letra}</h2>
  
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Fecha:</label>
                <input
                  type="date"
                  className="border border-gray-300 rounded-md p-2"
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                />
              </div>
  
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-gray-700">Hora:</label>
                <input
                  type="time"
                  className="border border-gray-300 rounded-md p-2"
                  value={hora}
                  onChange={(e) => setHora(e.target.value)}
                />
              </div>
  
              <button
                onClick={reservarMesa}
                className="w-full bg-blue-600 text-white font-bold py-2 rounded-md hover:bg-blue-700 transition"
              >
                Reservar
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Reservas;