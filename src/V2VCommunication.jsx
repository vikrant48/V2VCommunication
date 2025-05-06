// import React, { useState, useEffect } from 'react';
// import FileUploader from './components/FileUploader';
// import VehicleMap from './components/VehicleMap';
// import ProximityChecker from './components/ProximityChecker';

// const V2VCommunication = () => {
//   const [vehicle1Data, setVehicle1Data] = useState([]);
//   const [vehicle2Data, setVehicle2Data] = useState([]);
//   const [radius, setRadius] = useState(1);
//   const [alerts, setAlerts] = useState([]);

//   return (
//     <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
//       <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800 drop-shadow-md">
//         V2V Communication System
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//         <FileUploader
//           label="Vehicle 1 CSV"
//           onUpload={setVehicle1Data}
//         />
//         <FileUploader
//           label="Vehicle 2 CSV"
//           onUpload={setVehicle2Data}
//         />
//       </div>


//       {/* Alert Radius Input */}
//       <div className="mb-12 flex items-center justify-center gap-6">
//         <label className="text-xl font-semibold text-blue-700">
//           Alert Radius (m):
//         </label>
//         <input
//           type="number"
//           value={radius}
//           onChange={(e) => setRadius((e.target.value))}
//           className="border-2 border-blue-300 p-3 rounded-lg shadow-lg focus:ring-2 focus:ring-blue-400"
//         />
//       </div>

//       {/* Proximity Checker */}
//       <ProximityChecker
//         vehicle1Data={vehicle1Data}
//         vehicle2Data={vehicle2Data}
//         radius={radius}
//         setAlerts={setAlerts}
//       />

//       {/* Alert Section */}
//       {alerts.length > 0 && (
//         <div className="mt-12 p-6 bg-white shadow-xl rounded-lg">
//           <h2 className="text-2xl font-bold mb-6 text-red-600">⚠️ Alerts:</h2>
//           <ul className="space-y-4">
//             {alerts.map((alert, index) => (
//               <li
//                 key={index}
//                 className="p-4 bg-red-50 border-l-4 border-red-600 text-red-800 rounded-lg shadow-sm"
//               >
//                 🚨 Vehicle {alert.v1} (Speed: {alert.speed1} km/h) and Vehicle {alert.v2} (Speed: {alert.speed2} km/h) are {alert.distance}m apart at {alert.time}!
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}

//       {/* Vehicle Map */}
//       <VehicleMap
//         vehicle1Data={vehicle1Data}
//         vehicle2Data={vehicle2Data}
//         alerts={alerts}
//       />
//     </div>
//   );

// };

// export default V2VCommunication;


// import React, { useState } from 'react';
// import FileUploader from './components/FileUploader.jsx';
// import VehicleMap from './components/VehicleMap.jsx';
// import ProximityChecker from './components/ProximityChecker.jsx';

// const V2VCommunication = () => {
//   const [vehicle1Data, setVehicle1Data] = useState([]);
//   const [vehicle2Data, setVehicle2Data] = useState([]);
//   const [radius, setRadius] = useState(1);
//   const [alerts, setAlerts] = useState([]);
//   const [distance, setDistance] = useState(0);
//   const [vehicle1Position, setVehicle1Position] = useState(null);
//   const [vehicle2Position, setVehicle2Position] = useState(null);

//   const updatePosition = (v1, v2) => {
//     setVehicle1Position(v1);
//     setVehicle2Position(v2);
//   };

//   return (
//     <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
//       <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-800 drop-shadow-md">
//         V2V Communication System
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
//         <FileUploader label="Upload Vehicle 1 CSV" onUpload={setVehicle1Data} />
//         <FileUploader label="Upload Vehicle 2 CSV" onUpload={setVehicle2Data} />
//       </div>

//       <div className="mb-6 text-center text-lg font-semibold text-blue-700">
//         Current Distance: {distance} m
//       </div>

//       <ProximityChecker
//         vehicle1Data={vehicle1Data}
//         vehicle2Data={vehicle2Data}
//         radius={radius}
//         setAlerts={setAlerts}
//         setDistance={setDistance}
//         updatePosition={updatePosition}
//       />

//       <VehicleMap vehicle1Position={vehicle1Position} vehicle2Position={vehicle2Position} alerts={alerts} />
//     </div>
//   );
// };

// export default V2VCommunication;

import React, { useState, useEffect } from 'react';
import FileUploader from './components/FileUploader.jsx';
import VehicleMap from './components/VehicleMap.jsx';
import ProximityChecker from './components/ProximityChecker.jsx';

const V2VCommunication = () => {
  const [vehicle1Data, setVehicle1Data] = useState([]);
  const [vehicle2Data, setVehicle2Data] = useState([]);
  const [radius, setRadius] = useState(1); // Default threshold in meters
  const [alerts, setAlerts] = useState([]);
  const [distance, setDistance] = useState(0);
  const [vehicle1Path, setVehicle1Path] = useState([]);
  const [vehicle2Path, setVehicle2Path] = useState([]);
  const [alertMessages, setAlertMessages] = useState([]);


  const updatePosition = (v1, v2) => {
    if (v1 && v2) {
      setVehicle1Path((prev) => [...prev, v1]);
      setVehicle2Path((prev) => [...prev, v2]);
    }
  };


  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-800 drop-shadow-md">
        V2V Communication System
      </h1>

      {/* File Upload Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <FileUploader label="Upload Vehicle 1 CSV" onUpload={setVehicle1Data} />
        <FileUploader label="Upload Vehicle 2 CSV" onUpload={setVehicle2Data} />
      </div>

      {/* Threshold Input */}
      <div className="mb-4 text-center">
        <label className="mr-2 font-semibold">Set Threshold (meters):</label>
        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(Number(e.target.value))}
          className="border p-2 rounded"
        />
      </div>

      {/* Vehicle Information */}
      <div className="mb-6 text-center text-lg font-semibold text-blue-700">
        <p>Current Distance: {distance} m</p>
        {/* <p>Vehicle 1 Speed: {vehicle1Speed} km/h</p>
        <p>Vehicle 2 Speed: {vehicle2Speed} km/h</p>
        <p>Time: {eventTime}</p> */}
      </div>

      {/* Proximity Checker Component */}
      <ProximityChecker
        vehicle1Data={vehicle1Data}
        vehicle2Data={vehicle2Data}
        radius={radius}
        setAlerts={setAlerts}
        setDistance={setDistance}
        updatePosition={updatePosition}
        setAlertMessages={setAlertMessages}
      />

      {/* Vehicle Map Component */}
      <VehicleMap vehicle1Path={vehicle1Path} vehicle2Path={vehicle2Path} alerts={alerts} threshold={radius} />

      {/* Alert Messages Below Map */}
      <div className="mt-4 text-center">
        {alertMessages.map((msg, index) => (
          <div
            key={index}
            className="bg-red-500 text-white px-4 py-2 rounded mb-2 inline-block shadow-lg animate-fade-in-out"
          >
            {msg}
          </div>
        ))}
      </div>
    </div>
  );
};

export default V2VCommunication;





