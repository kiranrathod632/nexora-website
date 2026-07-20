import { useEffect, useState } from "react";
import api from "../api/client";

export default function LearningCenterPage() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      const { data } = await api.get("/learning");
      setCourses(data.courses);
    };
    loadCourses();
  }, []);

  return (
    <section className="card">
      <p className="eyebrow">Nexora Academy</p>
      <h2>Learning Center</h2>
      <div className="grid two">
        {courses.map((course) => (
          <article className="mini-card glass" key={course.id}>
            <h3>{course.title}</h3>
            <p>Level: {course.level}</p>
            <p>Duration: {course.duration}</p>
            <button className="btn btn-outline">View Module</button>
          </article>
        ))}
      </div>
    </section>
  );
}
