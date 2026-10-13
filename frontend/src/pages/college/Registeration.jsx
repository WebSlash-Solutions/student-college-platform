import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const PENDING_COLLEGE_KEY = "campusconnect_pending_college_registration";
const COLLEGE_ACCOUNTS_KEY = "campusconnect_college_accounts";
const COLLEGE_SAVED_KEY = "campusconnect_custom_colleges";
const COLLEGE_LOGIN_KEY = "campusconnect_college_session";

const hashPassword = async (password) => {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
};

/* =========================
   INDIAN STATES
========================= */

const indianStates = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

/* =========================
   DISTRICTS
   KEEP YOUR CURRENT FULL
   districtsByState OBJECT HERE
========================= */

const districtsByState = {
  "Andaman and Nicobar Islands": [
    "Nicobar",
    "North and Middle Andaman",
    "South Andaman",
  ],

  "Andhra Pradesh": [
    "Alluri Sitharama Raju",
    "Anakapalli",
    "Ananthapuramu",
    "Annamayya",
    "Bapatla",
    "Chittoor",
    "Dr. B. R. Ambedkar Konaseema",
    "East Godavari",
    "Eluru",
    "Guntur",
    "Kakinada",
    "Krishna",
    "Kurnool",
    "Nandyal",
    "NTR",
    "Palnadu",
    "Parvathipuram Manyam",
    "Prakasam",
    "Srikakulam",
    "Sri Potti Sriramulu Nellore",
    "Sri Sathya Sai",
    "Tirupati",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "YSR Kadapa",
  ],

  "Arunachal Pradesh": [
    "Anjaw",
    "Bichom",
    "Changlang",
    "Dibang Valley",
    "East Kameng",
    "East Siang",
    "Itanagar Capital Complex",
    "Kamle",
    "Keyi Panyor",
    "Kra Daadi",
    "Kurung Kumey",
    "Lepa Rada",
    "Lohit",
    "Longding",
    "Lower Dibang Valley",
    "Lower Siang",
    "Lower Subansiri",
    "Namsai",
    "Pakke Kessang",
    "Papum Pare",
    "Shi Yomi",
    "Siang",
    "Tawang",
    "Tirap",
    "Upper Siang",
    "Upper Subansiri",
    "West Kameng",
    "West Siang",
  ],

  Assam: [
    "Baksa",
    "Bajali",
    "Barpeta",
    "Biswanath",
    "Bongaigaon",
    "Cachar",
    "Charaideo",
    "Chirang",
    "Darrang",
    "Dhemaji",
    "Dhubri",
    "Dibrugarh",
    "Dima Hasao",
    "Goalpara",
    "Golaghat",
    "Hailakandi",
    "Hojai",
    "Jorhat",
    "Kamrup",
    "Kamrup Metropolitan",
    "Karbi Anglong",
    "Karimganj",
    "Kokrajhar",
    "Lakhimpur",
    "Majuli",
    "Morigaon",
    "Nagaon",
    "Nalbari",
    "Sivasagar",
    "Sonitpur",
    "South Salmara-Mankachar",
    "Tamulpur",
    "Tinsukia",
    "Udalguri",
    "West Karbi Anglong",
  ],

  Bihar: [
    "Araria",
    "Arwal",
    "Aurangabad",
    "Banka",
    "Begusarai",
    "Bhagalpur",
    "Bhojpur",
    "Buxar",
    "Darbhanga",
    "East Champaran",
    "Gaya",
    "Gopalganj",
    "Jamui",
    "Jehanabad",
    "Kaimur",
    "Katihar",
    "Khagaria",
    "Kishanganj",
    "Lakhisarai",
    "Madhepura",
    "Madhubani",
    "Munger",
    "Muzaffarpur",
    "Nalanda",
    "Nawada",
    "Patna",
    "Purnia",
    "Rohtas",
    "Saharsa",
    "Samastipur",
    "Saran",
    "Sheikhpura",
    "Sheohar",
    "Sitamarhi",
    "Siwan",
    "Supaul",
    "Vaishali",
    "West Champaran",
  ],

  Chandigarh: ["Chandigarh"],

  Chhattisgarh: [
    "Balod",
    "Baloda Bazar",
    "Balrampur-Ramanujganj",
    "Bastar",
    "Bemetara",
    "Bijapur",
    "Bilaspur",
    "Dantewada",
    "Dhamtari",
    "Durg",
    "Gariaband",
    "Gaurela-Pendra-Marwahi",
    "Janjgir-Champa",
    "Jashpur",
    "Kabirdham",
    "Kanker",
    "Khairagarh-Chhuikhadan-Gandai",
    "Kondagaon",
    "Korba",
    "Korea",
    "Mahasamund",
    "Manendragarh-Chirmiri-Bharatpur",
    "Mohla-Manpur-Ambagarh Chowki",
    "Mungeli",
    "Narayanpur",
    "Raigarh",
    "Raipur",
    "Rajnandgaon",
    "Sakti",
    "Sarangarh-Bilaigarh",
    "Sukma",
    "Surajpur",
    "Surguja",
  ],

  "Dadra and Nagar Haveli and Daman and Diu": [
    "Dadra and Nagar Haveli",
    "Daman",
    "Diu",
  ],

  Delhi: [
    "Central Delhi",
    "East Delhi",
    "New Delhi",
    "North Delhi",
    "North East Delhi",
    "North West Delhi",
    "Shahdara",
    "South Delhi",
    "South East Delhi",
    "South West Delhi",
    "West Delhi",
  ],

  Goa: ["North Goa", "South Goa"],

  Gujarat: [
    "Ahmedabad",
    "Amreli",
    "Anand",
    "Aravalli",
    "Banaskantha",
    "Bharuch",
    "Bhavnagar",
    "Botad",
    "Chhota Udaipur",
    "Dahod",
    "Dang",
    "Devbhumi Dwarka",
    "Gandhinagar",
    "Gir Somnath",
    "Jamnagar",
    "Junagadh",
    "Kheda",
    "Kutch",
    "Mahisagar",
    "Mehsana",
    "Morbi",
    "Narmada",
    "Navsari",
    "Panchmahal",
    "Patan",
    "Porbandar",
    "Rajkot",
    "Sabarkantha",
    "Surat",
    "Surendranagar",
    "Tapi",
    "Vadodara",
    "Valsad",
  ],

  Haryana: [
    "Ambala",
    "Bhiwani",
    "Charkhi Dadri",
    "Faridabad",
    "Fatehabad",
    "Gurugram",
    "Hisar",
    "Jhajjar",
    "Jind",
    "Kaithal",
    "Karnal",
    "Kurukshetra",
    "Mahendragarh",
    "Nuh",
    "Palwal",
    "Panchkula",
    "Panipat",
    "Rewari",
    "Rohtak",
    "Sirsa",
    "Sonipat",
    "Yamunanagar",
  ],

  "Himachal Pradesh": [
    "Bilaspur",
    "Chamba",
    "Hamirpur",
    "Kangra",
    "Kinnaur",
    "Kullu",
    "Lahaul and Spiti",
    "Mandi",
    "Shimla",
    "Sirmaur",
    "Solan",
    "Una",
  ],

  "Jammu and Kashmir": [
    "Anantnag",
    "Bandipora",
    "Baramulla",
    "Budgam",
    "Doda",
    "Ganderbal",
    "Jammu",
    "Kathua",
    "Kishtwar",
    "Kulgam",
    "Kupwara",
    "Poonch",
    "Pulwama",
    "Rajouri",
    "Ramban",
    "Reasi",
    "Samba",
    "Shopian",
    "Srinagar",
    "Udhampur",
  ],

  Jharkhand: [
    "Bokaro",
    "Chatra",
    "Deoghar",
    "Dhanbad",
    "Dumka",
    "East Singhbhum",
    "Garhwa",
    "Giridih",
    "Godda",
    "Gumla",
    "Hazaribagh",
    "Jamtara",
    "Khunti",
    "Koderma",
    "Latehar",
    "Lohardaga",
    "Pakur",
    "Palamu",
    "Ramgarh",
    "Ranchi",
    "Sahebganj",
    "Seraikela Kharsawan",
    "Simdega",
    "West Singhbhum",
  ],

  Karnataka: [
    "Bagalkot",
    "Ballari",
    "Belagavi",
    "Bengaluru Rural",
    "Bengaluru Urban",
    "Bidar",
    "Chamarajanagar",
    "Chikkaballapur",
    "Chikkamagaluru",
    "Chitradurga",
    "Dakshina Kannada",
    "Davanagere",
    "Dharwad",
    "Gadag",
    "Hassan",
    "Haveri",
    "Kalaburagi",
    "Kodagu",
    "Kolar",
    "Koppal",
    "Mandya",
    "Mysuru",
    "Raichur",
    "Ramanagara",
    "Shivamogga",
    "Tumakuru",
    "Udupi",
    "Uttara Kannada",
    "Vijayapura",
    "Vijayanagara",
    "Yadgir",
  ],

  Kerala: [
    "Alappuzha",
    "Ernakulam",
    "Idukki",
    "Kannur",
    "Kasaragod",
    "Kollam",
    "Kottayam",
    "Kozhikode",
    "Malappuram",
    "Palakkad",
    "Pathanamthitta",
    "Thiruvananthapuram",
    "Thrissur",
    "Wayanad",
  ],

  Ladakh: ["Kargil", "Leh"],

  Lakshadweep: ["Lakshadweep"],

  "Madhya Pradesh": [
    "Agar Malwa",
    "Alirajpur",
    "Anuppur",
    "Ashoknagar",
    "Balaghat",
    "Barwani",
    "Betul",
    "Bhind",
    "Bhopal",
    "Burhanpur",
    "Chhatarpur",
    "Chhindwara",
    "Damoh",
    "Datia",
    "Dewas",
    "Dhar",
    "Dindori",
    "Guna",
    "Gwalior",
    "Harda",
    "Indore",
    "Jabalpur",
    "Jhabua",
    "Katni",
    "Khandwa",
    "Khargone",
    "Maihar",
    "Mandla",
    "Mandsaur",
    "Mauganj",
    "Morena",
    "Narmadapuram",
    "Narsinghpur",
    "Neemuch",
    "Niwari",
    "Panna",
    "Raisen",
    "Rajgarh",
    "Ratlam",
    "Rewa",
    "Sagar",
    "Satna",
    "Sehore",
    "Seoni",
    "Shahdol",
    "Shajapur",
    "Sheopur",
    "Shivpuri",
    "Sidhi",
    "Singrauli",
    "Tikamgarh",
    "Ujjain",
    "Umaria",
    "Vidisha",
  ],

  Maharashtra: [
    "Ahmednagar",
    "Akola",
    "Amravati",
    "Beed",
    "Bhandara",
    "Buldhana",
    "Chandrapur",
    "Chhatrapati Sambhajinagar",
    "Dharashiv",
    "Dhule",
    "Gadchiroli",
    "Gondia",
    "Hingoli",
    "Jalgaon",
    "Jalna",
    "Kolhapur",
    "Latur",
    "Mumbai City",
    "Mumbai Suburban",
    "Nagpur",
    "Nanded",
    "Nandurbar",
    "Nashik",
    "Palghar",
    "Parbhani",
    "Pune",
    "Raigad",
    "Ratnagiri",
    "Sangli",
    "Satara",
    "Sindhudurg",
    "Solapur",
    "Thane",
    "Wardha",
    "Washim",
    "Yavatmal",
  ],

  Manipur: [
    "Bishnupur",
    "Chandel",
    "Churachandpur",
    "Imphal East",
    "Imphal West",
    "Jiribam",
    "Kakching",
    "Kamjong",
    "Kangpokpi",
    "Noney",
    "Pherzawl",
    "Senapati",
    "Tamenglong",
    "Tengnoupal",
    "Thoubal",
    "Ukhrul",
  ],

  Meghalaya: [
    "East Garo Hills",
    "East Jaintia Hills",
    "East Khasi Hills",
    "Eastern West Khasi Hills",
    "North Garo Hills",
    "Ri Bhoi",
    "South Garo Hills",
    "South West Garo Hills",
    "South West Khasi Hills",
    "West Garo Hills",
    "West Jaintia Hills",
    "West Khasi Hills",
  ],

  Mizoram: [
    "Aizawl",
    "Champhai",
    "Hnahthial",
    "Khawzawl",
    "Kolasib",
    "Lawngtlai",
    "Lunglei",
    "Mamit",
    "Saiha",
    "Saitual",
    "Serchhip",
  ],

  Nagaland: [
    "Chumoukedima",
    "Dimapur",
    "Kiphire",
    "Kohima",
    "Longleng",
    "Mokokchung",
    "Mon",
    "Niuland",
    "Noklak",
    "Peren",
    "Phek",
    "Shamator",
    "Tuensang",
    "Wokha",
    "Zunheboto",
  ],

  Odisha: [
    "Angul",
    "Balangir",
    "Balasore",
    "Bargarh",
    "Bhadrak",
    "Boudh",
    "Cuttack",
    "Deogarh",
    "Dhenkanal",
    "Gajapati",
    "Ganjam",
    "Jagatsinghpur",
    "Jajpur",
    "Jharsuguda",
    "Kalahandi",
    "Kandhamal",
    "Kendrapara",
    "Kendujhar",
    "Khordha",
    "Koraput",
    "Malkangiri",
    "Mayurbhanj",
    "Nabarangpur",
    "Nayagarh",
    "Nuapada",
    "Puri",
    "Rayagada",
    "Sambalpur",
    "Subarnapur",
    "Sundargarh",
  ],

  Puducherry: [
    "Karaikal",
    "Mahe",
    "Puducherry",
    "Yanam",
  ],

  Punjab: [
    "Amritsar",
    "Barnala",
    "Bathinda",
    "Faridkot",
    "Fatehgarh Sahib",
    "Fazilka",
    "Ferozepur",
    "Gurdaspur",
    "Hoshiarpur",
    "Jalandhar",
    "Kapurthala",
    "Ludhiana",
    "Malerkotla",
    "Mansa",
    "Moga",
    "Muktsar",
    "Pathankot",
    "Patiala",
    "Rupnagar",
    "Sahibzada Ajit Singh Nagar",
    "Sangrur",
    "Shaheed Bhagat Singh Nagar",
    "Tarn Taran",
  ],

  Rajasthan: [
    "Ajmer",
    "Alwar",
    "Anupgarh",
    "Balotra",
    "Banswara",
    "Baran",
    "Barmer",
    "Beawar",
    "Bharatpur",
    "Bhilwara",
    "Bikaner",
    "Bundi",
    "Chittorgarh",
    "Churu",
    "Dausa",
    "Deeg",
    "Dholpur",
    "Didwana-Kuchaman",
    "Dudu",
    "Dungarpur",
    "Ganganagar",
    "Gangapur City",
    "Hanumangarh",
    "Jaipur",
    "Jaisalmer",
    "Jalore",
    "Jhalawar",
    "Jhunjhunu",
    "Jodhpur",
    "Karauli",
    "Khairthal-Tijara",
    "Kota",
    "Kotputli-Behror",
    "Nagaur",
    "Neem Ka Thana",
    "Pali",
    "Phalodi",
    "Pratapgarh",
    "Rajsamand",
    "Salumbar",
    "Sawai Madhopur",
    "Shahpura",
    "Sikar",
    "Sirohi",
    "Tonk",
    "Udaipur",
  ],

  Sikkim: [
    "Gangtok",
    "Gyalshing",
    "Mangan",
    "Namchi",
    "Pakyong",
    "Soreng",
  ],

  "Tamil Nadu": [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kancheepuram",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Namakkal",
    "Nilgiris",
    "Perambalur",
    "Pudukkottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivaganga",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thoothukudi",
    "Tiruchirappalli",
    "Tirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvallur",
    "Tiruvarur",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ],

  Telangana: [
    "Adilabad",
    "Bhadradri Kothagudem",
    "Hanamkonda",
    "Hyderabad",
    "Jagtial",
    "Jangaon",
    "Jayashankar Bhupalapally",
    "Jogulamba Gadwal",
    "Kamareddy",
    "Karimnagar",
    "Khammam",
    "Komaram Bheem Asifabad",
    "Mahabubabad",
    "Mahbubnagar",
    "Mancherial",
    "Medak",
    "Medchal-Malkajgiri",
    "Mulugu",
    "Nagarkurnool",
    "Nalgonda",
    "Narayanpet",
    "Nirmal",
    "Nizamabad",
    "Peddapalli",
    "Rajanna Sircilla",
    "Rangareddy",
    "Sangareddy",
    "Siddipet",
    "Suryapet",
    "Vikarabad",
    "Wanaparthy",
    "Warangal",
    "Yadadri Bhuvanagiri",
  ],

  Tripura: [
    "Dhalai",
    "Gomati",
    "Khowai",
    "North Tripura",
    "Sepahijala",
    "South Tripura",
    "Unakoti",
    "West Tripura",
  ],

  "Uttar Pradesh": [
    "Agra",
    "Aligarh",
    "Ambedkar Nagar",
    "Amethi",
    "Amroha",
    "Auraiya",
    "Ayodhya",
    "Azamgarh",
    "Baghpat",
    "Bahraich",
    "Ballia",
    "Balrampur",
    "Banda",
    "Barabanki",
    "Bareilly",
    "Basti",
    "Bhadohi",
    "Bijnor",
    "Budaun",
    "Bulandshahr",
    "Chandauli",
    "Chitrakoot",
    "Deoria",
    "Etah",
    "Etawah",
    "Farrukhabad",
    "Fatehpur",
    "Firozabad",
    "Gautam Buddha Nagar",
    "Ghaziabad",
    "Ghazipur",
    "Gonda",
    "Gorakhpur",
    "Hamirpur",
    "Hapur",
    "Hardoi",
    "Hathras",
    "Jalaun",
    "Jaunpur",
    "Jhansi",
    "Kannauj",
    "Kanpur Dehat",
    "Kanpur Nagar",
    "Kasganj",
    "Kaushambi",
    "Kheri",
    "Kushinagar",
    "Lalitpur",
    "Lucknow",
    "Maharajganj",
    "Mahoba",
    "Mainpuri",
    "Mathura",
    "Mau",
    "Meerut",
    "Mirzapur",
    "Moradabad",
    "Muzaffarnagar",
    "Pilibhit",
    "Pratapgarh",
    "Prayagraj",
    "Raebareli",
    "Rampur",
    "Saharanpur",
    "Sambhal",
    "Sant Kabir Nagar",
    "Shahjahanpur",
    "Shamli",
    "Shravasti",
    "Siddharthnagar",
    "Sitapur",
    "Sonbhadra",
    "Sultanpur",
    "Unnao",
    "Varanasi",
  ],

  Uttarakhand: [
    "Almora",
    "Bageshwar",
    "Chamoli",
    "Champawat",
    "Dehradun",
    "Haridwar",
    "Nainital",
    "Pauri Garhwal",
    "Pithoragarh",
    "Rudraprayag",
    "Tehri Garhwal",
    "Udham Singh Nagar",
    "Uttarkashi",
  ],

  "West Bengal": [
    "Alipurduar",
    "Bankura",
    "Birbhum",
    "Cooch Behar",
    "Dakshin Dinajpur",
    "Darjeeling",
    "Hooghly",
    "Howrah",
    "Jalpaiguri",
    "Jhargram",
    "Kalimpong",
    "Kolkata",
    "Maldah",
    "Murshidabad",
    "Nadia",
    "North 24 Parganas",
    "Paschim Bardhaman",
    "Paschim Medinipur",
    "Purba Bardhaman",
    "Purba Medinipur",
    "Purulia",
    "South 24 Parganas",
    "Uttar Dinajpur",
  ],
};

