// Indian Cities Data with Coordinates and Local Areas
const INDIAN_CITIES = {
    mumbai: {
        name: "Mumbai",
        center: [19.0760, 72.8777],
        zoom: 12,
        areas: [
            { name: "Andheri", lat: 19.1136, lng: 72.8697 },
            { name: "Bandra", lat: 19.0596, lng: 72.8295 },
            { name: "Colaba", lat: 18.9067, lng: 72.8147 },
            { name: "Dadar", lat: 19.0178, lng: 72.8478 },
            { name: "Juhu", lat: 19.0990, lng: 72.8265 },
            { name: "Powai", lat: 19.1197, lng: 72.9059 },
            { name: "Worli", lat: 19.0176, lng: 72.8170 },
            { name: "Goregaon", lat: 19.1550, lng: 72.8497 },
            { name: "Malad", lat: 19.1865, lng: 72.8485 },
            { name: "Borivali", lat: 19.2304, lng: 72.8565 }
        ]
    },
    delhi: {
        name: "Delhi",
        center: [28.7041, 77.1025],
        zoom: 12,
        areas: [
            { name: "Connaught Place", lat: 28.6315, lng: 77.2167 },
            { name: "Karol Bagh", lat: 28.6510, lng: 77.1900 },
            { name: "Dwarka", lat: 28.5921, lng: 77.0460 },
            { name: "Rohini", lat: 28.7469, lng: 77.0670 },
            { name: "Saket", lat: 28.5244, lng: 77.2066 },
            { name: "Lajpat Nagar", lat: 28.5677, lng: 77.2430 },
            { name: "Janakpuri", lat: 28.6219, lng: 77.0850 },
            { name: "Rajouri Garden", lat: 28.6410, lng: 77.1200 },
            { name: "Nehru Place", lat: 28.5494, lng: 77.2501 },
            { name: "Chandni Chowk", lat: 28.6507, lng: 77.2300 }
        ]
    },
    bangalore: {
        name: "Bangalore",
        center: [12.9716, 77.5946],
        zoom: 12,
        areas: [
            { name: "Koramangala", lat: 12.9279, lng: 77.6271 },
            { name: "Indiranagar", lat: 12.9784, lng: 77.6408 },
            { name: "Whitefield", lat: 12.9698, lng: 77.7499 },
            { name: "MG Road", lat: 12.9750, lng: 77.6060 },
            { name: "Electronic City", lat: 12.8399, lng: 77.6770 },
            { name: "Jayanagar", lat: 12.9250, lng: 77.5937 },
            { name: "HSR Layout", lat: 12.9116, lng: 77.6390 },
            { name: "Marathahalli", lat: 12.9591, lng: 77.6974 },
            { name: "BTM Layout", lat: 12.9165, lng: 77.6101 },
            { name: "Yelahanka", lat: 13.1007, lng: 77.5963 }
        ]
    },
    kolkata: {
        name: "Kolkata",
        center: [22.5726, 88.3639],
        zoom: 12,
        areas: [
            { name: "Park Street", lat: 22.5535, lng: 88.3561 },
            { name: "Salt Lake", lat: 22.5804, lng: 88.4160 },
            { name: "Howrah", lat: 22.5958, lng: 88.2636 },
            { name: "Ballygunge", lat: 22.5328, lng: 88.3663 },
            { name: "New Town", lat: 22.5863, lng: 88.4749 },
            { name: "Alipore", lat: 22.5355, lng: 88.3305 },
            { name: "Jadavpur", lat: 22.4981, lng: 88.3662 },
            { name: "Dum Dum", lat: 22.6539, lng: 88.4255 },
            { name: "Rajarhat", lat: 22.6211, lng: 88.4542 },
            { name: "Behala", lat: 22.4950, lng: 88.3108 }
        ]
    },
    chennai: {
        name: "Chennai",
        center: [13.0827, 80.2707],
        zoom: 12,
        areas: [
            { name: "T Nagar", lat: 13.0418, lng: 80.2341 },
            { name: "Anna Nagar", lat: 13.0850, lng: 80.2100 },
            { name: "Adyar", lat: 13.0067, lng: 80.2572 },
            { name: "Velachery", lat: 12.9750, lng: 80.2200 },
            { name: "Mylapore", lat: 13.0339, lng: 80.2677 },
            { name: "Porur", lat: 13.0355, lng: 80.1561 },
            { name: "OMR", lat: 12.8996, lng: 80.2209 },
            { name: "Tambaram", lat: 12.9249, lng: 80.1000 },
            { name: "Guindy", lat: 13.0067, lng: 80.2206 },
            { name: "Nungambakkam", lat: 13.0569, lng: 80.2425 }
        ]
    },
    hyderabad: {
        name: "Hyderabad",
        center: [17.3850, 78.4867],
        zoom: 12,
        areas: [
            { name: "Banjara Hills", lat: 17.4239, lng: 78.4436 },
            { name: "Hitech City", lat: 17.4435, lng: 78.3772 },
            { name: "Gachibowli", lat: 17.4399, lng: 78.3489 },
            { name: "Secunderabad", lat: 17.4399, lng: 78.4983 },
            { name: "Kukatpally", lat: 17.4849, lng: 78.3916 },
            { name: "Madhapur", lat: 17.4474, lng: 78.3914 },
            { name: "Jubilee Hills", lat: 17.4327, lng: 78.4069 },
            { name: "Ameerpet", lat: 17.4374, lng: 78.4482 },
            { name: "LB Nagar", lat: 17.3517, lng: 78.5529 },
            { name: "Charminar", lat: 17.3616, lng: 78.4747 }
        ]
    },
    pune: {
        name: "Pune",
        center: [18.5204, 73.8567],
        zoom: 12,
        areas: [
            { name: "Koregaon Park", lat: 18.5362, lng: 73.8958 },
            { name: "Hinjewadi", lat: 18.5912, lng: 73.7389 },
            { name: "Viman Nagar", lat: 18.5679, lng: 73.9143 },
            { name: "Kothrud", lat: 18.5074, lng: 73.8077 },
            { name: "Hadapsar", lat: 18.5089, lng: 73.9260 },
            { name: "Wakad", lat: 18.5979, lng: 73.7624 },
            { name: "Shivajinagar", lat: 18.5304, lng: 73.8567 },
            { name: "Aundh", lat: 18.5593, lng: 73.8078 },
            { name: "Pimpri", lat: 18.6298, lng: 73.8000 },
            { name: "Deccan", lat: 18.5164, lng: 73.8422 }
        ]
    },
    ahmedabad: {
        name: "Ahmedabad",
        center: [23.0225, 72.5714],
        zoom: 12,
        areas: [
            { name: "Satellite", lat: 23.0258, lng: 72.5098 },
            { name: "Vastrapur", lat: 23.0365, lng: 72.5243 },
            { name: "Maninagar", lat: 22.9955, lng: 72.6020 },
            { name: "Naranpura", lat: 23.0461, lng: 72.5539 },
            { name: "CG Road", lat: 23.0315, lng: 72.5580 },
            { name: "Prahlad Nagar", lat: 23.0071, lng: 72.5058 },
            { name: "Bopal", lat: 23.0395, lng: 72.4631 },
            { name: "Gota", lat: 23.1105, lng: 72.5697 },
            { name: "Chandkheda", lat: 23.1024, lng: 72.6107 },
            { name: "Paldi", lat: 23.0176, lng: 72.5638 }
        ]
    },
    jaipur: {
        name: "Jaipur",
        center: [26.9124, 75.7873],
        zoom: 12,
        areas: [
            { name: "C Scheme", lat: 26.9124, lng: 75.7873 },
            { name: "Malviya Nagar", lat: 26.8523, lng: 75.8181 },
            { name: "Vaishali Nagar", lat: 26.9050, lng: 75.7260 },
            { name: "Mansarovar", lat: 26.8550, lng: 75.7350 },
            { name: "Jagatpura", lat: 26.8220, lng: 75.8645 },
            { name: "Raja Park", lat: 26.9100, lng: 75.8000 },
            { name: "Ajmer Road", lat: 26.8900, lng: 75.7500 },
            { name: "Sitapura", lat: 26.7892, lng: 75.8997 },
            { name: "Tonk Road", lat: 26.8650, lng: 75.8200 },
            { name: "MI Road", lat: 26.9200, lng: 75.8100 }
        ]
    },
    lucknow: {
        name: "Lucknow",
        center: [26.8467, 80.9462],
        zoom: 12,
        areas: [
            { name: "Gomti Nagar", lat: 26.8548, lng: 81.0082 },
            { name: "Hazratganj", lat: 26.8507, lng: 80.9496 },
            { name: "Alambagh", lat: 26.8200, lng: 80.8900 },
            { name: "Indira Nagar", lat: 26.8774, lng: 80.9993 },
            { name: "Aliganj", lat: 26.8780, lng: 80.9350 },
            { name: "Mahanagar", lat: 26.8900, lng: 80.9800 },
            { name: "Aminabad", lat: 26.8550, lng: 80.9100 },
            { name: "Chowk", lat: 26.8590, lng: 80.9220 },
            { name: "Rajajipuram", lat: 26.8650, lng: 80.8900 },
            { name: "Vikas Nagar", lat: 26.8250, lng: 80.9700 }
        ]
    }
};
