import React, { useState } from "react";

type Props = {
  onSearch: (filters: any) => void;
};

export default function SearchForm({ onSearch }: Props) {
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch(form);
  }

  return (
    <form className="bg-white rounded-xl shadow-md p-6 w-full max-w-xl mx-auto" onSubmit={handleSubmit}>
      <div className="mb-4 flex flex-col gap-3">
        <label>Term
          <select name="term" value={form.term} onChange={handleChange} className="input">
            <option value="">Select a term</option>
            <option>Fall 2025</option>
            <option>Winter 2026</option>
          </select>
        </label>
        <label>Department
          <select name="department" value={form.department} onChange={handleChange} className="input">
            <option value="">All Departments</option>
            <option value="COMPSCI">Computer Science</option>
          </select>
        </label>
        <label>Course Level
          <select name="courseLevel" value={form.courseLevel} onChange={handleChange} className="input">
            <option value="">Any Course Level</option>
            <option value="100">100-level</option>
            <option value="200">200-level</option>
          </select>
        </label>
        <label>Course Code
          <input name="courseCode" value={form.courseCode} onChange={handleChange} className="input" placeholder="#####" />
        </label>
        <label className="flex items-center gap-2">
          <input type="checkbox" name="onlineOnly" checked={form.onlineOnly} onChange={handleChange} />
          Show Online Classes Only
        </label>
        <button className="btn-primary w-full mt-2" type="submit">SEARCH</button>
      </div>
    </form>
  );
}
