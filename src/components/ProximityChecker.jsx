// import { useEffect } from 'react';
// import * as geolib from 'geolib';

// const ProximityChecker = ({ vehicle1Data, vehicle2Data, radius, setAlerts }) => {
//   useEffect(() => {
//     const checkProximity = () => {
//       const newAlerts = [];

//       vehicle1Data.forEach((v1) => {
//         vehicle2Data.forEach((v2) => {
//           if (v1.time === v2.time) {
//             const distance = geolib.getDistance(
//               { latitude: v1.lat, longitude: v1.lon },
//               { latitude: v2.lat, longitude: v2.lon }
//             );

//             if (distance <= radius) {
//               newAlerts.push({
//                 v1: v1.vehicle_id,
//                 v2: v2.vehicle_id,
//                 distance,
//                 time: v1.time,
//                 speed1: v1.speed,
//                 speed2: v2.speed,
//                 lat: v1.lat,
//                 lon: v1.lon,
//               });
//             }
//           }
//         });
//       });

//       setAlerts(newAlerts);
//     };

//     const interval = setInterval(() => {
//       checkProximity();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [vehicle1Data, vehicle2Data, radius, setAlerts]);

//   return null;
// };

// export default ProximityChecker;

import { useState, useEffect } from 'react';
import { getDistance } from 'geolib';

const ProximityChecker = ({ vehicle1Data, vehicle2Data, radius, setAlerts, setDistance, updatePosition, setAlertMessages }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!vehicle1Data.length || !vehicle2Data.length) return;

    const interval = setInterval(() => {
      if (index < vehicle1Data.length && index < vehicle2Data.length) {
        const v1 = vehicle1Data[index];
        const v2 = vehicle2Data[index];

        const distance = getDistance(
          { latitude: v1.lat, longitude: v1.lon },
          { latitude: v2.lat, longitude: v2.lon }
        );

        setDistance(distance);
        updatePosition(v1, v2);

        if (distance <= radius) {
          const alert = {
            v1: v1.vehicle_id,
            v2: v2.vehicle_id,
            distance,
            time: v1.time,
            speed1: Math.round(v1.speed),
            speed2: Math.round(v2.speed),
            lat: v1.lat,
            lon: v1.lon,
          };

          setAlerts((prev) => [...prev, alert]);

          setAlertMessages((prev) => [
            ...prev,
            `ALERT: Vehicle ${alert.v1} & ${alert.v2} too close! ${alert.distance}m at ${alert.time}`,
          ]);

          setTimeout(() => {
            setAlertMessages((prev) => prev.slice(1)); // Remove alert after 2 sec
          }, 2000);
        }

        setIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, [vehicle1Data, vehicle2Data, index, radius, setAlerts, setDistance, updatePosition, setAlertMessages]);

  return null;
};

export default ProximityChecker;


