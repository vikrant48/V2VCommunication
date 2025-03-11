// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// const alertIcon = new L.Icon({
//   iconUrl: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
//   iconSize: [32, 32],
// });

// const VehicleMap = ({ vehicle1Data, vehicle2Data, alerts }) => {
//   return (
//     <div className="mt-8 p-4 border rounded-lg shadow-md bg-white">
//       <h2 className="text-xl font-semibold mb-4 text-center">Vehicle Locations</h2>
//       <MapContainer
//         center={[12.92949, 74.91735]}
//         zoom={15}
//         style={{ height: '400px', width: '100%' }}
//         className="rounded-lg shadow-md"
//       >
//         <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//         {/* Vehicle 1 Path */}
//         {vehicle1Data.map((v1, index) => (
//           <Circle
//             key={`v1-${index}`}
//             center={[v1.lat, v1.lon]}
//             radius={3} // Dot size
//             pathOptions={{ color: 'red' }}
//           />
//         ))}
//         <Polyline
//           positions={vehicle1Data.map((v1) => [v1.lat, v1.lon])}
//           pathOptions={{ color: 'red' }}
//         />

//         {/* Vehicle 2 Path */}
//         {vehicle2Data.map((v2, index) => (
//           <Circle
//             key={`v2-${index}`}
//             center={[v2.lat, v2.lon]}
//             radius={3} // Dot size
//             pathOptions={{ color: 'blue' }}
//           />
//         ))}
//         <Polyline
//           positions={vehicle2Data.map((v2) => [v2.lat, v2.lon])}
//           pathOptions={{ color: 'blue' }}
//         />

//         {/* Proximity Alert Markers */}
//         {alerts.map((alert, index) => (
//           <Marker
//             key={`alert-${index}`}
//             position={[alert.lat, alert.lon]}
//             icon={alertIcon}
//           >
//             <Popup>
//               🚨 ALERT: Vehicles are {alert.distance}m apart at {alert.time}!
//             </Popup>
//           </Marker>
//         ))}
//       </MapContainer>
//     </div>
//   );
// };

// export default VehicleMap;

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const alertIcon = new L.Icon({
  iconUrl: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
  iconSize: [32, 32],
});

const VehicleMap = ({ vehicle1Data, vehicle2Data, alerts }) => {
  return (
    <div className="mt-8 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center">Vehicle Locations</h2>
      <MapContainer
        center={[12.92949 , 74.91735]}
        zoom={15}
        style={{ height: '400px', width: '100%' }}
        className="rounded-lg shadow-md"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Vehicle 1 Path */}
        {vehicle1Data.map((v1, index) => (
          <Circle
            key={`v1-${index}`}
            center={[v1.lat, v1.lon]}
            radius={3}
            pathOptions={{ color: 'red' }}
          />
        ))}
        <Polyline
          positions={vehicle1Data.map((v1) => [v1.lat, v1.lon])}
          pathOptions={{ color: 'red' }}
        />

        {/* Vehicle 2 Path */}
        {vehicle2Data.map((v2, index) => (
          <Circle
            key={`v2-${index}`}
            center={[v2.lat, v2.lon]}
            radius={3}
            pathOptions={{ color: 'blue' }}
          />
        ))}
        <Polyline
          positions={vehicle2Data.map((v2) => [v2.lat, v2.lon])}
          pathOptions={{ color: 'blue' }}
        />

        {/* Proximity Alert Markers */}
        {alerts.map((alert, index) => (
          <Marker
            key={`alert-${index}`}
            position={[alert.lat, alert.lon]}
            icon={alertIcon}
          >
            <Popup>
              🚨 ALERT: Vehicles are {alert.distance}m apart at {alert.time}!
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default VehicleMap;
