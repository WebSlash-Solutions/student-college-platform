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

\========================= */



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

\========================= */



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

   OPTIONS & HELPERS

\========================= */



const COLLEGE_TYPES = ["Government", "Private", "Autonomous", "Deemed University", "Government Aided", "Other"];

const AFFILIATIONS = ["AICTE", "UGC", "Anna University", "University of Madras", "Bharathiar University", "Bharathidasan University", "Other University"];

const ACCREDITATIONS = ["NAAC A++", "NAAC A+", "NAAC A", "NAAC B++", "NAAC B+", "NBA", "NIRF", "Not Accredited", "Other"];



const normalizeUrl = (value) => {
  const url = (value || "").trim();
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};



const getInitials = (name) =>

  (name || "")

    .split(" ")

    .filter((word) => /[A-Za-z]/.test(word[0]))

    .slice(0, 2)

    .map((word) => word[0])

    .join("")

    .toUpperCase() || "CC";



/* Fields follow "10. College Registration" of the project document (+ password for login) */

const emptyForm = {

  collegeName: "",

  officialEmail: "",

  mobile: "",

  collegeType: "",

  affiliation: "",

  accreditation: "",

  registrationDetails: "",

  address: "",

  state: "",

  district: "",

  website: "",

  password: "",

  confirmPassword: "",

};



/* =========================

   ICONS

\========================= */



function GraduationIcon({ size = 26 }) {

  return (

    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">

      <path d="M3 9.2L12 4l9 5.2-9 5.1L3 9.2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />

      <path d="M7 11.6v4.2c0 1.4 2.2 3.2 5 3.2s5-1.8 5-3.2v-4.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

      <path d="M21 9.5v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />

    </svg>

  );

}



function CheckIcon({ size = 14 }) {

  return (

    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" aria-hidden="true">

      <path d="m6 12.5 4 4 8-9" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />

    </svg>

  );

}



function EyeIcon({ off }) {

  return (

    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">

      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />

      <circle cx="12" cy="12" r="3" />

      {off && <path d="M4 4l16 16" />}

    </svg>

  );

}



/* =========================

   SMALL COMPONENTS

\========================= */



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

      <input id={id} name={name} type={visible ? "text" : "password"} value={value} onChange={onChange} placeholder={placeholder} autoComplete={autoComplete} />

      <button type="button" className="password-toggle" onClick={() => setVisible((v) => !v)} aria-label={visible ? "Hide password" : "Show password"}>

        <EyeIcon off={visible} />

      </button>

    </div>

  );

}



function Select({ id, name, value, onChange, disabled, placeholder, options }) {

  return (

    <div className="select-wrapper">

      <select id={id} name={name} value={value} onChange={onChange} disabled={disabled}>

        <option value="">{placeholder}</option>

        {options.map((option) => (

          <option key={option} value={option}>{option}</option>

        ))}

      </select>

      <span className="select-arrow" />

    </div>

  );

}



/* =========================

   WIZARD CONFIG

\========================= */



const STEPS = [

  { title: "College details", sub: "Name, contact, type & affiliation", icon: "🏫", required: ["collegeName", "officialEmail", "mobile", "collegeType", "affiliation"] },

  { title: "Location & website", sub: "Address, state, district & website", icon: "📍", required: ["address", "state", "district"] },

  { title: "Create account", sub: "Set a password & submit for verification", icon: "🔐", required: ["password", "confirmPassword"] },

];

const LAST_STEP = STEPS.length - 1;



const PERKS = [

  ["🎯", "Students come to you", "Interested students are matched by course & district."],

  ["💸", "₹100 per lead", "Free preview. Pay only for the contacts you unlock."],

  ["🛡️", "Verified & consent-based", "Admin verifies every college. Students opt in."],

];



/* =========================

   COMPONENT

\========================= */



