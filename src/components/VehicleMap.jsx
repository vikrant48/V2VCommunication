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

// import React from 'react';
// import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import L from 'leaflet';

// const alertIcon = new L.Icon({
//   iconUrl: 'https://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
//   iconSize: [32, 32],
// });

// const VehicleMap = ({ vehicle1Position, vehicle2Position, alerts, threshold }) => {
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

//         {/* Always visible red dot for vehicle 1 */}
//         {vehicle1Position && (
//           <Circle
//             center={[vehicle1Position.lat, vehicle1Position.lon]}
//             radius={5}
//             pathOptions={{ color: 'red' }}
//           />
//         )}

//         {/* Always visible blue dot for vehicle 2 */}
//         {vehicle2Position && (
//           <Circle
//             center={[vehicle2Position.lat, vehicle2Position.lon]}
//             radius={5}
//             pathOptions={{ color: 'blue' }}
//           />
//         )}

//         {/* Show marker only when vehicles are within threshold distance */}
//         {alerts
//           .filter(alert => alert.distance <= threshold)
//           .map((alert, index) => (
//             <Marker key={`alert-${index}`} position={[alert.lat, alert.lon]} icon={alertIcon}>
//               <Popup>🚨 ALERT: Vehicles are {alert.distance}m apart at {alert.time}!</Popup>
//             </Marker>
//           ))}
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

const VehicleMap = ({ vehicle1Path, vehicle2Path, alerts, threshold }) => {
  return (
    <div className="mt-8 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4 text-center">Vehicle Tracking</h2>
      <MapContainer
        center={[12.92949, 74.91735]}
        zoom={15}
        style={{ height: '400px', width: '100%' }}
        className="rounded-lg shadow-md"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Show path for Vehicle 1 (red) */}
        {vehicle1Path.length > 1 && (
          <Polyline positions={vehicle1Path.map(v => [v.lat, v.lon])} pathOptions={{ color: 'red' }} />
        )}
        {/* Show path for Vehicle 2 (blue) */}
        {vehicle2Path.length > 1 && (
          <Polyline positions={vehicle2Path.map(v => [v.lat, v.lon])} pathOptions={{ color: 'blue' }} />
        )}

        {/* Show current and past positions as dots */}
        {vehicle1Path.map((v, index) => (
          <Circle key={`v1-${index}`} center={[v.lat, v.lon]} radius={5} pathOptions={{ color: 'red' }} />
        ))}
        {vehicle2Path.map((v, index) => (
          <Circle key={`v2-${index}`} center={[v.lat, v.lon]} radius={5} pathOptions={{ color: 'blue' }} />
        ))}

        {/* Show alert marker only if within threshold */}
        {alerts
          .filter(alert => alert.distance <= threshold)
          .map((alert, index) => (
            <Marker key={`alert-${index}`} position={[alert.lat, alert.lon]} icon={alertIcon}>
              <Popup>🚨 ALERT: Vehicles are {alert.distance}m apart at {alert.time}!</Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  );
};

export default VehicleMap;
