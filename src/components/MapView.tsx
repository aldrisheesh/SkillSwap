import { useState } from 'react';
import { Map, ZoomControl, Overlay } from 'pigeon-maps';
import { MapPin } from 'lucide-react';
import { SkillRequest } from '../types';

interface MapMarker {
  id: number;
  position: { lat: number; lng: number };
  category: string;
  userName: string;
  skill: string;
}

// Sample markers around PUP Manila area - these represent HELP REQUESTS
const sampleMarkers: MapMarker[] = [
  {
    id: 1,
    position: { lat: 14.5993, lng: 121.0120 },
    category: 'Technology',
    userName: 'Maria Santos',
    skill: 'Web Development Help'
  },
  {
    id: 2,
    position: { lat: 14.6005, lng: 121.0125 },
    category: 'Music & Arts',
    userName: 'Juan dela Cruz',
    skill: 'Guitar Tuning'
  },
  {
    id: 3,
    position: { lat: 14.5982, lng: 121.0130 },
    category: 'Education',
    userName: 'Ana Reyes',
    skill: 'Math Homework Help'
  },
  {
    id: 4,
    position: { lat: 14.6000, lng: 121.0105 },
    category: 'Home Services',
    userName: 'Carlos Mendoza',
    skill: 'Leaky Faucet Repair'
  },
  {
    id: 5,
    position: { lat: 14.5977, lng: 121.0115 },
    category: 'Creative',
    userName: 'Lucia Torres',
    skill: 'Logo Design'
  },
  {
    id: 6,
    position: { lat: 14.5997, lng: 121.0110 },
    category: 'Health & Fitness',
    userName: 'Roberto Cruz',
    skill: 'Workout Routine'
  },
  {
    id: 7,
    position: { lat: 14.5985, lng: 121.0123 },
    category: 'Cooking',
    userName: 'Elena Ramos',
    skill: 'Adobo Recipe'
  },
  {
    id: 8,
    position: { lat: 14.6003, lng: 121.0108 },
    category: 'Language',
    userName: 'Sofia Lim',
    skill: 'Tagalog Practice'
  },
  {
    id: 9,
    position: { lat: 14.5990, lng: 121.0127 },
    category: 'Technology',
    userName: 'Miguel Torres',
    skill: 'Phone Screen Repair'
  },
  {
    id: 10,
    position: { lat: 14.6008, lng: 121.0118 },
    category: 'Music & Arts',
    userName: 'Carmen Diaz',
    skill: 'Piano Sheet Music'
  },
  {
    id: 11,
    position: { lat: 14.5980, lng: 121.0122 },
    category: 'Education',
    userName: 'Patrick Santos',
    skill: 'English Essay Review'
  },
  {
    id: 12,
    position: { lat: 14.6002, lng: 121.0100 },
    category: 'Creative',
    userName: 'Isabel Garcia',
    skill: 'Camera Settings Help'
  },
  {
    id: 13,
    position: { lat: 14.5992, lng: 121.0107 },
    category: 'Home Services',
    userName: 'Diego Reyes',
    skill: 'Cabinet Assembly'
  },
  {
    id: 14,
    position: { lat: 14.6006, lng: 121.0135 },
    category: 'Health & Fitness',
    userName: 'Andrea Martinez',
    skill: 'Running Form Check'
  },
  {
    id: 15,
    position: { lat: 14.5987, lng: 121.0102 },
    category: 'Cooking',
    userName: 'Marco Villanueva',
    skill: 'Bread Baking Tips'
  }
];

const humanitarianTileProvider = (() => {
  const subdomains = ['a', 'b', 'c'];

  return (x: number, y: number, z: number, dpr?: number) => {
    const index = Math.abs(x + y) % subdomains.length;
    const suffix = dpr && dpr >= 2 ? '@2x' : '';
    return `https://${subdomains[index]}.tile.openstreetmap.fr/hot/${z}/${x}/${y}${suffix}.png`;
  };
})();