/* =========================
   HELPERS
========================= */

const getDomain = (website) =>
  (website || "")
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split("/")[0];

const normalizeUrl = (value) => {
  const url = (value || "").trim();
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};

// "Course | Duration | Fee" per line (or comma separated names) -> [[name, duration, fee]]
const parseCourses = (text, category, fees) => {
  const defaultDuration = category === "Engineering" ? "4 Years" : "3 Years";
  let raw = String(text || "").trim();
  if (!raw) return [];
  if (!raw.includes("\n") && !raw.includes("|") && raw.includes(",")) {
    raw = raw.split(",").join("\n");
  }
  return raw
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [name, duration, fee] = line.split("|").map((part) => part.trim());
      return [name, duration || defaultDuration, fee || fees || "Verify with college"];
    });
};

const fileToLogo = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const max = 160;
        const width = image.width || max;
        const height = image.height || max;
        const scale = Math.min(1, max / Math.max(width, height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(width * scale));
        canvas.height = Math.max(1, Math.round(height * scale));
        canvas.getContext("2d").drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/png"));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });

const emptyForm = {
  collegeName: "",
  officialEmail: "",
  mobile: "",
  collegeType: "",
  collegeCategory: "Engineering",
  affiliation: "",
  accreditation: "",
  registrationDetails: "",
  address: "",
  state: "",
  district: "",
  pincode: "",
  website: "",
  logoData: "",
  established: "",
  hostel: "",
  transportation: "",
  placement: "",
  fees: "",
  courses: "",
  password: "",
  confirmPassword: "",
};

/* =========================
   ICONS
========================= */

function GraduationIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden="true">
      <path
        d="M3 9.2L12 4l9 5.2-9 5.1L3 9.2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M7 11.6v4.2c0 1.4 2.2 3.2 5 3.2s5-1.8 5-3.2v-4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M21 9.5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <span className="feature-icon">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
        <path
          d="m6 12.5 4 4 8-9"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function EyeIcon({ off }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="22"
      height="22"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M4 4l16 16" />}
    </svg>
  );
}

