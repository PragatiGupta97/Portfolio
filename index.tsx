import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Download, 
  Code, 
  Gamepad2, 
  BookOpen, 
  Anchor, 
  Music, 
  Dumbbell, 
  Plane,
  ExternalLink,
  Menu,
  X,
  Heart,
  Briefcase,
  GraduationCap,
  Sparkles,
  MapPin,
  Star,
  Camera,
  Palette
} from 'lucide-react';

// --- Types ---

interface Project {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  image?: string;
  featured?: boolean;
}

interface Experience {
  role: string;
  company: string;
  date: string;
  description: string[];
}

interface Education {
  degree: string;
  institution: string;
  date: string;
  description?: string;
}

interface Hobby {
  label: string;
  detail: string;
  image: string;
  icon: React.ReactNode;
  color: string;
}

interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  expiryDate?: string;
  skills?: string[];
}

// --- CENTRALIZED DATA (Populated from PDF Content) ---

const userData = {
  personal: {
    name: "Pragati Gupta",
    title: "AI & Cloud Engineer",
    tagline: "Innovating across the spectrum from Product Giants to Startups. Passionate about GenAI, LLMs, and building inclusive tech.",
    email: "pragatigupta.97@gmail.com",
    location: "Helsinki Metropolitan Area, Finland",
    image: "./DSC04412.JPG", // TODO: Replace with your local image path (e.g., './profile.jpg')
    social: {
      github: "#", // Placeholder as specific GitHub wasn't in OCR, but Bitbucket skill was present.
      linkedin: "https://www.linkedin.com/in/ds-pragati-gupta/",
    },
    about: [
      "I am a Machine Learning and Cloud Engineer specialised in designing and developing advanced AI systems including large language models (LLMs), generative AI (GenAI) solutions, and intelligent agentic architectures—built on scalable and fault-tolerant cloud infrastructure.",
      "Throughout my career, I’ve collaborated with cross-functional teams across different countries to deliver high impact AI and ML solutions. My work spans traditional ML, GenAI-driven workflows, and autonomous agentic systems that optimise and automate complex processes.",
      "As a 'Woman in Tech,' I am passionate about breaking down barriers and encouraging more women to pursue careers in the field. I believe that diverse perspectives are critical to creating impactful, responsible AI products."
    ]
  },
  hobbies: [
    { 
      label: "Gaming", 
      detail: "The Witcher 3 Favorite", 
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=800",
      icon: <Gamepad2 className="text-white" />,
      color: "from-purple-600 to-indigo-600"
    },
    { 
      label: "Backpacking", 
      detail: "Exploring the World", 
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=800",
      icon: <Plane className="text-white" />,
      color: "from-green-500 to-emerald-500"
    },
    { 
      label: "Reading", 
      detail: "History & Fantasy", 
      image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=800",
      icon: <BookOpen className="text-white" />,
      color: "from-indigo-500 to-blue-500"
    },
    { 
      label: "Painting", 
      detail: "Artistic Expression", 
      image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=800",
      icon: <Palette className="text-white" />,
      color: "from-pink-500 to-rose-500"
    },
    { 
      label: "Photography", 
      detail: "Capturing Moments", 
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800",
      icon: <Camera className="text-white" />,
      color: "from-orange-500 to-red-500"
    },
    { 
      label: "Advocacy", 
      detail: "Women in Tech", 
      image: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
      icon: <Heart className="text-white" />,
      color: "from-blue-500 to-cyan-500"
    }
  ] as Hobby[],
  experiences: [
    {
      role: "Machine Learning Engineer",
      company: "Solita",
      date: "04/2024 – Present",
      description: [
        "Designing project architectures for generative AI applications and managing full product lifecycles.",
        "Building scalable AI solutions utilizing large language models deployed on modern cloud infrastructure (Azure Databricks).",
        "Developing full-stack GenAI solutions and implementing robust LLMOps pipelines."
      ]
    },
    {
      role: "Machine Learning and Cloud Engineer",
      company: "Truemed Oy",
      date: "02/2023 – 03/2024",
      description: [
        "Designed and developed ML/Deep Learning algorithms to improve counterfeit detection and operational efficiency.",
        "Built scalable, fault-tolerant AWS cloud infrastructure from scratch.",
        "Implemented MLOps strategies, CI/CD pipelines, and iOS ML app development using Swift and Flutter."
      ]
    },
    {
      role: "Senior Analyst - Data Science",
      company: "Accenture Nordics",
      date: "11/2021 – 02/2023",
      description: [
        "Designed and implemented ML solutions on Cloud and Edge environments for banking customers.",
        "Delivered high-quality software solutions in agile environments using Java, JavaScript, and Cloud technologies.",
        "Orchestrated CI/CD workflows and pushed DevOps practices."
      ]
    },
    {
      role: "Master Thesis Worker - Data Science",
      company: "Helvar Oy",
      date: "01/2021 – 09/2021",
      description: [
        "Developed deep learning models using FMCW Radar data to predict human presence for intelligent lighting control.",
        "Achieved 98.6% performance accuracy, proving effectiveness over PIR sensors."
      ]
    },
    {
      role: "Software Developer (ML/DS)",
      company: "SAP Labs Pvt Ltd",
      date: "01/2017 – 09/2019",
      description: [
        "Developed ML/AI add-ons (Chatbots, Recommender Systems) for SAP Procurement solutions.",
        "Served 400+ incidents for Premium customers and managed technical/functional areas.",
        "Accomplished 2 SAP Certifications (Fiori App Developer, System Admin)."
      ]
    }
  ] as Experience[],
  projects: [
    {
      title: "Multi-Agent AI Platform",
      description: "Led end-to-end design of a multi-agent platform on Databricks for a global engineering team to unify data from disconnected third-party systems. Built LLM-powered agents for autonomous data processing, fully automated ingestion pipelines, and semantic search capabilities using vector embeddings. Reduced manual data gathering and enabled intelligent workflows.",
      tech: ["Databricks", "Python", "PySpark", "LLMs", "MLflow"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Patent Analysis Automation",
      description: "Designed and developed a full-stack AI system for a global tech company that reduced patent claim analysis time from 3 weeks to 0.5 hours per patent. Implemented multi-agent LLM workflows with prompt engineering, deployed on Azure cloud with MLOps pipelines. Now used globally across multiple regions.",
      tech: ["Azure", "Vue.js", "Flask", "OpenAI", "Docker"],
      image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Turbocharger Failure Prediction",
      description: "Developed production-ready ML models on Databricks to predict turbocharger failures for a global industrial company. Built data pipelines for time-series sensor data processing, feature engineering, and model training. Enabled proactive maintenance interventions, reducing unplanned downtime and improving operational reliability in the energy balancing market.",
      tech: ["Databricks", "PySpark", "MLflow", "Time-Series", "Delta Lake"],
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Intelligent Lighting Control System",
      description: "Developed deep learning models using FMCW Radar data to predict human presence for automated lighting control. Achieved 98.6% accuracy, proving effectiveness over traditional PIR sensors. Built end-to-end pipeline from data collection to model deployment, enabling energy-efficient intelligent building automation.",
      tech: ["Deep Learning", "FMCW Radar", "Python", "TensorFlow", "IoT"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Counterfeit Detection System",
      description: "Built end-to-end computer vision solution using OpenCV and TensorFlow to detect counterfeit pharmaceuticals. Managed MLOps on AWS with Lambda functions, developed Vue.js frontend and Flask backend, and converted models for iOS deployment via C# and Flutter. Enabled real-time field inspections and improved accuracy for inspection officers.",
      tech: ["Computer Vision", "AWS", "TensorFlow", "Vue.js", "iOS/Flutter"],
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "AI-Powered Procurement Assistant",
      description: "Developed intelligent chatbots and recommender systems for enterprise procurement solutions at a global software company. Built ML models to automate vendor recommendations and streamline procurement workflows. Improved user experience and reduced manual decision-making time for procurement teams serving 400+ premium customers.",
      tech: ["NLP", "Chatbots", "Recommender Systems", "Python", "SAP"],
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Music Analytics for Social Media",
      description: "Built ML models to identify TikTok-friendly songs for a major European music label. Analyzed audio features, engagement patterns, and viral trends to predict song success on social media platforms. Achieved 95% accuracy in identifying potential hits, helping the label optimize their digital strategy and talent scouting efforts.",
      tech: ["Python", "Pandas", "Random Forests", "Audio Analysis", "ML"],
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Pan-European Integration Platform",
      description: "Built a unified system for Europe's largest debt collection company to integrate operations across multiple countries. Implemented Apache Kafka for real-time data streaming and developed scalable microservices with Spring Boot to handle country-specific workflows while ensuring GDPR compliance and standardized processes across borders.",
      tech: ["Apache Kafka", "Spring Boot", "Microservices", "GDPR"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Banking ML Solutions",
      description: "Designed and implemented machine learning solutions on Cloud and Edge environments for banking customers at a Nordic consulting firm. Delivered high-quality software in agile environments, orchestrated CI/CD workflows, and pushed DevOps practices. Enabled real-time fraud detection and customer behavior analysis for financial institutions.",
      tech: ["ML", "Cloud", "Edge Computing", "Java", "JavaScript", "CI/CD"],
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=80&w=800"
    }
  ] as Project[],
  skills: {
    technical: [
      "GenAI & LLMs", "Python (Expert)", "PySpark", "TensorFlow/PyTorch", "Databricks", 
      "AWS/Azure", "MLOps/LLMOps", "Computer Vision", "React/Vue.js", "Docker", "Git", "SQL/NoSQL"
    ],
    soft: [
      "Strategic Thinking", "Cross-functional Collaboration", "Mentoring", "Agile/Scrum", 
      "Public Speaking", "Problem Solving", "Diversity Advocacy"
    ]
  },
  education: [
    {
      degree: "M.S. in Data Science",
      institution: "Aalto University, Finland",
      date: "09/2020 – 10/2021"
    },
    {
      degree: "M.S. in Data Science",
      institution: "Politecnico di Milano, Italy",
      date: "09/2019 – 09/2020"
    },
    {
      degree: "B.E. in Computer Science",
      institution: "Thapar University, India",
      date: "05/2013 – 06/2017"
    }
  ] as Education[],
  certifications: [
    {
      name: "Databricks Certified Machine Learning Professional",
      issuer: "Databricks",
      date: "Jan 2026",
      expiryDate: "Jan 2028",
      credentialId: "172147823"
    },
    {
      name: "Databricks Certified Generative AI Engineer Associate",
      issuer: "Databricks",
      date: "Dec 2025",
      expiryDate: "Dec 2027",
      credentialId: "168567915"
    },
    {
      name: "Automation Pro I",
      issuer: "Workato",
      date: "Sep 2025"
    },
    {
      name: "Databricks Machine Learning Associate",
      issuer: "Databricks",
      date: "Feb 2025",
      expiryDate: "Feb 2027",
      credentialId: "923f520-4e39-4926-90e0-2f3cf42296a0",
      skills: ["Machine Learning", "PySpark", "Distributed Algorithms"]
    },
    {
      name: "AWS Certified Developer – Associate",
      issuer: "Amazon Web Services (AWS)",
      date: "Feb 2022",
      expiryDate: "Feb 2025"
    },
    {
      name: "Certified Technology Associate - SAP Fiori System Administration",
      issuer: "SAP",
      date: "2019"
    },
    {
      name: "Certified Development Associate - SAP Fiori Application Developer",
      issuer: "SAP",
      date: "2018"
    }
  ] as Certification[]
};

// --- Components ---

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-6xl mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent flex items-center gap-2">
          <Sparkles size={20} className="text-pink-400" />
          Pragati.
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-gray-600 hover:text-purple-600 font-medium transition-colors text-sm uppercase tracking-wide"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-600" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 py-4 flex flex-col items-center md:hidden shadow-lg animate-fade-in">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="py-3 text-gray-600 font-medium hover:text-purple-600 w-full text-center"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      {/* Decorative Blobs */}
      <div className="blob bg-pink-300 w-64 h-64 rounded-full top-20 left-10 mix-blend-multiply"></div>
      <div className="blob bg-purple-300 w-72 h-72 rounded-full bottom-20 right-10 mix-blend-multiply animation-delay-2000"></div>
      <div className="blob bg-indigo-300 w-56 h-56 rounded-full top-1/2 left-1/3 mix-blend-multiply animation-delay-4000"></div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 w-full relative z-10 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/50 border border-purple-100 text-purple-600 text-sm font-semibold mb-6 shadow-sm">
            ✨ AI & Cloud Engineer
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 leading-tight mb-4">
            Hi, I'm <span className="bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">{userData.personal.name}</span>
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 font-light mb-6 max-w-2xl mx-auto md:mx-0">
            {userData.personal.tagline}
          </h2>
          
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            <a href="#contact" className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-all hover:shadow-lg hover:-translate-y-1">
              Get in Touch
            </a>
            <a href="/Pragati_Resume.pdf" download className="px-8 py-3 bg-white text-gray-900 border border-gray-200 rounded-full font-medium hover:bg-gray-50 transition-all hover:shadow-lg hover:-translate-y-1 flex items-center gap-2">
              <Download size={18} />
              Resume
            </a>
          </div>

          <div className="mt-12 flex gap-4 justify-center md:justify-start text-gray-400">
            <a href={userData.personal.social.linkedin} className="hover:text-blue-600 transition-colors bg-white p-3 rounded-full shadow-sm hover:shadow-md">
              <Linkedin size={24} />
            </a>
            <a href={`mailto:${userData.personal.email}`} className="hover:text-pink-500 transition-colors bg-white p-3 rounded-full shadow-sm hover:shadow-md">
              <Mail size={24} />
            </a>
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="w-80 h-80 md:w-[450px] md:h-[450px] rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 bg-white p-2">
            <img 
              src={userData.personal.image} 
              alt={userData.personal.name} 
              className="w-full h-full object-cover rounded-[2.5rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const SectionTitle = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{title}</h2>
    {subtitle && <div className="h-1 w-20 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>}
  </div>
);

const HobbyCard = ({ hobby }: { hobby: Hobby }) => (
  <div className="group relative overflow-hidden rounded-2xl h-48 cursor-pointer shadow-md hover:shadow-xl transition-all duration-300">
    <div className="absolute inset-0">
      <img src={hobby.image} alt={hobby.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className={`absolute inset-0 bg-gradient-to-t ${hobby.color} opacity-60 group-hover:opacity-40 transition-opacity`}></div>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
    </div>
    <div className="absolute bottom-0 left-0 p-4 w-full">
      <div className="flex items-center gap-2 text-white mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform">
        {hobby.icon}
        <h4 className="font-bold text-lg">{hobby.label}</h4>
      </div>
      <p className="text-white/90 text-sm transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        {hobby.detail}
      </p>
    </div>
  </div>
);

const About = () => {
  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionTitle title="About Me" subtitle="true" />
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 md:order-1">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              Passionate about Code & Creativity
            </h3>
            {userData.personal.about.map((paragraph, idx) => (
              <p key={idx} className="text-gray-600 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
            
            <div className="flex gap-4 mt-6">
               <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                 <MapPin size={18} className="text-purple-500" /> {userData.personal.location}
               </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full blur-2xl opacity-60"></div>
              <img 
                src="/images/1759933099069.jpeg" 
                alt="Workspace" 
                className="relative rounded-3xl shadow-lg w-full max-w-sm rotate-3 border-4 border-white"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <SectionTitle title="Experience" subtitle="true" />

        <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-purple-200 before:to-transparent">
          {userData.experiences.map((exp, index) => (
            <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              
              {/* Icon */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-purple-100 text-purple-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <Briefcase size={16} />
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl shadow-sm border border-white/50 hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-800 text-lg">{exp.role}</h3>
                  <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-lg inline-block w-fit mt-1 md:mt-0">{exp.date}</span>
                </div>
                <div className="text-gray-600 font-medium mb-3">{exp.company}</div>
                <ul className="list-disc list-outside ml-4 space-y-1 text-gray-600 text-sm">
                  {exp.description.map((desc, i) => (
                    <li key={i}>{desc}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Education Block (Integrated into Timeline) */}
          <div className="relative flex items-center justify-center py-8">
            <span className="bg-white px-4 py-1 rounded-full text-gray-400 text-sm border shadow-sm">Education</span>
          </div>

          {userData.education.map((edu, index) => (
            <div key={`edu-${index}`} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
               <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-pink-100 text-pink-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                <GraduationCap size={16} />
              </div>
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl shadow-sm border border-white/50 hover:shadow-md transition-all">
                <h3 className="font-bold text-gray-800 text-lg">{edu.degree}</h3>
                <div className="text-gray-600">{edu.institution}</div>
                <div className="text-sm text-gray-400 mt-1">{edu.date}</div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <SectionTitle title="Skills & Expertise" subtitle="true" />
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Technical Skills */}
          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-6">
              <Code className="text-purple-500" /> Technical Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {userData.skills.technical.map((skill, idx) => (
                <span key={idx} className="px-4 py-2 bg-gray-50 text-gray-700 rounded-xl border border-gray-100 font-medium hover:bg-purple-50 hover:text-purple-600 hover:border-purple-100 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-gray-800 mb-6">
              <Heart className="text-pink-500" /> Soft Skills
            </h3>
            <div className="flex flex-wrap gap-3">
              {userData.skills.soft.map((skill, idx) => (
                <span key={idx} className="px-4 py-2 bg-pink-50 text-pink-700 rounded-xl border border-pink-100 font-medium hover:bg-pink-100 transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Core Expertise Areas */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="p-6 glass-card rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100 border border-indigo-200">
            <div className="text-3xl font-bold text-indigo-600 mb-2">AI/ML</div>
            <p className="text-sm text-gray-600">Primary Focus</p>
            <p className="text-xs text-gray-500 mt-2">GenAI, LLMs, Deep Learning</p>
          </div>
          <div className="p-6 glass-card rounded-2xl bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200">
            <div className="text-3xl font-bold text-pink-600 mb-2">Cloud</div>
            <p className="text-sm text-gray-600">Infrastructure</p>
            <p className="text-xs text-gray-500 mt-2">AWS, Azure, MLOps</p>
          </div>
          <div className="p-6 glass-card rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">Full Stack</div>
            <p className="text-sm text-gray-600">Development</p>
            <p className="text-xs text-gray-500 mt-2">React, Python, APIs</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Certifications = () => {
  return (
    <section id="certifications" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionTitle title="Certifications" subtitle="true" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userData.certifications.map((cert, index) => (
            <div key={index} className="glass-card p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <Star className="text-white" size={24} />
                </div>
              </div>
              <h3 className="font-bold text-gray-800 text-lg mb-2 leading-snug">{cert.name}</h3>
              <p className="text-purple-600 font-semibold text-sm mb-2">{cert.issuer}</p>
              <div className="text-gray-500 text-sm space-y-1">
                <p>Issued: {cert.date}</p>
                {cert.expiryDate && <p>Expires: {cert.expiryDate}</p>}
                {cert.credentialId && <p className="text-xs font-mono truncate">ID: {cert.credentialId}</p>}
              </div>
              {cert.skills && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {cert.skills.map((skill, idx) => (
                    <span key={idx} className="text-xs px-2 py-1 bg-purple-50 text-purple-600 rounded-md">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Hobbies = () => {
  return (
    <section id="hobbies" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionTitle title="My Interests & Hobbies" subtitle="true" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {userData.hobbies.map((hobby, idx) => (
            <HobbyCard key={idx} hobby={hobby} />
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  return (
    <section id="projects" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <SectionTitle title="Featured Projects" subtitle="true" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {userData.projects.map((project, index) => (
            <div key={index} className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors flex items-center justify-between">
                  {project.title}
                  <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed flex-1">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((t, i) => (
                    <span key={i} className="text-xs font-semibold px-2 py-1 bg-gray-100 text-gray-600 rounded-md group-hover:bg-purple-50 group-hover:text-purple-600 transition-colors">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    
    // Open default email client
    window.location.href = `mailto:${userData.personal.email}?subject=${subject}&body=${body}`;
    
    // Reset form
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-white">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-100 rounded-full blur-3xl opacity-30"></div>
         <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-pink-100 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
        <SectionTitle title="Get In Touch" subtitle="true" />
        
        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 bg-white/80">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Let's Connect!</h3>
              <p className="text-gray-600 mb-8">
                I'm currently open to new opportunities and collaborations. Whether you have a question or just want to say hi, feel free to drop a message!
              </p>
              
              <div className="space-y-4">
                <a href={`mailto:${userData.personal.email}`} className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                    <Mail size={18} />
                  </div>
                  <span>{userData.personal.email}</span>
                </a>
                <a href={userData.personal.social.linkedin} className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition-colors group">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                    <Linkedin size={18} />
                  </div>
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring focus:ring-purple-100 outline-none transition-all bg-white/50" 
                  placeholder="Your Name" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring focus:ring-purple-100 outline-none transition-all bg-white/50" 
                  placeholder="your@email.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4} 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring focus:ring-purple-100 outline-none transition-all bg-white/50" 
                  placeholder="Hello..." 
                />
              </div>
              <button 
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl font-bold shadow-md hover:shadow-lg hover:opacity-90 transition-all transform hover:-translate-y-0.5"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-gray-300 py-8">
    <div className="max-w-6xl mx-auto px-4 text-center">
      <div className="flex justify-center gap-6 mb-6">
        <a href={userData.personal.social.linkedin} className="hover:text-white transition-colors"><Linkedin size={20} /></a>
        <a href={`mailto:${userData.personal.email}`} className="hover:text-white transition-colors"><Mail size={20} /></a>
      </div>
      <p className="text-sm opacity-60">
        © {new Date().getFullYear()} {userData.personal.name}. All rights reserved. <br/>
        Built with React, Tailwind & a pinch of magic ✨
      </p>
    </div>
  </footer>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-purple-200 selection:text-purple-900">
      <NavBar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <Certifications />
      <Hobbies />
      <Contact />
      <Footer />
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}
