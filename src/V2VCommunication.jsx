import React, { useState, useEffect } from 'react';
import FileUploader from './components/FileUploader';
import VehicleMap from './components/VehicleMap';
import ProximityChecker from './components/ProximityChecker';

const V2VCommunication = () => {
  const [vehicle1Data, setVehicle1Data] = useState([]);
  const [vehicle2Data, setVehicle2Data] = useState([]);
  const [radius, setRadius] = useState(1);
  const [alerts, setAlerts] = useState([]);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">V2V Communication System</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <FileUploader
          label="Vehicle 1 CSV"
          onUpload={setVehicle1Data}
        />
        <FileUploader
          label="Vehicle 2 CSV"
          onUpload={setVehicle2Data}
        />
      </div>

      <div className="mb-8">
        <label className="mr-4 text-lg font-semibold">Alert Radius (m):</label>
        <input
          type="number"
          value={radius}
          onChange={(e) => setRadius(parseFloat(e.target.value))}
          className="border p-2 rounded-lg shadow-sm"
        />
      </div>

      <ProximityChecker
        vehicle1Data={vehicle1Data}
        vehicle2Data={vehicle2Data}
        radius={radius}
        setAlerts={setAlerts}
      />

      {alerts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Alerts:</h2>
          {alerts.map((alert, index) => (
            <p key={index} className="text-red-600">
              ALERT: Vehicle {alert.v1} (Speed: {alert.speed1} km/h) and Vehicle {alert.v2} (Speed: {alert.speed2} km/h) are {alert.distance}m apart at {alert.time}!
            </p>
          ))}
        </div>
      )}

      <VehicleMap
        vehicle1Data={vehicle1Data}
        vehicle2Data={vehicle2Data}
        alerts={alerts}
      />
    </div>
  );
};

export default V2VCommunication;
