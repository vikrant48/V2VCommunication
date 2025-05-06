// import React from 'react';

// const FileUploader = ({ label, onUpload }) => {
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const lines = event.target.result.trim().split('\n').slice(1);
//       const data = lines
//         .map((line) => {
//           const [vehicle_id, latitude, longitude, speed, eventGeneratedTime] = line.split(',');
//           return {
//             vehicle_id: vehicle_id.trim(),
//             lat: parseFloat(latitude),
//             lon: parseFloat(longitude),
//             speed: parseFloat(speed),
//             time: eventGeneratedTime.trim(),
//           };
//         })
//         .filter(
//           (item) => !isNaN(item.lat) && !isNaN(item.lon) && !isNaN(item.speed)
//         );

//       onUpload(data);
//     };

//     reader.readAsText(file);
//   };

//   return (
//     <div className="p-4 border rounded-lg shadow-md bg-white">
//       <label className="block text-lg font-semibold mb-2">{label}:</label>
//       <input type="file" onChange={handleFileUpload} className="border p-2 w-full" />
//     </div>
//   );
// };

// export default FileUploader;


import React from 'react';

const FileUploader = ({ label, onUpload }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const lines = event.target.result.trim().split('\n').slice(1);
      const data = lines.map((line) => {
        const [vehicle_id, latitude, longitude, speed, eventGeneratedTime] = line.split(',');
        return {
          vehicle_id: vehicle_id.trim(),
          lat: parseFloat(latitude),
          lon: parseFloat(longitude),
          speed: parseFloat(speed),
          time: eventGeneratedTime.trim(),
        };
      });

      onUpload(data);
    };

    reader.readAsText(file);
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <label className="block text-lg font-semibold mb-2">{label}:</label>
      <input type="file" onChange={handleFileUpload} className="border p-2 w-full" />
    </div>
  );
};

export default FileUploader;