/* Logo shown in the preview: uploaded logo -> website logo -> initials */
function LogoPreview({ name, website, logoData }) {
  const [index, setIndex] = useState(0);
  const domain = getDomain(website);

  const sources = [];
  if (logoData) sources.push({ src: logoData, min: 0 });
  if (domain) {
    sources.push({
      src: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
      min: 32,
    });
    sources.push({ src: `https://icons.duckduckgo.com/ip3/${domain}.ico`, min: 16 });
  }

  const initials =
    (name || "")
      .split(" ")
      .filter((word) => /[A-Za-z]/.test(word[0]))
      .slice(0, 2)
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "CC";

  const current = sources[index];
  if (!current) return <span className="logo-initials">{initials}</span>;

  return (
    <img
      key={current.src}
      src={current.src}
      alt=""
      referrerPolicy="no-referrer"
      onError={() => setIndex((value) => value + 1)}
      onLoad={(event) => {
        if (event.currentTarget.naturalWidth < current.min) {
          setIndex((value) => value + 1);
        }
      }}
    />
  );
}

function Field({ id, label, required, full, hint, children }) {
  return (
    <div className={full ? "form-group full" : "form-group"}>
      <label htmlFor={id}>
        {label}
        {required && <span className="required"> *</span>}
      </label>
      {children}
      {hint && <p className="field-hint">{hint}</p>}
    </div>
  );
}

