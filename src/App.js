import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, animateScroll as scroll } from "react-scroll";
import './App.css';
import { Analytics } from "@vercel/analytics/react"

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: "easeOut"
    } 
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut"
    }
  })
};

const SectionWrapper = ({ id, children }) => (
  <motion.section
    id={id}
    className="max-w-6xl mx-auto px-6 py-24"
    variants={sectionVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
  >
    {children}
  </motion.section>
);

const useClickOutside = (ref, callback) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
};

export default function App() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  useClickOutside(menuRef, () => setIsMenuOpen(false));

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
      
      // Update active section based on scroll position
      const sections = ['home', 'about', 'skills', 'experience', 'education', 'projects', 'publications', 'contact'];
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
	const throttledScroll = throttle(handleScroll, 100);
    window.addEventListener("scroll", throttledScroll);
    return () => window.removeEventListener("scroll", throttledScroll);
  }, []);
  
	function throttle(fn, wait) {
    let time = Date.now();
    return function() {
      if ((time + wait - Date.now()) < 0) {
        fn();
        time = Date.now();
      }
    };
  }

  return (
    <div className="font-sans bg-gray-900 text-white min-h-screen relative overflow-hidden bg-animation">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-purple-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-indigo-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-gray-900/90 backdrop-blur-md shadow-lg z-50 p-3 md:p-4">
        <div className="max-w-6xl mx-auto flex justify-center md:justify-between items-center">
		
		{/* Menu button in mobile */}
			<button 
			  className="md:hidden p-2 text-gray-300 mr-2 md:mr-4"
			  onClick={() => setIsMenuOpen(!isMenuOpen)}
			>
			  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
			  </svg>
			</button>
			
		  {/* Name */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold text-blue-400 mx-auto md:mx-0 md:mr-auto"
          >
            Durgamalleswarao Ponnuru
          </motion.div>
		  
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            {['home', 'about', 'skills', 'experience', 'education', 'projects', 'publications', 'contact'].map((section) => (
              <Link
                key={section}
                to={section}
                smooth={true}
                duration={500}
                spy={true}
                className={`cursor-pointer capitalize transition duration-300 relative
                  ${activeSection === section ? 'text-blue-400 font-medium' : 'text-gray-300 hover:text-blue-300'}`}
              >
                {section}
                {activeSection === section && (
                  <motion.span 
                    layoutId="nav-underline"
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
		
		{/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
			ref={menuRef}
			className="md:hidden bg-gray-800/95 mt-3 py-3 px-4 rounded-lg"
		  >
            <div className="flex flex-col gap-4">
              {['home', 'about', 'skills', 'experience', 'education', 'projects', 'Publications', 'contact'].map((section) => (
                <NavLink 
                  key={section} 
                  section={section} 
                  activeSection={activeSection}
                  onClick={() => setIsMenuOpen(false)}
                />
              ))}
            </div>
          </div>
        )}
      </nav>

      <main className="pt-16 md:pt-20">
        {/* Home */}
        <section id="home" className="min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 py-20">
          <div className="w-full max-w-3xl mx-auto">
			<div classname="mb-8 px-2 sm:px-4">
				<motion.h1
				  initial={{ opacity: 0, y: -20 }}
				  animate={{ opacity: 1, y: 0 }}
				  className="text-4xl xs:text-5xl sm:text-6xl font-bold leading-snug bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 break-words px-1 mb-4"
				>
                Durgamalleswarao Ponnuru
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8"
              >
                Data Engineer | Cloud & Big Data Specialist
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 md:gap-6 w-full px-2"
            >
              <a 
                href="mailto:durgaponnuru3@gmail.com" 
                className="px-6 py-3 rounded-full border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10 transition-all duration-300 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                dponnuru6@gmail.com
              </a>
              <a
                href="DurgamalleswaraoPonnuru_Resume.pdf"
                download
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Resume
              </a>
              <a 
                href="tel:+13134782685" 
                className="px-6 py-3 rounded-full border-2 border-purple-400 text-purple-400 hover:bg-purple-400/10 transition-all duration-300 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                (313) 478-2685
              </a>
            </motion.div>
          </div>
          {/* Scroll Down Button */}
			  {/*<motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <Link to="about" smooth={true} duration={500}>
              <div className="animate-bounce w-10 h-10 rounded-full border-2 border-blue-400 flex items-center justify-center cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </Link>
          </motion.div> */}
        </section>

        {/* About */}
        <SectionWrapper id="about">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 relative inline-block">
              <span className="relative z-10">About Me</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-400/30 z-0"></span>
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div 
                custom={0}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
              >
                <p className="text-gray-300 text-lg leading-relaxed">
                  Accomplished Data Engineer with <span className="text-blue-400">4+ years</span> of diverse experience in designing, developing, and optimizing data-driven solutions across multiple industries, including technology, finance, and healthcare. Adept at building robust and scalable data pipelines, integrating complex data sources, and implementing advanced analytics to support business intelligence and data science initiatives.
                </p>
              </motion.div>
              <motion.div 
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={cardVariants}
                className="grid grid-cols-2 gap-4"
              >
                {[
                  { icon: '📊', title: 'Data Pipelines', desc: 'Design & implementation' },
                  { icon: '☁️', title: 'Cloud Platforms', desc: 'AWS & Azure expert' },
                  { icon: '⚡', title: 'Big Data', desc: 'Spark, Hadoop, Kafka' },
                  { icon: '📈', title: 'Visualization', desc: 'Power BI & Tableau' }
                ].map((item, i) => (
                  <div key={i} className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-blue-400/50 transition-all duration-300">
                    <div className="text-2xl mb-2">{item.icon}</div>
                    <h4 className="font-bold text-blue-400">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </SectionWrapper>

        {/* Skills */}
        <SectionWrapper id="skills">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 relative inline-block">
              <span className="relative z-10">Technical Skills</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-400/30 z-0"></span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { 
                  title: 'Programming', 
                  items: ['Python', 'R', 'SQL', 'Java', 'Scala', 'Bash/Shell Scripting'],
                  icon: '💻'
                },
                { 
                  title: 'Big Data', 
                  items: ['Apache Spark', 'Hadoop', 'Kafka', 'Airflow', 'Flink', 'HDFS', 'HBase'],
                  icon: '📊'
                },
                { 
                  title: 'Databases', 
                  items: ['SQL Server', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redshift', 'BigQuery', 'Cassandra', ],
                  icon: '🗃️'
                },
                { 
                  title: 'Visualization', 
                  items: ['Power BI', 'Tableau', 'Plotly', 'Matplotlib', 'Looker'],
                  icon: '📈'
                },
                { 
                  title: 'Cloud Platforms', 
                  items: ['AWS (Glue, S3, Lambda, Athena, Crawler, Quicksight, Cloudwatch)', 'Azure (Data Factory, Synapse)', 'Snowflake', 'Databricks', 'Terraform'],
                  icon: '☁️'
                },
                { 
                  title: 'ETL/Workflow', 
                  items: ['SSIS', 'Informatica', 'Talend', 'Airflow', 'Jenkins', 'Glue', 'dbt'],
                  icon: '⚙️'
                }
              ].map((category, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-400/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="text-xl font-bold text-blue-400">{category.title}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.items.map((skill, j) => (
                      <span key={j} className="px-3 py-1 bg-gray-700/50 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>
		
		

        {/* Experience */}
        <SectionWrapper id="experience">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 relative inline-block">
              <span className="relative z-10">Experience</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-400/30 z-0"></span>
            </h2>
            
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 h-full w-0.5 bg-gray-700 transform -translate-x-1/2"></div>
              
              {[
                {
                  company: "Tata Consultancy Services",
                  period: "Jan 2021 – Aug 2022",
                  role: "Data Engineer",
                  location: "India",
                  bullets: [
                    "Optimized end-to-end MLOps pipelines including data ingestion, transformation, model training, and monitoring using SageMaker and GCP Vertex AI",
                    "Developed ML models using Random Forest, SVM, and KNN with CI/CD deployment via GitHub Actions",
                    "Improved forecasting model accuracy by 15% using ensemble techniques for resource allocation and anomaly detection",
                    "Integrated ML models into frontend apps using React for real-time prediction and responsiveness",
                    "Defined SLAs, ensured data quality, and built microservices for inference using Docker and Python"
                  ]
                },
                {
                  company: "Indian Servers Pvt. Ltd.",
                  period: "Apr 2019 – Dec 2020",
                  role: "Associate Data Engineer",
                  location: "India",
                  bullets: [
                    "Designed and optimized Hadoop/Spark ETL pipelines, improving processing speed by 30%",
                    "Automated model deployments with Argo CD and GitHub Actions for consistency and scalability",
                    "Integrated cloud storage with ML pipelines to enhance system performance and scalability",
                    "Streamlined data governance by improving access and processing standards",
                    "Worked in distributed environments to maintain pipeline robustness and performance"
                  ]
                },
                {
                  company: "Indian Servers",
                  period: "Aug 2018 – Mar 2019",
                  role: "Jr. Data Analyst",
                  location: "India",
                  bullets: [
                    "Optimized ETL workflows using Talend, Apache NiFi, and SQL for data integration and transformation",
                    "Performed data cleaning, validation, and analysis using Python (Pandas, NumPy)",
                    "Created dashboards using Tableau and supported ad-hoc reporting for decision-making",
                    "Collaborated on database design, API-based ingestion, and query optimization",
                    "Used Jira and Git in Agile teams while documenting workflows and ensuring data security"
                  ]
                }
              ].map((exp, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  className={`mb-12 relative ${i % 2 === 0 ? 'md:pr-8 md:text-left' : 'md:pl-8'}`}
                >
                  <div className={`md:w-1/2 p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-blue-400/50 transition-all duration-300 ${i % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                    <div className="absolute top-5 -left-2 md:left-1/2 w-4 h-4 rounded-full bg-blue-400 transform -translate-x-1/2"></div>
                    <h3 className="text-2xl font-bold text-blue-400">{exp.company}</h3>
                    <p className="text-gray-400 mb-1">{exp.role}</p>
                    <p className="text-gray-500 text-sm mb-2">{exp.period} • {exp.location}</p>
                    <ul className="space-y-2 text-gray-300">
                      {exp.bullets.map((bullet, j) => (
                        <li key={j} className="relative pl-4">
                          <span className="absolute left-0 top-2 w-2 h-2 rounded-full bg-blue-400"></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Education */}
        <SectionWrapper id="education">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 relative inline-block">
              <span className="relative z-10">Education</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-400/30 z-0"></span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  institution: "University of Michigan, Dearborn",
                  degree: "Master of Science in Data Science",
                  period: "Aug 2022 – Apr 2024",
                  highlights: ["GPA: 3.8/4.0", "Specialized in Big Data & Cloud Computing", "Thesis on Distributed Data Processing"]
                },
                {
                  institution: "Velagapudi Ramakrishna Siddhartha Engineering College",
                  degree: "Bachelor's Degree in Computer Science",
                  period: "Aug 2016 - May 2020",
                  highlights: ["GPA: 3.6/4.0", "Focus on Database Systems", "Senior Project on Machine Learning"]
                }
              ].map((edu, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-blue-400/50 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold mb-2">{edu.institution}</h3>
                  <p className="text-blue-400 mb-1">{edu.degree}</p>
                  <p className="text-gray-400 mb-4">{edu.period}</p>
                  <ul className="space-y-2 text-gray-300">
                    {edu.highlights.map((highlight, j) => (
                      <li key={j} className="flex items-start">
                        <svg className="w-4 h-4 mt-1 mr-2 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>

        {/* Projects */}
        <SectionWrapper id="projects">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 relative inline-block">
              <span className="relative z-10">Projects & Achievements</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-400/30 z-0"></span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Cloud Data Migration",
                  description: "Successfully migrated 10 TB of data from on-premise to AWS, improving data accessibility and performance",
                  technologies: ["AWS S3", "Glue", "Lambda", "Terraform"],
                  icon: "🚀"
                },
                {
                  "title": "Cloud Data Pipeline Architecture",
                  "description": "Delivered a scalable AWS data platform that transforms raw information into business intelligence through automated pipelines and self-service analytics capabilities",
                  "technologies": ["AWS S3", "AWS Glue", "Amazon Athena", "AWS Glue Data Catalog", "Amazon QuickSight", "Serverless Architecture"],
                  "icon": "📈"
                },
                {
                  title: "Real-Time Data Processing",
                  description: "Implemented a real-time data streaming solution using Apache Kafka and Spark, reducing data latency from hours to seconds",
                  technologies: ["Kafka", "Spark Streaming", "Delta Lake"],
                  icon: "⚡"
                },
                {
                  title: "ML Model Deployment",
                  description: "Collaborated with data science teams to deploy predictive models into production, enhancing business decision-making",
                  technologies: ["Python", "Scikit-learn", "MLflow", "Airflow"],
                  icon: "🤖"
                },
                {
                  title: "Healthcare Analytics Dashboard",
                  description: "Developed interactive dashboards for patient data visualization and reporting",
                  technologies: ["Power BI", "Snowflake", "DAX"],
                  icon: "🏥"
                },
				        {
                  title: "Robust ML Model Training Framework",
                  description: "Implemented data augmentation techniques and alignment regularization to enhance model robustness and generalization, integrated with automated CI/CD and re-training pipelines.",
                  technologies: ['Python', 'TensorFlow', 'CI/CD', 'MLflow', 'Data Augmentation', 'Docker', 'Kubernetes'],
                  icon: "🤖"
                },
				        {
                  title: "Real-Time Helmet Detection System",
                  description: "Developed a real-time surveillance system using OpenCV and machine learning to detect motorcyclists with and without helmets, achieving 87% accuracy.",
                  technologies: ['Python', 'OpenCV', 'HOG', 'LinearSVC', 'MySQL', 'Computer Vision', 'Machine Learning'],
                  icon: "🛡️"
                }	
              ].map((project, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={cardVariants}
                  className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-400/50 transition-all duration-300 group"
                >
                  <div className="text-4xl mb-4">{project.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-blue-400">{project.title}</h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, j) => (
                      <span key={j} className="px-2 py-1 bg-gray-700/50 rounded-full text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </SectionWrapper>	

		{/* publications */}
		<SectionWrapper id="publications">
		  <div className="max-w-4xl mx-auto">
			<h2 className="text-4xl font-bold mb-8 relative inline-block">
			  <span className="relative z-10">Publications</span>
			  <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-400/30 z-0"></span>
			</h2>
			
			<div className="space-y-6">
			  <motion.div
				custom={0}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				variants={cardVariants}
				className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-blue-400/50 transition-all duration-300"
			  >
				
				<h3 className="text-xl font-bold mb-2 text-blue-400">Real Time Automatic Detection of Motorcyclists With and Without a Safety Helmet</h3>
				<p className="text-gray-400 mb-2">2020 IEEE International Conference on Smart Electronics and Communication (ICOSEC)</p>
				
				<div className="mb-4">
				  <h4 className="text-sm font-medium text-gray-400 mb-2">Authors:</h4>
				  <div className="flex flex-wrap gap-3">
					<span className="text-gray-300 text-sm px-3 py-1 bg-gray-700/50 rounded-full flex items-center gap-1">
					  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
					  </svg>
					  Dr. G. Krishna Kishore (Advisor)
					</span>
					<span className="text-gray-300 text-sm px-3 py-1 bg-gray-700/50 rounded-full flex items-center gap-1">
					  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
					  </svg>
					  Lakshmi Padmini Valanukonda
					</span>
					<span className="text-blue-300 text-sm px-3 py-1 bg-blue-900/20 rounded-full flex items-center gap-1">
					  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
					  </svg>
					  Durgamalleswarao Ponnuru
					</span>
					<span className="text-gray-300 text-sm px-3 py-1 bg-gray-700/50 rounded-full flex items-center gap-1">
					  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
					  </svg>
					  TejaSree Parasa
					</span>
				  </div>
				</div>
				<p className="text-gray-300 mb-4">
				  Developed a real-time system using machine learning and computer vision techniques to automatically detect 
				  motorcyclists without helmets from surveillance footage. The system achieved <span className="text-blue-400">87.6% accuracy</span> using 
				  Histogram of Oriented Gradients (HOG) features and Support Vector Classification (SVC). Implemented a complete 
				  pipeline including background subtraction, vehicle classification, helmet detection, and data visualization.
				</p>
				
				<div className="mb-4">
				  <h4 className="text-sm font-semibold text-gray-400 mb-2">KEY CONTRIBUTIONS:</h4>
				  <ul className="space-y-2 text-sm text-gray-300">
					<li className="flex items-start">
					  <svg className="w-3 h-3 mt-1 mr-2 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
					  </svg>
					  Designed and implemented the complete ML pipeline using OpenCV, sklearn, and HOG descriptors
					</li>
					<li className="flex items-start">
					  <svg className="w-3 h-3 mt-1 mr-2 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
					  </svg>
					  Developed a desktop application interface with live streaming and data visualization capabilities
					</li>
					<li className="flex items-start">
					  <svg className="w-3 h-3 mt-1 mr-2 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
					  </svg>
					  Implemented MySQL database integration for storing violation records with timestamps
					</li>
					<li className="flex items-start">
					  <svg className="w-3 h-3 mt-1 mr-2 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
					  </svg>
					  Optimized the system for real-time performance using efficient feature extraction and classification
					</li>
				  </ul>
				</div>
				
				<div className="flex flex-wrap gap-4">
				  <a 
					href="https://doi.org/10.1109/ICOSEC49089.2020.9215415" 
					className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
					target="_blank"
					rel="noopener noreferrer"
				  >
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
					</svg>
					IEEE Xplore
				  </a>
				  <a 
					href="https://doi.org/10.1109/ICOSEC49089.2020.9215415" 
					className="text-gray-400 hover:text-gray-300 text-sm inline-flex items-center gap-1"
					target="_blank"
					rel="noopener noreferrer"
				  >
					DOI: 10.1109/ICOSEC49089.2020.9215415
				  </a>
				  <a 
					href="/padmini2020.pdf" 
					className="text-blue-400 hover:text-blue-300 inline-flex items-center gap-1"
					download
				  >
					<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
					</svg>
					Download PDF
				  </a>
				</div>
				
				<div className="mt-4 flex flex-wrap gap-2">
				  {['Machine Learning', 'Computer Vision', 'OpenCV', 'HOG', 'SVM', 'Python', 'MySQL', 'Real-time Systems'].map((tech, j) => (
					<span key={j} className="px-2 py-1 bg-gray-700/50 rounded-full text-xs">
					  {tech}
					</span>
				  ))}
				</div>
			  </motion.div>
			</div>
		  </div>
		</SectionWrapper>

        {/* Contact */}
        <SectionWrapper id="contact">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-10 relative inline-block z-20">
              <span className="relative z-10">Get in Touch</span>
              <span className="absolute bottom-0 left-0 w-full h-2 bg-blue-400/30 z-0"></span>
            </h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mt-10 bg-gray-800/50 p-8 rounded-xl border border-gray-700 w-full max-w-2xl mx-auto z-10"
            >
              <p className="text-xl mb-6">I'm always open to discussing new opportunities and collaborations.</p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a 
                  href="mailto:dponnuru6@gmail.com" 
                  className="px-6 py-3 rounded-full border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Email Me
                </a>
                <a 
                  href="https://www.linkedin.com/in/pdurgamalleswarao/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                  LinkedIn
                </a>
                <a 
                  href="tel:+13134782685" 
                  className="px-6 py-3 rounded-full border-2 border-purple-400 text-purple-400 hover:bg-purple-400/10 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call Me
                </a>
              </div>
            </motion.div>
          </div>
        </SectionWrapper>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 border-t border-gray-800">
        <div className="max-w-4xl mx-auto px-6">
          <p>© {new Date().getFullYear()} Durgamalleswarao Ponnuru. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      {showTopBtn && (
        <motion.button
          onClick={() => scroll.scrollToTop()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-10 right-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-lg hover:shadow-blue-500/30 transition-all duration-300 z-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </div>
  );
}

// New reusable NavLink component
const NavLink = ({ section, activeSection, onClick }) => (
  <Link
    to={section}
    smooth={true}
    duration={500}
    spy={true}
    onClick={onClick}
    className={`cursor-pointer capitalize transition duration-300 relative py-1 md:py-0
      ${activeSection === section ? 'text-blue-400 font-medium' : 'text-gray-300 hover:text-blue-300'}`}
  >
    {section}
    {activeSection === section && (
      <motion.span 
        layoutId="nav-underline"
        className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400"
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      />
    )}
  </Link>
);

// New reusable ContactButton component
const ContactButton = ({ icon, text, href, type }) => {
  const icons = {
    email: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    download: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
    ),
    phone: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  };

  const baseClasses = "px-4 py-2 md:px-6 md:py-3 rounded-full transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto";
  
  const typeClasses = {
    border: "border-2 border-blue-400 text-blue-400 hover:bg-blue-400/10",
    gradient: "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:shadow-lg hover:shadow-blue-500/30"
  };

  return (
    <a 
      href={href} 
      className={`${baseClasses} ${typeClasses[type]}`}
    >
      {icons[icon]}
      {text}
    </a>
  );
};