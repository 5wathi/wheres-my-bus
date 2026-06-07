import type { City } from "@/lib/types";

// Route colors — a muted, harmonious palette (distinct but easy on the eye,
// not neon). White text stays legible on every one.
const C = {
  indigo: "#646cb0",
  emerald: "#5a9b80",
  orange: "#c8855a",
  rose: "#bd7186",
  sky: "#5f8fb5",
  violet: "#8c7bb0",
  amber: "#b59758",
  teal: "#5a9ba0",
};

// ---------------------------------------------------------------------------
// Bengaluru — BMTC
// ---------------------------------------------------------------------------
const bengaluru: City = {
  id: "blr",
  name: "Bengaluru",
  operator: "BMTC",
  center: [12.9716, 77.5946],
  zoom: 12,
  stops: [
    { id: "blr-majestic", name: "Majestic (Kempegowda Bus Stn)", pos: [12.9774, 77.5713] },
    { id: "blr-shivajinagar", name: "Shivajinagar", pos: [12.9847, 77.605] },
    { id: "blr-mgroad", name: "MG Road", pos: [12.9756, 77.6068] },
    { id: "blr-indiranagar", name: "Indiranagar", pos: [12.9719, 77.6412] },
    { id: "blr-domlur", name: "Domlur", pos: [12.961, 77.6387] },
    { id: "blr-marathahalli", name: "Marathahalli", pos: [12.9591, 77.6974] },
    { id: "blr-krpuram", name: "KR Puram", pos: [13.0076, 77.6961] },
    { id: "blr-krmarket", name: "KR Market", pos: [12.9617, 77.5806] },
    { id: "blr-btm", name: "BTM Layout", pos: [12.9166, 77.6101] },
    { id: "blr-silkboard", name: "Silk Board", pos: [12.9172, 77.6228] },
    { id: "blr-ecity", name: "Electronic City", pos: [12.8452, 77.6602] },
    { id: "blr-banashankari", name: "Banashankari", pos: [12.9255, 77.5468] },
    { id: "blr-jayanagar", name: "Jayanagar", pos: [12.925, 77.5938] },
    { id: "blr-yeshwanthpur", name: "Yeshwanthpur", pos: [13.0234, 77.551] },
    { id: "blr-whitefield", name: "Whitefield (ITPL)", pos: [12.9856, 77.7367] },
    { id: "blr-hebbal", name: "Hebbal", pos: [13.0358, 77.597] },
    { id: "blr-mekhri", name: "Mekhri Circle", pos: [13.0107, 77.5806] },
    { id: "blr-koramangala", name: "Koramangala", pos: [12.9352, 77.6245] },
    { id: "blr-hsr", name: "HSR Layout", pos: [12.9116, 77.6473] },
  ],
  routes: [
    {
      id: "blr-500d", number: "500D", name: "Majestic → KR Puram", operator: "BMTC", color: C.indigo,
      stops: ["blr-majestic", "blr-shivajinagar", "blr-mgroad", "blr-indiranagar", "blr-domlur", "blr-marathahalli", "blr-krpuram"],
      headwayMin: 8, speedKmph: 22, firstBus: "05:30", lastBus: "23:00", fare: 35,
    },
    {
      id: "blr-356", number: "356", name: "Majestic → Electronic City", operator: "BMTC", color: C.emerald,
      stops: ["blr-majestic", "blr-krmarket", "blr-btm", "blr-silkboard", "blr-ecity"],
      headwayMin: 10, speedKmph: 24, firstBus: "05:15", lastBus: "22:30", fare: 45,
    },
    {
      id: "blr-201", number: "201", name: "Banashankari → Yeshwanthpur", operator: "BMTC", color: C.orange,
      stops: ["blr-banashankari", "blr-jayanagar", "blr-krmarket", "blr-majestic", "blr-yeshwanthpur"],
      headwayMin: 12, speedKmph: 20, firstBus: "06:00", lastBus: "22:00", fare: 25,
    },
    {
      id: "blr-335e", number: "335E", name: "Majestic → Whitefield", operator: "BMTC", color: C.rose,
      stops: ["blr-majestic", "blr-mgroad", "blr-indiranagar", "blr-marathahalli", "blr-whitefield"],
      headwayMin: 9, speedKmph: 26, firstBus: "05:00", lastBus: "23:15", fare: 40,
    },
    {
      id: "blr-290", number: "290", name: "Hebbal → Majestic", operator: "BMTC", color: C.sky,
      stops: ["blr-hebbal", "blr-mekhri", "blr-yeshwanthpur", "blr-majestic"],
      headwayMin: 14, speedKmph: 23, firstBus: "05:45", lastBus: "22:45", fare: 20,
    },
    {
      id: "blr-g4", number: "G-4", name: "Koramangala → Jayanagar", operator: "BMTC", color: C.violet,
      stops: ["blr-koramangala", "blr-hsr", "blr-silkboard", "blr-btm", "blr-jayanagar"],
      headwayMin: 15, speedKmph: 19, firstBus: "06:15", lastBus: "21:45", fare: 22,
    },
  ],
};

// ---------------------------------------------------------------------------
// Delhi — DTC
// ---------------------------------------------------------------------------
const delhi: City = {
  id: "del",
  name: "Delhi",
  operator: "DTC",
  center: [28.6139, 77.209],
  zoom: 11,
  stops: [
    { id: "del-kashmere", name: "Kashmere Gate ISBT", pos: [28.6675, 77.2285] },
    { id: "del-cp", name: "Connaught Place", pos: [28.6315, 77.2167] },
    { id: "del-ito", name: "ITO", pos: [28.628, 77.241] },
    { id: "del-lajpat", name: "Lajpat Nagar", pos: [28.5677, 77.2433] },
    { id: "del-nehru", name: "Nehru Place", pos: [28.5494, 77.2536] },
    { id: "del-saket", name: "Saket", pos: [28.5245, 77.2066] },
    { id: "del-aiims", name: "AIIMS", pos: [28.5672, 77.21] },
    { id: "del-dhaula", name: "Dhaula Kuan", pos: [28.5921, 77.161] },
    { id: "del-karol", name: "Karol Bagh", pos: [28.6519, 77.1909] },
    { id: "del-anand", name: "Anand Vihar ISBT", pos: [28.6469, 77.3159] },
    { id: "del-dwarka", name: "Dwarka Sec-21", pos: [28.552, 77.0588] },
    { id: "del-najafgarh", name: "Najafgarh", pos: [28.609, 76.9856] },
  ],
  routes: [
    {
      id: "del-764", number: "764", name: "Kashmere Gate → Saket", operator: "DTC", color: C.indigo,
      stops: ["del-kashmere", "del-cp", "del-ito", "del-lajpat", "del-nehru", "del-saket"],
      headwayMin: 10, speedKmph: 24, firstBus: "05:30", lastBus: "22:30", fare: 25,
    },
    {
      id: "del-521", number: "521", name: "Anand Vihar → Dwarka", operator: "DTC", color: C.emerald,
      stops: ["del-anand", "del-ito", "del-cp", "del-dhaula", "del-dwarka"],
      headwayMin: 12, speedKmph: 27, firstBus: "05:15", lastBus: "22:45", fare: 35,
    },
    {
      id: "del-522", number: "522", name: "AIIMS → Karol Bagh", operator: "DTC", color: C.orange,
      stops: ["del-aiims", "del-saket", "del-nehru", "del-cp", "del-karol"],
      headwayMin: 14, speedKmph: 22, firstBus: "06:00", lastBus: "22:00", fare: 20,
    },
    {
      id: "del-871", number: "871", name: "Najafgarh → Connaught Place", operator: "DTC", color: C.rose,
      stops: ["del-najafgarh", "del-dwarka", "del-dhaula", "del-cp"],
      headwayMin: 15, speedKmph: 28, firstBus: "05:45", lastBus: "21:45", fare: 30,
    },
  ],
};

