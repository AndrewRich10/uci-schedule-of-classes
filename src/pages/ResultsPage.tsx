import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultsList from "../components/ResultsList";
import CourseDetailModal from "../components/CourseDetailModal";
import { Course } from "../types";

// Example mock courses (add or adapt as needed)
const mockCourses: Course[] = [
  {
    code: "COMPSCI 118",
    courseCode: "34030",
    title: "Intro to VR",
    term: "Winter 2026",
    geCategory: ["GE II"],
    units: 4,
    instructor: "MAJUMDER, A.",
    time: "9:00 - 9:50",
    location: "SH 134",
    status: "OPEN",
    enrolled: 61,
    capacity: 80,
    days: ["Mon", "Wed", "Fri"],
    modality: "In-Person",
    description: "Introduction to virtual reality concepts.",
    prerequisites: "",
  },
  {
    code: "COMPSCI 122B",
    courseCode: "34070",
    title: "PROJ IN DATA & WEB APPS",
    term: "Spring 2026",
    geCategory: ["GE V"],
    units: 4,
    instructor: "HEROLD, J.",
    time: "5:00 - 6:20p",
    location: "DBH 1100",
    status: "CLOSED",
    enrolled: 174,
    capacity: 174,
    days: ["Tue", "Thu"],
    modality: "In-Person",
    description: "Project-based data and web applications.",
    prerequisites: "",
  },
  {
    code: "COMPSCI 132",
    courseCode: "34100",
    title: "COMPUTER NETWORKS",
    term: "Fall 2025",
    geCategory: ["GE II", "GE V"],
    units: 4,
    instructor: "LI, Z.",
    time: "2:00-3:20p",
    location: "HIB 100",
    status: "OPEN",
    enrolled: 173,
    capacity: 273,
    days: ["Tue", "Thu"],
    modality: "In-Person",
    description: "Study of computer networking concepts.",
    prerequisites: "",
    discussionSections: [
      {
        days: ["Wed"],
        time: "10:00-10:50",
        instructor: "SUN, D.",
        enrolled: 33,
        capacity: 52,
        location: "PCB 1300"
      },
      {
        days: ["Wed"],
        time: "12:00-12:50",
        instructor: "LYU, C.",
        enrolled: 37,
        capacity: 49,
        location: "ELH 110"
      }
    ]
  },
  {
    code: "COMPSCI 121",
    courseCode: "34040",
    title: "INFORMATION RETRIEVAL",
    term: "Fall 2025",
    geCategory: ["GE II"],
    units: 4,
    instructor: "MOSHIPOUR, M.",
    time: "12:20-1:50",
    location: "HIB 100",
    status: "OPEN",
    enrolled: 6,
    capacity: 129,
    days: ["Tue", "Thu"],
    modality: "Online",
    description: "An introduction to information retrieval including indexing, retrieval, classifying, and clustering text and multimedia documents.",
    prerequisites: "(I&C SCI 45C or I&C SCI 45J) and (STATS 7 or STATS 67)",
  },
  {
    code: "COMPSCI 117",
    courseCode: "34020",
    title: "PROJ IN COMP VISION",
    term: "Spring 2026",
    geCategory: ["GE II", "GE V"],
    units: 4,
    instructor: "FOWLKES, C.",
    time: "11:00-12:20p",
    location: "ICS 174",
    status: "OPEN",
    enrolled: 105,
    capacity: 120,
    days: ["Tue", "Thu"],
    modality: "In-Person",
    description: "A project-based introduction to computer vision.",
    prerequisites: "",
  },
  {
    code: "COMPSCI 221",
    courseCode: "35010",
    title: "Artificial Intelligence",
    term: "Winter 2026",
    geCategory: ["GE III"],
    units: 4,
    instructor: "SMITH, J.",
    time: "10:00-11:20a",
    location: "DBH 1500",
    status: "OPEN",
    enrolled: 48,
    capacity: 60,
    days: ["Mon", "Wed"],
    modality: "In-Person",
    description: "Advanced concepts in artificial intelligence and machine learning.",
    prerequisites: "COMPSCI 121, MATH 3A"
  },
  {
    code: "COMPSCI 222",
    courseCode: "35015",
    title: "Advanced Data Structures",
    term: "Spring 2026",
    geCategory: ["GE V"],
    units: 4,
    instructor: "LEE, S.",
    time: "3:30-4:50p",
    location: "ICS 254",
    status: "CLOSED",
    enrolled: 60,
    capacity: 60,
    days: ["Tue", "Thu"],
    modality: "In-Person",
    description: "Data structures for advanced applications and research.",
    prerequisites: "COMPSCI 161"
  },
  {
    code: "MATH 205",
    courseCode: "40120",
    title: "Real Analysis I",
    term: "Fall 2025",
    geCategory: ["GE V"],
    units: 4,
    instructor: "JONES, E.",
    time: "8:00-9:20a",
    location: "RH 210",
    status: "OPEN",
    enrolled: 28,
    capacity: 35,
    days: ["Mon", "Wed", "Fri"],
    modality: "In-Person",
    description: "First course in rigorous analysis of real-valued functions.",
    prerequisites: "MATH 120A"
  },
  {
    code: "STATS 210",
    courseCode: "40210",
    title: "Statistical Methods II",
    term: "Winter 2026",
    geCategory: ["GE V"],
    units: 4,
    instructor: "GARCIA, M.",
    time: "6:00-7:20p",
    location: "ST 120",
    status: "OPEN",
    enrolled: 21,
    capacity: 30,
    days: ["Mon", "Wed"],
    modality: "Online",
    description: "Intermediate statistical inference and methods.",
    prerequisites: "STATS 110"
  },
  {
    code: "PHYSICS 202A",
    courseCode: "50100",
    title: "Classical Mechanics",
    term: "Fall 2025",
    geCategory: ["GE II"],
    units: 4,
    instructor: "ZHANG, P.",
    time: "2:00-3:20p",
    location: "PSC 120",
    status: "OPEN",
    enrolled: 34,
    capacity: 40,
    days: ["Tue", "Thu"],
    modality: "In-Person",
    description: "Advanced treatment of Newtonian and Lagrangian mechanics.",
    prerequisites: "PHYSICS 50"
  },
  {
    code: "BIO SCI 200",
    courseCode: "60010",
    title: "Advanced Molecular Biology",
    term: "Spring 2026",
    geCategory: ["GE II", "GE VII"],
    units: 4,
    instructor: "MORRIS, A.",
    time: "12:00-1:20p",
    location: "BIO 101",
    status: "OPEN",
    enrolled: 50,
    capacity: 50,
    days: ["Mon", "Wed"],
    modality: "Hybrid",
    description: "Cutting-edge topics in gene expression and regulation.",
    prerequisites: "BIO SCI 99"
  },
  {
    code: "ENGR 210",
    courseCode: "70025",
    title: "Engineering Management",
    term: "Fall 2025",
    geCategory: ["GE III"],
    units: 4,
    instructor: "JOHNSON, L.",
    time: "5:00-6:20p",
    location: "ENGR 120",
    status: "OPEN",
    enrolled: 40,
    capacity: 60,
    days: ["Tue", "Thu"],
    modality: "In-Person",
    description: "Principles and practices in engineering project management.",
    prerequisites: ""
  },
  {
    code: "CHEM 201",
    courseCode: "80012",
    title: "Organic Chemistry II",
    term: "Winter 2026",
    geCategory: ["GE II"],
    units: 4,
    instructor: "PATEL, R.",
    time: "4:00-5:20p",
    location: "NS 210",
    status: "CLOSED",
    enrolled: 85,
    capacity: 85,
    days: ["Mon", "Wed", "Fri"],
    modality: "In-Person",
    description: "Second quarter of organic chemistry with lab.",
    prerequisites: "CHEM 200"
  },
  {
    code: "HUMAN 202",
    courseCode: "90003",
    title: "Critical Theory",
    term: "Spring 2026",
    geCategory: ["GE IV", "GE VII"],
    units: 4,
    instructor: "ANDERSON, V.",
    time: "9:30-10:50a",
    location: "HH 202",
    status: "OPEN",
    enrolled: 25,
    capacity: 30,
    days: ["Tue", "Thu"],
    modality: "In-Person",
    description: "Key texts in critical theory and humanistic inquiry.",
    prerequisites: ""
  },
  {
    code: "IN4MATX 231",
    courseCode: "56010",
    title: "User Interaction Design",
    term: "Fall 2025",
    geCategory: ["GE IV"],
    units: 4,
    instructor: "BROWN, T.",
    time: "1:00-2:20p",
    location: "ICS 228",
    status: "OPEN",
    enrolled: 49,
    capacity: 60,
    days: ["Mon", "Wed"],
    modality: "In-Person",
    description: "Principles of design for interactive systems.",
    prerequisites: "IN4MATX 131"
  }
];


