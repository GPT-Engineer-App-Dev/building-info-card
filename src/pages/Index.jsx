import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box, Text, VStack, Container } from "@chakra-ui/react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Dummy data for Norwegian buildings and sensor data
const buildings = [
  { id: 1, name: "Building 1", position: [59.91, 10.75], sensorData: "Temperature: 20°C, Humidity: 30%" },
  { id: 2, name: "Building 2", position: [60.39, 5.32], sensorData: "Temperature: 22°C, Humidity: 35%" },
  { id: 3, name: "Building 3", position: [63.43, 10.39], sensorData: "Temperature: 18°C, Humidity: 40%" },
  { id: 4, name: "Building 4", position: [58.97, 5.73], sensorData: "Temperature: 21°C, Humidity: 33%" },
  { id: 5, name: "Building 5", position: [59.13, 11.38], sensorData: "Temperature: 19°C, Humidity: 37%" },
  { id: 6, name: "Building 6", position: [69.65, 18.96], sensorData: "Temperature: 15°C, Humidity: 45%" },
  { id: 7, name: "Building 7", position: [68.44, 17.42], sensorData: "Temperature: 16°C, Humidity: 42%" },
  { id: 8, name: "Building 8", position: [70.66, 23.68], sensorData: "Temperature: 14°C, Humidity: 50%" },
  { id: 9, name: "Building 9", position: [62.47, 6.15], sensorData: "Temperature: 17°C, Humidity: 38%" },
  { id: 10, name: "Building 10", position: [60.79, 11.07], sensorData: "Temperature: 20°C, Humidity: 34%" },
];

// Custom icon for markers
const customIcon = new L.Icon({
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  shadowSize: [41, 41],
});

const Index = () => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  return (
    <Container maxW="full" height="100vh" p={0}>
      <MapContainer center={[60.472, 8.4689]} zoom={5} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {buildings.map((building) => (
          <Marker
            key={building.id}
            position={building.position}
            icon={customIcon}
            eventHandlers={{
              click: () => {
                setSelectedBuilding(building);
              },
            }}
          >
            <Popup>{building.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
      {selectedBuilding && (
        <Box
          position="absolute"
          top="10"
          left="50%"
          transform="translateX(-50%)"
          bg="white"
          p={4}
          borderRadius="md"
          boxShadow="md"
          zIndex="1000"
        >
          <VStack spacing={2}>
            <Text fontSize="lg" fontWeight="bold">
              {selectedBuilding.name}
            </Text>
            <Text>{selectedBuilding.sensorData}</Text>
          </VStack>
        </Box>
      )}
    </Container>
  );
};

export default Index;