// ---------------------------------------------------------------------------
// Mumbai — BEST
// ---------------------------------------------------------------------------
const mumbai: City = {
  id: "mum",
  name: "Mumbai",
  operator: "BEST",
  center: [19.03, 72.85],
  zoom: 12,
  stops: [
    { id: "mum-colaba", name: "Colaba Depot", pos: [18.9067, 72.8147] },
    { id: "mum-csmt", name: "CSMT", pos: [18.9398, 72.8355] },
    { id: "mum-churchgate", name: "Churchgate", pos: [18.9322, 72.8264] },
    { id: "mum-worli", name: "Worli", pos: [19.0176, 72.817] },
    { id: "mum-dadar", name: "Dadar", pos: [19.0186, 72.844] },
    { id: "mum-mahim", name: "Mahim", pos: [19.041, 72.84] },
    { id: "mum-bandra", name: "Bandra", pos: [19.0544, 72.8402] },
    { id: "mum-sion", name: "Sion", pos: [19.041, 72.8617] },
    { id: "mum-kurla", name: "Kurla", pos: [19.0726, 72.8845] },
    { id: "mum-andheri", name: "Andheri", pos: [19.1197, 72.8468] },
    { id: "mum-borivali", name: "Borivali", pos: [19.23, 72.8567] },
  ],
  routes: [
    {
      id: "mum-1", number: "1 LTD", name: "Colaba → Bandra", operator: "BEST", color: C.indigo,
      stops: ["mum-colaba", "mum-csmt", "mum-dadar", "mum-mahim", "mum-bandra"],
      headwayMin: 9, speedKmph: 20, firstBus: "05:30", lastBus: "23:30", fare: 25,
    },
    {
      id: "mum-a74", number: "A-74", name: "CSMT → Andheri", operator: "BEST", color: C.emerald,
      stops: ["mum-csmt", "mum-worli", "mum-bandra", "mum-andheri"],
      headwayMin: 11, speedKmph: 22, firstBus: "05:15", lastBus: "22:45", fare: 30,
    },
    {
      id: "mum-302", number: "302", name: "Dadar → Andheri", operator: "BEST", color: C.orange,
      stops: ["mum-dadar", "mum-sion", "mum-kurla", "mum-andheri"],
      headwayMin: 13, speedKmph: 21, firstBus: "06:00", lastBus: "22:15", fare: 22,
    },
    {
      id: "mum-700", number: "700", name: "Churchgate → Borivali", operator: "BEST", color: C.rose,
      stops: ["mum-churchgate", "mum-worli", "mum-mahim", "mum-bandra", "mum-borivali"],
      headwayMin: 16, speedKmph: 24, firstBus: "05:45", lastBus: "22:00", fare: 40,
    },
  ],
};

// ---------------------------------------------------------------------------
// Chennai — MTC
// ---------------------------------------------------------------------------
const chennai: City = {
  id: "maa",
  name: "Chennai",
  operator: "MTC",
  center: [13.05, 80.23],
  zoom: 12,
  stops: [
    { id: "maa-broadway", name: "Broadway (Parry's)", pos: [13.0915, 80.287] },
    { id: "maa-central", name: "Central Station", pos: [13.0827, 80.2757] },
    { id: "maa-egmore", name: "Egmore", pos: [13.0732, 80.2609] },
    { id: "maa-tnagar", name: "T Nagar", pos: [13.0418, 80.2341] },
    { id: "maa-guindy", name: "Guindy", pos: [13.0067, 80.2206] },
    { id: "maa-adyar", name: "Adyar", pos: [13.0012, 80.2565] },
    { id: "maa-tambaram", name: "Tambaram", pos: [12.9249, 80.1] },
    { id: "maa-annanagar", name: "Anna Nagar", pos: [13.085, 80.2101] },
    { id: "maa-vadapalani", name: "Vadapalani", pos: [13.05, 80.2121] },
    { id: "maa-velachery", name: "Velachery", pos: [12.9815, 80.218] },
  ],
  routes: [
    {
      id: "maa-21g", number: "21G", name: "Broadway → Tambaram", operator: "MTC", color: C.indigo,
      stops: ["maa-broadway", "maa-central", "maa-egmore", "maa-tnagar", "maa-guindy", "maa-tambaram"],
      headwayMin: 10, speedKmph: 23, firstBus: "05:00", lastBus: "23:00", fare: 28,
    },
    {
      id: "maa-23c", number: "23C", name: "Broadway → Anna Nagar", operator: "MTC", color: C.emerald,
      stops: ["maa-broadway", "maa-egmore", "maa-vadapalani", "maa-annanagar"],
      headwayMin: 12, speedKmph: 21, firstBus: "05:30", lastBus: "22:30", fare: 20,
    },
    {
      id: "maa-5c", number: "5C", name: "Central → Velachery", operator: "MTC", color: C.orange,
      stops: ["maa-central", "maa-tnagar", "maa-adyar", "maa-velachery"],
      headwayMin: 14, speedKmph: 22, firstBus: "06:00", lastBus: "22:00", fare: 24,
    },
    {
      id: "maa-27b", number: "27B", name: "Broadway → Vadapalani", operator: "MTC", color: C.rose,
      stops: ["maa-broadway", "maa-annanagar", "maa-vadapalani"],
      headwayMin: 15, speedKmph: 20, firstBus: "06:15", lastBus: "21:45", fare: 18,
    },
  ],
};

