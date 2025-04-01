import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, animateScroll as scroll } from "react-scroll";
import './App.css'; // for background animation

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
  exit: { opacity: 0, transition: { duration: 1 } },
};

const SectionWrapper = ({ id, children }) => (
  <motion.section
    id={id}
    className="max-w-4xl mx-auto px-4 py-20 border-b border-gray-700"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    exit="exit"
    viewport={{ once: true }}
  >
    {children}
  </motion.section>
);

export default function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="font-sans bg-gray-900 text-white min-h-screen relative bg-animation">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-gray-800 shadow z-50 p-4 flex justify-around text-gray-200">
        {['home', 'about', 'skills', 'experience', 'education', 'projects', 'contact'].map((section) => (
          <Link
            key={section}
            to={section}
            smooth={true}
            duration={500}
            className="cursor-pointer capitalize hover:text-blue-400 transition duration-300"
          >
            {section}
          </Link>
        ))}
      </nav>

      <main className="pt-24">
        {/* Home */}
        <section id="home" className="h-[80vh] flex flex-col justify-center items-center text-center px-4 border-b border-gray-700">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold mb-4"
          >
            Durgamalleswarao Ponnuru
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl text-gray-300"
          >
            Data Engineer | Cloud & Big Data Specialist
          </motion.p>
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            <a href="mailto:dponnuru6@gmail.com" className="text-blue-400 underline">dponnuru6@gmail.com</a>
            <a
              href="/Durgamalleswarao_Resume.pdf"
              download
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
              Download Resume
            </a>
          </div>
        </section>

        {/* About */}
        <SectionWrapper id="about">
          <h2 className="text-4xl font-semibold mb-4 text-blue-400">About Me</h2>
          <p className="text-gray-300">
            Data Engineer with 5+ years of experience across finance, healthcare, and tech. Expert in building data pipelines,
            integrating complex sources, and delivering insights using Spark, AWS, Azure, SQL, Python, and visualization tools like Power BI and Tableau.
          </p>
        </SectionWrapper>

        {/* Skills */}
        <SectionWrapper id="skills">
          <h2 className="text-4xl font-semibold mb-4 text-blue-400">Technical Skills</h2>
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-gray-300">
            <li>Python, R, SQL</li>
            <li>Apache Spark, Hadoop, Kafka</li>
            <li>Snowflake, Redshift, BigQuery</li>
            <li>Power BI, Tableau</li>
            <li>AWS, Azure</li>
            <li>ETL: SSIS, Informatica, Talend</li>
            <li>Airflow, Jenkins, Terraform</li>
            <li>Git, Jira, Agile</li>
          </ul>
        </SectionWrapper>

        {/* Experience */}
        <SectionWrapper id="experience">
          <h2 className="text-4xl font-semibold mb-4 text-blue-400">Experience</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold">Molina Healthcare (Apr 2024 – Present)</h3>
              <ul className="list-disc ml-5 text-gray-300">
                <li>Built data pipelines using AWS Glue & Airflow</li>
                <li>Processed large data using Spark/Databricks</li>
                <li>Built models in Snowflake, dashboards in Power BI/Tableau</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Tata Consultancy Services (Jun 2020 – Aug 2022)</h3>
              <ul className="list-disc ml-5 text-gray-300">
                <li>Used Azure Data Factory, Databricks, and SSIS</li>
                <li>Automated data workflows using Python</li>
                <li>Built dashboards and handled data governance</li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Indian Servers (Intern, May 2018 – May 2020)</h3>
              <ul className="list-disc ml-5 text-gray-300">
                <li>Assisted in ETL pipelines, SQL queries, and Python data analysis</li>
                <li>Created Tableau dashboards and participated in Agile practices</li>
              </ul>
            </div>
          </div>
        </SectionWrapper>

        {/* Education */}
        <SectionWrapper id="education">
          <h2 className="text-4xl font-semibold mb-4 text-blue-400">Education</h2>
          <div className="space-y-6 text-gray-300">
            <div>
              <h3 className="text-2xl font-bold">University of Michigan, Dearborn</h3>
              <p>Master of Science in Data Science (Aug 2022 – Apr 2024)</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">Velagapudi Ramakrishna Siddhartha Engineering College, India</h3>
              <p>Bachelor’s Degree in Computer Science (Aug 2016 – May 2020)</p>
            </div>
          </div>
        </SectionWrapper>

        {/* Projects */}
        <SectionWrapper id="projects">
          <h2 className="text-4xl font-semibold mb-4 text-blue-400">Projects</h2>
          <ul className="list-disc ml-5 text-gray-300">
            <li>🚀 Cloud Data Migration: Moved 10TB from on-prem to AWS</li>
            <li>⚡ Real-Time Streaming: Built Kafka-Spark pipeline for fast insights</li>
            <li>🤖 ML Deployment: Integrated ML models into production pipelines</li>
          </ul>
        </SectionWrapper>

        {/* Contact */}
        <SectionWrapper id="contact">
          <h2 className="text-4xl font-semibold mb-4 text-blue-400">Get in Touch</h2>
          <p>Email: <a href="mailto:dponnuru6@gmail.com" className="text-blue-400">dponnuru6@gmail.com</a></p>
          <p>LinkedIn: <a href="https://www.linkedin.com/in/pdurgamalleswarao/" target="_blank" className="text-blue-400">pdurgamalleswarao</a></p>
        </SectionWrapper>
      </main>

      {/* Scroll to Top Button */}
      {showTopBtn && (
        <button
          onClick={() => scroll.scrollToTop()}
          className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-4 text-xl rounded-full shadow-lg hover:bg-blue-600 transition z-50"
        >
          ↑
        </button>
      )}
    </div>
  );
}