// Category colors matching SkillSwap theme
const categoryConfig: Record<string, { icon: string; color: string; label: string }> = {
  Technology: { icon: '💻', color: '#134686', label: 'Tech' },
  Education: { icon: '📚', color: '#ED3F27', label: 'Education' },
  'Music & Arts': { icon: '🎵', color: '#FEB21A', label: 'Arts' },
  'Home Services': { icon: '🔧', color: '#00A896', label: 'Home' },
  Creative: { icon: '🎨', color: '#FEB21A', label: 'Creative' },
  'Health & Fitness': { icon: '💪', color: '#06D6A0', label: 'Health' },
  Language: { icon: '🗣️', color: '#118AB2', label: 'Language' },
  Cooking: { icon: '🍳', color: '#FFD166', label: 'Cooking' }
};

interface MapViewProps {
  onMarkerClick?: (markerId: number) => void;
  userRequests?: SkillRequest[];
  hideControls?: boolean;
}

export function MapView({ onMarkerClick, userRequests = [], hideControls = false }: MapViewProps) {
  // Fixed user location
  const USER_LOCATION: [number, number] = [14.598883, 121.011529];
  
  // Default center: PUP Manila Campus (can be moved by user)
  const [center, setCenter] = useState<[number, number]>([14.598883, 121.011529]);
  const [zoom, setZoom] = useState(17);
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);

  // Convert user requests to map markers
  const userRequestMarkers: MapMarker[] = userRequests.map((request, index) => ({
    id: request.id,
    // Slightly offset each user request from center to avoid overlap
    position: { 
      lat: center[0] + (index * 0.0002), 
      lng: center[1] + (index * 0.0002) 
    },
    category: request.category,
    userName: request.userName,
    skill: request.skillNeeded
  }));

  // Combine sample markers with user request markers
  const allMarkers = [...sampleMarkers, ...userRequestMarkers];

  // Preset locations
  const presetLocations = [
    { name: 'PUP Manila Campus', lat: 14.598883, lng: 121.011529, zoom: 16 },
    { name: 'Sta. Mesa, Manila', lat: 14.6042, lng: 121.0044, zoom: 15 },
    { name: 'Brgy. 123, Sta. Mesa', lat: 14.6050, lng: 121.0050, zoom: 17 },
    { name: 'Manila City Center', lat: 14.598883, lng: 121.011529, zoom: 13 }
  ];

  const handleResetView = () => {
    setCenter([14.598883, 121.011529]);
    setZoom(17);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const location = presetLocations[parseInt(e.target.value)];
    if (location) {
      setCenter([location.lat, location.lng]);
      setZoom(location.zoom);
    }
  };

  return (
    <div className="relative w-full h-full">
      {/* Map Container */}
      <Map
        center={center}
        zoom={zoom}
        provider={humanitarianTileProvider}
        onBoundsChanged={({ center, zoom }) => {
          setCenter(center);
          setZoom(zoom);
        }}
        mouseEvents={true}
        touchEvents={true}
      >
        <ZoomControl />
        <Overlay anchor={USER_LOCATION}>
          <div
            className="w-6 h-6 rounded-full border-4 border-white shadow-lg"
            style={{ background: '#134686', transform: 'translate(-50%, -50%)', pointerEvents: 'none' }}
          />
        </Overlay>

        {allMarkers.map((marker) => {
          const config = categoryConfig[marker.category] || categoryConfig.Technology;
          const isHovered = hoveredMarker === marker.id;
          const isUserRequest = marker.userName === 'You';

          return (
            <Overlay key={marker.id} anchor={[marker.position.lat, marker.position.lng]}>
              <div
                style={{
                  transform: 'translate(-50%, -100%)',
                  position: 'relative',
                  zIndex: isHovered ? 100 : isUserRequest ? 50 : 10,
                  pointerEvents: 'auto'
                }}
              >
                <button
                  className="relative transition-transform hover:scale-110"
                  onMouseEnter={() => setHoveredMarker(marker.id)}
                  onMouseLeave={() => setHoveredMarker(null)}
                  onClick={() => {
                    console.log('Marker clicked:', marker.id);
                    onMarkerClick?.(marker.id);
                  }}
                  style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
                >
                  {/* Custom teardrop marker */}
                  <div
                    className="flex items-center justify-center border-3 border-white shadow-lg relative"
                    style={{
                      background: isUserRequest ? '#FEB21A' : config.color,
                      width: '36px',
                      height: '36px',
                      borderRadius: '50% 50% 50% 0',
                      transform: 'rotate(-45deg)',
                      border: isUserRequest ? '3px solid #FEB21A' : '3px solid white',
                      boxShadow: isUserRequest ? '0 0 0 3px #FEB21A40' : undefined
                    }}
                  >
                    <span
                      className="text-lg"
                      style={{ transform: 'rotate(45deg)' }}
                    >
                      {config.icon}
                    </span>
                  </div>

                  {/* Hover popup */}
                  {isHovered && (
                    <div
                      className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 bg-white rounded-xl shadow-xl border-2 border-[#134686]/20 p-3 min-w-[200px]"
                      style={{ pointerEvents: 'none' }}
                    >
                      <div className="text-sm">
                        <p className="text-[#134686] mb-1">
                          {marker.userName}
                          {isUserRequest && <span className="ml-1 text-[#FEB21A]">✨</span>}
                        </p>
                        <p className="text-xs text-gray-600 mb-1">Needs: {marker.skill}</p>
                        <p className="text-xs text-[#FEB21A]">
                          {isUserRequest ? '📍 Your request' : '💡 Click to help!'}
                        </p>
                      </div>
                      {/* Arrow */}
                      <div
                        className="absolute top-full left-1/2 -translate-x-1/2 -mt-[2px]"
                        style={{
                          width: 0,
                          height: 0,
                          borderLeft: '8px solid transparent',
                          borderRight: '8px solid transparent',
                          borderTop: '8px solid white'
                        }}
                      />
                    </div>
                  )}
                </button>
              </div>
            </Overlay>
          );
        })}
      </Map>

      {/* Map controls overlay - Reset View */}
      {!hideControls && (
        <div className="absolute top-4 left-4 z-[1000]">
          <div className="bg-white rounded-lg shadow-lg border-2 border-[#134686]/20 overflow-hidden">
            <button
              onClick={handleResetView}
              className="px-3 py-2 text-sm text-[#134686] hover:bg-[#FDF4E3] transition-colors flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              Reset View
            </button>
          </div>
        </div>
      )}

      {/* Location presets dropdown */}
      {!hideControls && (
        <div className="absolute top-4 right-4 z-[1000]">
          <div className="bg-white rounded-lg shadow-lg border-2 border-[#134686]/20 overflow-hidden">
            <select
              onChange={handleLocationChange}
              className="px-3 py-2 text-sm text-[#134686] bg-white border-none outline-none cursor-pointer"
              defaultValue=""
            >
              <option value="" disabled>Quick Locations</option>
              {presetLocations.map((location, index) => (
                <option key={index} value={index}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Legend */}
      {!hideControls && (
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 z-[1000]">
          <div className="bg-white rounded-lg shadow-lg border-2 border-[#134686]/20 p-2 sm:p-3">
            <p className="text-[10px] sm:text-xs text-[#134686] mb-1.5 sm:mb-2">Skill Categories:</p>
            <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
              {Object.entries(categoryConfig).slice(0, 4).map(([category, config]) => (
                <div key={category} className="flex items-center gap-1 sm:gap-1.5">
                  <span className="text-xs sm:text-sm">{config.icon}</span>
                  <span className="text-[10px] sm:text-xs text-[#134686]/70">{config.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