// ---------------------------------------------------------------------------
// Hyderabad — TSRTC
// ---------------------------------------------------------------------------
const hyderabad: City = {
  id: "hyd",
  name: "Hyderabad",
  operator: "TSRTC",
  center: [17.41, 78.46],
  zoom: 12,
  stops: [
    { id: "hyd-secbad", name: "Secunderabad Stn", pos: [17.4399, 78.4983] },
    { id: "hyd-begumpet", name: "Begumpet", pos: [17.4439, 78.4738] },
    { id: "hyd-ameerpet", name: "Ameerpet", pos: [17.4374, 78.4487] },
    { id: "hyd-mehdipatnam", name: "Mehdipatnam", pos: [17.3963, 78.4378] },
    { id: "hyd-koti", name: "Koti", pos: [17.385, 78.4867] },
    { id: "hyd-charminar", name: "Charminar", pos: [17.3616, 78.4747] },
    { id: "hyd-dilsukhnagar", name: "Dilsukhnagar", pos: [17.3687, 78.5247] },
    { id: "hyd-lbnagar", name: "LB Nagar", pos: [17.3463, 78.5523] },
    { id: "hyd-hitec", name: "Hitec City", pos: [17.4435, 78.3772] },
    { id: "hyd-gachibowli", name: "Gachibowli", pos: [17.4401, 78.3489] },
    { id: "hyd-kukatpally", name: "Kukatpally", pos: [17.4948, 78.3996] },
  ],
  routes: [
    {
      id: "hyd-10h", number: "10H", name: "Secunderabad → Mehdipatnam", operator: "TSRTC", color: C.indigo,
      stops: ["hyd-secbad", "hyd-begumpet", "hyd-ameerpet", "hyd-mehdipatnam"],
      headwayMin: 9, speedKmph: 23, firstBus: "05:15", lastBus: "23:00", fare: 22,
    },
    {
      id: "hyd-49m", number: "49M", name: "Mehdipatnam → Gachibowli", operator: "TSRTC", color: C.emerald,
      stops: ["hyd-mehdipatnam", "hyd-ameerpet", "hyd-hitec", "hyd-gachibowli"],
      headwayMin: 11, speedKmph: 26, firstBus: "05:30", lastBus: "22:45", fare: 30,
    },
    {
      id: "hyd-5k", number: "5K", name: "Secunderabad → Charminar", operator: "TSRTC", color: C.orange,
      stops: ["hyd-secbad", "hyd-koti", "hyd-charminar"],
      headwayMin: 13, speedKmph: 19, firstBus: "06:00", lastBus: "22:00", fare: 18,
    },
    {
      id: "hyd-220", number: "220", name: "Koti → LB Nagar", operator: "TSRTC", color: C.rose,
      stops: ["hyd-koti", "hyd-dilsukhnagar", "hyd-lbnagar"],
      headwayMin: 12, speedKmph: 21, firstBus: "05:45", lastBus: "22:30", fare: 20,
    },
    {
      id: "hyd-8a", number: "8A", name: "Secunderabad → Kukatpally", operator: "TSRTC", color: C.sky,
      stops: ["hyd-secbad", "hyd-ameerpet", "hyd-kukatpally"],
      headwayMin: 14, speedKmph: 24, firstBus: "06:00", lastBus: "21:45", fare: 24,
    },
  ],
};

// ---------------------------------------------------------------------------
// Coimbatore — TNSTC (town bus)
// ---------------------------------------------------------------------------
const coimbatore: City = {
  id: "cbe",
  name: "Coimbatore",
  operator: "TNSTC",
  center: [11.015, 76.97],
  zoom: 12,
  stops: [
    { id: "cbe-gandhipuram", name: "Gandhipuram Bus Stand", pos: [11.0183, 76.9676] },
    { id: "cbe-townhall", name: "Town Hall", pos: [11.0008, 76.9588] },
    { id: "cbe-ukkadam", name: "Ukkadam Bus Stand", pos: [10.9925, 76.9606] },
    { id: "cbe-junction", name: "Coimbatore Junction", pos: [10.9974, 76.9665] },
    { id: "cbe-rspuram", name: "RS Puram", pos: [11.0085, 76.949] },
    { id: "cbe-saibaba", name: "Saibaba Colony", pos: [11.0254, 76.9485] },
    { id: "cbe-peelamedu", name: "Peelamedu", pos: [11.03, 77.005] },
    { id: "cbe-hopecollege", name: "Hope College", pos: [11.021, 77.008] },
    { id: "cbe-singanallur", name: "Singanallur", pos: [11.008, 77.0289] },
    { id: "cbe-ganapathy", name: "Ganapathy", pos: [11.047, 76.989] },
    { id: "cbe-saravanampatti", name: "Saravanampatti", pos: [11.078, 76.999] },
    { id: "cbe-vadavalli", name: "Vadavalli", pos: [11.025, 76.91] },
    { id: "cbe-thudiyalur", name: "Thudiyalur", pos: [11.083, 76.942] },
    { id: "cbe-kuniyamuthur", name: "Kuniyamuthur", pos: [10.956, 76.956] },
    { id: "cbe-podanur", name: "Podanur", pos: [10.959, 76.97] },
  ],
  routes: [
    {
      id: "cbe-s12", number: "S-12", name: "Gandhipuram → Singanallur", operator: "TNSTC", color: C.indigo,
      stops: ["cbe-gandhipuram", "cbe-peelamedu", "cbe-hopecollege", "cbe-singanallur"],
      headwayMin: 9, speedKmph: 23, firstBus: "05:15", lastBus: "22:45", fare: 14,
    },
    {
      id: "cbe-1", number: "1", name: "Ukkadam → Saravanampatti", operator: "TNSTC", color: C.emerald,
      stops: ["cbe-ukkadam", "cbe-townhall", "cbe-gandhipuram", "cbe-ganapathy", "cbe-saravanampatti"],
      headwayMin: 11, speedKmph: 22, firstBus: "05:30", lastBus: "22:30", fare: 18,
    },
    {
      id: "cbe-70", number: "70", name: "Gandhipuram → Vadavalli", operator: "TNSTC", color: C.orange,
      stops: ["cbe-gandhipuram", "cbe-saibaba", "cbe-rspuram", "cbe-vadavalli"],
      headwayMin: 13, speedKmph: 20, firstBus: "06:00", lastBus: "22:00", fare: 12,
    },
    {
      id: "cbe-44", number: "44", name: "Ukkadam → Thudiyalur", operator: "TNSTC", color: C.rose,
      stops: ["cbe-ukkadam", "cbe-townhall", "cbe-gandhipuram", "cbe-ganapathy", "cbe-thudiyalur"],
      headwayMin: 14, speedKmph: 21, firstBus: "05:45", lastBus: "21:45", fare: 16,
    },
    {
      id: "cbe-s17", number: "S-17", name: "Junction → Kuniyamuthur", operator: "TNSTC", color: C.sky,
      stops: ["cbe-junction", "cbe-ukkadam", "cbe-podanur", "cbe-kuniyamuthur"],
      headwayMin: 15, speedKmph: 22, firstBus: "06:00", lastBus: "21:30", fare: 13,
    },
  ],
};