function PasswordInput({ id, name, value, onChange, placeholder, autoComplete }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="password-wrap">
      <input
        id={id}
        name={name}
        type={visible ? "text" : "password"}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
      />
      <button
        type="button"
        className="password-toggle"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
      >
        <EyeIcon off={visible} />
      </button>
    </div>
  );
}

function Select({ id, name, value, onChange, disabled, children }) {
  return (
    <div className="select-wrapper">
      <select id={id} name={name} value={value} onChange={onChange} disabled={disabled}>
        {children}
      </select>
      <span className="select-arrow" />
    </div>
  );
}

/* =========================
   COMPONENT
========================= */

function Registeration() {
  const navigate = useNavigate();
  const noticeRef = useRef(null);

  const [showLogin, setShowLogin] = useState(
    () => new URLSearchParams(window.location.search).get("mode") === "login"
  );
  const [formData, setFormData] = useState(emptyForm);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [notice, setNotice] = useState(null); // { type: "error" | "success", text }
  const [logoBusy, setLogoBusy] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (notice && noticeRef.current) {
      noticeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [notice]);

  const switchMode = (login) => {
    setNotice(null);
    setShowLogin(login);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      setFormData((prev) => ({ ...prev, state: value, district: "" }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogo = async (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setNotice({ type: "error", text: "Please choose an image file (PNG or JPG) for the logo." });
      return;
    }
    setLogoBusy(true);
    try {
      const logoData = await fileToLogo(file);
      setFormData((prev) => ({ ...prev, logoData }));
    } catch {
      setNotice({ type: "error", text: "Could not read that image. Try a PNG or JPG file." });
    }
    setLogoBusy(false);
  };

  /* ---------- REGISTER ---------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotice(null);

    const requiredFields = [
      "collegeName",
      "officialEmail",
      "mobile",
      "address",
      "district",
      "state",
      "collegeType",
      "affiliation",
      "collegeCategory",
      "password",
      "confirmPassword",
    ];

    const missingField = requiredFields.find(
      (field) => !String(formData[field] || "").trim()
    );

    if (missingField) {
      setNotice({ type: "error", text: "Please fill all the fields marked with *." });
      return;
    }

    const email = formData.officialEmail.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setNotice({ type: "error", text: "Enter a valid official email address." });
      return;
    }

    const mobileDigits = formData.mobile.replace(/\D/g, "");
    if (mobileDigits.length < 10) {
      setNotice({ type: "error", text: "Enter a valid 10-digit mobile number." });
      return;
    }

    if (formData.password.length < 6) {
      setNotice({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setNotice({ type: "error", text: "Password and confirm password do not match." });
      return;
    }

    let accounts = [];
    try {
      accounts = JSON.parse(localStorage.getItem(COLLEGE_ACCOUNTS_KEY) || "[]");
    } catch {
      accounts = [];
    }

    if (accounts.some((account) => account.email === email)) {
      setLoginData({ email, password: "" });
      setShowLogin(true);
      setNotice({
        type: "error",
        text: "This official email is already registered. Please log in.",
      });
      return;
    }

    setBusy(true);
    try {
      const passwordHash = await hashPassword(formData.password);

      const pendingRegistration = {
        ...formData,
        mobile: mobileDigits.slice(-10),
        website: normalizeUrl(formData.website),
        officialEmail: email,
        password: undefined,
        confirmPassword: undefined,
        passwordHash,
        registeredAt: new Date().toISOString(),
      };

      localStorage.setItem(PENDING_COLLEGE_KEY, JSON.stringify(pendingRegistration));
    } catch {
      setBusy(false);
      setNotice({
        type: "error",
        text: "Could not save your details. Check browser storage and try again.",
      });
      return;
    }
    setBusy(false);

    setLoginData({ email, password: "" });
    setShowLogin(true);
    setNotice({
      type: "success",
      text: "Details saved. Log in once with your password to publish your college profile.",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ---------- LOGIN ---------- */

  const handleLogin = async (e) => {
    e.preventDefault();
    setNotice(null);

    const email = loginData.email.trim().toLowerCase();
    const password = loginData.password;

    if (!email || !password) {
      setNotice({ type: "error", text: "Enter your official email and password." });
      return;
    }

    setBusy(true);
    try {
      const passwordHash = await hashPassword(password);

      const accounts = JSON.parse(localStorage.getItem(COLLEGE_ACCOUNTS_KEY) || "[]");
      const pending = JSON.parse(localStorage.getItem(PENDING_COLLEGE_KEY) || "null");

      let account = accounts.find((item) => item.email === email);

      // A newly registered college is published only after its first successful login.
      if (!account && pending && pending.officialEmail === email) {
        if (pending.passwordHash !== passwordHash) {
          setBusy(false);
          setNotice({ type: "error", text: "Incorrect password. Please try again." });
          return;
        }

        account = {
          id: Date.now(),
          email,
          passwordHash,
          collegeName: pending.collegeName,
          registeredAt: pending.registeredAt,
        };

        localStorage.setItem(COLLEGE_ACCOUNTS_KEY, JSON.stringify([account, ...accounts]));

        const savedColleges = JSON.parse(localStorage.getItem(COLLEGE_SAVED_KEY) || "[]");

        const courses = parseCourses(pending.courses, pending.collegeCategory, pending.fees);

        const newCollege = {
          id: `registered-${account.id}`,
          name: pending.collegeName,
          category: pending.collegeCategory || "Other",
          location: `${pending.address}, ${pending.state}`.replace(/^, |, $/g, ""),
          district: pending.district,
          pincode: pending.pincode || "",
          established: pending.established || "",
          type: pending.collegeType,
          affiliation: pending.affiliation,
          accreditation: pending.accreditation || "Not available",
          ranking: "Not available",
          rankingLabel: "Recognition",
          counsellingCode: "",
          website: pending.website || "",
          logoData: pending.logoData || "",
          hostel: pending.hostel || "",
          transportation: pending.transportation || "",
          placement: pending.placement || "",
          fees: pending.fees || "",
          counselling: "College Admission",
          courses:
            courses.length > 0
              ? courses
              : [["Course details not added", "-", pending.fees || "Not added"]],
          scholarships: [
            "Government scholarships",
            "Merit scholarships",
            "Institutional financial assistance",
          ],
          placements: [
            "Placement information can be updated from Edit profile",
            "Career guidance",
            "Industry interaction",
          ],
          registeredAccountEmail: email,
        };

        const updatedSaved = [
          newCollege,
          ...savedColleges.filter((college) => college.registeredAccountEmail !== email),
        ];

        localStorage.setItem(COLLEGE_SAVED_KEY, JSON.stringify(updatedSaved));
        localStorage.removeItem(PENDING_COLLEGE_KEY);
      } else if (!account) {
        setBusy(false);
        setNotice({
          type: "error",
          text: "No college account found for this email. Please register first.",
        });
        return;
      } else if (account.passwordHash !== passwordHash) {
        setBusy(false);
        setNotice({ type: "error", text: "Incorrect email or password." });
        return;
      }

      localStorage.setItem(
        COLLEGE_LOGIN_KEY,
        JSON.stringify({
          id: account.id,
          email: account.email,
          collegeName: account.collegeName,
          loggedInAt: new Date().toISOString(),
        })
      );
    } catch {
      setBusy(false);
      setNotice({ type: "error", text: "Something went wrong while logging in. Try again." });
      return;
    }

    setBusy(false);
    navigate("/college/profile");
  };

  const availableDistricts = formData.state ? districtsByState[formData.state] || [] : [];

  const noticeBox = notice && (
    <div
      ref={noticeRef}
      className={`notice notice-${notice.type}`}
      role={notice.type === "error" ? "alert" : "status"}
    >
      {notice.text}
    </div>
  );

  return (
    <>
      <style>{styles}</style>

      <div className="college-register-page">
        {/* LEFT SIDE */}
        <aside className="college-register-left">
          <div className="left-content">
            <div className="brand">
              <div className="brand-icon">
                <GraduationIcon />
              </div>
              <div className="brand-name">CampusConnect</div>
            </div>

            <h2>Put your college in front of students who are searching.</h2>

            <p className="left-description">
              Register your institution, add your courses, fees and facilities, and
              students can find you by district and category.
            </p>

            {showLogin && (
              <div className="left-features">
                <div className="feature-item">
                  <CheckIcon />
                  <span>Build and manage your college profile</span>
                </div>
                <div className="feature-item">
                  <CheckIcon />
                  <span>Showcase your courses and fees to students</span>
                </div>
                <div className="feature-item">
                  <CheckIcon />
                  <span>Receive student enquiries and leads</span>
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* RIGHT SIDE */}
        <main className="college-register-right">
          {!showLogin ? (
            <div className="form-container">
              <div className="form-header">
                <h1>Register your college</h1>
                <p>
                  Create your college account and add the details students look for.
                  Fields marked * are required.
                </p>
                <div className="login-link">
                  Already registered?{" "}
                  <button type="button" onClick={() => switchMode(true)}>
                    Log in here
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                {/* 1. COLLEGE DETAILS */}
                <section className="form-section">
                  <div className="section-title">
                    <h3>College details</h3>
                  </div>
                  <div className="form-grid">
                    <Field id="collegeName" label="College name" required full>
                      <input
                        id="collegeName"
                        name="collegeName"
                        type="text"
                        value={formData.collegeName}
                        onChange={handleChange}
                        placeholder="Enter your college name"
                        autoComplete="organization"
                      />
                    </Field>

                    <Field id="officialEmail" label="Official email" required>
                      <input
                        id="officialEmail"
                        name="officialEmail"
                        type="email"
                        value={formData.officialEmail}
                        onChange={handleChange}
                        placeholder="admissions@college.edu.in"
                        autoComplete="email"
                      />
                    </Field>

                    <Field id="mobile" label="Mobile number" required>
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        inputMode="tel"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="10-digit mobile number"
                        autoComplete="tel"
                      />
                    </Field>

                    <Field id="collegeType" label="College type" required>
                      <Select
                        id="collegeType"
                        name="collegeType"
                        value={formData.collegeType}
                        onChange={handleChange}
                      >
                        <option value="">Select college type</option>
                        <option value="Government">Government</option>
                        <option value="Private">Private</option>
                        <option value="Autonomous">Autonomous</option>
                        <option value="Deemed University">Deemed University</option>
                        <option value="Government Aided">Government Aided</option>
                        <option value="Other">Other</option>
                      </Select>
                    </Field>

                    <Field id="collegeCategory" label="College category" required>
                      <Select
                        id="collegeCategory"
                        name="collegeCategory"
                        value={formData.collegeCategory}
                        onChange={handleChange}
                      >
                        <option value="Engineering">Engineering</option>
                        <option value="Arts & Science">Arts & Science</option>
                        <option value="Management">Management</option>
                        <option value="Medical">Medical</option>
                        <option value="Nursing">Nursing</option>
                        <option value="Physiotherapy">Physiotherapy</option>
                        <option value="Other">Other</option>
                      </Select>
                    </Field>

                    <Field id="affiliation" label="Affiliation" required>
                      <Select
                        id="affiliation"
                        name="affiliation"
                        value={formData.affiliation}
                        onChange={handleChange}
                      >
                        <option value="">Select affiliation</option>
                        <option value="AICTE">AICTE</option>
                        <option value="UGC">UGC</option>
                        <option value="Anna University">Anna University</option>
                        <option value="University of Madras">University of Madras</option>
                        <option value="Bharathiar University">Bharathiar University</option>
                        <option value="Bharathidasan University">Bharathidasan University</option>
                        <option value="Other University">Other University</option>
                      </Select>
                    </Field>

                    <Field id="accreditation" label="Accreditation">
                      <Select
                        id="accreditation"
                        name="accreditation"
                        value={formData.accreditation}
                        onChange={handleChange}
                      >
                        <option value="">Select accreditation</option>
                        <option value="NAAC A++">NAAC A++</option>
                        <option value="NAAC A+">NAAC A+</option>
                        <option value="NAAC A">NAAC A</option>
                        <option value="NAAC B++">NAAC B++</option>
                        <option value="NAAC B+">NAAC B+</option>
                        <option value="NBA">NBA</option>
                        <option value="NIRF">NIRF</option>
                        <option value="Not Accredited">Not Accredited</option>
                        <option value="Other">Other</option>
                      </Select>
                    </Field>

                    <Field id="registrationDetails" label="Registration details">
                      <input
                        id="registrationDetails"
                        name="registrationDetails"
                        type="text"
                        value={formData.registrationDetails}
                        onChange={handleChange}
                        placeholder="Registration / approval number"
                      />
                    </Field>
                  </div>
                </section>

                {/* 2. LOCATION + WEBSITE + LOGO */}
                <section className="form-section">
                  <div className="section-title">
                    <h3>Location, website and logo</h3>
                  </div>
                  <div className="form-grid">
                    <Field id="address" label="College address" required full>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Street, area, city"
                        autoComplete="street-address"
                      />
                    </Field>

                    <Field id="state" label="State" required>
                      <Select id="state" name="state" value={formData.state} onChange={handleChange}>
                        <option value="">Select state</option>
                        {indianStates.map((state) => (
                          <option key={state} value={state}>
                            {state}
                          </option>
                        ))}
                      </Select>
                    </Field>

                    <Field
                      id="district"
                      label="District"
                      required
                      hint={!formData.state ? "Select a state to choose the district." : ""}
                    >
                      <Select
                        id="district"
                        name="district"
                        value={formData.district}
                        onChange={handleChange}
                        disabled={!formData.state}
                      >
                        <option value="">
                          {formData.state ? "Select district" : "Select state first"}
                        </option>
                        {availableDistricts.map((district) => (
                          <option key={district} value={district}>
                            {district}
                          </option>
                        ))}
                      </Select>
                    </Field>

                    <Field id="pincode" label="Pincode">
                      <input
                        id="pincode"
                        name="pincode"
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="6-digit pincode"
                        autoComplete="postal-code"
                      />
                    </Field>

                    <Field id="website" label="Official website">
                      <input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://www.yourcollege.edu.in"
                      />
                    </Field>

                    <div className="form-group full">
                      <label>College logo</label>
                      <div className="logo-upload">
                        <div className="logo-box">
                          <LogoPreview
                            key={`${formData.website}-${formData.logoData.length}`}
                            name={formData.collegeName}
                            website={formData.website}
                            logoData={formData.logoData}
                          />
                        </div>
                        <div className="logo-actions">
                          <label className="file-btn">
                            {logoBusy
                              ? "Reading image..."
                              : formData.logoData
                              ? "Change logo"
                              : "Upload logo"}
                            <input type="file" accept="image/*" onChange={handleLogo} />
                          </label>
                          {formData.logoData && (
                            <button
                              type="button"
                              className="text-btn"
                              onClick={() => setFormData((prev) => ({ ...prev, logoData: "" }))}
                            >
                              Remove uploaded logo
                            </button>
                          )}
                          <p className="field-hint">
                            No upload? We use the logo from your website, or your college
                            initials if none is found.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. PROFILE DETAILS */}
                <section className="form-section">
                  <div className="section-title">
                    <h3>Profile details students see</h3>
                  </div>
                  <div className="form-grid">
                    <Field id="established" label="Established year">
                      <input
                        id="established"
                        name="established"
                        type="text"
                        inputMode="numeric"
                        maxLength={4}
                        value={formData.established}
                        onChange={handleChange}
                        placeholder="e.g. 1998"
                      />
                    </Field>

                    <Field id="hostel" label="Hostel">
                      <Select id="hostel" name="hostel" value={formData.hostel} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                      </Select>
                    </Field>

                    <Field id="transportation" label="Transportation">
                      <Select
                        id="transportation"
                        name="transportation"
                        value={formData.transportation}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                      </Select>
                    </Field>

                    <Field id="placement" label="Placement support">
                      <Select
                        id="placement"
                        name="placement"
                        value={formData.placement}
                        onChange={handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Available">Available</option>
                        <option value="Not Available">Not Available</option>
                      </Select>
                    </Field>

                    <Field id="fees" label="Annual fee (approx.)" full>
                      <input
                        id="fees"
                        name="fees"
                        type="text"
                        value={formData.fees}
                        onChange={handleChange}
                        placeholder="e.g. ₹80,000 – ₹1,20,000"
                      />
                    </Field>

                    <Field
                      id="courses"
                      label="Courses offered"
                      full
                      hint="One course per line. Format: Course | Duration | Annual fee (duration and fee are optional)."
                    >
                      <textarea
                        id="courses"
                        name="courses"
                        value={formData.courses}
                        onChange={handleChange}
                        placeholder={"B.E. Computer Science | 4 Years | ₹1,10,000\nB.Tech Information Technology | 4 Years | ₹1,00,000"}
                      />
                    </Field>
                  </div>
                </section>

                {/* 4. ACCOUNT */}
                <section className="form-section">
                  <div className="section-title">
                    <h3>Create your account</h3>
                  </div>
                  <div className="form-grid">
                    <Field id="collegePassword" label="Password" required>
                      <PasswordInput
                        id="collegePassword"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="At least 6 characters"
                        autoComplete="new-password"
                      />
                    </Field>
                    <Field id="collegeConfirmPassword" label="Confirm password" required>
                      <PasswordInput
                        id="collegeConfirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Re-enter password"
                        autoComplete="new-password"
                      />
                    </Field>
                  </div>
                </section>

                {noticeBox}

                <div className="submit-area">
                  <button type="submit" className="submit-button" disabled={busy}>
                    {busy ? "Saving..." : "Register your college"}
                  </button>
                  <p className="verification-note">
                    You can update any detail later using Edit profile.
                  </p>
                </div>
              </form>
            </div>
          ) : (
            /* LOGIN */
            <div className="login-container">
              <div className="login-card">
                <div className="login-logo">
                  <GraduationIcon />
                </div>

                <h1>College login</h1>
                <p className="login-sub">
                  Sign in to manage your college profile and connect with students.
                </p>

                {noticeBox}

                <form className="login-form" onSubmit={handleLogin} noValidate>
                  <Field id="loginEmail" label="Official email">
                    <input
                      id="loginEmail"
                      type="email"
                      value={loginData.email}
                      onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter official email"
                      autoComplete="email"
                    />
                  </Field>

                  <Field id="loginPassword" label="Password">
                    <PasswordInput
                      id="loginPassword"
                      name="loginPassword"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData((prev) => ({ ...prev, password: e.target.value }))
                      }
                      placeholder="Enter password"
                      autoComplete="current-password"
                    />
                  </Field>

                  <button type="submit" className="submit-button" disabled={busy}>
                    {busy ? "Signing in..." : "Log in to dashboard"}
                  </button>
                </form>

                <button type="button" className="back-register" onClick={() => switchMode(false)}>
                  New here? Register your college
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

/* =========================
   STYLES
========================= */

const styles = `
@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");

* { box-sizing: border-box; }

html, body, #root { margin: 0; padding: 0; width: 100%; min-height: 100%; }

body {
  font-family: "Plus Jakarta Sans", Inter, system-ui, -apple-system, "Segoe UI", sans-serif;
  background: #f3f7fc;
  color: #0e2342;
}

button, input, select, textarea { font-family: inherit; }

#root {
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
  border: 0 !important;
  text-align: left !important;
  display: block !important;
  min-height: 100vh !important;
}

.college-register-page {
  --ink: #0e2342;
  --muted: #5a6f8a;
  --line: #cbd9ea;
  --blue: #1558d6;
  width: 100%;
  min-height: 100vh;
  display: flex;
  font-size: 17px;
  line-height: 1.5;
  background: #fff;
  color: var(--ink);
  text-align: left;
}

.college-register-page button:focus-visible,
.college-register-page input:focus-visible,
.college-register-page select:focus-visible,
.college-register-page textarea:focus-visible,
.college-register-page label:focus-within.file-btn {
  outline: 3px solid rgba(21, 88, 214, .45);
  outline-offset: 2px;
}

/* ---------- Left panel ---------- */
.college-register-left {
  width: 42%;
  min-width: 360px;
  height: 100vh;
  position: sticky;
  top: 0;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px clamp(28px, 4vw, 64px);
  color: #fff;
  background:
    radial-gradient(circle at 12% 15%, rgba(59, 130, 246, .28), transparent 34%),
    radial-gradient(circle at 90% 85%, rgba(37, 99, 235, .22), transparent 38%),
    linear-gradient(150deg, #06132b 0%, #0b2146 55%, #0f2f60 100%);
}

.left-content { width: 100%; max-width: 520px; }

.brand { display: flex; align-items: center; gap: 12px; margin-bottom: 40px; }

.brand-icon {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 12px;
  color: #fff;
  background: rgba(255, 255, 255, .12);
  border: 1px solid rgba(255, 255, 255, .18);
}

.brand-name {
  font-family: "Bricolage Grotesque", "Plus Jakarta Sans", sans-serif;
  font-size: 30px;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -.6px;
}

.left-content h2 {
  margin: 0 0 18px;
  font-family: "Bricolage Grotesque", "Plus Jakarta Sans", sans-serif;
  font-size: clamp(34px, 3.6vw, 52px);
  line-height: 1.08;
  letter-spacing: -1.4px;
  font-weight: 800;
}

.left-description {
  margin: 0;
  color: rgba(255, 255, 255, .8);
  font-size: 18px;
  line-height: 1.65;
}

.left-features { display: flex; flex-direction: column; gap: 12px; margin-top: 32px; }

.feature-item {
  min-height: 64px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 12px;
  background: rgba(255, 255, 255, .06);
  color: rgba(255, 255, 255, .93);
  font-size: 17px;
  font-weight: 600;
}

.feature-icon {
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  color: #cfe3ff;
  background: rgba(59, 130, 246, .3);
}

/* live preview card */
.preview-card {
  margin-top: 32px;
  padding: 20px;
  border-radius: 18px;
  background: #fff;
  color: var(--ink);
  box-shadow: 0 24px 50px rgba(0, 0, 0, .3);
}

.preview-title { margin: 0 0 14px; color: var(--muted); font-size: 15px; font-weight: 700; }
.preview-row { display: flex; gap: 14px; align-items: center; }

.preview-logo {
  width: 72px;
  height: 72px;
  flex: 0 0 auto;
  border-radius: 16px;
  border: 1px solid #dbe5f2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background: #fff;
}
.preview-logo img { width: 54px; height: 54px; object-fit: contain; }

.logo-initials {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #fff;
  background: var(--blue);
  font-family: "Bricolage Grotesque", sans-serif;
  font-size: 24px;
  font-weight: 800;
}

.preview-text { min-width: 0; display: flex; flex-direction: column; gap: 3px; }
.preview-text strong {
  font-family: "Bricolage Grotesque", "Plus Jakarta Sans", sans-serif;
  font-size: 21px;
  line-height: 1.2;
  overflow-wrap: anywhere;
}
.preview-chip {
  width: fit-content;
  padding: 2px 10px;
  border-radius: 7px;
  background: #e6efff;
  color: #1349c2;
  font-size: 14px;
  font-weight: 800;
}
.preview-place { color: var(--muted); font-size: 16px; }
.preview-facts { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.preview-facts span {
  padding: 5px 12px;
  border-radius: 99px;
  background: #eaf1fb;
  color: #274466;
  font-size: 15px;
  font-weight: 700;
}
.preview-facts .muted { background: transparent; padding: 0; color: #7a8ca3; font-weight: 500; }

/* ---------- Right panel ---------- */
.college-register-right {
  flex: 1 1 58%;
  width: 58%;
  min-width: 0;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
  scrollbar-width: thin;
  scrollbar-color: #c4d2e3 transparent;
}

.form-container {
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 52px clamp(20px, 4vw, 52px) 70px;
  text-align: left;
}

.form-header { margin: 0 0 36px; }
.form-header h1 {
  margin: 0;
  font-family: "Bricolage Grotesque", "Plus Jakarta Sans", sans-serif;
  font-size: clamp(34px, 3.6vw, 50px);
  line-height: 1.08;
  font-weight: 800;
  letter-spacing: -1.2px;
  color: var(--ink);
}
.form-header p { margin: 12px 0 0; max-width: 640px; color: var(--muted); font-size: 18px; line-height: 1.6; }
.login-link { margin-top: 14px; color: var(--muted); font-size: 17px; }
.login-link button {
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--blue);
  font-size: inherit;
  font-weight: 800;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.form-section { margin-bottom: 36px; }
.section-title { padding-bottom: 12px; margin-bottom: 22px; border-bottom: 2px solid #e3ebf5; }
.section-title h3 {
  margin: 0;
  font-family: "Bricolage Grotesque", "Plus Jakarta Sans", sans-serif;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -.3px;
}

.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px 20px; }
.form-grid-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.form-group { min-width: 0; display: flex; flex-direction: column; gap: 8px; }
.form-group.full { grid-column: 1 / -1; }

.form-group label { color: #243f60; font-size: 16px; font-weight: 700; }
.required { color: #d12a47; }

.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  min-height: 54px;
  padding: 0 16px;
  border: 1.5px solid var(--line);
  border-radius: 12px;
  background: #fff;
  color: var(--ink);
  font-size: 17px;
}
.form-group textarea { min-height: 150px; padding: 14px 16px; resize: vertical; line-height: 1.5; }
.form-group input::placeholder, .form-group textarea::placeholder { color: #8a9bb0; }
.form-group input:hover, .form-group select:hover, .form-group textarea:hover { border-color: #9db8d9; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: var(--blue); }
.form-group select:disabled { background: #f1f5fa; color: #7d8ea4; cursor: not-allowed; }

.select-wrapper { position: relative; }
.select-wrapper select { appearance: none; -webkit-appearance: none; padding-right: 46px; cursor: pointer; }
.select-arrow {
  position: absolute;
  right: 18px;
  top: 50%;
  width: 10px;
  height: 10px;
  margin-top: -7px;
  border-right: 2.5px solid #5a6f8a;
  border-bottom: 2.5px solid #5a6f8a;
  transform: rotate(45deg);
  pointer-events: none;
}

.field-hint { margin: 0; color: #6a7d94; font-size: 14.5px; line-height: 1.45; }

.password-wrap { position: relative; }
.password-wrap input { padding-right: 56px; }
.password-toggle {
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 10px;
  background: transparent;
  color: #5a6f8a;
  display: grid;
  place-items: center;
  cursor: pointer;
}
.password-toggle:hover { background: #eef3fa; }

/* logo upload */
.logo-upload { display: flex; gap: 20px; align-items: center; padding: 16px; border: 1.5px dashed #b5c9e2; border-radius: 16px; background: #f8fbff; }
.logo-box {
  width: 96px;
  height: 96px;
  flex: 0 0 auto;
  border-radius: 18px;
  background: #fff;
  border: 1px solid #dbe5f2;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.logo-box img { width: 72px; height: 72px; object-fit: contain; }
.logo-actions { min-width: 0; display: flex; flex-direction: column; align-items: flex-start; gap: 10px; }
.file-btn {
  min-height: 48px;
  padding: 0 22px;
  border: 1.5px solid #bcd0ea;
  border-radius: 12px;
  background: #fff;
  color: #1349c2;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
}
.file-btn input { display: none; }
.text-btn { padding: 0; border: 0; background: transparent; color: #b4233f; font-size: 15px; font-weight: 700; cursor: pointer; }

/* notices */
.notice { margin: 4px 0 18px; padding: 14px 18px; border-radius: 12px; font-size: 16.5px; font-weight: 600; line-height: 1.5; }
.notice-error { background: #fdebee; color: #a31d37; border: 1px solid #f5c5ce; }
.notice-success { background: #e4f6ea; color: #14702f; border: 1px solid #b9e3c7; }

.submit-area { margin-top: 8px; }
.submit-button {
  width: 100%;
  min-height: 60px;
  border: 0;
  border-radius: 14px;
  color: #fff;
  background: linear-gradient(100deg, #1349c2, #1766e6);
  box-shadow: 0 12px 26px rgba(21, 88, 214, .28);
  font-size: 19px;
  font-weight: 800;
  cursor: pointer;
}
.submit-button:hover { filter: brightness(1.07); }
.submit-button:disabled { opacity: .7; cursor: wait; }
.verification-note { margin: 14px 0 0; text-align: center; color: var(--muted); font-size: 15.5px; }

/* ---------- Login ---------- */
.login-container { min-height: 100%; display: grid; place-items: center; padding: 40px clamp(16px, 4vw, 48px); }

.login-card {
  width: 100%;
  max-width: 520px;
  padding: clamp(28px, 4vw, 46px);
  border: 1px solid #dbe5f2;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 24px 60px rgba(31, 71, 116, .12);
}

.login-logo {
  width: 64px;
  height: 64px;
  display: grid;
  place-items: center;
  margin-bottom: 20px;
  border-radius: 18px;
  color: #fff;
  background: linear-gradient(135deg, #1349c2, #1766e6);
  box-shadow: 0 12px 24px rgba(21, 88, 214, .3);
}
.login-logo svg { width: 32px; height: 32px; }

.login-card h1 {
  margin: 0;
  font-family: "Bricolage Grotesque", "Plus Jakarta Sans", sans-serif;
  font-size: clamp(32px, 4vw, 42px);
  font-weight: 800;
  letter-spacing: -1px;
  color: var(--ink);
}
.login-sub { margin: 10px 0 24px; color: var(--muted); font-size: 18px; line-height: 1.55; }
.login-form { display: flex; flex-direction: column; gap: 20px; }
.login-form .submit-button { margin-top: 6px; }

.back-register {
  width: 100%;
  min-height: 52px;
  margin-top: 16px;
  border: 0;
  border-radius: 12px;
  background: #eef4fd;
  color: #1349c2;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
}
.back-register:hover { background: #e2edfb; }

/* ---------- Responsive ---------- */
@media (max-width: 1100px) {
  .college-register-left { width: 38%; min-width: 320px; padding: 40px 28px; }
  .form-grid-3 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

@media (max-width: 900px) {
  .college-register-page { flex-direction: column; }
  .college-register-left {
    width: 100%;
    min-width: 0;
    height: auto;
    position: relative;
    overflow: visible;
    padding: 28px 20px 32px;
  }
  .brand { margin-bottom: 22px; }
  .left-content h2 { font-size: clamp(30px, 7vw, 40px); letter-spacing: -1px; }
  .left-description { font-size: 17px; }
  .preview-card { display: none; }
  .left-features { display: none; }
  .college-register-right { width: 100%; height: auto; overflow: visible; }
  .form-container { padding-top: 34px; }
}

@media (max-width: 640px) {
  .college-register-page { font-size: 16px; }
  .form-grid, .form-grid-3 { grid-template-columns: 1fr; gap: 18px; }
  .form-group.full { grid-column: auto; }
  .logo-upload { flex-direction: column; align-items: flex-start; }
  .login-container { padding: 24px 14px 40px; }
}
`;

export default Registeration;
