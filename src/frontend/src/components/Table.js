import React, { useEffect, useState } from "react";

const ConsumptionList = () => {
  const [devices, setDevices] = useState([]);
  const [totals, setTotals] = useState({ consumption: "", cost: "" });

  useEffect(() => {
    // Fetch para obter dados da API
    fetch("http://localhost:5000/api/consumption")
      .then((response) => response.json())
      .then((data) => {
        // O primeiro item é a lista de dispositivos
        setDevices(data[0]);
        // Os últimos dois itens são o consumo total e o custo total
        setTotals({ consumption: data[1], cost: data[2] });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <h1>Consumption Report</h1>

      {/* Lista de dispositivos */}
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Device</th>
            <th>Consumption</th>
            <th>Cost</th>
          </tr>
        </thead>
        <tbody>
          {devices.map((device) => (
            <tr key={device.device_id}>
              <td>{device.device}</td>
              <td>{device.consumption}</td>
              <td>{device.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totais */}
      <div style={{ marginTop: "20px" }}>
        <h2>Total</h2>
        <p>
          <strong>Consumption:</strong> {totals.consumption}
        </p>
        <p>
          <strong>Cost:</strong> {totals.cost}
        </p>
      </div>
    </div>
  );
};

export default ConsumptionList;