// ---------------------------------------------------------------------------
// Pune — PMPML
// ---------------------------------------------------------------------------
const pune: City = {
  id: "pn", name: "Pune", operator: "PMPML", center: [18.5204, 73.8567], zoom: 12,
  stops: [
    { id: "pn-station", name: "Pune Station", pos: [18.5286, 73.8743] },
    { id: "pn-shivajinagar", name: "Shivajinagar", pos: [18.5308, 73.8475] },
    { id: "pn-swargate", name: "Swargate", pos: [18.5012, 73.8587] },
    { id: "pn-deccan", name: "Deccan Gymkhana", pos: [18.5167, 73.841] },
    { id: "pn-kothrud", name: "Kothrud", pos: [18.5074, 73.8077] },
    { id: "pn-hadapsar", name: "Hadapsar", pos: [18.5089, 73.926] },
    { id: "pn-hinjewadi", name: "Hinjewadi", pos: [18.5917, 73.7389] },
    { id: "pn-katraj", name: "Katraj", pos: [18.4575, 73.865] },
    { id: "pn-vimannagar", name: "Viman Nagar", pos: [18.5679, 73.9143] },
    { id: "pn-kharadi", name: "Kharadi", pos: [18.5515, 73.941] },
  ],
  routes: [
    { id: "pn-159", number: "159", name: "Swargate → Hinjewadi", operator: "PMPML", color: C.indigo, stops: ["pn-swargate", "pn-deccan", "pn-shivajinagar", "pn-hinjewadi"], headwayMin: 10, speedKmph: 22, firstBus: "05:30", lastBus: "23:00", fare: 30 },
    { id: "pn-4", number: "4", name: "Pune Station → Katraj", operator: "PMPML", color: C.emerald, stops: ["pn-station", "pn-swargate", "pn-katraj"], headwayMin: 12, speedKmph: 21, firstBus: "05:45", lastBus: "22:30", fare: 20 },
    { id: "pn-18", number: "18", name: "Shivajinagar → Hadapsar", operator: "PMPML", color: C.orange, stops: ["pn-shivajinagar", "pn-station", "pn-hadapsar"], headwayMin: 13, speedKmph: 20, firstBus: "06:00", lastBus: "22:15", fare: 22 },
    { id: "pn-73", number: "73", name: "Kothrud → Kharadi", operator: "PMPML", color: C.rose, stops: ["pn-kothrud", "pn-deccan", "pn-shivajinagar", "pn-vimannagar", "pn-kharadi"], headwayMin: 14, speedKmph: 22, firstBus: "06:00", lastBus: "22:00", fare: 28 },
  ],
};

// ---------------------------------------------------------------------------
// Jaipur — JCTSL
// ---------------------------------------------------------------------------
const jaipur: City = {
  id: "jp", name: "Jaipur", operator: "JCTSL", center: [26.9124, 75.7873], zoom: 12,
  stops: [
    { id: "jp-sindhicamp", name: "Sindhi Camp", pos: [26.9255, 75.798] },
    { id: "jp-railway", name: "Jaipur Junction", pos: [26.9196, 75.7878] },
    { id: "jp-chandpole", name: "Chandpole", pos: [26.927, 75.809] },
    { id: "jp-badichaupar", name: "Badi Chaupar", pos: [26.9239, 75.8267] },
    { id: "jp-statuecircle", name: "Statue Circle", pos: [26.9047, 75.799] },
    { id: "jp-vaishali", name: "Vaishali Nagar", pos: [26.912, 75.739] },
    { id: "jp-mansarovar", name: "Mansarovar", pos: [26.852, 75.762] },
    { id: "jp-malviya", name: "Malviya Nagar", pos: [26.855, 75.815] },
    { id: "jp-gopalpura", name: "Gopalpura", pos: [26.877, 75.8] },
    { id: "jp-jagatpura", name: "Jagatpura", pos: [26.827, 75.84] },
  ],
  routes: [
    { id: "jp-1", number: "1", name: "Sindhi Camp → Mansarovar", operator: "JCTSL", color: C.indigo, stops: ["jp-sindhicamp", "jp-statuecircle", "jp-gopalpura", "jp-mansarovar"], headwayMin: 11, speedKmph: 22, firstBus: "06:00", lastBus: "22:00", fare: 18 },
    { id: "jp-2", number: "2", name: "Jaipur Jn → Malviya Nagar", operator: "JCTSL", color: C.emerald, stops: ["jp-railway", "jp-statuecircle", "jp-malviya"], headwayMin: 12, speedKmph: 21, firstBus: "06:00", lastBus: "21:45", fare: 16 },
    { id: "jp-5", number: "5", name: "Vaishali Nagar → Badi Chaupar", operator: "JCTSL", color: C.orange, stops: ["jp-vaishali", "jp-sindhicamp", "jp-chandpole", "jp-badichaupar"], headwayMin: 13, speedKmph: 20, firstBus: "06:15", lastBus: "21:30", fare: 15 },
    { id: "jp-8", number: "8", name: "Sindhi Camp → Jagatpura", operator: "JCTSL", color: C.rose, stops: ["jp-sindhicamp", "jp-statuecircle", "jp-gopalpura", "jp-jagatpura"], headwayMin: 15, speedKmph: 22, firstBus: "06:00", lastBus: "21:30", fare: 20 },
  ],
};

