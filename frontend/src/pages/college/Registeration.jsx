import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
   ICONS
========================= */

function GraduationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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

      <path
        d="M21 9.5v5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <span className="feature-icon">
      <svg
        viewBox="0 0 24 24"
        width="15"
        height="15"
        fill="none"
      >
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

/* =========================
   COMPONENT
========================= */

function Registeration() {
  const navigate = useNavigate();

  const [showLogin, setShowLogin] = useState(false);

  const [formData, setFormData] = useState({
    collegeName: "",
    officialEmail: "",
    mobile: "",
    address: "",
    district: "",
    state: "",
    website: "",
    collegeType: "",
    affiliation: "",
    accreditation: "",
    registrationDetails: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  /* =========================
     FORM CHANGE
  ========================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      setFormData((prev) => ({
        ...prev,
        state: value,
        district: "",
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     REGISTER
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      "collegeName",
      "officialEmail",
      "mobile",
      "address",
      "district",
      "state",
      "collegeType",
      "affiliation",
    ];

    const missingField = requiredFields.find(
      (field) => !formData[field].trim()
    );

    if (missingField) {
      alert("Please fill all required fields.");
      return;
    }

    setLoginData({
      email: formData.officialEmail,
      password: "",
    });

    setShowLogin(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  /* =========================
     LOGIN
  ========================= */

  const handleLogin = (e) => {
    e.preventDefault();

    if (!loginData.email.trim() || !loginData.password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    navigate("/college/dashboard");
  };

  const availableDistricts = formData.state
    ? districtsByState[formData.state] || []
    : [];

  return (
    <>
      <style>{`

        * {
          box-sizing: border-box;
        }

        html,
        body,
        #root {
          margin: 0;
          padding: 0;
          width: 100%;
          min-height: 100%;
        }

        body {
          font-family:
            Inter,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          background: #f7f9fc;
          color: #172033;
        }

        button,
        input,
        select,
        textarea {
          font-family: inherit;
        }

        /* =========================
           MAIN
        ========================= */

        .college-register-page {
          width: 100%;
          min-height: 100vh;
          display: flex;
          overflow: hidden;
          background: #f7f9fc;
        }

        /* =========================
           LEFT PANEL
        ========================= */

        .college-register-left {
          width: 40%;
          min-width: 340px;
          height: 100vh;

          position: sticky;
          top: 0;

          overflow: hidden;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 45px 50px;

          color: #ffffff;

          background:
            radial-gradient(
              circle at 15% 18%,
              rgba(59, 130, 246, 0.2),
              transparent 32%
            ),
            radial-gradient(
              circle at 85% 80%,
              rgba(37, 99, 235, 0.17),
              transparent 35%
            ),
            linear-gradient(
              145deg,
              #07152f 0%,
              #0c2145 52%,
              #102e5b 100%
            );
        }

        .college-register-left::before,
        .college-register-left::after {
          content: "";
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          pointer-events: none;
        }

        .college-register-left::before {
          width: 300px;
          height: 300px;
          top: -145px;
          right: -100px;
        }

        .college-register-left::after {
          width: 240px;
          height: 240px;
          bottom: -120px;
          left: -120px;
        }

        .left-content {
          width: 100%;
          max-width: 470px;
          position: relative;
          z-index: 2;
        }

        /* =========================
           CAMPUSCONNECT LOGO
        ========================= */

        .brand {
          display: flex;
          align-items: center;
          gap: 11px;

          margin-bottom: 43px;
        }

        .brand-icon {
          width: 40px;
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 10px;

          color: #ffffff;

          background: rgba(255, 255, 255, 0.1);

          border: 1px solid rgba(255, 255, 255, 0.14);
        }

        .brand-name {
          color: #ffffff;

          font-size: 25px;
          line-height: 1;

          font-weight: 800;

          letter-spacing: -0.8px;
        }

        /* =========================
           LEFT CONTENT
        ========================= */

        .left-content h2 {
          margin: 0 0 18px;

          max-width: 460px;

          color: #ffffff;

          font-size: clamp(38px, 4vw, 55px);
          line-height: 1.06;

          letter-spacing: -2px;

          font-weight: 850;
        }

        .left-content h2 span {
          color: #60a5fa;
        }

        .left-description {
          max-width: 455px;

          margin: 0;

          color: rgba(255, 255, 255, 0.76);

          font-size: 15px;
          line-height: 1.7;
        }

        .left-features {
          display: flex;
          flex-direction: column;
          gap: 11px;

          margin-top: 29px;
        }

        .feature-item {
          min-height: 56px;

          display: flex;
          align-items: center;

          gap: 11px;

          padding: 11px 14px;

          border: 1px solid rgba(255, 255, 255, 0.1);

          border-radius: 10px;

          background: rgba(255, 255, 255, 0.055);

          color: rgba(255, 255, 255, 0.88);

          font-size: 13.5px;
          font-weight: 650;

          transition: 0.25s ease;
        }

        .feature-item:hover {
          transform: translateX(4px);
          background: rgba(255, 255, 255, 0.09);
        }

        .feature-icon {
          width: 24px;
          height: 24px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 50%;

          color: #bfdbfe;

          background: rgba(59, 130, 246, 0.22);
        }

        /* =========================
           RIGHT SIDE
        ========================= */

        .college-register-right {
          width: 60%;
          flex: 1;
          min-width: 0;

          height: 100vh;

          overflow-x: hidden;
          overflow-y: auto;

          background: #ffffff;

          scrollbar-width: thin;
          scrollbar-color: #cbd5e1 transparent;
        }

        .college-register-right::-webkit-scrollbar {
          width: 7px;
        }

        .college-register-right::-webkit-scrollbar-track {
          background: transparent;
        }

        .college-register-right::-webkit-scrollbar-thumb {
          border-radius: 20px;
          background: #cbd5e1;
        }

        /* =========================
           FORM CONTAINER
        ========================= */

        .form-container {
          width: 100%;

          max-width: 1000px;

          margin: 0 auto;

          padding: 48px 45px 65px;
        }

        /* =========================
           HEADER
        ========================= */

        .form-header {
          width: 100%;

          margin: 0 auto 36px;

          text-align: center;
        }

        .form-header h1 {
          margin: 0;

          color: #17345f;

          font-size: clamp(32px, 3.2vw, 44px);
          line-height: 1.1;

          font-weight: 850;

          letter-spacing: -1.5px;
        }

        .form-header p {
          margin: 9px auto 0;

          max-width: 650px;

          color: #64748b;

          font-size: 14px;
          line-height: 1.6;
        }

        .login-link {
          margin-top: 12px;

          color: #64748b;

          font-size: 13.5px;
        }

        .login-link button {
          padding: 0;

          border: 0;
          outline: 0;

          cursor: pointer;

          color: #1769e0;

          background: transparent;

          font-size: inherit;
          font-weight: 750;
        }

        /* =========================
           SECTION
        ========================= */

        .form-section {
          width: 100%;

          margin-bottom: 34px;
        }

        .section-title {
          width: 100%;

          display: flex;
          align-items: center;

          gap: 10px;

          padding-bottom: 12px;

          margin-bottom: 22px;

          border-bottom: 1px solid #e5eaf1;

          text-align: left;
        }

        .section-number {
          width: 24px;
          height: 24px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 7px;

          color: #1769e0;

          background: #edf5ff;

          font-size: 10px;
          font-weight: 800;
        }

        .section-title h3 {
          margin: 0;

          color: #18243a;

          font-size: 15.5px;
          font-weight: 800;

          text-align: left;
        }

        /* =========================
           FORM GRID
        ========================= */

        .form-grid {
          width: 100%;

          display: grid;

          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 1fr);

          gap: 21px 20px;
        }

        .form-group {
          width: 100%;
          min-width: 0;

          text-align: left !important;
        }

        .form-group.full {
          grid-column: 1 / -1;
        }

        /* =========================
           LABEL
           LEFT ALIGN FIX
        ========================= */

        .form-group label {
          display: block;

          width: 100%;

          margin: 0 0 8px;

          color: #1d2935;

          font-size: 14px;
          line-height: 1.3;

          font-weight: 700;

          text-align: left !important;
        }

        .required {
          color: #dc2626;

          margin-left: 3px;
        }

        /* =========================
           INPUT
        ========================= */

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;

          border: 1px solid #d5dde8;

          outline: none;

          border-radius: 8px;

          background: #ffffff;

          color: #27364a;

          font-size: 14px;

          font-weight: 500;

          text-align: left;

          transition:
            border-color 0.2s ease,
            box-shadow 0.2s ease;
        }

        .form-group input,
        .form-group select {
          height: 46px;

          padding: 0 13px;
        }

        .form-group textarea {
          min-height: 102px;

          padding: 12px 13px;

          resize: vertical;

          line-height: 1.5;
        }

        /* DARK PLACEHOLDER */

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #64748b !important;

          opacity: 1 !important;
        }

        .form-group input:hover,
        .form-group select:hover,
        .form-group textarea:hover {
          border-color: #b7c4d4;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: #4f8ee8;

          box-shadow:
            0 0 0 3px rgba(59, 130, 246, 0.09);
        }

        /* =========================
           SELECT
        ========================= */

        .select-wrapper {
          width: 100%;

          position: relative;
        }

        .select-wrapper select {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;

          cursor: pointer;

          padding-right: 40px;
        }

        .select-arrow {
          position: absolute;

          top: 50%;
          right: 14px;

          width: 8px;
          height: 8px;

          border-right: 1.7px solid #64748b;
          border-bottom: 1.7px solid #64748b;

          transform:
            translateY(-65%)
            rotate(45deg);

          pointer-events: none;
        }

        .form-group select:disabled {
          color: #a6b3c4;

          background: #f5f7fa;

          border-color: #e0e6ee;

          cursor: not-allowed;
        }

        .form-group select:disabled + .select-arrow {
          border-color: #b9c4d1;
        }

        .field-hint {
          margin: 6px 0 0;

          color: #8da0b7;

          font-size: 11.5px;

          text-align: left;
        }

        /* =========================
           REGISTER BUTTON
           NORMAL SIZE
        ========================= */

        .submit-area {
          width: 100%;

          margin-top: 2px;

          text-align: left;
        }

        .submit-button {
          width: auto;

          min-width: 220px;

          height: 47px;

          padding: 0 25px;

          border: 0;

          border-radius: 8px;

          cursor: pointer;

          color: #ffffff;

          background: linear-gradient(
            135deg,
            #1769e0,
            #1553b7
          );

          font-size: 14px;

          font-weight: 750;

          box-shadow:
            0 8px 18px rgba(23, 105, 224, 0.18);

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .submit-button:hover {
          transform: translateY(-1px);

          box-shadow:
            0 11px 23px rgba(23, 105, 224, 0.24);
        }

        .submit-button:active {
          transform: translateY(0);
        }

        .verification-note {
          margin: 11px 0 0;

          color: #8492a6;

          font-size: 11.5px;

          line-height: 1.5;

          text-align: left;
        }

        /* =========================
           LOGIN
        ========================= */

        .login-container {
          min-height: 100%;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 40px 25px;
        }

        .login-card {
          width: 100%;
          max-width: 470px;

          padding: 40px;

          border: 1px solid #e2e8f0;

          border-radius: 16px;

          background: #ffffff;

          box-shadow:
            0 20px 60px rgba(15, 23, 42, 0.08);
        }

        .login-logo {
          width: 50px;
          height: 50px;

          display: flex;
          align-items: center;
          justify-content: center;

          margin: 0 auto 18px;

          border-radius: 13px;

          color: #1769e0;

          background: #edf5ff;
        }

        .login-card h1 {
          margin: 0;

          color: #17345f;

          font-size: 30px;

          font-weight: 850;

          text-align: center;
        }

        .login-card > p {
          margin: 8px 0 26px;

          color: #64748b;

          text-align: center;

          font-size: 13.5px;

          line-height: 1.5;
        }

        .login-form {
          display: flex;

          flex-direction: column;

          gap: 19px;
        }

        .back-register {
          width: 100%;

          margin-top: 15px;

          padding: 8px;

          border: 0;

          cursor: pointer;

          color: #64748b;

          background: transparent;

          font-size: 13px;

          font-weight: 650;
        }

        .back-register:hover {
          color: #1769e0;
        }

        /* =========================
           TABLET
        ========================= */

        @media (max-width: 900px) {

          .college-register-page {
            display: block;

            overflow: visible;
          }

          .college-register-left {
            width: 100%;

            min-width: 0;

            height: auto;
            min-height: auto;

            position: relative;

            padding: 45px 30px;
          }

          .college-register-right {
            width: 100%;

            height: auto;

            overflow: visible;
          }

          .left-content {
            max-width: 700px;

            margin: 0 auto;
          }

          .left-content h2 {
            max-width: 650px;

            font-size: clamp(
              36px,
              6vw,
              50px
            );
          }

          .left-description {
            max-width: 650px;
          }

          .left-features {
            max-width: 620px;

            margin-left: auto;
            margin-right: auto;
          }

          .form-container {
            max-width: 900px;

            padding:
              42px 35px 55px;
          }
        }

        /* =========================
           MOBILE
        ========================= */

        @media (max-width: 700px) {

          .college-register-left {
            padding:
              38px 22px 42px;
          }

          .brand {
            margin-bottom: 32px;
          }

          .left-content h2 {
            font-size: 36px;

            letter-spacing: -1.5px;
          }

          .form-container {
            padding:
              38px 22px 50px;
          }

          .form-grid {
            grid-template-columns: 1fr;

            gap: 19px;
          }

          .form-group.full {
            grid-column: auto;
          }

          .form-header h1 {
            font-size: 34px;
          }

          .submit-button {
            min-width: 205px;
          }
        }

        /* =========================
           SMALL MOBILE
        ========================= */

        @media (max-width: 480px) {

          .college-register-left {
            padding:
              34px 18px 38px;
          }

          .brand-icon {
            width: 38px;
            height: 38px;
          }

          .brand-name {
            font-size: 22px;
          }

          .left-content h2 {
            font-size: 32px;

            line-height: 1.08;
          }

          .left-description {
            font-size: 14px;
          }

          .feature-item {
            font-size: 12.5px;
          }

          .form-container {
            padding:
              32px 17px 45px;
          }

          .form-header h1 {
            font-size: 30px;
          }

          .form-group label {
            font-size: 14.5px;
          }

          .form-group input,
          .form-group select {
            height: 46px;

            font-size: 14px;
          }

          .form-group textarea {
            font-size: 14px;
          }

          .submit-button {
            width: 100%;

            min-width: 0;

            max-width: 100%;
          }

          .verification-note {
            text-align: left;
          }

          .login-card {
            padding: 30px 22px;
          }
        }

        /* =========================
           VERY SMALL MOBILE
        ========================= */

        @media (max-width: 360px) {

          .college-register-left {
            padding-left: 15px;
            padding-right: 15px;
          }

          .form-container {
            padding-left: 14px;
            padding-right: 14px;
          }

          .left-content h2 {
            font-size: 29px;
          }

          .form-header h1 {
            font-size: 27px;
          }
        }

      `}</style>

      <div className="college-register-page">

        {/* LEFT SIDE */}

        <aside className="college-register-left">
          <div className="left-content">

            <div className="brand">

              <div className="brand-icon">
                <GraduationIcon />
              </div>

              <div className="brand-name">
                CampusConnect
              </div>

            </div>

            <h2>
              Connect your college with{" "}
              <span>opportunity.</span>
            </h2>

            <p className="left-description">
              Register your institution on CampusConnect
              and connect with students who are actively
              looking for the right courses and colleges.
            </p>

            <div className="left-features">

              <div className="feature-item">
                <CheckIcon />

                <span>
                  Build and manage your college profile
                </span>
              </div>

              <div className="feature-item">
                <CheckIcon />

                <span>
                  Showcase your courses to interested students
                </span>
              </div>

              <div className="feature-item">
                <CheckIcon />

                <span>
                  Receive student enquiries and leads
                </span>
              </div>

            </div>

          </div>
        </aside>

        {/* RIGHT SIDE */}

        <main className="college-register-right">

          {!showLogin ? (

            <div className="form-container">

              <div className="form-header">

                <h1>
                  Register Your College
                </h1>

                <p>
                  Create your college account and provide
                  your official institution details.
                </p>

                <div className="login-link">
                  Already registered?{" "}

                  <button
                    type="button"
                    onClick={() => setShowLogin(true)}
                  >
                    Login here
                  </button>
                </div>

              </div>

              <form onSubmit={handleSubmit}>

                {/* BASIC INFORMATION */}

                <section className="form-section">

                  <div className="section-title">

                    <span className="section-number">
                      01
                    </span>

                    <h3>
                      Basic College Information
                    </h3>

                  </div>

                  <div className="form-grid">

                    <div className="form-group full">

                      <label htmlFor="collegeName">
                        College Name
                        <span className="required">
                          *
                        </span>
                      </label>

                      <input
                        id="collegeName"
                        name="collegeName"
                        type="text"
                        value={formData.collegeName}
                        onChange={handleChange}
                        placeholder="Enter your college name"
                      />

                    </div>

                    <div className="form-group">

                      <label htmlFor="officialEmail">
                        Official Email
                        <span className="required">
                          *
                        </span>
                      </label>

                      <input
                        id="officialEmail"
                        name="officialEmail"
                        type="email"
                        value={formData.officialEmail}
                        onChange={handleChange}
                        placeholder="Enter official email"
                      />

                    </div>

                    <div className="form-group">

                      <label htmlFor="mobile">
                        Mobile Number
                        <span className="required">
                          *
                        </span>
                      </label>

                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        inputMode="numeric"
                        maxLength="10"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                      />

                    </div>

                    <div className="form-group full">

                      <label htmlFor="address">
                        Address
                        <span className="required">
                          *
                        </span>
                      </label>

                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter complete college address"
                      />

                    </div>

                  </div>

                </section>

                {/* LOCATION */}

                <section className="form-section">

                  <div className="section-title">

                    <span className="section-number">
                      02
                    </span>

                    <h3>
                      College Location
                    </h3>

                  </div>

                  <div className="form-grid">

                    <div className="form-group">

                      <label htmlFor="state">
                        State
                        <span className="required">
                          *
                        </span>
                      </label>

                      <div className="select-wrapper">

                        <select
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                        >

                          <option value="">
                            Select state
                          </option>

                          {indianStates.map((state) => (
                            <option
                              key={state}
                              value={state}
                            >
                              {state}
                            </option>
                          ))}

                        </select>

                        <span className="select-arrow" />

                      </div>

                    </div>

                    <div className="form-group">

                      <label htmlFor="district">
                        District
                        <span className="required">
                          *
                        </span>
                      </label>

                      <div className="select-wrapper">

                        <select
                          id="district"
                          name="district"
                          value={formData.district}
                          onChange={handleChange}
                          disabled={!formData.state}
                        >

                          <option value="">
                            {formData.state
                              ? "Select district"
                              : "Select state first"}
                          </option>

                          {availableDistricts.map(
                            (district) => (
                              <option
                                key={district}
                                value={district}
                              >
                                {district}
                              </option>
                            )
                          )}

                        </select>

                        <span className="select-arrow" />

                      </div>

                      {!formData.state && (
                        <p className="field-hint">
                          Select a state to choose the district.
                        </p>
                      )}

                    </div>

                    <div className="form-group full">

                      <label htmlFor="website">
                        College Website
                      </label>

                      <input
                        id="website"
                        name="website"
                        type="url"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="https://www.examplecollege.edu"
                      />

                    </div>

                  </div>

                </section>

                {/* COLLEGE DETAILS */}

                <section className="form-section">

                  <div className="section-title">

                    <span className="section-number">
                      03
                    </span>

                    <h3>
                      College Details
                    </h3>

                  </div>

                  <div className="form-grid">

                    <div className="form-group">

                      <label htmlFor="collegeType">
                        College Type
                        <span className="required">
                          *
                        </span>
                      </label>

                      <div className="select-wrapper">

                        <select
                          id="collegeType"
                          name="collegeType"
                          value={formData.collegeType}
                          onChange={handleChange}
                        >

                          <option value="">
                            Select college type
                          </option>

                          <option value="Government">
                            Government
                          </option>

                          <option value="Private">
                            Private
                          </option>

                          <option value="Autonomous">
                            Autonomous
                          </option>

                          <option value="Deemed University">
                            Deemed University
                          </option>

                          <option value="Government Aided">
                            Government Aided
                          </option>

                          <option value="Other">
                            Other
                          </option>

                        </select>

                        <span className="select-arrow" />

                      </div>

                    </div>

                    <div className="form-group">

                      <label htmlFor="affiliation">
                        Affiliation
                        <span className="required">
                          *
                        </span>
                      </label>

                      <div className="select-wrapper">

                        <select
                          id="affiliation"
                          name="affiliation"
                          value={formData.affiliation}
                          onChange={handleChange}
                        >

                          <option value="">
                            Select affiliation
                          </option>

                          <option value="AICTE">
                            AICTE
                          </option>

                          <option value="UGC">
                            UGC
                          </option>

                          <option value="Anna University">
                            Anna University
                          </option>

                          <option value="University of Madras">
                            University of Madras
                          </option>

                          <option value="Bharathiar University">
                            Bharathiar University
                          </option>

                          <option value="Bharathidasan University">
                            Bharathidasan University
                          </option>

                          <option value="Other University">
                            Other University
                          </option>

                        </select>

                        <span className="select-arrow" />

                      </div>

                    </div>

                    <div className="form-group">

                      <label htmlFor="accreditation">
                        Accreditation
                      </label>

                      <div className="select-wrapper">

                        <select
                          id="accreditation"
                          name="accreditation"
                          value={formData.accreditation}
                          onChange={handleChange}
                        >

                          <option value="">
                            Select accreditation
                          </option>

                          <option value="NAAC A++">
                            NAAC A++
                          </option>

                          <option value="NAAC A+">
                            NAAC A+
                          </option>

                          <option value="NAAC A">
                            NAAC A
                          </option>

                          <option value="NAAC B++">
                            NAAC B++
                          </option>

                          <option value="NAAC B+">
                            NAAC B+
                          </option>

                          <option value="NBA">
                            NBA
                          </option>

                          <option value="NIRF">
                            NIRF
                          </option>

                          <option value="Not Accredited">
                            Not Accredited
                          </option>

                          <option value="Other">
                            Other
                          </option>

                        </select>

                        <span className="select-arrow" />

                      </div>

                    </div>

                    <div className="form-group">

                      <label htmlFor="registrationDetails">
                        Registration Details
                      </label>

                      <input
                        id="registrationDetails"
                        name="registrationDetails"
                        type="text"
                        value={formData.registrationDetails}
                        onChange={handleChange}
                        placeholder="Enter registration / approval details"
                      />

                    </div>

                  </div>

                </section>

                {/* BUTTON */}

                <div className="submit-area">

                  <button
                    type="submit"
                    className="submit-button"
                  >
                    Register Your College
                  </button>

                  <p className="verification-note">
                    Your college information will be reviewed
                    and verified before your account becomes active.
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

                <h1>
                  College Login
                </h1>

                <p>
                  Sign in to manage your college profile
                  and connect with students.
                </p>

                <form
                  className="login-form"
                  onSubmit={handleLogin}
                >

                  <div className="form-group">

                    <label htmlFor="loginEmail">
                      Official Email
                    </label>

                    <input
                      id="loginEmail"
                      type="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      placeholder="Enter official email"
                    />

                  </div>

                  <div className="form-group">

                    <label htmlFor="loginPassword">
                      Password
                    </label>

                    <input
                      id="loginPassword"
                      type="password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      placeholder="Enter password"
                    />

                  </div>

                  <button
                    type="submit"
                    className="submit-button"
                  >
                    Login to Dashboard
                  </button>

                </form>

                <button
                  type="button"
                  className="back-register"
                  onClick={() => setShowLogin(false)}
                >
                  ← Back to registration
                </button>

              </div>

            </div>

          )}

        </main>

      </div>
    </>
  );
}

export default Registeration;