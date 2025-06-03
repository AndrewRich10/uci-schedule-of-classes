import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [form, setForm] = useState({
    term: "",
    department: "",
    courseLevel: "",
    courseCode: "",
    geCategory: "",
    instructor: "",
    days: "",
    time: "",
    onlineOnly: false,
  });
  const navigate = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    navigate("/results", { state: form });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f3]">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-lg p-0">
        {/* Header */}
        <div className="bg-uci-blue rounded-t-xl p-4 flex items-center">
          <span className="text-white text-3xl font-bold mr-4">UCI</span>
          <span className="text-white text-lg font-medium">University Registrar</span>
        </div>
        {/* Form Body */}
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-6">Schedule of Classes</h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Column 1 */}
              <div className="flex flex-col gap-4">
                <label>
                  <span className="block font-semibold">Term</span>
                  <select name="term" value={form.term} onChange={handleChange} className="input mt-1">
                    <option value="">Select a term</option>
                    <option value="Fall 2025">Fall 2025</option>
                    <option value="Winter 2026">Winter 2026</option>
                    <option value="Spring 2026">Spring 2026</option>
                    <option value="Summer Session I 2026">Summer Session I 2026</option>
                    <option value="Summer Session II 2026">Summer Session II 2026</option>
                  </select>
                </label>
                <label>
                  <span className="block font-semibold">Department</span>
                  <select name="department" value={form.department} onChange={handleChange} className="input mt-1">
                    <option value="">Include All Departments</option>
                    <option value="COMPSCI">Computer Science</option>
                    <option value="MATH">Mathematics</option>
                    <option value="STATS">Statistics</option>
                    <option value="PHYSICS">Physics</option>
                    <option value="CHEM">Chemistry</option>
                    <option value="BIO SCI">Biological Sciences</option>
                    <option value="ENGR">Engineering</option>
                    <option value="HUMAN">Humanities</option>
                    <option value="IN4MATX">Informatics</option>
                    {/* Add more as needed */}
                  </select>
                </label>
                <label>
                  <span className="block font-semibold">Course Level</span>
                  <select name="courseLevel" value={form.courseLevel} onChange={handleChange} className="input mt-1">
                    <option value="">Any Course Level</option>
                    <option value="1-99">Lower Division (1-99)</option>
                    <option value="100-199">Upper Division (100-199)</option>
                    <option value="200-299">Graduate (200-299)</option>
                  </select>
                </label>
                <label>
                  <span className="block font-semibold">Course Code</span>
                  <input name="courseCode" value={form.courseCode} onChange={handleChange} className="input mt-1" placeholder="e.g., 34020" />
                </label>
              </div>
              {/* Column 2 */}
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" name="onlineOnly" checked={form.onlineOnly} onChange={handleChange} className="mr-2" />
                  <span className="font-semibold">Show Online Classes Only</span>
                </label>
                <label>
                  <span className="block font-semibold">GE Category</span>
                  <select name="geCategory" value={form.geCategory} onChange={handleChange} className="input mt-1">
                    <option value="">Do Not Filter for (GE) Categories</option>
                    <option value="GE Ia">GE Ia - Lower-division Writing</option>
                    <option value="GE Ib">GE Ib - Upper-division Writing</option>
                    <option value="GE II">GE II - Science & Technology</option>
                    <option value="GE III">GE III - Social & Behavioral Sciences</option>
                    <option value="GE IV">GE IV - Arts & Humanities</option>
                    <option value="GE V">GE V - Math</option>
                    <option value="GE VI">GE VI - Language Other Than English</option>
                    <option value="GE VII">GE VII - Multicultural Studies</option>
                    <option value="GE VIII">GE VIII - International/Global Issues</option>
                  </select>
                </label>
                <label>
                  <span className="block font-semibold">Instructor</span>
                  <input name="instructor" value={form.instructor} onChange={handleChange} className="input mt-1" placeholder="Ex: Thornton" />
                </label>
                <label>
                  <span className="block font-semibold">Days</span>
                  <input name="days" value={form.days} onChange={handleChange} className="input mt-1" placeholder="e.g., Mon, Wed" />
                </label>
                <label>
                  <span className="block font-semibold">Time</span>
                  <input name="time" value={form.time} onChange={handleChange} className="input mt-1" placeholder="e.g., 9:00 AM" />
                </label>
              </div>
            </div>
            <div className="flex justify-end mt-8">
              <button className="btn-primary px-10" type="submit">SEARCH</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