// ---------------------------------------------------------------------------
// Lucknow — City Transport
// ---------------------------------------------------------------------------
const lucknow: City = {
  id: "lck", name: "Lucknow", operator: "LCTSL", center: [26.8467, 80.9462], zoom: 12,
  stops: [
    { id: "lck-charbagh", name: "Charbagh", pos: [26.831, 80.923] },
    { id: "lck-hazratganj", name: "Hazratganj", pos: [26.854, 80.946] },
    { id: "lck-alambagh", name: "Alambagh", pos: [26.812, 80.908] },
    { id: "lck-aminabad", name: "Aminabad", pos: [26.85, 80.923] },
    { id: "lck-gomtinagar", name: "Gomti Nagar", pos: [26.85, 81.0] },
    { id: "lck-indiranagar", name: "Indira Nagar", pos: [26.882, 80.993] },
    { id: "lck-aliganj", name: "Aliganj", pos: [26.893, 80.943] },
    { id: "lck-chinhat", name: "Chinhat", pos: [26.887, 81.042] },
    { id: "lck-kaiserbagh", name: "Kaiserbagh", pos: [26.856, 80.929] },
    { id: "lck-munshipulia", name: "Munshipulia", pos: [26.887, 80.987] },
  ],
  routes: [
    { id: "lck-1", number: "1", name: "Charbagh → Chinhat", operator: "LCTSL", color: C.indigo, stops: ["lck-charbagh", "lck-hazratganj", "lck-gomtinagar", "lck-chinhat"], headwayMin: 11, speedKmph: 23, firstBus: "05:45", lastBus: "22:15", fare: 20 },
    { id: "lck-2", number: "2", name: "Alambagh → Indira Nagar", operator: "LCTSL", color: C.emerald, stops: ["lck-alambagh", "lck-charbagh", "lck-hazratganj", "lck-indiranagar"], headwayMin: 12, speedKmph: 22, firstBus: "06:00", lastBus: "22:00", fare: 18 },
    { id: "lck-5", number: "5", name: "Aliganj → Aminabad", operator: "LCTSL", color: C.orange, stops: ["lck-aliganj", "lck-kaiserbagh", "lck-aminabad"], headwayMin: 13, speedKmph: 21, firstBus: "06:00", lastBus: "21:45", fare: 15 },
    { id: "lck-12", number: "12", name: "Munshipulia → Charbagh", operator: "LCTSL", color: C.rose, stops: ["lck-munshipulia", "lck-indiranagar", "lck-hazratganj", "lck-charbagh"], headwayMin: 14, speedKmph: 22, firstBus: "06:00", lastBus: "21:30", fare: 18 },
  ],
};

// ---------------------------------------------------------------------------
// Nagpur — Aapli Bus
// ---------------------------------------------------------------------------
const nagpur: City = {
  id: "ngp", name: "Nagpur", operator: "Aapli Bus", center: [21.1458, 79.0882], zoom: 12,
  stops: [
    { id: "ngp-station", name: "Nagpur Station", pos: [21.1535, 79.089] },
    { id: "ngp-sitabuldi", name: "Sitabuldi", pos: [21.145, 79.081] },
    { id: "ngp-sadar", name: "Sadar", pos: [21.162, 79.082] },
    { id: "ngp-dharampeth", name: "Dharampeth", pos: [21.138, 79.068] },
    { id: "ngp-sakkardara", name: "Sakkardara", pos: [21.119, 79.109] },
    { id: "ngp-manishnagar", name: "Manish Nagar", pos: [21.098, 79.056] },
    { id: "ngp-wardharoad", name: "Wardha Road", pos: [21.11, 79.056] },
    { id: "ngp-kampteeroad", name: "Kamptee Road", pos: [21.18, 79.1] },
    { id: "ngp-hingna", name: "Hingna", pos: [21.101, 78.99] },
    { id: "ngp-pardi", name: "Pardi", pos: [21.162, 79.14] },
  ],
  routes: [
    { id: "ngp-1", number: "1", name: "Nagpur Station → Hingna", operator: "Aapli Bus", color: C.indigo, stops: ["ngp-station", "ngp-sitabuldi", "ngp-dharampeth", "ngp-hingna"], headwayMin: 11, speedKmph: 23, firstBus: "06:00", lastBus: "22:00", fare: 20 },
    { id: "ngp-10", number: "10", name: "Sadar → Sakkardara", operator: "Aapli Bus", color: C.emerald, stops: ["ngp-sadar", "ngp-sitabuldi", "ngp-sakkardara"], headwayMin: 13, speedKmph: 21, firstBus: "06:00", lastBus: "21:45", fare: 15 },
    { id: "ngp-20", number: "20", name: "Kamptee Rd → Manish Nagar", operator: "Aapli Bus", color: C.orange, stops: ["ngp-kampteeroad", "ngp-sitabuldi", "ngp-wardharoad", "ngp-manishnagar"], headwayMin: 14, speedKmph: 22, firstBus: "06:00", lastBus: "21:30", fare: 18 },
    { id: "ngp-31", number: "31", name: "Pardi → Dharampeth", operator: "Aapli Bus", color: C.rose, stops: ["ngp-pardi", "ngp-station", "ngp-sitabuldi", "ngp-dharampeth"], headwayMin: 15, speedKmph: 22, firstBus: "06:15", lastBus: "21:30", fare: 18 },
  ],
};

// ---------------------------------------------------------------------------
// Indore — AICTSL (iBus)
// ---------------------------------------------------------------------------
const indore: City = {
  id: "ind", name: "Indore", operator: "AICTSL", center: [22.7196, 75.8577], zoom: 12,
  stops: [
    { id: "ind-rajwada", name: "Rajwada", pos: [22.7177, 75.8545] },
    { id: "ind-junction", name: "Indore Junction", pos: [22.718, 75.865] },
    { id: "ind-sarwate", name: "Sarwate Bus Stand", pos: [22.712, 75.864] },
    { id: "ind-vijaynagar", name: "Vijay Nagar", pos: [22.753, 75.894] },
    { id: "ind-palasia", name: "Palasia", pos: [22.724, 75.881] },
    { id: "ind-rajendranagar", name: "Rajendra Nagar", pos: [22.684, 75.842] },
    { id: "ind-bhawarkuan", name: "Bhawarkuan", pos: [22.696, 75.865] },
    { id: "ind-geetabhawan", name: "Geeta Bhawan", pos: [22.722, 75.887] },
    { id: "ind-sukhliya", name: "Sukhliya", pos: [22.756, 75.88] },
    { id: "ind-bengalisquare", name: "Bengali Square", pos: [22.74, 75.905] },
  ],
  routes: [
    { id: "ind-ibus", number: "iBus", name: "Rajwada → Vijay Nagar", operator: "AICTSL", color: C.indigo, stops: ["ind-rajwada", "ind-palasia", "ind-geetabhawan", "ind-vijaynagar"], headwayMin: 10, speedKmph: 24, firstBus: "05:45", lastBus: "22:30", fare: 25 },
    { id: "ind-2", number: "2", name: "Indore Jn → Rajendra Nagar", operator: "AICTSL", color: C.emerald, stops: ["ind-junction", "ind-sarwate", "ind-bhawarkuan", "ind-rajendranagar"], headwayMin: 12, speedKmph: 22, firstBus: "06:00", lastBus: "22:00", fare: 18 },
    { id: "ind-4", number: "4", name: "Sarwate → Bengali Square", operator: "AICTSL", color: C.orange, stops: ["ind-sarwate", "ind-palasia", "ind-bengalisquare"], headwayMin: 13, speedKmph: 21, firstBus: "06:00", lastBus: "21:45", fare: 16 },
    { id: "ind-s1", number: "S-1", name: "Bhawarkuan → Sukhliya", operator: "AICTSL", color: C.rose, stops: ["ind-bhawarkuan", "ind-palasia", "ind-sukhliya"], headwayMin: 14, speedKmph: 22, firstBus: "06:00", lastBus: "21:30", fare: 18 },
  ],
};

