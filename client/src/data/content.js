// All website text lives here — edit this file to change the content.

export const COMPANY = {
  name: "IoT",
  suffix: "Automation",
  tagline: "AI + IoT Solutions",
  domain: "iot-automation.co.in",
  email: "contact.iot.automation@gmail.com",
  location: "Ahmedabad, Gujarat, India",
};

// People visitors can call / WhatsApp
export const TEAM = [
  { name: "Chinmay Patel", role: "Founder", phone: "+91 63549 40675", tel: "+916354940675" },
  { name: "Smit Pandya", role: "Co-founder", phone: "+91 93138 19214", tel: "+919313819214" },
];

export const NAV_LINKS = [
  { href: "#services", label: "Services" },
  { href: "#projects", label: "Projects" },
  { href: "#how", label: "How it works" },
  { href: "#solutions", label: "Solutions" },
  { href: "#faq", label: "FAQ" },
];

export const HERO_POINTS = [
  "Hardware + software, one team",
  "AI built into every device",
  "Business & personal projects",
];

export const FLOW_STEPS = [
  { icon: "🌡️", text: "Sensor reads temperature", type: "" },
  { icon: "📡", text: "ESP32 sends data over Wi-Fi / MQTT", type: "" },
  { icon: "🤖", text: "AI detects an abnormal pattern", type: "ai" },
  { icon: "🔔", text: "Alert sent & fan switched on", type: "done" },
];

export const SERVICES = [
  {
    icon: "🏠",
    title: "Smart Home & Office",
    text: "Control lights, fans, locks and appliances from your phone, with voice and AI-based schedules.",
  },
  {
    icon: "🏭",
    title: "Industrial IoT Monitoring",
    text: "Track machines, temperature, energy and production in real time, with alerts before problems happen.",
  },
  {
    icon: "👁️",
    title: "AI Vision & Cameras",
    text: "Cameras that detect people, vehicles, defects or safety gear using on-device AI.",
  },
  {
    icon: "🔌",
    title: "Custom Hardware",
    text: "Embedded devices built on ESP32, Arduino and Raspberry Pi, from prototype to working product.",
  },
  {
    icon: "📱",
    title: "Apps & Dashboards",
    text: "Web and mobile dashboards to see live data, control devices and download reports.",
  },
  {
    icon: "🎓",
    title: "Personal & Student Projects",
    text: "Have a unique idea? We help you design, build and finish your personal or final-year IoT project.",
  },
];

export const STEPS = [
  { title: "Share your idea", text: "Tell us the problem you want to solve, for your business or a personal project." },
  { title: "Design & prototype", text: "We choose the right sensors, boards and AI model and build a working prototype." },
  { title: "Build & integrate", text: "We develop the hardware, firmware, cloud and app, and connect everything together." },
  { title: "Launch & support", text: "We install, test and hand over, then keep supporting and improving it." },
];

export const SOLUTIONS = {
  Home: [
    "Smart lighting and appliance control from your phone",
    "Door and security alerts with AI camera detection",
    "Energy usage tracking to reduce your electricity bill",
  ],
  Industry: [
    "Machine health monitoring and predictive maintenance",
    "Tank level, temperature and pressure monitoring",
    "Automatic shift and production reports",
  ],
  Agriculture: [
    "Soil moisture sensors with automatic irrigation",
    "Weather and crop monitoring dashboard",
    "Water pump control from anywhere",
  ],
  "Personal Projects": [
    "Final-year and student IoT projects with guidance",
    "Home robots, gadgets and hobby builds",
    "Any unique idea, from concept to working device",
  ],
};

export const TECH = [
  "ESP32", "Arduino", "Raspberry Pi", "MQTT", "Python", "Node.js",
  "React", "TensorFlow Lite", "OpenCV", "AWS IoT", "Firebase", "LoRa",
];

export const FAQS = [
  {
    q: "Do you do both hardware and software?",
    a: "Yes. We design the device, write the firmware, build the cloud backend and create the app or dashboard.",
  },
  {
    q: "Can you help with my personal or college project?",
    a: "Absolutely. We take on personal, hobby and student projects and explain everything so you can learn from it.",
  },
  {
    q: "Which devices and platforms do you use?",
    a: "Common boards like ESP32, Arduino and Raspberry Pi, with Wi-Fi, Bluetooth, LoRa or GSM, and cloud platforms like AWS IoT or Firebase.",
  },
  {
    q: "Where are you located?",
    a: "We are based in Ahmedabad, Gujarat. We work with clients across Gujarat and India, on-site or remotely.",
  },
  {
    q: "How long does a project take?",
    a: "A simple prototype can be ready in 1–3 weeks. Larger systems depend on hardware and scope.",
  },
];

export const PROJECT_TYPES = [
  "Smart Home / Office",
  "Industrial IoT",
  "AI Vision",
  "Grading / Sorting Machine",
  "Custom Hardware",
  "App / Dashboard",
  "Personal / Student Project",
  "Other",
];

// ---------- Projects / R&D ----------
// status: "rnd" = R&D in progress, "prototype" = prototype stage, "planned" = open for partners
export const PROJECT_STATUS = {
  rnd: { label: "R&D in progress", color: "#22d3ee" },
  prototype: { label: "Prototype stage", color: "#a78bfa" },
  planned: { label: "Open for partners", color: "#f59e0b" },
};

export const FEATURED_PROJECT = {
  title: "AI Potato Grading Line",
  status: "rnd",
  demo: "/demos/potato-grading.html",
  summary:
    "A machine-vision grading line that inspects every potato, measures its size and weight, detects defects and sorts it automatically into the right grade bin.",
  flow: ["Hopper & singulator", "Roller table", "AI camera inspection", "Air-jet ejection", "Grade bins"],
  features: [
    "Measures width, length, shape ratio and estimated weight of each potato",
    "Detects bruise, greening, rot, crack, scab and sprout defects",
    "Sorts into Large / Medium / Small / Reject with air-jet ejectors",
    "Live dashboard: throughput, output (kg), accuracy and inspection log",
  ],
  tech: ["Machine Vision", "OpenCV", "Edge AI", "PLC / ESP32", "Pneumatics", "Dashboard"],
  note:
    "We have started R&D on this line and are working towards a working prototype. The interactive simulation shows how the system will work.",
};

export const PROJECTS = [
  {
    icon: "🍅",
    title: "Fruit & Vegetable Sorting",
    text: "The same vision platform adapted for tomatoes, onions and mangoes: size, colour and ripeness grading.",
    status: "rnd",
  },
  {
    icon: "🥜",
    title: "Grain & Seed Color Sorter",
    text: "High-speed camera sorting of rice, pulses and seeds to remove discoloured and foreign particles.",
    status: "planned",
  },
  {
    icon: "🎨",
    title: "Paint Shop Defect Detection",
    text: "AI inspection of painted parts on CED / top coat lines to flag craters, runs, dirt and orange peel.",
    status: "prototype",
  },
  {
    icon: "🧴",
    title: "Bottle Fill & Cap Inspection",
    text: "Checks fill level, cap presence and label position on packaging lines, then rejects faulty bottles.",
    status: "planned",
  },
  {
    icon: "⚙️",
    title: "Machine Health Monitoring",
    text: "Vibration and temperature sensors with AI that warn you before a motor or pump fails.",
    status: "prototype",
  },
  {
    icon: "💧",
    title: "Smart Irrigation Controller",
    text: "Soil-moisture sensors and weather data automatically control water pumps for farms.",
    status: "rnd",
  },
];
