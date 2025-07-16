import type { IUser } from "@/common/types/user";
import type { AppDispatch } from "@/store/store";
import { saveAddress } from "@/store/thunks/userThunk";
import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Save, X } from "lucide-react";
import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useDispatch } from "react-redux";

// Fix lỗi icon marker không hiển thị đúng
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const GoogleMap = ({ setOpenAddAddress, dataUser }: { setOpenAddAddress: (value: boolean) => void, dataUser: IUser }) => {
    const [position, setPosition] = useState({ lat: 21.0283334, lng: 105.854041 });
    const [address, setAddress] = useState("");
    const [inputAddress, setInputAddress] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [debouncedQuery, setDebouncedQuery] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    //tìm kiếm sau khi người dùng ngừng gõ 300ms
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(inputAddress);
        }, 300);

        return () => clearTimeout(timer);
    }, [inputAddress]);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!debouncedQuery) {
                setSuggestions([]);
                return;
            }

            try {
                const res = await axios.get(
                    `https://nominatim.openstreetmap.org/search?format=json&countrycodes=vn&q=${encodeURIComponent(
                        debouncedQuery
                    )}`
                );
                setSuggestions(res.data.slice(0, 5)); // giới hạn 5 gợi ý
            } catch (err) {
                console.error("Lỗi gợi ý:", err);
            }
        };

        fetchSuggestions();
    }, [debouncedQuery]);

    //Xử lý tìm kiếm khi gõ địa chỉ
    const handleInputChange = (e: any) => {
        setInputAddress(e.target.value);
    };

    //Xử lý khi chọn 1 gợi ý
    const handleSuggestionClick = (place: any) => {
        const newPos = { lat: parseFloat(place.lat), lng: parseFloat(place.lon) };
        setPosition(newPos);
        setAddress(place.display_name);
        setInputAddress(place.display_name);
        setSuggestions([]); // Ẩn gợi ý
    };

    // Click để chọn vị trí mới
    const MapClickHandler = () => {
        useMapEvents({
            click(e: any) {
                setPosition(e.latlng);
                fetchAddress({ lat: e.latlng.lat, lng: e.latlng.lng });
            },
        });
        return <Marker position={position} />;
    };

    // Tự động dịch chuyển bản đồ mỗi khi position thay đổi
    const MapController = ({ position }: any) => {
        const map = useMap();

        // Khi vị trí thay đổi thì pan đến vị trí mới
        map.setView(position, map.getZoom());

        return null;
    };

    // Reverse geocoding: từ lat,lng → địa chỉ
    const fetchAddress = async ({ lat, lng }: any) => {
        try {
            const res = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
            );
            setAddress(res.data.display_name);
            setInputAddress(res.data.display_name); // Hiển thị lại trong input
            // setSuggestions([]);
        } catch (err) {
            console.error("Không lấy được địa chỉ từ tọa độ (fetchAddress)");
        }
    };

    // Geocoding: từ địa chỉ → lat,lng
    const handleSearch = async () => {
        if (!inputAddress) return;
        try {
            const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(inputAddress)}`);
            if (res.data && res.data.length > 0) {
                const first = res.data[0];
                const newPos = { lat: parseFloat(first.lat), lng: parseFloat(first.lon) };
                setPosition(newPos);
                setAddress(first.display_name);
            } else {
                alert("Không tìm thấy địa chỉ (handleSearch)");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleSave = async () => {
        // console.log({
        //     addressName: address,
        //     lat: position.lat,
        //     lng: position.lng,
        // })
        if (dataUser.address !== undefined && dataUser.address?.length > 1) {
            alert('Chỉ được lưu được tối đa 2 địa chỉ');
            setOpenAddAddress(false);
            return;
        }
        if (!address) return alert('Vui lòng nhập địa chỉ')
        dispatch(saveAddress({
            _id: dataUser._id as string,
            addressName: address,
            lat: position.lat,
            lng: position.lng,
        }))
    };

    return (
        <div className="space-y-2 font-MJSatoshi">
            {/* Input địa chỉ */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Enter address to search"
                        className="border p-2 w-full"
                        value={inputAddress}
                        onChange={handleInputChange}
                    />

                    {suggestions.length > 0 && (
                        <ul className="absolute z-50 w-full bg-white border max-h-60 overflow-y-auto shadow">
                            {suggestions.map((place: any, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSuggestionClick(place)}
                                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                                >
                                    {place.display_name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                {/* <button
                    onClick={(e) => {
                        e.preventDefault();
                        handleSearch()
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Tìm
                </button> */}
            </div>

            {/* Bản đồ */}
            <MapContainer
                center={position}
                zoom={16}
                style={{ height: "400px", width: "100%" }}
                className="z-0"
            >
                <TileLayer
                    attribution='&copy; OpenStreetMap contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapClickHandler />
                <MapController position={position} />
            </MapContainer>

            {/* Hiển thị địa chỉ */}
            {/* <p><strong>Địa chỉ chọn:</strong> {address || "Chưa có địa chỉ"}</p> */}

            {/* Nút lưu */}
            <div className="flex gap-2 justify-end my-4">
                <button
                    className='flex items-center gap-1 px-3 py-1 border border-danger bg-danger hover:bg-white text-white hover:text-danger rounded-[6px] cursor-pointer'
                    onClick={(e) => { e.preventDefault(); setOpenAddAddress(false) }}
                >
                    <X size={16} />
                    <p className='text-base'>Cancel</p>
                </button>
                <button
                    className='flex items-center gap-1 px-3 py-1 border border-primary bg-primary hover:bg-white text-white hover:text-primary rounded-[6px] cursor-pointer'
                    onClick={(e) => { e.preventDefault(); handleSave() }}
                >
                    <Save size={16} />
                    <p className='text-base'>Save</p>
                </button>
            </div>
        </div>
    );
}

export default GoogleMap