// ---------------------------------------------------------------------------
// Bhopal — BCLL (My Bus)
// ---------------------------------------------------------------------------
const bhopal: City = {
  id: "bho", name: "Bhopal", operator: "BCLL", center: [23.2599, 77.4126], zoom: 12,
  stops: [
    { id: "bho-junction", name: "Bhopal Junction", pos: [23.268, 77.403] },
    { id: "bho-mpnagar", name: "MP Nagar", pos: [23.233, 77.434] },
    { id: "bho-newmarket", name: "New Market", pos: [23.233, 77.401] },
    { id: "bho-habibganj", name: "Rani Kamlapati", pos: [23.233, 77.436] },
    { id: "bho-ttnagar", name: "TT Nagar", pos: [23.233, 77.397] },
    { id: "bho-kolar", name: "Kolar Road", pos: [23.17, 77.428] },
    { id: "bho-lalghati", name: "Lalghati", pos: [23.273, 77.376] },
    { id: "bho-bairagarh", name: "Bairagarh", pos: [23.279, 77.338] },
    { id: "bho-misrod", name: "Misrod", pos: [23.182, 77.472] },
    { id: "bho-ayodhya", name: "Ayodhya Nagar", pos: [23.268, 77.464] },
  ],
  routes: [
    { id: "bho-brts", number: "BRTS", name: "New Market → Misrod", operator: "BCLL", color: C.indigo, stops: ["bho-newmarket", "bho-mpnagar", "bho-habibganj", "bho-misrod"], headwayMin: 10, speedKmph: 23, firstBus: "05:45", lastBus: "22:30", fare: 20 },
    { id: "bho-1", number: "1", name: "Bhopal Jn → Kolar Road", operator: "BCLL", color: C.emerald, stops: ["bho-junction", "bho-newmarket", "bho-ttnagar", "bho-kolar"], headwayMin: 12, speedKmph: 22, firstBus: "06:00", lastBus: "22:00", fare: 18 },
    { id: "bho-4", number: "4", name: "Bairagarh → MP Nagar", operator: "BCLL", color: C.orange, stops: ["bho-bairagarh", "bho-lalghati", "bho-junction", "bho-mpnagar"], headwayMin: 13, speedKmph: 21, firstBus: "06:00", lastBus: "21:45", fare: 18 },
    { id: "bho-c1", number: "C-1", name: "Bhopal Jn → Ayodhya Nagar", operator: "BCLL", color: C.rose, stops: ["bho-junction", "bho-mpnagar", "bho-ayodhya"], headwayMin: 14, speedKmph: 22, firstBus: "06:00", lastBus: "21:30", fare: 16 },
  ],
};

// ---------------------------------------------------------------------------
// Visakhapatnam — APSRTC
// ---------------------------------------------------------------------------
const visakhapatnam: City = {
  id: "viz", name: "Visakhapatnam", operator: "APSRTC", center: [17.73, 83.305], zoom: 12,
  stops: [
    { id: "viz-rtccomplex", name: "RTC Complex", pos: [17.728, 83.305] },
    { id: "viz-jagadamba", name: "Jagadamba Centre", pos: [17.709, 83.301] },
    { id: "viz-beachroad", name: "RK Beach", pos: [17.714, 83.324] },
    { id: "viz-maddilapalem", name: "Maddilapalem", pos: [17.738, 83.327] },
    { id: "viz-gajuwaka", name: "Gajuwaka", pos: [17.684, 83.208] },
    { id: "viz-steelplant", name: "Steel Plant", pos: [17.63, 83.19] },
    { id: "viz-madhurawada", name: "Madhurawada", pos: [17.82, 83.36] },
    { id: "viz-pendurthi", name: "Pendurthi", pos: [17.82, 83.22] },
    { id: "viz-nad", name: "NAD Junction", pos: [17.74, 83.23] },
    { id: "viz-simhachalam", name: "Simhachalam", pos: [17.766, 83.249] },
  ],
  routes: [
    { id: "viz-900", number: "900", name: "RTC Complex → Gajuwaka", operator: "APSRTC", color: C.indigo, stops: ["viz-rtccomplex", "viz-jagadamba", "viz-nad", "viz-gajuwaka"], headwayMin: 9, speedKmph: 24, firstBus: "05:30", lastBus: "22:45", fare: 22 },
    { id: "viz-28", number: "28", name: "RTC Complex → Madhurawada", operator: "APSRTC", color: C.emerald, stops: ["viz-rtccomplex", "viz-maddilapalem", "viz-madhurawada"], headwayMin: 12, speedKmph: 23, firstBus: "06:00", lastBus: "22:00", fare: 20 },
    { id: "viz-111", number: "111", name: "Jagadamba → Steel Plant", operator: "APSRTC", color: C.orange, stops: ["viz-jagadamba", "viz-gajuwaka", "viz-steelplant"], headwayMin: 13, speedKmph: 22, firstBus: "06:00", lastBus: "21:45", fare: 24 },
    { id: "viz-400", number: "400", name: "Pendurthi → RK Beach", operator: "APSRTC", color: C.rose, stops: ["viz-pendurthi", "viz-nad", "viz-jagadamba", "viz-beachroad"], headwayMin: 14, speedKmph: 23, firstBus: "06:00", lastBus: "21:30", fare: 26 },
  ],
};

