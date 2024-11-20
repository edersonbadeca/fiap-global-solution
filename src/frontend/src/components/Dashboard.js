import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Checkbox,
  Paper,
  Typography,
  Box,
  TablePagination,
  Card,
  CardContent,
} from "@mui/material";
import {
  VictoryChart,
  VictoryLine,
  VictoryAxis,
  VictoryTheme,
  VictoryScatter,
  VictoryLegend,
  VictoryTooltip
} from "victory";

const Dashboard = () => {
  const [devices, setDevices] = useState([]);
  const [totals, setTotals] = useState({ consumption: "", cost: "" });
  const [selected, setSelected] = useState([]);
  const [selectedTip, setSelectedTip] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("device");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/consumption")
      .then((response) => response.json())
      .then((data) => {
        setDevices(data[0]); // Dispositivos
        setTotals({ consumption: data[1], cost: data[2] }); // Totais
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleRequestSort = (property) => {
    const isAscending = orderBy === property && order === "asc";
    setOrder(isAscending ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = devices.map((device) => device.device_id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (device) => {
    const id = device.device_id;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      setSelectedTip(device.tip);
      setSelectedDevice(device.device);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      setSelectedTip(null);
      setSelectedDevice(null);
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      setSelectedTip(null);
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
      setSelectedTip(null);
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedDevices = devices.slice().sort((a, b) => {
    if (orderBy === "consumption") {
      return order === "asc"
        ? parseFloat(a.consumption.replace(" kWh", "")) -
            parseFloat(b.consumption.replace(" kWh", ""))
        : parseFloat(b.consumption.replace(" kWh", "")) -
            parseFloat(a.consumption.replace(" kWh", ""));
    } else if (orderBy === "cost") {
      return order === "asc"
        ? parseFloat(a.cost.replace("R$", "")) -
            parseFloat(b.cost.replace("R$", ""))
        : parseFloat(b.cost.replace("R$", "")) -
            parseFloat(a.cost.replace("R$", ""));
    } else {
      return order === "asc"
        ? a.device.localeCompare(b.device)
        : b.device.localeCompare(a.device);
    }
  });

  // Prepara os dados para o gráfico
  const chartData = devices.map((device, index) => ({
    x: index + 1,
    consumption: parseFloat(device.consumption.replace(" kWh", "")),
    cost: parseFloat(device.cost.replace("R$", "")),
  }));

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Consumption Report
      </Typography>

      {/* Tabela */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < devices.length
                  }
                  checked={devices.length > 0 && selected.length === devices.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell sortDirection={orderBy === "device" ? order : false}>
                <TableSortLabel
                  active={orderBy === "device"}
                  direction={orderBy === "device" ? order : "asc"}
                  onClick={() => handleRequestSort("device")}
                >
                  Device
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="right"
                sortDirection={orderBy === "consumption" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "consumption"}
                  direction={orderBy === "consumption" ? order : "asc"}
                  onClick={() => handleRequestSort("consumption")}
                >
                  Consumption
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="right"
                sortDirection={orderBy === "cost" ? order : false}
              >
                <TableSortLabel
                  active={orderBy === "cost"}
                  direction={orderBy === "cost" ? order : "asc"}
                  onClick={() => handleRequestSort("cost")}
                >
                  Cost
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedDevices
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((device) => {
                const isItemSelected = isSelected(device.device_id);
                return (
                  <TableRow
                    key={device.device_id}
                    onClick={() => handleClick(device)}
                    selected={isItemSelected}
                    hover
                  >
                    <TableCell padding="checkbox">
                      <Checkbox checked={isItemSelected} />
                    </TableCell>
                    <TableCell>{device.device}</TableCell>
                    <TableCell align="right">{device.consumption}</TableCell>
                    <TableCell align="right">{device.cost}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={devices.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Box sx={{ marginTop: "20px" }}>
        <Typography variant="h5">Total</Typography>
        <Typography>
          <strong>Consumption:</strong> {totals.consumption}
        </Typography>
        <Typography>
          <strong>Cost:</strong> {totals.cost}
        </Typography>
      </Box>

      {selectedTip && (
        <Card sx={{ marginTop: "20px", padding: "10px", maxWidth: "400px" }}>
          <CardContent>
            <Typography variant="h6">Dica para usar melhor - {selectedDevice}</Typography>
            <Typography>{selectedTip}</Typography>
          </CardContent>
        </Card>
      )}

      {/* Gráfico */}
      <Box sx={{ marginTop: "20px" }}>
  <Typography variant="h5" gutterBottom>
    Consumption and Cost Evolution
  </Typography>
  <VictoryChart
    theme={VictoryTheme.material}
    width={250}
    height={250}
    domainPadding={20}
  >
    <VictoryAxis label="Devices" style={{ axisLabel: { padding: 30 } }} />
    <VictoryAxis
      dependentAxis
      label="Values"
      style={{ axisLabel: { padding: 40 } }}
    />

    {/* Legenda */}
    <VictoryLegend
      x={10}
      y={10}
      orientation="horizontal"
      gutter={10}
      style={{ border: { stroke: "black" }, title: { fontSize: 12 } }}
      data={[
        { name: "Consumption (kWh)", symbol: { fill: "#c43a31" } },
        { name: "Cost (R$)", symbol: { fill: "#4f81bd" } },
      ]}
    />

    {/* Linha de Consumo */}
    <VictoryLine
      data={chartData}
      x="x"
      y="consumption"
      style={{ data: { stroke: "#c43a31" } }}
    />
    <VictoryScatter
      data={chartData}
      x="x"
      y="consumption"
      size={3}
      style={{ data: { fill: "#c43a31" } }}
      labels={({ datum }) => `Consumption: ${datum.consumption} kWh`}
      labelComponent={<VictoryTooltip />}
    />

    {/* Linha de Custo */}
    <VictoryLine
      data={chartData}
      x="x"
      y="cost"
      style={{ data: { stroke: "#4f81bd" } }}
    />
    <VictoryScatter
      data={chartData}
      x="x"
      y="cost"
      size={3}
      style={{ data: { fill: "#4f81bd" } }}
      labels={({ datum }) => `Cost: R$${datum.cost}`}
      labelComponent={<VictoryTooltip />}
    />
  </VictoryChart>
      </Box>
    </Box>
  );
};

export default Dashboard;
