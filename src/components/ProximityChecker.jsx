import { useEffect } from 'react';
import * as geolib from 'geolib';

const ProximityChecker = ({ vehicle1Data, vehicle2Data, radius, setAlerts }) => {
  useEffect(() => {
    const checkProximity = () => {
      const newAlerts = [];

      vehicle1Data.forEach((v1) => {
        vehicle2Data.forEach((v2) => {
          if (v1.time === v2.time) {
            const distance = geolib.getDistance(
              { latitude: v1.lat, longitude: v1.lon },
              { latitude: v2.lat, longitude: v2.lon }
            );

            if (distance <= radius) {
              newAlerts.push({
                v1: v1.vehicle_id,
                v2: v2.vehicle_id,
                distance,
                time: v1.time,
                speed1: v1.speed,
                speed2: v2.speed,
                lat: v1.lat,
                lon: v1.lon,
              });
            }
          }
        });
      });

      setAlerts(newAlerts);
    };

    const interval = setInterval(() => {
      checkProximity();
    }, 5000);

    return () => clearInterval(interval);
  }, [vehicle1Data, vehicle2Data, radius, setAlerts]);

  return null;
};

export default ProximityChecker;