// ---------------------------------------------------------------------------
// Surat — Sitilink
// ---------------------------------------------------------------------------
const surat: City = {
  id: "srt", name: "Surat", operator: "Sitilink", center: [21.1702, 72.8311], zoom: 12,
  stops: [
    { id: "srt-station", name: "Surat Railway Station", pos: [21.205, 72.84] },
    { id: "srt-adajan", name: "Adajan", pos: [21.195, 72.795] },
    { id: "srt-varachha", name: "Varachha", pos: [21.208, 72.858] },
    { id: "srt-athwa", name: "Athwa", pos: [21.17, 72.805] },
    { id: "srt-udhna", name: "Udhna", pos: [21.166, 72.843] },
    { id: "srt-vesu", name: "Vesu", pos: [21.14, 72.77] },
    { id: "srt-katargam", name: "Katargam", pos: [21.23, 72.835] },
    { id: "srt-piplod", name: "Piplod", pos: [21.152, 72.778] },
    { id: "srt-sarthana", name: "Sarthana", pos: [21.23, 72.89] },
    { id: "srt-dumas", name: "Dumas Road", pos: [21.1, 72.73] },
  ],
  routes: [
    { id: "srt-1", number: "1", name: "Railway Station → Vesu", operator: "Sitilink", color: C.indigo, stops: ["srt-station", "srt-athwa", "srt-piplod", "srt-vesu"], headwayMin: 10, speedKmph: 23, firstBus: "06:00", lastBus: "22:30", fare: 18 },
    { id: "srt-5", number: "5", name: "Adajan → Varachha", operator: "Sitilink", color: C.emerald, stops: ["srt-adajan", "srt-station", "srt-varachha"], headwayMin: 12, speedKmph: 22, firstBus: "06:00", lastBus: "22:00", fare: 16 },
    { id: "srt-10", number: "10", name: "Udhna → Sarthana", operator: "Sitilink", color: C.orange, stops: ["srt-udhna", "srt-varachha", "srt-sarthana"], headwayMin: 13, speedKmph: 22, firstBus: "06:00", lastBus: "21:45", fare: 18 },
    { id: "srt-brts", number: "BRTS", name: "Katargam → Dumas Road", operator: "Sitilink", color: C.rose, stops: ["srt-katargam", "srt-athwa", "srt-vesu", "srt-dumas"], headwayMin: 11, speedKmph: 24, firstBus: "06:00", lastBus: "22:00", fare: 22 },
  ],
};

// ---------------------------------------------------------------------------
// Kochi — KSRTC
// ---------------------------------------------------------------------------
const kochi: City = {
  id: "koc", name: "Kochi", operator: "KSRTC", center: [9.9816, 76.2999], zoom: 12,
  stops: [
    { id: "koc-ernakulam", name: "Ernakulam (KSRTC)", pos: [9.976, 76.29] },
    { id: "koc-vyttila", name: "Vyttila Hub", pos: [9.967, 76.318] },
    { id: "koc-fortkochi", name: "Fort Kochi", pos: [9.965, 76.242] },
    { id: "koc-edappally", name: "Edappally", pos: [10.025, 76.308] },
    { id: "koc-kakkanad", name: "Kakkanad", pos: [10.015, 76.342] },
    { id: "koc-aluva", name: "Aluva", pos: [10.108, 76.352] },
    { id: "koc-tripunithura", name: "Tripunithura", pos: [9.945, 76.347] },
    { id: "koc-mgroad", name: "MG Road", pos: [9.981, 76.283] },
    { id: "koc-palarivattom", name: "Palarivattom", pos: [9.997, 76.307] },
    { id: "koc-kaloor", name: "Kaloor", pos: [9.993, 76.296] },
  ],
  routes: [
    { id: "koc-1", number: "1", name: "Aluva → Fort Kochi", operator: "KSRTC", color: C.indigo, stops: ["koc-aluva", "koc-edappally", "koc-mgroad", "koc-fortkochi"], headwayMin: 11, speedKmph: 23, firstBus: "05:30", lastBus: "22:30", fare: 24 },
    { id: "koc-s1", number: "S-1", name: "Vyttila → Kakkanad", operator: "KSRTC", color: C.emerald, stops: ["koc-vyttila", "koc-palarivattom", "koc-kakkanad"], headwayMin: 12, speedKmph: 22, firstBus: "06:00", lastBus: "22:00", fare: 16 },
    { id: "koc-5", number: "5", name: "Ernakulam → Tripunithura", operator: "KSRTC", color: C.orange, stops: ["koc-ernakulam", "koc-vyttila", "koc-tripunithura"], headwayMin: 13, speedKmph: 21, firstBus: "06:00", lastBus: "21:45", fare: 18 },
    { id: "koc-12", number: "12", name: "Edappally → MG Road", operator: "KSRTC", color: C.rose, stops: ["koc-edappally", "koc-palarivattom", "koc-kaloor", "koc-mgroad"], headwayMin: 14, speedKmph: 22, firstBus: "06:00", lastBus: "21:30", fare: 15 },
  ],
};

// ---------------------------------------------------------------------------
// Patna — BSRTC
// ---------------------------------------------------------------------------
const patna: City = {
  id: "pat", name: "Patna", operator: "BSRTC", center: [25.5941, 85.1376], zoom: 12,
  stops: [
    { id: "pat-junction", name: "Patna Junction", pos: [25.602, 85.141] },
    { id: "pat-gandhimaidan", name: "Gandhi Maidan", pos: [25.613, 85.144] },
    { id: "pat-baileyroad", name: "Bailey Road", pos: [25.609, 85.129] },
    { id: "pat-kankarbagh", name: "Kankarbagh", pos: [25.587, 85.164] },
    { id: "pat-rajendranagar", name: "Rajendra Nagar", pos: [25.606, 85.164] },
    { id: "pat-danapur", name: "Danapur", pos: [25.636, 85.047] },
    { id: "pat-patliputra", name: "Patliputra", pos: [25.615, 85.11] },
    { id: "pat-boringroad", name: "Boring Road", pos: [25.619, 85.117] },
    { id: "pat-rajivnagar", name: "Rajiv Nagar", pos: [25.623, 85.096] },
    { id: "pat-mithapur", name: "Mithapur", pos: [25.587, 85.138] },
  ],
  routes: [
    { id: "pat-1", number: "1", name: "Patna Jn → Danapur", operator: "BSRTC", color: C.indigo, stops: ["pat-junction", "pat-baileyroad", "pat-patliputra", "pat-danapur"], headwayMin: 11, speedKmph: 22, firstBus: "06:00", lastBus: "22:00", fare: 20 },
    { id: "pat-5", number: "5", name: "Gandhi Maidan → Kankarbagh", operator: "BSRTC", color: C.emerald, stops: ["pat-gandhimaidan", "pat-junction", "pat-kankarbagh"], headwayMin: 12, speedKmph: 21, firstBus: "06:00", lastBus: "21:45", fare: 15 },
    { id: "pat-8", number: "8", name: "Patna Jn → Rajendra Nagar", operator: "BSRTC", color: C.orange, stops: ["pat-junction", "pat-mithapur", "pat-rajendranagar"], headwayMin: 13, speedKmph: 21, firstBus: "06:00", lastBus: "21:30", fare: 16 },
    { id: "pat-11", number: "11", name: "Danapur → Boring Road", operator: "BSRTC", color: C.rose, stops: ["pat-danapur", "pat-rajivnagar", "pat-boringroad"], headwayMin: 14, speedKmph: 22, firstBus: "06:00", lastBus: "21:30", fare: 18 },
  ],
};