type ResultsPageProps = {
  onAddToCalendar?: (course: Course) => void;
};

export default function ResultsPage({ onAddToCalendar }: ResultsPageProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const filters = location.state || {};
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  function extractCourseNumber(code: string): number | null {
    const parts = code.split(" ");
    if (parts.length < 2) return null;
    const num = parseInt(parts[1].replace(/[^\d]/g, ""), 10);
    return isNaN(num) ? null : num;
  }

  const results = mockCourses.filter((c) => {
    if (filters.onlineOnly && !c.modality.toLowerCase().includes("online")) return false;
    if (filters.term && filters.term.trim() !== "" && c.term.trim() !== filters.term.trim()) return false;
    if (filters.department && filters.department !== "" && !c.code.startsWith(filters.department)) return false;
    if (filters.courseCode && filters.courseCode !== "" && c.courseCode !== filters.courseCode) return false;
    if (filters.instructor && filters.instructor !== "" && !c.instructor.toLowerCase().includes(filters.instructor.toLowerCase())) return false;
    if (filters.courseLevel && filters.courseLevel !== "") {
      const num = extractCourseNumber(c.code);
      if (num === null) return false;
      if (filters.courseLevel === "1-99" && !(num >= 1 && num <= 99)) return false;
      if (filters.courseLevel === "100-199" && !(num >= 100 && num <= 199)) return false;
      if (filters.courseLevel === "200-299" && !(num >= 200 && num <= 299)) return false;
    }
    if (filters.days && filters.days.trim() !== "") {
      const userDays = filters.days
        .split(/[,\s]+/)
        .map((d: string) => d.trim().toLowerCase())
        .filter(Boolean);
      const courseDays = c.days.map((d) => d.trim().toLowerCase());
      const match = userDays.some((d: string) => courseDays.some(cd => cd.startsWith(d) || cd === d));
      if (!match) return false;
    }
    if (
      filters.geCategory &&
      filters.geCategory !== "" &&
      Array.isArray(c.geCategory) &&
      !c.geCategory.includes(filters.geCategory)
    ) return false;
    return true;
  });

  return (
    <div>
      {/* Header */}
      <header className="bg-uci-blue text-white p-6 flex justify-between items-center">
        <div className="bg-uci-blue rounded-t-xl flex items-center">
          <span className="text-white text-7xl font-bold mr-4">UCI</span>
          <span className="text-white text-lg font-medium">University Registrar</span>
        </div>
        <button
          className="bg-white text-uci-blue px-4 py-2 rounded font-semibold shadow hover:bg-blue-50"
          onClick={() => navigate("/")}
        >
          &larr; New Search
        </button>
      </header>

      <main className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto mt-8">
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <div className="font-bold mb-2">Search Criteria</div>
            {Object.entries(filters).map(([k, v]) => (
              v ? <div key={k}><b>{k}:</b> {v.toString()}</div> : null
            ))}
          </div>
        </div>
        <div className="w-full h-[70vh] overflow-y-auto overflow-x-hidden px-2 md:px-4 bg-transparent">
          <ResultsList courses={results} onSelect={setSelectedCourse} onAddToCalendar={onAddToCalendar} />
        </div>
      </main>
      <CourseDetailModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />
    </div>
  );
}