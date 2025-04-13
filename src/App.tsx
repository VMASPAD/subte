import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { lineA, lineB, lineC, lineD, lineE, lineH, lineP } from "./handlers/statusLines";

interface LineSubte {
  html: string,
  status: string
}

function App() { 
  const [statuses, setStatuses] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const lineColors = {
    A: "#39B5E0", // Celeste
    B: "#FF0000", // Rojo
    C: "#0000FF", // Azul
    D: "#00FF00", // Verde
    E: "#800080", // Púrpura
    H: "#FFFF00", // Amarillo
    P: "#FFA500", // Naranja
  };

  const getStatusClass = (status: string) => {
    return status === 'text-danger' 
      ? 'bg-red-100 border-red-500 text-red-700' 
      : 'bg-green-100 border-green-500 text-green-700';
  };

  const getStatusText = (status: string) => {
    return status === 'text-danger' 
      ? 'Servicio Interrumpido' 
      : 'Servicio Normal';
  };

  const handlers = {
    A: lineA,
    B: lineB,
    C: lineC,
    D: lineD,
    E: lineE,
    H: lineH,
    P: lineP,
  };

  const loadLineStatuses = async () => {
    setLoading(true);
    const newStatuses: Record<string, string> = {};
    
    try {
      for (const line in handlers) {
        const getDataLine: LineSubte = await handlers[line]();
        newStatuses[line] = getDataLine.status;
      }
      setStatuses(newStatuses);
    } catch (error) {
      console.error("Error al obtener estados de las líneas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLineStatuses();
  }, []);

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-gray-900">Estado de Líneas de Subte</h1>
          <p className="mt-2 text-xl text-gray-600">Información en tiempo real</p>
        </motion.div>

        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadLineStatuses}
          >
            Actualizar Estado
          </motion.button>
        </motion.div>
        <br />
        {loading ? (
          <motion.div 
            className="flex justify-center"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {Object.keys(handlers).map((line) => (
              <motion.div
                key={line}
                className="relative overflow-hidden rounded-xl shadow-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <div 
                  className="absolute inset-0 opacity-20" 
                  style={{ backgroundColor: lineColors[line] }}
                />
                <div className="relative p-6">
                  <motion.div 
                    className="h-16 w-16 rounded-full mb-4 flex items-center justify-center text-white font-bold text-2xl" 
                    style={{ backgroundColor: lineColors[line] }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {line}
                  </motion.div>
                  <h2 className="text-2xl font-bold mb-2">Línea {line}</h2>
                  
                  <motion.div 
                    className={`mt-4 p-3 rounded-lg border ${getStatusClass(statuses[line] || '')}`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 mr-2 rounded-full" 
                        style={{ 
                          backgroundColor: statuses[line] === 'text-danger' ? '#EF4444' : '#10B981'
                        }} />
                      <span className="font-medium">{getStatusText(statuses[line] || '')}</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
      </div>
    </main>
  );
}

export default App;