// ---------------------------------------------------------------------------
// Bhubaneswar — Mo Bus (CRUT)
// ---------------------------------------------------------------------------
const bhubaneswar: City = {
  id: "bbsr", name: "Bhubaneswar", operator: "Mo Bus", center: [20.2961, 85.8245], zoom: 12,
  stops: [
    { id: "bbsr-mastercanteen", name: "Master Canteen", pos: [20.27, 85.843] },
    { id: "bbsr-baramunda", name: "Baramunda Bus Stand", pos: [20.287, 85.79] },
    { id: "bbsr-jaydevvihar", name: "Jaydev Vihar", pos: [20.298, 85.819] },
    { id: "bbsr-patia", name: "Patia (KIIT)", pos: [20.354, 85.819] },
    { id: "bbsr-oldtown", name: "Old Town (Lingaraj)", pos: [20.238, 85.833] },
    { id: "bbsr-khandagiri", name: "Khandagiri", pos: [20.258, 85.78] },
    { id: "bbsr-vanivihar", name: "Vani Vihar", pos: [20.287, 85.841] },
    { id: "bbsr-chandrasekharpur", name: "Chandrasekharpur", pos: [20.334, 85.819] },
    { id: "bbsr-saheednagar", name: "Saheed Nagar", pos: [20.287, 85.847] },
    { id: "bbsr-nayapalli", name: "Nayapalli", pos: [20.295, 85.805] },
  ],
  routes: [
    { id: "bbsr-10", number: "10", name: "Baramunda → Patia", operator: "Mo Bus", color: C.indigo, stops: ["bbsr-baramunda", "bbsr-jaydevvihar", "bbsr-chandrasekharpur", "bbsr-patia"], headwayMin: 10, speedKmph: 24, firstBus: "05:45", lastBus: "22:30", fare: 20 },
    { id: "bbsr-11", number: "11", name: "Master Canteen → Khandagiri", operator: "Mo Bus", color: C.emerald, stops: ["bbsr-mastercanteen", "bbsr-baramunda", "bbsr-khandagiri"], headwayMin: 12, speedKmph: 22, firstBus: "06:00", lastBus: "22:00", fare: 16 },
    { id: "bbsr-20", number: "20", name: "Old Town → Vani Vihar", operator: "Mo Bus", color: C.orange, stops: ["bbsr-oldtown", "bbsr-mastercanteen", "bbsr-vanivihar"], headwayMin: 13, speedKmph: 21, firstBus: "06:00", lastBus: "21:45", fare: 15 },
    { id: "bbsr-30", number: "30", name: "Nayapalli → KIIT", operator: "Mo Bus", color: C.rose, stops: ["bbsr-nayapalli", "bbsr-jaydevvihar", "bbsr-patia"], headwayMin: 14, speedKmph: 23, firstBus: "06:00", lastBus: "21:30", fare: 18 },
  ],
};

// ---------------------------------------------------------------------------
// Chandigarh — CTU
// ---------------------------------------------------------------------------
const chandigarh: City = {
  id: "chd", name: "Chandigarh", operator: "CTU", center: [30.7333, 76.7794], zoom: 12,
  stops: [
    { id: "chd-isbt17", name: "ISBT Sector 17", pos: [30.741, 76.782] },
    { id: "chd-isbt43", name: "ISBT Sector 43", pos: [30.718, 76.76] },
    { id: "chd-sector22", name: "Sector 22", pos: [30.734, 76.778] },
    { id: "chd-pgi", name: "PGI", pos: [30.764, 76.775] },
    { id: "chd-sector35", name: "Sector 35", pos: [30.727, 76.766] },
    { id: "chd-manimajra", name: "Manimajra", pos: [30.725, 76.835] },
    { id: "chd-pu", name: "Panjab University", pos: [30.76, 76.766] },
    { id: "chd-industrial", name: "Industrial Area", pos: [30.706, 76.805] },
    { id: "chd-sector8", name: "Sector 8", pos: [30.747, 76.796] },
    { id: "chd-mohali", name: "Mohali (Phase 7)", pos: [30.705, 76.705] },
  ],
  routes: [
    { id: "chd-1", number: "1", name: "ISBT-17 → PGI", operator: "CTU", color: C.indigo, stops: ["chd-isbt17", "chd-sector22", "chd-pu", "chd-pgi"], headwayMin: 10, speedKmph: 24, firstBus: "05:45", lastBus: "22:30", fare: 15 },
    { id: "chd-5", number: "5", name: "ISBT-43 → Manimajra", operator: "CTU", color: C.emerald, stops: ["chd-isbt43", "chd-sector35", "chd-isbt17", "chd-manimajra"], headwayMin: 12, speedKmph: 23, firstBus: "06:00", lastBus: "22:00", fare: 15 },
    { id: "chd-13", number: "13", name: "Mohali → ISBT-17", operator: "CTU", color: C.orange, stops: ["chd-mohali", "chd-industrial", "chd-isbt17"], headwayMin: 13, speedKmph: 22, firstBus: "06:00", lastBus: "21:45", fare: 18 },
    { id: "chd-20", number: "20", name: "PGI → Industrial Area", operator: "CTU", color: C.rose, stops: ["chd-pgi", "chd-sector8", "chd-industrial"], headwayMin: 14, speedKmph: 22, firstBus: "06:00", lastBus: "21:30", fare: 15 },
  ],
};

export const CITIES: City[] = [
  bengaluru,
  delhi,
  mumbai,
  chennai,
  hyderabad,
  coimbatore,
  pune,
  jaipur,
  lucknow,
  nagpur,
  indore,
  bhopal,
  visakhapatnam,
  surat,
  kochi,
  patna,
  bhubaneswar,
  chandigarh,
];

export function getCity(id: string): City {
  return CITIES.find((c) => c.id === id) ?? CITIES[0];
}