function Registeration() {

  const navigate = useNavigate();

  const noticeRef = useRef(null);



  const [showLogin, setShowLogin] = useState(() => new URLSearchParams(window.location.search).get("mode") === "login");

  const [formData, setFormData] = useState(emptyForm);

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [notice, setNotice] = useState(null); // { id, type: "error" | "success", text }

  const [busy, setBusy] = useState(false);

  const [step, setStep] = useState(0);

  const [agree, setAgree] = useState(false);



  const notify = (type, text) => setNotice({ id: Date.now(), type, text });



  useEffect(() => {

    if (notice && noticeRef.current) {

      noticeRef.current.scrollIntoView({ behavior: "smooth", block: "center" });

    }

  }, [notice]);



  const switchMode = (login) => {

    setNotice(null);

    setShowLogin(login);

    window.scrollTo({ top: 0, behavior: "smooth" });

  };



  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value, ...(name === "state" ? { district: "" } : {}) }));

  };



  // props shared by every registration input

  const bind = (name) => ({ id: name, name, value: formData[name], onChange: handleChange });



  /* ---------- per-step checks ---------- */



  const checkStep = (index) => {

    const missing = STEPS[index].required.find((field) => !String(formData[field] || "").trim());

    if (missing) return "Please fill all the fields marked with *.";



    if (index === 0) {

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.officialEmail.trim().toLowerCase())) return "Enter a valid official email address.";

      if (formData.mobile.replace(/\D/g, "").length < 10) return "Enter a valid 10-digit mobile number.";

    }

    if (index === LAST_STEP) {

      if (formData.password.length < 6) return "Password must be at least 6 characters.";

      if (formData.password !== formData.confirmPassword) return "Password and confirm password do not match.";

    }

    return "";

  };



  const goNext = () => {

    const problem = checkStep(step);

    if (problem) {

      notify("error", problem);

      return;

    }

    setNotice(null);

    setStep((s) => Math.min(s + 1, LAST_STEP));

    window.scrollTo({ top: 0, behavior: "smooth" });

  };



  const goBack = () => {

    setNotice(null);

    setStep((s) => Math.max(s - 1, 0));

    window.scrollTo({ top: 0, behavior: "smooth" });

  };



  const jumpTo = (index) => {

    if (index <= step) {

      setNotice(null);

      setStep(index);

    }

  };



  /* ---------- REGISTER ---------- */



  const handleSubmit = async (e) => {

    e.preventDefault();

    if (step < LAST_STEP) {

      goNext();

      return;

    }

    setNotice(null);



    for (let i = 0; i < STEPS.length; i += 1) {

      const problem = checkStep(i);

      if (problem) {

        setStep(i);

        notify("error", problem);

        return;

      }

    }



    if (!agree) {

      notify("error", "Please accept the platform terms to continue.");

      return;

    }



    const email = formData.officialEmail.trim().toLowerCase();



    let accounts = [];

    try {

      accounts = JSON.parse(localStorage.getItem(COLLEGE_ACCOUNTS_KEY) || "[]");

    } catch {

      accounts = [];

    }



    if (accounts.some((account) => account.email === email)) {

      setLoginData({ email, password: "" });

      setShowLogin(true);

      notify("error", "This official email is already registered. Please log in.");

      return;

    }



    setBusy(true);

    try {

      const passwordHash = await hashPassword(formData.password);



      const pendingRegistration = {

        ...formData,

        mobile: formData.mobile.replace(/\D/g, "").slice(-10),

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

      notify("error", "Could not save your details. Check browser storage and try again.");

      return;

    }

    setBusy(false);



    setLoginData({ email, password: "" });

    setShowLogin(true);

    notify("success", "Details saved. Log in once with your password to publish your college profile.");

    window.scrollTo({ top: 0, behavior: "smooth" });

  };



  /* ---------- LOGIN ---------- */



  const handleLogin = async (e) => {

    e.preventDefault();

    setNotice(null);



    const email = loginData.email.trim().toLowerCase();

    const password = loginData.password;



    if (!email || !password) {

      notify("error", "Enter your official email and password.");

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

          notify("error", "Incorrect password. Please try again.");

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



        // Courses, fees, hostel, logo etc. are added later from "Edit profile".

        const newCollege = {

          id: `registered-${account.id}`,

          name: pending.collegeName,

          category: "Other",

          location: `${pending.address}, ${pending.state}`.replace(/^, |, $/g, ""),

          district: pending.district,

          pincode: "",

          established: "",

          type: pending.collegeType,

          affiliation: pending.affiliation,

          accreditation: pending.accreditation || "Not available",

          registrationDetails: pending.registrationDetails || "",

          ranking: "Not available",

          rankingLabel: "Recognition",

          counsellingCode: "",

          website: pending.website || "",

          logoData: "",

          hostel: "",

          transportation: "",

          placement: "",

          fees: "",

          counselling: "College Admission",

          courses: [["Course details not added", "-", "Not added"]],

          scholarships: ["Government scholarships", "Merit scholarships", "Institutional financial assistance"],

          placements: ["Placement information can be updated from Edit profile", "Career guidance", "Industry interaction"],

          registeredAccountEmail: email,

        };



        const savedColleges = JSON.parse(localStorage.getItem(COLLEGE_SAVED_KEY) || "[]");

        const updatedSaved = [newCollege, ...savedColleges.filter((college) => college.registeredAccountEmail !== email)];



        localStorage.setItem(COLLEGE_SAVED_KEY, JSON.stringify(updatedSaved));

        localStorage.removeItem(PENDING_COLLEGE_KEY);

      } else if (!account) {

        setBusy(false);

        notify("error", "No college account found for this email. Please register first.");

        return;

      } else if (account.passwordHash !== passwordHash) {

        setBusy(false);

        notify("error", "Incorrect email or password.");

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

      notify("error", "Something went wrong while logging in. Try again.");

      return;

    }



    setBusy(false);



    // come back to the plans page if the college was sent here from "View prices"

    let after = "";

    try {

      after = sessionStorage.getItem("campusconnect_after_login") || "";

      if (after) sessionStorage.removeItem("campusconnect_after_login");

    } catch {

      after = "";

    }

    navigate(after || "/college/profile");

  };



  const availableDistricts = formData.state ? districtsByState[formData.state] || [] : [];

  const progress = Math.round((step / LAST_STEP) * 100);



  const noticeBox = notice && (

    <div key={notice.id} ref={noticeRef} className={`notice notice-${notice.type}`} role={notice.type === "error" ? "alert" : "status"}>

      <span className="notice-ic">{notice.type === "error" ? "!" : "✓"}</span>

      <span>{notice.text}</span>

    </div>

  );



  return (

    <>

      <style>{styles}</style>



      <div className="rg">

        {/* ============ LEFT: BRAND / PROGRESS PANEL ============ */}

        <aside className="rg-side">

          <span className="rg-orb o1" />

          <span className="rg-orb o2" />

          <span className="rg-orb o3" />



          <div className="rg-side-in">

            <button type="button" className="rg-brand" onClick={() => navigate("/college/home")} aria-label="Back to home">

              <span className="rg-brand-ic"><GraduationIcon /></span>

              <span>CampusConnect</span>

            </button>



            {!showLogin ? (

              <>

                <span className="rg-chip">FOR COLLEGES</span>

                <h2>

                  Your college, in front of every <em>student</em> who is searching.

                </h2>



                <ol className="rg-steps" aria-label="Registration steps">

                  {STEPS.map((s, i) => (

                    <li key={s.title} className={`${i === step ? "now" : ""} ${i < step ? "done" : ""}`.trim()}>

                      <button type="button" onClick={() => jumpTo(i)} disabled={i > step}>

                        <span className="rg-dot">{i < step ? <CheckIcon /> : i + 1}</span>

                        <span className="rg-step-txt">

                          <b>{s.title}</b>

                          <small>{s.sub}</small>

                        </span>

                      </button>

                    </li>

                  ))}

                </ol>



                <div className="rg-meter" aria-hidden="true">

                  <span style={{ width: `${progress}%` }} />

                </div>

                <p className="rg-meter-txt">Step {step + 1} of {STEPS.length}</p>

              </>

            ) : (

              <>

                <span className="rg-chip">WELCOME BACK</span>

                <h2>

                  Your <em>student leads</em> are waiting.

                </h2>

                <div className="rg-perks">

                  {PERKS.map(([ic, t, d]) => (

                    <div key={t}>

                      <span>{ic}</span>

                      <p>

                        <b>{t}</b>

                        <small>{d}</small>

                      </p>

                    </div>

                  ))}

                </div>

              </>

            )}



            <div className="rg-lead">

              <div className="rg-lead-top">

                <span>Sample lead</span>

                <em>₹100</em>

              </div>

              <p>

                <small>Student ID</small>

                <b>STU10234</b>

              </p>

              <p>

                <small>12th · Course</small>

                <b>82% · B.Tech CSE</b>

              </p>

              <p>

                <small>Mobile</small>

                <b className="rg-mask">98•••••••• 🔒</b>

              </p>

            </div>

          </div>

        </aside>



        {/* ============ RIGHT: FORM ============ */}

        <main className="rg-main">

          {!showLogin ? (

            <div className="rg-card">

              <div className="rg-top">

                <span className="rg-kicker">{STEPS[step].icon} STEP {step + 1} / {STEPS.length}</span>

                <div className="rg-login-link">

                  Already registered?

                  <button type="button" onClick={() => switchMode(true)}>Log in</button>

                </div>

              </div>



              <h1>{step === 0 ? "Register your college" : STEPS[step].title}</h1>

              <p className="rg-lede">

                {step === 0 ? "Create your college account. Fields marked * are required." : STEPS[step].sub}

              </p>



              <ol className="rg-stepper" aria-label={`Step ${step + 1} of ${STEPS.length}`}>

                {STEPS.map((s, i) => (

                  <li key={s.title} className={`${i === step ? "now" : ""} ${i < step ? "done" : ""}`.trim()}>

                    <span className="rg-sp-dot">{i < step ? <CheckIcon size={18} /> : s.icon}</span>

                    <span className="rg-sp-lbl">{s.title}</span>

                  </li>

                ))}

              </ol>



              <form onSubmit={handleSubmit} noValidate>

                {/* STEP 1 — COLLEGE DETAILS */}

                {step === 0 && (

                  <div className="form-grid rg-pane" key="s0">

                    <Field id="collegeName" label="College name" required full>

                      <input {...bind("collegeName")} type="text" placeholder="Enter your college name" autoComplete="organization" />

                    </Field>



                    <Field id="officialEmail" label="Official email" required>

                      <input {...bind("officialEmail")} type="email" placeholder="admissions@college.edu.in" autoComplete="email" />

                    </Field>



                    <Field id="mobile" label="Mobile number" required>

                      <input {...bind("mobile")} type="tel" inputMode="tel" placeholder="10-digit mobile number" autoComplete="tel" />

                    </Field>



                    <Field id="collegeType" label="College type" required>

                      <Select {...bind("collegeType")} placeholder="Select college type" options={COLLEGE_TYPES} />

                    </Field>



                    <Field id="affiliation" label="Affiliation" required>

                      <Select {...bind("affiliation")} placeholder="Select affiliation" options={AFFILIATIONS} />

                    </Field>



                    <Field id="accreditation" label="Accreditation">

                      <Select {...bind("accreditation")} placeholder="Select accreditation" options={ACCREDITATIONS} />

                    </Field>



                    <Field id="registrationDetails" label="Registration details">

                      <input {...bind("registrationDetails")} type="text" placeholder="Registration / approval number" />

                    </Field>

                  </div>

                )}



                {/* STEP 2 — ADDRESS, STATE, DISTRICT, WEBSITE */}

                {step === 1 && (

                  <div className="form-grid rg-pane" key="s1">

                    <Field id="address" label="College address" required full>

                      <input {...bind("address")} type="text" placeholder="Street, area, city" autoComplete="street-address" />

                    </Field>



                    <Field id="state" label="State" required>

                      <Select {...bind("state")} placeholder="Select state" options={indianStates} />

                    </Field>



                    <Field id="district" label="District" required hint={!formData.state ? "Select a state to choose the district." : ""}>

                      <Select {...bind("district")} placeholder={formData.state ? "Select district" : "Select state first"} options={availableDistricts} disabled={!formData.state} />

                    </Field>



                    <Field id="website" label="Official website" full>

                      <input {...bind("website")} type="url" placeholder="https://www.yourcollege.edu.in" />

                    </Field>

                  </div>

                )}



                {/* STEP 3 — ACCOUNT */}

                {step === 2 && (

                  <div className="form-grid rg-pane" key="s2">

                    <Field id="password" label="Password" required>

                      <PasswordInput {...bind("password")} placeholder="At least 6 characters" autoComplete="new-password" />

                    </Field>



                    <Field id="confirmPassword" label="Confirm password" required>

                      <PasswordInput {...bind("confirmPassword")} placeholder="Re-enter password" autoComplete="new-password" />

                    </Field>



                    <div className="rg-review full">

                      <span className="rg-review-logo">{getInitials(formData.collegeName)}</span>

                      <div>

                        <b>{formData.collegeName}</b>

                        <small>{[formData.collegeType, formData.district, formData.state].filter(Boolean).join(" · ")}</small>

                      </div>

                    </div>



                    <label className="rg-agree full">

                      <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />

                      <span>

                        I confirm these details are correct and agree to the platform terms. Student contact details are unlocked for <b>₹100 per lead</b> and used for admission purposes only. Admin verifies every college before it goes live.

                      </span>

                    </label>

                  </div>

                )}



                {noticeBox}



                <div className="rg-actions">

                  {step > 0 ? <button type="button" className="btn-back" onClick={goBack}>← Back</button> : <span />}

                  <button type="submit" className="submit-button" disabled={busy}>

                    {step < LAST_STEP ? "Continue →" : busy ? "Saving..." : "Register your college"}

                  </button>

                </div>

              </form>

            </div>

          ) : (

            /* LOGIN */

            <div className="rg-card login">

              <div className="login-logo"><GraduationIcon size={30} /></div>

              <h1>College login</h1>

              <p className="login-sub">Sign in to manage your college profile and connect with students.</p>



              {noticeBox}



              <form className="login-form" onSubmit={handleLogin} noValidate>

                <Field id="loginEmail" label="Official email">

                  <input id="loginEmail" type="email" value={loginData.email} onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))} placeholder="Enter official email" autoComplete="email" />

                </Field>



                <Field id="loginPassword" label="Password">

                  <PasswordInput id="loginPassword" name="loginPassword" value={loginData.password} onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))} placeholder="Enter password" autoComplete="current-password" />

                </Field>



                <button type="submit" className="submit-button wide" disabled={busy}>

                  {busy ? "Signing in..." : "Log in to dashboard"}

                </button>

              </form>



              <button type="button" className="back-register" onClick={() => switchMode(false)}>

                New here? Register your college

              </button>



              <ul className="login-trust">

                <li>🔒 Secure login</li>

                <li>✅ Verified colleges</li>

                <li>🎯 ₹100 per lead</li>

              </ul>

            </div>

          )}

        </main>

      </div>

    </>

  );

}



