// LeadMap - mapa Leaflet com marcadores dos leads
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icon issue with webpack/next
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface Prospect {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  status: string;
  lat?: number | null;
  lon?: number | null;
}

const statusColors: Record<string, string> = {
  new: "#94a3b8",
  contacted: "#f59e0b",
  interested: "#6366f1",
  converted: "#22c55e",
  lost: "#ef4444",
};

export default function LeadMap({ prospects }: { prospects: Prospect[] }) {
  const valid = prospects.filter((p) => p.lat && p.lon);
  if (valid.length === 0) return null;

  const center: [number, number] = [valid[0].lat!, valid[0].lon!];
  const bounds = L.latLngBounds(valid.map((p) => [p.lat!, p.lon!]));

  return (
    <MapContainer center={center} bounds={bounds} boundsOptions={{ padding: [40, 40] }} style={{ height: "100%", width: "100%" }} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {valid.map((p) => (
        <Marker key={p.id} position={[p.lat!, p.lon!]} icon={icon}>
          <Popup>
            <div>
              <strong>{p.name}</strong><br />
              {p.phone && <span>{p.phone}<br /></span>}
              {p.address && <small>{p.address}<br /></small>}
              <span style={{ color: statusColors[p.status], fontWeight: 600 }}>{p.status}</span>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