/* =========================

   STYLES

\========================= */



const styles = `

@import url("https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");



* { box-sizing: border-box; }

html, body, #root { margin: 0; padding: 0; width: 100%; min-height: 100%; }

body { font-family: "Plus Jakarta Sans", Inter, system-ui, -apple-system, "Segoe UI", sans-serif; background: #eef3fb; color: #0b1b3a; }

button, input, select, textarea { font-family: inherit; }

#root { width: 100% !important; max-width: none !important; margin: 0 !important; border: 0 !important; text-align: left !important; display: block !important; min-height: 100vh !important; }



.rg {

  --ink: #0b1b3a; --muted: #4d5d7a; --line: #d0dcef; --blue: #2457f5; --blue-d: #1a44d2; --violet: #6d3df0; --cyan: #12c2e9; --mint: #1fd1a5;

  --ease: cubic-bezier(.2, .8, .2, 1);

  display: grid; grid-template-columns: minmax(360px, 38%) 1fr; min-height: 100vh; width: 100%;

  font-size: 17px; line-height: 1.5; color: var(--ink); text-align: left;

}

.rg button:focus-visible, .rg input:focus-visible, .rg select:focus-visible, .rg textarea:focus-visible {

  outline: 3px solid rgba(36, 87, 245, .45); outline-offset: 2px;

}



@keyframes rgUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }

@keyframes rgFloat { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(18px, -22px) scale(1.1); } }

@keyframes rgBob { 50% { transform: translateY(-6px); } }

@keyframes rgPulse { 0% { box-shadow: 0 0 0 0 rgba(36, 87, 245, .45); } 100% { box-shadow: 0 0 0 14px rgba(36, 87, 245, 0); } }

@keyframes rgPulseW { 0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, .5); } 100% { box-shadow: 0 0 0 14px rgba(255, 255, 255, 0); } }

@keyframes rgPop { 0% { transform: scale(0); } 70% { transform: scale(1.25); } 100% { transform: scale(1); } }

@keyframes rgShake { 0%, 100% { transform: none; } 20%, 60% { transform: translateX(-7px); } 40%, 80% { transform: translateX(7px); } }

@keyframes rgShine { to { background-position: 200% 0; } }



/* ---------- LEFT PANEL ---------- */

.rg-side { position: sticky; top: 0; height: 100vh; overflow: hidden; color: #fff; background: linear-gradient(160deg, #0a1450 0%, #0d2290 55%, #0a3a9a 100%); }

.rg-side::after { content: ""; position: absolute; inset: 0; background-image: radial-gradient(rgba(255,255,255,.10) 1.2px, transparent 1.2px); background-size: 26px 26px; mask-image: linear-gradient(180deg, #000 0%, transparent 75%); pointer-events: none; }

.rg-orb { position: absolute; border-radius: 50%; filter: blur(60px); opacity: .32; animation: rgFloat 12s ease-in-out infinite; pointer-events: none; }

.rg-orb.o1 { width: 240px; height: 240px; background: #7c4dff; top: -90px; right: -90px; }

.rg-orb.o2 { width: 200px; height: 200px; background: #12c2e9; bottom: -90px; left: -90px; animation-delay: -4s; }

.rg-orb.o3 { width: 120px; height: 120px; background: #1fd1a5; bottom: -50px; right: -30px; opacity: .22; animation-delay: -8s; }



.rg-side-in { position: relative; z-index: 1; height: 100%; padding: 40px clamp(28px, 3.4vw, 56px); display: flex; flex-direction: column; gap: 24px; overflow-y: auto; }

.rg-side-in > * { animation: rgUp .6s var(--ease) both; }

.rg-side-in > :nth-child(2) { animation-delay: .08s; }

.rg-side-in > :nth-child(3) { animation-delay: .16s; }

.rg-side-in > :nth-child(4) { animation-delay: .24s; }

.rg-side-in > :nth-child(5) { animation-delay: .32s; }

.rg-side-in > :nth-child(6) { animation-delay: .4s; }



.rg-brand { display: inline-flex; align-items: center; gap: 12px; background: none; border: 0; color: #fff; cursor: pointer; padding: 0; font: 800 1.4rem "Bricolage Grotesque", sans-serif; align-self: flex-start; margin-bottom: auto; }

.rg-brand-ic { width: 48px; height: 48px; border-radius: 15px; display: grid; place-items: center; background: rgba(255,255,255,.16); border: 1px solid rgba(255,255,255,.35); transition: transform .4s var(--ease); }

.rg-brand:hover .rg-brand-ic { transform: rotate(-10deg) scale(1.08); }

.rg-chip { align-self: flex-start; font-size: .78rem; font-weight: 800; letter-spacing: .16em; padding: 7px 16px; border-radius: 99px; color: #fff; background: rgba(255,255,255,.16); border: 1px solid rgba(255,255,255,.34); }

.rg-side h2 { margin: 0; color: #fff; font: 800 clamp(1.9rem, 2.5vw, 2.7rem)/1.12 "Bricolage Grotesque", sans-serif; letter-spacing: -.02em; }

.rg-side h2 em { font-style: normal; color: #8ff3ff; background: linear-gradient(90deg, #8ff3ff, #d2c4ff, #8ff3ff); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: rgShine 5s linear infinite; }



.rg-steps { list-style: none; margin: 4px 0 0; padding: 0; position: relative; display: grid; gap: 4px; }

.rg-steps::before { content: ""; position: absolute; left: 21px; top: 24px; bottom: 24px; width: 2px; background: rgba(255,255,255,.28); }

.rg-steps li button { width: 100%; display: flex; align-items: center; gap: 16px; text-align: left; padding: 7px 10px 7px 0; background: none; border: 0; color: #fff; cursor: pointer; }

.rg-steps li button:disabled { cursor: default; }

.rg-steps li button:not(:disabled):hover .rg-dot { transform: scale(1.1); }

.rg-dot { width: 44px; height: 44px; flex: none; border-radius: 50%; display: grid; place-items: center; font-weight: 800; color: #fff; background: #17267a; border: 2px solid rgba(255,255,255,.55); position: relative; z-index: 1; transition: all .35s var(--ease); }

.rg-steps li.now .rg-dot { background: #fff; color: var(--blue-d); border-color: #fff; animation: rgPulseW 1.8s ease-out infinite; }

.rg-steps li.done .rg-dot { background: var(--mint); border-color: var(--mint); color: #04302a; }

.rg-steps li.done .rg-dot svg { animation: rgPop .45s var(--ease) both; }

.rg-step-txt b { display: block; font-size: 1.05rem; color: #e4ecff; }

.rg-step-txt small { color: #cddaff; font-size: .9rem; }

.rg-steps li.now .rg-step-txt b, .rg-steps li.done .rg-step-txt b { color: #fff; }

.rg-meter { height: 7px; border-radius: 9px; background: rgba(255,255,255,.22); overflow: hidden; }

.rg-meter span { display: block; height: 100%; border-radius: 9px; background: linear-gradient(90deg, #8ff3ff, #1fd1a5); transition: width .6s var(--ease); }

.rg-meter-txt { margin: -12px 0 0; font-size: .9rem; font-weight: 600; color: #e4ecff; }



.rg-perks { display: grid; gap: 12px; }

.rg-perks > div { display: flex; gap: 14px; align-items: flex-start; padding: 15px 17px; border-radius: 16px; background: rgba(255,255,255,.11); border: 1px solid rgba(255,255,255,.26); transition: transform .3s var(--ease), background .3s; }

.rg-perks > div:hover { transform: translateX(6px); background: rgba(255,255,255,.17); }

.rg-perks span { font-size: 1.6rem; line-height: 1.2; }

.rg-perks p { margin: 0; }

.rg-perks b { display: block; color: #fff; font-size: 1.05rem; }

.rg-perks small { color: #e4ecff; font-size: .93rem; }



.rg-side-in > .rg-lead { margin-top: auto; padding: 17px 20px; border-radius: 18px; background: rgba(255,255,255,.12); border: 1px solid rgba(255,255,255,.3); width: 100%; animation: rgUp .6s var(--ease) .45s both, rgBob 5s ease-in-out 1.1s infinite; }

.rg-lead-top { display: flex; justify-content: space-between; align-items: center; color: #fff; font-weight: 800; font-size: .82rem; letter-spacing: .1em; text-transform: uppercase; margin-bottom: 8px; }

.rg-lead-top em { font-style: normal; background: #fff; color: var(--blue-d); padding: 2px 12px; border-radius: 99px; letter-spacing: 0; animation: rgPulseW 2.2s ease-out infinite; }

.rg-lead p { margin: 0; display: flex; justify-content: space-between; align-items: center; gap: 10px; padding: 8px 0; border-top: 1px dashed rgba(255,255,255,.34); font-size: .95rem; color: #fff; }

.rg-lead small { color: #cddaff; font-size: .88rem; }

.rg-mask { letter-spacing: .08em; }



/* ---------- RIGHT: FORM ---------- */

.rg-main { position: relative; overflow: hidden; padding: clamp(24px, 4vw, 64px); display: flex; align-items: center; justify-content: center; background: linear-gradient(180deg, #f6f9ff, #e8effb); }

.rg-main::before { content: ""; position: absolute; inset: 0; background-image: radial-gradient(rgba(36,87,245,.10) 1.4px, transparent 1.4px); background-size: 28px 28px; pointer-events: none; }

.rg-main::after { content: ""; position: absolute; width: 420px; height: 420px; right: -160px; top: -160px; border-radius: 50%; background: radial-gradient(circle, rgba(109,61,240,.18), transparent 70%); pointer-events: none; animation: rgFloat 14s ease-in-out infinite; }

.rg-card { position: relative; width: 100%; max-width: 860px; background: #fff; border-radius: 28px; padding: clamp(28px, 3.4vw, 52px); box-shadow: 0 30px 80px -30px rgba(36, 87, 245, .38); border: 1px solid #e0e9f7; overflow: hidden; animation: rgUp .6s var(--ease) both; }

.rg-card::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 6px; background: linear-gradient(90deg, var(--blue), var(--violet), var(--cyan), var(--blue)); background-size: 200% 100%; animation: rgShine 6s linear infinite; }



.rg-top { display: flex; justify-content: space-between; align-items: center; gap: 14px; flex-wrap: wrap; }

.rg-kicker { display: inline-block; font-size: .8rem; font-weight: 800; letter-spacing: .14em; color: var(--blue-d); background: #e6edff; padding: 8px 16px; border-radius: 99px; }

.rg-login-link { display: flex; align-items: center; gap: 10px; padding: 5px 5px 5px 18px; border-radius: 99px; background: #eef3fc; border: 1px solid #dbe5f6; font-size: .96rem; font-weight: 600; color: var(--muted); }

.rg-login-link button { background: var(--ink); color: #fff; border: 0; border-radius: 99px; padding: 9px 20px; font-size: .96rem; font-weight: 700; cursor: pointer; transition: transform .2s, background .2s; }

.rg-login-link button:hover { background: var(--blue); transform: translateY(-1px); }

.rg-card h1, .rg-card.login h1 { margin: 18px 0 6px; color: var(--ink); font: 800 clamp(2rem, 2.8vw, 2.8rem)/1.1 "Bricolage Grotesque", sans-serif; letter-spacing: -.02em; }

.rg-lede, .login-sub { margin: 0; color: var(--muted); font-size: 1.05rem; }



/* labelled stepper: equal columns, connector fills as you go */

.rg-stepper { list-style: none; margin: 28px 0 32px; padding: 0; display: grid; grid-auto-flow: column; grid-auto-columns: 1fr; }

.rg-stepper li { position: relative; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }

.rg-stepper li::before, .rg-stepper li::after { content: ""; position: absolute; top: 22px; right: 50%; width: 100%; height: 3px; border-radius: 3px; }

.rg-stepper li::before { background: #dde6f5; }

.rg-stepper li::after { background: linear-gradient(90deg, var(--blue), var(--cyan)); transform: scaleX(0); transform-origin: left; transition: transform .6s var(--ease); }

.rg-stepper li.done::after, .rg-stepper li.now::after { transform: scaleX(1); }

.rg-stepper li:first-child::before, .rg-stepper li:first-child::after { display: none; }

.rg-sp-dot { position: relative; z-index: 1; width: 46px; height: 46px; display: grid; place-items: center; border-radius: 50%; font-size: 1.2rem; background: #eef3fc; border: 2px solid #cbd8ee; color: var(--muted); transition: all .35s var(--ease); }

.rg-stepper li.now .rg-sp-dot { background: linear-gradient(135deg, var(--blue), var(--violet)); border-color: transparent; color: #fff; animation: rgPulse 1.8s ease-out infinite; }

.rg-stepper li.done .rg-sp-dot { background: var(--mint); border-color: var(--mint); color: #04302a; }

.rg-stepper li.done .rg-sp-dot svg { animation: rgPop .45s var(--ease) both; }

.rg-sp-lbl { font-size: .9rem; font-weight: 700; color: var(--muted); line-height: 1.25; padding: 0 4px; }

.rg-stepper li.now .rg-sp-lbl { color: var(--ink); }



.form-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px 24px; align-items: start; }

.rg-pane > * { animation: rgUp .5s var(--ease) both; }

.rg-pane > :nth-child(2) { animation-delay: .06s; }

.rg-pane > :nth-child(3) { animation-delay: .12s; }

.rg-pane > :nth-child(4) { animation-delay: .18s; }

.rg-pane > :nth-child(5) { animation-delay: .24s; }

.rg-pane > :nth-child(6) { animation-delay: .3s; }

.rg-pane > :nth-child(7) { animation-delay: .36s; }

.form-group { display: flex; flex-direction: column; gap: 8px; min-width: 0; }

.form-group.full, .full { grid-column: 1 / -1; }

.form-group label { font-size: .97rem; font-weight: 700; color: #16294f; transition: color .2s; }

.form-group:focus-within label { color: var(--blue-d); }

.required { color: #d62b44; }



.form-group input, .form-group select {

  width: 100%; height: 56px; padding: 0 16px; font-size: 1.05rem; color: var(--ink); background: #f5f8ff; border: 1.5px solid var(--line); border-radius: 14px; transition: border-color .2s, box-shadow .2s, background .2s, transform .2s;

}

.form-group input::placeholder { color: #667795; opacity: 1; }

.form-group input:hover, .form-group select:hover { border-color: #a4bbe3; }

.form-group input:focus, .form-group select:focus { outline: none; background: #fff; border-color: var(--blue); box-shadow: 0 0 0 5px rgba(36, 87, 245, .14); transform: translateY(-1px); }

.form-group select:disabled { color: #596a88; background: #eaeff8; cursor: not-allowed; }

.field-hint { margin: 0; font-size: .88rem; color: var(--muted); }



.select-wrapper { position: relative; }

.select-wrapper select { appearance: none; -webkit-appearance: none; padding-right: 48px; cursor: pointer; }

.select-arrow { position: absolute; right: 20px; top: 50%; width: 9px; height: 9px; margin-top: -7px; border-right: 2.5px solid var(--blue); border-bottom: 2.5px solid var(--blue); transform: rotate(45deg); pointer-events: none; transition: margin .2s; }

.select-wrapper:focus-within .select-arrow { margin-top: -3px; transform: rotate(225deg); }



.password-wrap { position: relative; }

.password-wrap input { padding-right: 58px; }

.password-toggle { position: absolute; right: 7px; top: 50%; transform: translateY(-50%); width: 42px; height: 42px; display: grid; place-items: center; border: 0; background: transparent; border-radius: 10px; color: var(--muted); cursor: pointer; transition: background .2s, color .2s; }

.password-toggle:hover { background: #e6edff; color: var(--blue); }



.rg-review { display: flex; align-items: center; gap: 16px; padding: 16px 18px; border-radius: 18px; background: linear-gradient(135deg, #eef3ff, #e6f8fc); border: 1px solid #cddcf7; }

.rg-review-logo { width: 60px; height: 60px; flex: none; border-radius: 16px; display: grid; place-items: center; font: 800 1.4rem "Bricolage Grotesque", sans-serif; color: #fff; background: linear-gradient(135deg, var(--blue), var(--violet)); }

.rg-review b { display: block; font-size: 1.1rem; color: var(--ink); }

.rg-review small { color: var(--muted); font-size: .92rem; }



.rg-agree { display: flex; gap: 14px; align-items: flex-start; padding: 16px 18px; border: 1.5px solid var(--line); border-radius: 16px; cursor: pointer; font-size: .97rem; color: #263a60; background: #fbfcff; transition: border-color .2s, background .2s; }

.rg-agree:hover { border-color: var(--blue); background: #f3f7ff; }

.rg-agree input { width: 22px; height: 22px; margin-top: 2px; flex: none; accent-color: var(--blue); cursor: pointer; }



.notice { display: flex; gap: 12px; align-items: flex-start; margin-top: 24px; padding: 14px 18px; border-radius: 14px; font-size: 1rem; font-weight: 600; animation: rgUp .35s var(--ease) both; }

.notice-error { animation: rgShake .45s both; }

.notice-ic { width: 24px; height: 24px; flex: none; border-radius: 50%; display: grid; place-items: center; font-size: .85rem; font-weight: 800; color: #fff; }

.notice-error { background: #fff0f2; color: #8f1a2e; border: 1px solid #ffc3cc; }

.notice-error .notice-ic { background: #d62b44; }

.notice-success { background: #e8fbf3; color: #0a5f43; border: 1px solid #a5e8cc; }

.notice-success .notice-ic { background: #0f9d70; }



.rg-actions { display: flex; justify-content: space-between; align-items: center; gap: 14px; margin-top: 30px; padding-top: 24px; border-top: 1px solid #e4ecf8; }

.submit-button { position: relative; overflow: hidden; border: 0; cursor: pointer; font-size: 1.1rem; font-weight: 800; color: #fff; min-height: 58px; padding: 0 40px; border-radius: 16px; background: linear-gradient(135deg, var(--blue), var(--violet)); box-shadow: 0 16px 34px -14px rgba(36, 87, 245, .8); transition: transform .2s, box-shadow .2s; }

.submit-button::after { content: ""; position: absolute; top: 0; left: -80%; width: 50%; height: 100%; background: linear-gradient(100deg, transparent, rgba(255,255,255,.4), transparent); transform: skewX(-20deg); transition: left .7s; }

.submit-button:hover:not(:disabled)::after { left: 130%; }

.submit-button:hover:not(:disabled) { transform: translateY(-3px); box-shadow: 0 22px 40px -14px rgba(36, 87, 245, .9); }

.submit-button:active:not(:disabled) { transform: translateY(0) scale(.98); }

.submit-button:disabled { opacity: .75; cursor: wait; }

.submit-button.wide { width: 100%; }

.btn-back { min-height: 58px; background: #fff; border: 1.5px solid var(--line); color: var(--ink); font-weight: 700; font-size: 1.05rem; padding: 0 30px; border-radius: 16px; cursor: pointer; transition: border-color .2s, transform .2s; }

.btn-back:hover { border-color: var(--blue); transform: translateX(-3px); }



/* ---------- LOGIN ---------- */

.rg-card.login { max-width: 540px; margin: auto; text-align: center; }

.login-logo { width: 76px; height: 76px; margin: 6px auto 0; border-radius: 24px; display: grid; place-items: center; color: #fff; background: linear-gradient(135deg, var(--blue), var(--violet)); box-shadow: 0 18px 34px -14px rgba(36, 87, 245, .8); animation: rgBob 4s ease-in-out infinite; }

.login-form { display: grid; gap: 20px; margin-top: 26px; text-align: left; }

.login-form > * { animation: rgUp .5s var(--ease) both; }

.login-form > :nth-child(2) { animation-delay: .08s; }

.login-form > :nth-child(3) { animation-delay: .16s; }

.back-register { margin-top: 22px; background: #eef3fc; border: 1px solid #dbe5f6; border-radius: 99px; padding: 12px 24px; color: var(--blue-d); font-weight: 700; font-size: 1rem; cursor: pointer; transition: background .2s, transform .2s; }

.back-register:hover { background: #e2eaff; transform: translateY(-2px); }

.login-trust { list-style: none; margin: 24px 0 0; padding: 18px 0 0; border-top: 1px solid #e4ecf8; display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 22px; font-size: .92rem; font-weight: 600; color: var(--muted); }



/* ---------- RESPONSIVE ---------- */

@media (max-width: 1100px) {

  .rg { grid-template-columns: 1fr; }

  .rg-side { position: relative; height: auto; }

  .rg-side-in { padding: 28px 22px; gap: 16px; }

  .rg-brand { margin-bottom: 0; }

  .rg-side h2 { font-size: 1.7rem; }

  .rg-steps { grid-auto-flow: column; grid-auto-columns: 1fr; gap: 4px; }

  .rg-steps::before { display: none; }

  .rg-steps li button { flex-direction: column; text-align: center; gap: 6px; padding: 4px 0; }

  .rg-step-txt small { display: none; }

  .rg-step-txt b { font-size: .82rem; }

  .rg-dot { width: 38px; height: 38px; }

  .rg-lead, .rg-perks, .rg-meter-txt { display: none; }

  .rg-main { padding: 20px 14px 40px; }

}

@media (max-width: 640px) {

  .rg { font-size: 16px; }

  .form-grid { grid-template-columns: 1fr; }

  .rg-card { border-radius: 22px; padding: 28px 18px 22px; }

  .rg-actions { flex-direction: column-reverse; }

  .rg-actions > * { width: 100%; }

  .rg-top { flex-direction: column; align-items: flex-start; }

  .rg-login-link { width: 100%; justify-content: space-between; }

  .rg-sp-lbl { font-size: .76rem; }

  .rg-sp-dot { width: 40px; height: 40px; }

  .rg-stepper li::before, .rg-stepper li::after { top: 19px; }

}

@media (prefers-reduced-motion: reduce) {

  .rg *, .rg *::before, .rg *::after { animation: none !important; transition: none !important; }

}


/* ---------- FULL-WIDTH AUTH EXPERIENCE ---------- */
.rg {
  display: block;
  min-height: 100vh;
  width: 100%;
  background: #eef3ff;
}
.rg-side { display: none !important; }
.rg-main {
  isolation: isolate;
  min-height: 100vh;
  width: 100%;
  padding: clamp(22px, 4vw, 64px);
  background:
    radial-gradient(circle at 12% 18%, rgba(18,194,233,.20), transparent 28%),
    radial-gradient(circle at 88% 15%, rgba(109,61,240,.17), transparent 30%),
    radial-gradient(circle at 80% 90%, rgba(36,87,245,.13), transparent 32%),
    linear-gradient(135deg, #f8fbff 0%, #edf3ff 48%, #f7f4ff 100%);
}
.rg-main::before {
  opacity: .7;
  background-image: radial-gradient(rgba(36,87,245,.16) 1px, transparent 1px);
  background-size: 25px 25px;
  animation: rgGridDrift 24s linear infinite;
}
.rg-main::after {
  width: min(55vw, 620px);
  height: min(55vw, 620px);
  right: -12%;
  top: -18%;
  background: radial-gradient(circle, rgba(109,61,240,.17), transparent 68%);
  animation: rgFloat 10s ease-in-out infinite;
  z-index: -1;
}
.rg-card {
  width: min(100%, 1080px);
  max-width: 1080px;
  margin: auto;
  padding: clamp(24px, 3.5vw, 52px);
  border: 1px solid rgba(255,255,255,.9);
  border-radius: 30px;
  background: rgba(255,255,255,.91);
  box-shadow: 0 30px 100px rgba(28,56,120,.15), 0 8px 24px rgba(36,87,245,.07);
  backdrop-filter: blur(18px);
  animation: rgCardEnter .75s cubic-bezier(.2,.8,.2,1) both;
}
.rg-card.login { width: min(100%, 620px); max-width: 620px; }
.rg-card h1, .rg-card.login h1 { letter-spacing: -.045em; }
.rg-kicker { animation: rgFadeSlide .6s .08s both; }
.rg-stepper { margin-top: 30px; }
.rg-stepper li { animation: rgFadeSlide .55s both; }
.rg-stepper li:nth-child(2) { animation-delay: .08s; }
.rg-stepper li:nth-child(3) { animation-delay: .16s; }
.form-group input, .form-group select {
  border-radius: 13px;
  background: rgba(246,249,255,.92);
}
.form-group input:focus, .form-group select:focus {
  box-shadow: 0 0 0 4px rgba(36,87,245,.13), 0 8px 22px rgba(36,87,245,.08);
}
.submit-button {
  background: linear-gradient(115deg, #2457f5, #6d3df0, #12aee9, #2457f5);
  background-size: 240% 100%;
  animation: rgButtonGlow 6s ease infinite;
}
.login-logo { box-shadow: 0 18px 45px rgba(36,87,245,.3); }
.rg-review, .rg-agree, .login-trust { animation: rgFadeSlide .55s .12s both; }
@keyframes rgCardEnter {
  from { opacity: 0; transform: translateY(24px) scale(.985); filter: blur(5px); }
  to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}
@keyframes rgFadeSlide {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes rgGridDrift {
  from { background-position: 0 0; }
  to { background-position: 100px 70px; }
}
@keyframes rgButtonGlow {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
@media (max-width: 640px) {
  .rg-main { padding: 18px 12px 28px; }
  .rg-card { padding: 25px 17px 22px; border-radius: 22px; }
  .rg-card.login { padding: 30px 20px; }
}
@media (prefers-reduced-motion: reduce) {
  .rg-main::before, .rg-card, .rg-stepper li, .rg-kicker, .submit-button,
  .rg-review, .rg-agree, .login-trust { animation: none !important; }
}


/* ---------- POLISHED FULL-PAGE V2 ---------- */
.rg-main{
  min-height:100vh;
  padding:clamp(22px,4.5vw,72px);
  display:flex;
  align-items:center;
  justify-content:center;
  background:
    radial-gradient(ellipse at 8% 12%,rgba(40,205,235,.24),transparent 34%),
    radial-gradient(ellipse at 92% 8%,rgba(124,77,255,.22),transparent 32%),
    radial-gradient(ellipse at 78% 100%,rgba(45,104,255,.18),transparent 38%),
    linear-gradient(135deg,#f8fbff,#edf3ff 52%,#f8f5ff);
}
.rg-main::before{
  background-image:radial-gradient(rgba(48,91,180,.18) .8px,transparent .8px);
  background-size:24px 24px;
  animation:rgPatternMove 32s linear infinite;
}
.rg-main::after{
  width:min(70vw,760px);height:min(70vw,760px);right:-24%;top:-32%;
  border:1px solid rgba(255,255,255,.65);
  box-shadow:0 0 0 35px rgba(255,255,255,.12),0 0 0 75px rgba(255,255,255,.08);
  animation:rgOrbPulse 12s ease-in-out infinite;
}
.rg-card{
  position:relative;z-index:1;width:min(100%,1000px);max-width:1000px;
  padding:clamp(25px,3.3vw,48px);border-radius:28px;
  border:1px solid rgba(255,255,255,.95);
  background:rgba(255,255,255,.88);
  box-shadow:0 35px 100px rgba(34,64,130,.16),0 5px 18px rgba(49,91,190,.06);
  backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px);
  animation:rgCardFloatIn .8s cubic-bezier(.16,1,.3,1) both;
}
.rg-card::before{
  content:"";position:absolute;top:0;left:7%;right:7%;height:3px;border-radius:0 0 10px 10px;
  background:linear-gradient(90deg,#6547ff,#14b8e6,#6547ff);background-size:200% 100%;
  animation:rgTopLine 5s linear infinite;
}
.rg-card h1{color:#102044;text-wrap:balance;}
.rg-kicker{letter-spacing:.13em;}
.rg-stepper{margin-top:28px;margin-bottom:28px;}
.rg-stepper li{transition:transform .25s ease;}
.rg-stepper li:hover{transform:translateY(-3px);}
.form-grid{column-gap:22px;row-gap:20px;}
.form-group{min-width:0;animation:rgFieldEnter .45s both;}
.form-group:nth-child(2){animation-delay:.04s}.form-group:nth-child(3){animation-delay:.08s}
.form-group:nth-child(4){animation-delay:.12s}.form-group:nth-child(5){animation-delay:.16s}
.form-group label{display:block;margin-bottom:9px;color:#182d53;font-weight:750;}
.form-group input,.form-group select,.password-wrap input{
  box-sizing:border-box;width:100%;min-width:0;height:48px;padding:0 15px;
  border:1px solid #d7e2f6;border-radius:12px;background:rgba(247,250,255,.96);
  color:#17294b;font-size:14px;transition:border-color .22s,box-shadow .22s,background .22s,transform .22s;
}
.form-group input:hover,.form-group select:hover{border-color:#a8bff7;background:#fff;}
.form-group input:focus,.form-group select:focus,.password-wrap input:focus{
  outline:none;border-color:#4773ff;background:#fff;
  box-shadow:0 0 0 4px rgba(71,115,255,.12),0 8px 22px rgba(71,115,255,.08);
}
/* Fix dropdown arrow alignment: wrapper, select and arrow share the same full-width field */
.select-wrapper{position:relative;display:block;width:100%;min-width:0;}
.select-wrapper select{
  display:block;width:100%;max-width:100%;height:48px;box-sizing:border-box;
  appearance:none;-webkit-appearance:none;-moz-appearance:none;
  padding:0 44px 0 15px;margin:0;line-height:normal;cursor:pointer;
}
.select-wrapper select::-ms-expand{display:none;}
.select-arrow{
  position:absolute;right:17px;top:50%;width:8px;height:8px;margin:0;
  border:0;border-right:2px solid #315cff;border-bottom:2px solid #315cff;
  border-radius:1px;transform:translateY(-70%) rotate(45deg);
  pointer-events:none;transition:transform .22s ease;z-index:2;
}
.select-wrapper:focus-within .select-arrow{transform:translateY(-20%) rotate(225deg);}
.select-wrapper select:disabled{opacity:.58;cursor:not-allowed;}
.submit-button{
  position:relative;overflow:hidden;border:0;border-radius:13px;
  box-shadow:0 10px 24px rgba(55,83,230,.25);transition:transform .22s,box-shadow .22s;
}
.submit-button::after{content:"";position:absolute;inset:-50% auto -50% -45%;width:30%;transform:rotate(20deg);background:rgba(255,255,255,.28);transition:left .6s;}
.submit-button:hover{transform:translateY(-3px);box-shadow:0 16px 30px rgba(55,83,230,.32);}
.submit-button:hover::after{left:130%;}
.rg-card button:not(.password-toggle){transition:transform .2s ease,box-shadow .2s ease;}
.rg-card button:focus-visible{outline:3px solid rgba(48,99,255,.35);outline-offset:3px;}
.notice{animation:rgNoticePop .35s ease both;}
@keyframes rgPatternMove{to{background-position:120px 90px;}}
@keyframes rgOrbPulse{0%,100%{transform:translate3d(0,0,0) scale(1)}50%{transform:translate3d(-22px,18px,0) scale(1.04)}}
@keyframes rgCardFloatIn{from{opacity:0;transform:translateY(24px) scale(.985);filter:blur(4px)}to{opacity:1;transform:translateY(0) scale(1);filter:blur(0)}}
@keyframes rgFieldEnter{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:translateY(0)}}
@keyframes rgTopLine{to{background-position:200% 0}}
@keyframes rgNoticePop{from{opacity:0;transform:translateY(-8px) scale(.98)}to{opacity:1;transform:translateY(0) scale(1)}}
@media(max-width:700px){
  .rg-main{padding:18px 12px 28px;}
  .rg-card{padding:27px 18px 24px;border-radius:22px;}
  .form-grid{column-gap:14px;row-gap:16px;}
  .form-group input,.form-group select,.password-wrap input{height:46px;}
}
@media(prefers-reduced-motion:reduce){
  .rg-main::before,.rg-main::after,.rg-card,.rg-card::before,.form-group,.rg-stepper li,.notice{animation:none!important;}
  .rg-card button,.form-group input,.form-group select{transition:none!important;}
}


/* ---------- V3: stronger contrast, larger text, refreshed login/register ---------- */
.rg-login-link{
  gap:12px;padding:6px 7px 6px 18px;background:#edf3ff;border:1px solid #cfddf8;
  color:#34476b;font-size:16px;font-weight:700;box-shadow:0 7px 20px rgba(40,75,150,.08);
}
.rg-login-link button{
  display:inline-flex;align-items:center;justify-content:center;min-height:42px;min-width:88px;
  padding:10px 20px!important;background:linear-gradient(120deg,#3b50f5,#7554f7)!important;
  color:#fff!important;font-size:15px!important;font-weight:800!important;border:1px solid rgba(255,255,255,.35)!important;
  box-shadow:0 7px 18px rgba(69,79,235,.28);opacity:1!important;text-shadow:none!important;
}
.rg-login-link button:hover{background:linear-gradient(120deg,#263bdc,#5b38e8)!important;box-shadow:0 10px 24px rgba(69,79,235,.38);transform:translateY(-2px) scale(1.02)}
.rg-card{width:min(100%,1060px);padding:clamp(30px,3.8vw,56px);border-radius:30px;background:rgba(255,255,255,.94);box-shadow:0 38px 100px rgba(35,57,125,.18),0 8px 26px rgba(59,80,245,.08)}
.rg-card.login{width:min(100%,650px);max-width:650px;padding:clamp(32px,4vw,58px);border-radius:32px;background:linear-gradient(145deg,rgba(255,255,255,.98),rgba(242,247,255,.96));}
.rg-card h1,.rg-card.login h1{font-size:clamp(2.25rem,3.1vw,3.1rem);line-height:1.08;margin-top:20px;}
.rg-lede,.login-sub{font-size:17px;line-height:1.65;}
.form-group label{font-size:16px;margin-bottom:10px;}
.form-group input,.form-group select,.password-wrap input{height:54px;font-size:16px;padding-left:17px;border-radius:13px;}
.select-wrapper select{height:54px;padding-right:48px;}
.select-arrow{right:19px;width:9px;height:9px;border-right-width:2.5px;border-bottom-width:2.5px;}
.form-grid{column-gap:26px;row-gap:23px;}
.rg-stepper{margin-top:32px;margin-bottom:32px;}
.rg-stepper li{font-size:15px;font-weight:750;}
.submit-button{min-height:52px;padding:0 28px!important;font-size:16px!important;font-weight:800!important;background:linear-gradient(110deg,#4655f5,#7450f4,#149de9)!important;color:#fff!important;}
/* Replace the dark/black account-step icon box with a bright gradient */
.rg-review-logo,.rg-card .login-logo{background:linear-gradient(135deg,#4655f5 0%,#7a4ff2 52%,#12bde8 100%)!important;color:#fff!important;box-shadow:0 14px 30px rgba(78,83,235,.28)!important;border:1px solid rgba(255,255,255,.75);}
.rg-review{background:linear-gradient(120deg,#f2f5ff,#eefaff)!important;border:1px solid #dbe5ff!important;border-radius:18px!important;padding:20px!important;}
.rg-agree{font-size:15px;line-height:1.6;}
.login-trust{font-size:15px;}
.login-form{gap:23px;}
.password-toggle{color:#4055e8!important;}
@media(max-width:700px){
 .rg-card,.rg-card.login{padding:27px 19px 25px;border-radius:23px;}
 .rg-login-link{font-size:14px;padding-left:12px;gap:8px;}
 .rg-login-link button{min-width:76px;padding:9px 14px!important;font-size:14px!important;}
 .rg-card h1,.rg-card.login h1{font-size:clamp(1.9rem,8vw,2.5rem);}
 .form-group label{font-size:14px;}
 .form-group input,.form-group select,.password-wrap input{height:49px;font-size:15px;}
 .select-wrapper select{height:49px;}
}

`;



export default Registeration;
