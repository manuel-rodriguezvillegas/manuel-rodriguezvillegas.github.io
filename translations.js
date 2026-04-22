// ===================================
// Translations Data
// ===================================

const translations = {
    en: {
        nav: {
            about: "About",
            journey: "Journey",
            experience: "Experience",
            education: "Education",
            projects: "Projects",
            skills: "Skills"
        },
        hero: {
            subtitle: "MSc in Artificial Intelligence @ ICAI",
            description: "Curious mind focused on AI for human benefit, deep learning and the pursuit of elegant, efficient solutions.",
            contactBtn: "Get in Touch",
            projectsBtn: "View Projects",
            cvBtn: "View CV"
        },
        sections: {
            about: "About Me",
            journey: "My Journey",
            experience: "Experience",
            education: "Education",
            projects: "Featured Projects",
            skills: "Skills & Technologies",
            awards: "Honors & Awards"
        },
        journey: {
            subtitle: "A visual map of my academic and professional path.",
            academic: "Academic",
            professional: "Professional",
            exchange: "Exchange / Abroad",
            present: "Present"
        },
        about: {
            p1: "Hi! I'm Manuel, MSc student in Artificial Intelligence at Comillas Pontifical University (Madrid) with a BSc in Mathematical Engineering and AI. My journey academic journey has taken me from Madrid to <strong>Cornell University</strong> and <strong>Imperial College London</strong>, where I've worked on computer vision, robotics, and generative AI systems.",
            p2: "I would describe myself as a rigorous individual, obsessed with excellence, optimization, and the search for meaning in a field as complex as AI. Given my academic background, which combines deep mathematical foundations with their applications to AI, I consider my profile to bridge the gap between mathematical rigor and state-of-the-art AI systems.",
            p3: "Beyond my professional interests, I enjoy fitness, nature, and reading. I consider these essential to living a balanced life, especially when shared with others."
        },
        links: {
            viewWebsite: "Visit Website →",
            viewProgram: "View Program →",
            viewProject: "View Project →",
            viewAward: "Learn More →"
        },
        footer: {
            rights: "All rights reserved."
        }
    },
    es: {
        nav: {
            about: "Sobre mí",
            journey: "Trayectoria",
            experience: "Experiencia",
            education: "Educación",
            projects: "Proyectos",
            skills: "Habilidades"
        },
        hero: {
            subtitle: "MSc en Inteligencia Artificial @ ICAI",
            description: "Estudiante curioso y proactivo enfocado en la IA para el beneficio humano, el aprendizaje profundo y la búsqueda de soluciones elegantes y eficientes.",
            contactBtn: "Contactar",
            projectsBtn: "Ver Proyectos",
            cvBtn: "Ver CV"
        },
        sections: {
            about: "Sobre mí",
            journey: "Mi Trayectoria",
            experience: "Experiencia",
            education: "Educación",
            projects: "Proyectos Destacados",
            skills: "Habilidades y Tecnologías",
            awards: "Premios y Reconocimientos"
        },
        journey: {
            subtitle: "Un mapa visual de mi trayectoria académica y profesional.",
            academic: "Académico",
            professional: "Profesional",
            exchange: "Estancia / Internacional",
            present: "Actualidad"
        },
        about: {
            p1: "¡Hola! Soy Manuel, estudiante de Máster en Inteligencia Artificial en la Universidad Pontificia Comillas (Madrid) con un Grado en Ingeniería Matemática e IA. Mi trayectoria académica me ha llevado de Madrid a <strong>Cornell University</strong> (Nueva York) e <strong>Imperial College London</strong>, donde he trabajado con diferentes arquitecturas en visión por computador, robótica e IA generativa.",
            p2: "Me describiría como un chico riguroso, obsesionado con la excelencia, la optimización y la búsqueda de significado en un campo tan complejo como la IA. Dada mi formación académica, que profundiza en sistemas de IA a partir de su fundamento matemático, considero que mi perfil cierra la brecha entre el rigor matemático y los sistemas de IA de última generación.",
            p3: "Más allá de mis intereses profesionales, disfruto del deporte, la naturaleza y la lectura, actividades que considero esenciales para vivir una vida equilibrada, especialmente cuando se comparten con otros."
        },
        links: {
            viewWebsite: "Visitar Web →",
            viewProgram: "Ver Programa →",
            viewProject: "Ver Proyecto →",
            viewAward: "Más Información →"
        },
        footer: {
            rights: "Todos los derechos reservados."
        }
    }
};

// Portfolio data with translations
const portfolioDataTranslations = {
    en: {
        experience: [
            {
                title: "Teaching Assistant",
                company: "Comillas Pontifical University",
                location: "Madrid, Spain",
                date: "Sep 2025 – Apr 2026",
                description: "I'm currently working as a Teaching Assistant at my university, collaborating on the implementation of a GPU cluster for AI students",
                link: "https://www.comillas.edu/en/",
                logo: "assets/icons/experience/comillas.png"
            },
            {
                title: "Computer Vision Intern",
                company: "Azzulei Technologies",
                location: "Madrid, Spain",
                date: "Jun – Aug 2025",
                description: "For my third summer internship I joined the startup Azzulei Technologies, where my role consisted on developing an automated camera control system for sports events. I successfully achieved this task by implementing a real-time Multi-Object Tracking system using YOLO, significantly improving broadcast quality and reducing manual operation requirements. I also designed a virtual commentary generator using open-source LLMs and text-to-speech (TTS) models for automated commentary of matches.",
                link: "https://azzulei.com/en/",
                logo: "assets/icons/experience/azzulei.png"
            },
            {
                title: "Research Assistant",
                company: "Imperial College London",
                location: "Remote (London, UK)",
                date: "Jun – Aug 2024",
                description: "During the summer of 2024, I participated in the Undergraduate Research Opportunities Programme (UROP) at Imperial College London. My work focused on reproducing complex dynamical systems (Lotka–Volterra, SIR, Lorenz) using Neural Ordinary Differential Equations (Neural ODEs) and Physics-Informed Neural Networks (PINNs). I successfully developed robust models in PyTorch that generalized well across varying initial conditions, collaborating actively with international PhD students.",
                link: "https://www.imperial.ac.uk/urop/",
                logo: "assets/icons/experience/imperial.png"
            },
            {
                title: "Energy Data Analyst Intern",
                company: "Endesa",
                location: "Madrid, Spain",
                date: "Jun – Aug 2023",
                description: "For my first internship I joined Endesa, one of Spain's biggest energy companies. I focused on estimating daily Iberian ancillary services costs, achieving >90% accuracy using regression and MLP techniques, providing valuable insights for energy market forecasting.",
                link: "https://www.endesa.com/en",
                logo: "assets/icons/experience/endesa.png"
            }
        ],
        education: [
            {
                degree: "MSc in Artificial Intelligence",
                institution: "Comillas Pontifical University, ETSI ICAI",
                location: "Madrid, Spain",
                date: "Sep 2025 – 2026",
                description: "Class Representative & Member of the Academic Council. Winner of the 10th Smart Industry Hackathon. Program focused on Deep Generative Models, Probabilistic AI, MLOps, Deep Reinforcement Learning, Geometric Deep Learning, and Explainability.",
                link: "https://www.comillas.edu/en/master-en-inteligencia-artificial-avanzada/",
                logo: "assets/icons/education/comillas.png"
            },
            {
                degree: "Exchange Student - Electrical & Computer Engineering",
                institution: "Cornell University",
                location: "Ithaca, NY, USA",
                date: "Jan – May 2025",
                description: "Writer for Cornell Healthcare Review, focusing on AI applications in the healthcare industry at Cornell University. Explored topics on data science, ethical guidelines for engineers and strategic technology and management.",
                link: "https://www.engineering.cornell.edu/ece/",
                logo: "assets/icons/education/cornell.png"
            },
            {
                degree: "BSc in Mathematical Engineering and AI",
                institution: "Comillas Pontifical University, ETSI ICAI",
                location: "Madrid, Spain",
                date: "2021 – 2025",
                description: "GPA: 8.75/10. Winner of UNIJES Social Tech Challenge for AI-powered autonomous wheelchair project. Strong foundation in mathematics and artificial intelligence.",
                honors: "Honors in Probability & Statistics, Dynamic Systems, Big Data Architectures, Differential Geometry, Cybersecurity, Advanced Mathematics, and Computer Vision II.",
                link: "https://www.comillas.edu/en/degrees/bachelors-degree-in-engineering-mathematics-and-artificial-intelligence/",
                logo: "assets/icons/education/comillas.png"
            }
        ],
        projects: [
            {
                title: "Visual Topological SLAM",
                tech: "ROS2, PyTorch, Deep Learning, Computer Vision, NLP",
                description: "For my Bachelor Thesis, I implemented a visual SLAM system integrating vision foundation models (CNN, AutoEncoder) with NLP and graph theory for voice-controlled indoor navigation. Features real-time mapping and autonomous navigation capabilities. The project was developed as part of the UNIJES SocialTech Challenge, a competition with social purposes where different Spanish universities build an autonomous wheelchair.",
                link: "https://github.com/rdgzmanuel/visual_topological_slam",
                icon: "🗺️",
                image: "assets/projects/tfg_map.png",
                imageId: "visual-slam"
            },
            {
                title: "Multi-Object Tracking System",
                tech: "YOLO, Computer Vision, Optical Flow, PyTorch, ONNX",
                description: "During my internship at Azzulei Techonologies, I developed from scratch a real-time tracking system for automated camera control in sports events. It included advanced object detection and tracking algorithms for efficient broadcast automation, as well as a digitial commenatry generator based on LLMs and Text-to-Speech (TTS) systems.",
                link: "https://github.com/rdgzmanuel/ai_camera",
                icon: "🎥",
                image: "assets/projects/azzulei.png",
                imageId: "multi-object-tracking"
            },
            {
                title: "Virtual Assistant for Train Operators",
                tech: "PyTorch, Machine Learning, NLP",
                description: "As the winning project of the 10th Smart Industry Hackathon, I developed a virtual assistant with an intelligent recommendation system for train operators. The operator enters the symptom of the malfunction, and the agent recommends the most likely faulty components along with their associated repairs. The project was developed in a single morning and won first prize, competing against 9 other teams from Madrid and Seville.",
                link: "https://github.com/rdgzmanuel/hackathon_kearney",
                icon: "🚂",
                image: "assets/projects/hackathon.png",
                imageId: "hackathon"
            },     
            {
                title: "Image Processing via Calculus of Variations",
                tech: "Python, Calculus of Variations, Image Processing",
                description: "As the final project of Diferential Methods of AI, I studied and implemented image processing techniques based on calculus of variations, focusing on image denoising. The project included a comprehensive report detailing the mathematical foundations and practical implementations of each technique, with a particular focus on medical images.",
                link: "https://github.com/rdgzmanuel/image_processing",
                icon: "🖼️",
                image: "assets/projects/brain_tv.png",
                imageId: "brain-tv"
            },      
            {
                title: "Neural Networks on Riemannian Manifolds",
                tech: "Differential Geometry, PyTorch, Deep Learning",
                description: "This work studies the implementation of neural networks that operate with Riemannian data and parameters, optimizing with the natural gradient for a much more efficient training. The project includes a comprehensive report detailing the mathematical foundations and practical implementations of these techniques.",
                link: "https://github.com/rdgzmanuel/riemannian_geometry",
                icon: "🧠",
                image: "assets/projects/grassmann.png",
                imageId: "grassmann"
            },
            {
                title: "Explainability in Traffic Sign Recognition",
                tech: "Computer Vision, PyTorch, Deep Learning, XAI",
                description: "In this project I analyze different models used for traffic sign recognition from an explainability perspective. The aime is to understand what the models are focusing on and how this affects their performance.",
                link: "https://github.com/ICAI-IMAT-XAI/final-project-rdgzmanuel",
                icon: "🧠",
                image: "assets/projects/xai.png",
                imageId: "xai"
            },  
        ],
        skills: {
            "Programming Languages": [
                "Python (Advanced)",
                "R",
                "C#",
                "SQL"
            ],
            "AI & Machine Learning": [
                "Deep Learning",
                "Computer Vision",
                "Natural Language Processing",
                "Probabilistic AI",
                "Robotics",
                "Deep Reinforcement Learning",
                "Physics-Informed NNs"
            ],
            "Tools & Frameworks": [
                "PyTorch",
                "ROS 2",
                "OpenCV",
                "MATLAB",
                "Git",
                "Docker",
                "n8n"
            ],
            "Mathematics": [
                "Linear Algebra",
                "Calculus & Analysis",
                "Optimization",
                "Dynamical Systems",
                "Differential Equations",
                "Differential Geometry",
                "Probability & Statistics"
            ],
            "Languages": [
                "Spanish (Native)",
                "English (Fluent)",
                "German (Beginner)"
            ]
        },
        awards: [
            {
                title: "Winner of the 10th Smart Industry Hackathon",
                year: "2025",
                description: "Virtual assistant with recommendation system for train operators",
                icon: "assets/icons/awards/caf.png",
                link: "https://github.com/rdgzmanuel/hackathon_kearney"
            },
            {
                title: "Winner of UNIJES Social Tech Challenge",
                year: "2024",
                description: "Voice-controlled wheelchair project",
                icon: "assets/icons/awards/trophy.png",
                link: "https://socialtech-challenge.org"
            },
            {
                title: "Academic Excellence Scholarship",
                year: "2021, 2023, 2024",
                description: "Top-scoring students across Community of Madrid",
                icon: "assets/icons/awards/madrid.png",
                link: "https://www.comunidad.madrid/servicios/educacion/becas-excelencia-universitarios"
            },
            {
                title: "Baccalaureate Honorific Mention",
                year: "2021",
                description: "2nd highest GPA in Community of Madrid",
                icon: "assets/icons/awards/madrid.png",
                link: null
            },
            {
                title: "Kumon Mathematics Programme",
                year: "2020",
                description: "Completed the Kumon Mathematics Programme",
                icon: "assets/icons/awards/kumon.png",
                link: "https://www.kumon.org",
                image: "assets/icons/awards/kumon.png"
            }
        ]
    },
    es: {
        experience: [
            {
                title: "Asistente de Profesorado",
                company: "Universidad Pontificia Comillas",
                location: "Madrid, España",
                date: "Sep 2025 – Abr 2026",
                description: "Actualmente trabajo como Asistente de Profesorado en mi universidad, colaborando en la implementación de un clúster de GPUS para estudiantes de IA",
                link: "https://www.comillas.edu/",
                logo: "assets/icons/experience/comillas.png"
            },
            {
                title: "Becario en Visión por Computador",
                company: "Azzulei Technologies",
                location: "Madrid, España",
                date: "Jun – Ago 2025",
                description: "Durante mis terceras prácticas de verano trabajé en la startup Azzulei Technologies, donde desarrollé desde cero un sistema de control automático de cámara para eventos deportivos. Para ello implementé un sistema de seguimiento de múltiples objetivos en tiempo real usando YOLO, mejorando significativamente la calidad de transmisión y reduciendo los requisitos de operación manual. También diseñé un generador de comentarios virtuales usando LLMs de código abierto y modelos Text-to-Speech (TTS).",
                link: "https://azzulei.com/",
                logo: "assets/icons/experience/azzulei.png"
            },
            {
                title: "Asistente de Investigación",
                company: "Imperial College London",
                location: "Remoto (Londres, Reino Unido)",
                date: "Jun – Ago 2024",
                description: "Durante el verano de 2024, participé en el Undergraduate Research Opportunities Programme (UROP) del Imperial College London. Mi trabajo se centró en reproducir sistemas dinámicos complejos (Lotka–Volterra, SIR, Lorenz) utilizando Ecuaciones Diferenciales Ordinarias Neuronales (Neural ODEs) y Physicis-Informed Neural Networks (PINNs). Desarrollé modelos robustos en PyTorch que generalizaban bien para diferentes condiciones iniciales, colaborando activamente con estudiantes de doctorado internacionales.",
                link: "https://www.imperial.ac.uk/urop/",
                logo: "assets/icons/experience/imperial.png"
            },
            {
                title: "Becario Analista de Datos Energéticos",
                company: "Endesa",
                location: "Madrid, España",
                date: "Jun – Ago 2023",
                description: "Durante mis primeras prácticas trabajé en Endesa, una de las compañías energéticas más grandes de España. Me centré en estimar los costes diarios de servicios auxiliares ibéricos, logrando >90% de precisión usando técnicas de regresión y MLP, proporcionando información valiosa para la predicción del mercado energético.",
                link: "https://www.endesa.com/",
                logo: "assets/icons/experience/endesa.png"
            }
        ],
        education: [
            {
                degree: "Máster en Inteligencia Artificial",
                institution: "Universidad Pontificia Comillas, ETSI ICAI",
                location: "Madrid, España",
                date: "Sep 2025 – 2026",
                description: "Delegado de Clase y Miembro del Claustro Universitario. Ganador del X Hackathon de Industria Inteligente. Programa enfocado en Modelos Generativos Profundos, Geometría y Cálculo Diferencial, MLOps, Aprendizaje por Refuerzo Profundo, Aprendizaje Profundo Geométrico, IA Probabilística y Explicabilidad.",
                link: "https://www.comillas.edu/master-en-inteligencia-artificial-avanzada/",
                logo: "assets/icons/education/comillas.png"
            },
            {
                degree: "Estudiante de Intercambio - Electric & Computer Engineering",
                institution: "Cornell University",
                location: "Ithaca, NY, EE.UU.",
                date: "Ene – May 2025",
                description: "Escritor para Cornell Healthcare Review, enfocándome en aplicaciones de IA en la industria de la salud. Estudié temas relacionados con la ciencia de datos, directrices éticas para ingenieros y gestión estratégica de la tecnología.",
                link: "https://www.engineering.cornell.edu/ece/",
                logo: "assets/icons/education/cornell.png"
            },
            {
                degree: "Grado en Ingeniería Matemática e Inteligencia Artificial",
                institution: "Universidad Pontificia Comillas, ETSI ICAI",
                location: "Madrid, España",
                date: "2021 – 2025",
                description: "Nota media: 8.75/10. Ganador del UNIJES SocialTech Challenge por un proyecto de silla de ruedas autónoma con IA integrada. Fundamentos teorico-prácticos en matemáticas e inteligencia artificial.",
                honors: "Matrículas de Honor en Probabilidad y Estadística, Sistemas Dinámicos, Arquitecturas Big Data, Geometría Diferencial, Ciberseguridad, Matemáticas Avanzadas y Visión por Computador II.",
                link: "https://www.comillas.edu/grado-en-ingenieria-matematica-e-inteligencia-artificial/",
                logo: "assets/icons/education/comillas.png"
            }
        ],
        projects: [
            {
                title: "SLAM Topológico Visual",
                tech: "ROS2, PyTorch, Deep Learning, Visión por Computador, NLP",
                description: "Para mi Trabajo de Fin de Grado (TFG) implementé un sistema de SLAM visual integrando modelos fundamentales de visión (CNN, AutoEncoder) con NLP y teoría de grafos, habilitando la navegación interior controlada por voz. Incluye capacidades de mapeo en tiempo real y navegación autónoma. El proyecto fue desarrollado como parte del UNIJES SocialTech Challenge, una competición con fines sociales donde diferentes universidades españolas construyen una silla de ruedas autónoma.",
                link: "https://github.com/rdgzmanuel/visual_topological_slam",
                icon: "🗺️",
                image: "assets/projects/tfg_map.png",
                imageId: "visual-slam"
            },
            {
                title: "Sistema de Seguimiento Multi-Objetivo",
                tech: "PyTroch, YOLO, Visión por Computador, Flujo Óptico, ONNX",
                description: "Durante mis prácticas en Azzulei Technologies, desarrollé desde cero un sistema de seguimiento en tiempo real enfocado en el control automático de la cámara en eventos deportivos. Implementé algoritmos avanzados de detección y seguimiento de objetos, así como un sistema de generación de comentarios virtuales.",
                link: "https://github.com/rdgzmanuel/ai_camera",
                icon: "🎥",
                image: "assets/projects/azzulei.png",
                imageId: "multi-object-tracking"
            },
            {
                title: "Asistente Virtual para Operarios de Trenes",
                tech: "PyTorch, Machine Learning, NLP",
                description: "Como proyecto ganador del X Hackathon de Industria Inteligente, desarrollé una asistente virtual con un sistema de recomendaciones inteligente para operarios de trenes. El operario introduce el síntome a de la avería y el agente le recomienda los componentes estropeados más probables junto a sus reparaciones asociadas. EL proyecto fue elaborado en una sola mañana y obtuvo el primer premio, enfrentándose a otros 9 equipos de Madrid y Sevilla.",
                link: "https://github.com/rdgzmanuel/hackathon_kearney",
                icon: "🚂",
                image: "assets/projects/hackathon.png",
                imageId: "hackathon"
            },
            {
                title: "Procesamiento de Imágenes mediante Cálculo de Variaciones",
                tech: "Python, Cálculo de Variaciones, Procesamiento de Imágenes",
                description: "Como proyecto final de Métodos Diferenciales de la IA, hemos estudiado y aplicado el uso del cálculo de variaciones sobre el procesamiento de imágenes. Nos hemos centrado en sus fundamentos matemátios y en su aplicación concreta en el campo de la imagen médica (resonancias cerebrales y escáneres de rayos-X).",
                link: "https://github.com/rdgzmanuel/image_processing",
                icon: "🖼️",
                image: "assets/projects/brain_tv.png",
                imageId: "brain-tv"
            },
            {
                title: "Redes Neuronales en Variedades Riemannianas",
                tech: "Geometría Diferencial, PyTorch, Deep Learning",
                description: "Proyecto sobre la implementación de redes neuronales que operan con datos y parámetros Riemannianos, optimizando con el gradiente natural para un entrenamiento mucho más eficiente. Incluye un informe detallado sobre los fundamentos matemáticos y la implementación de estas técnicas.",
                link: "https://github.com/rdgzmanuel/riemannian_geometry",
                icon: "🧠",
                image: "assets/projects/grassmann.png",
                imageId: "grassmann"
            },
            {
                title: "Explicabilidad en Reconocimiento de Señales de Tráfico",
                tech: "PyTorch, Deep Learning, Visión por Computador, XAI",
                description: "En este proyecto analizo diferentes modelos de reconocimiento de señales de tráfico desde el punto de vista de la explicabilidad, entendiendo qué partes de las imágenes son importantes para los modelos y cómo eso puede afecta a su rendimiento.",
                link: "https://github.com/ICAI-IMAT-XAI/final-project-rdgzmanuel",
                icon: "🗺️",
                image: "assets/projects/xai.png",
                imageId: "xai"
            },
        ],
        skills: {
            "Lenguajes de Programación": [
                "Python (Avanzado)",
                "R",
                "C#",
                "SQL"
            ],
            "IA y Machine Learning": [
                "Deep Learning",
                "Visión por Computador",
                "Procesamiento del Lenguaje Natural (NLP)",
                "IA Probabilística",
                "Robótica",
                "Aprendizaje por Refuerzo Profundo",
                "Redes Neuronales Informadas por Física (PIINs)"
            ],
            "Herramientas y Frameworks": [
                "PyTorch",
                "ROS 2",
                "OpenCV",
                "MATLAB",
                "Git",
                "Docker",
                "n8n"
            ],
            "Matemáticas": [
                "Álgebra Lineal",
                "Cálculo y Análisis",
                "Optimización",
                "Sistemas Dinámicos",
                "Ecuaciones Diferenciales",
                "Geometría Diferencial",
                "Probabilidad y Estadística"
            ],
            "Idiomas": [
                "Español (Nativo)",
                "Inglés (Avanzado)",
                "Alemán (Básico)"
            ]
        },
        awards: [
            {
                title: "Ganador del X Hackathon de Industria Inteligente",
                year: "2025",
                description: "Asistente virtual con sistema de recomendaciones para operarios de trenes",
                icon: "assets/icons/awards/caf.png",
                link: "https://github.com/rdgzmanuel/hackathon_kearney"
            },
            {
                title: "Ganador de UNIJES SocialTech Challenge",
                year: "2024",
                description: "Proyecto de silla de ruedas autónoma controlada por voz",
                icon: "assets/icons/awards/trophy.png",
                link: "https://socialtech-challenge.org"
            },
            {
                title: "Beca de Excelencia Académica",
                year: "2021, 2023, 2024",
                description: "Estudiantes con mejores notas de la Comunidad de Madrid",
                icon: "assets/icons/awards/madrid.png",
                link: "https://www.comunidad.madrid/servicios/educacion/becas-excelencia-universitarios"
            },
            {
                title: "Mención Honorífica de Bachillerato",
                year: "2021",
                description: "2ª nota más alta de la Comunidad de Madrid",
                icon: "assets/icons/awards/madrid.png",
                link: null
            },
            {
                title: "Programa de Matemáticas Kumon",
                year: "2020",
                description: "Programa de matemáticas Kumon completado",
                icon: "assets/icons/awards/kumon.png",
                link: "https://www.kumon.org",
                image: "assets/icons/awards/kumon.png"
            }
        ]
    }
};

// ===================================
// Timeline Data (Journey Section)
// ===================================
// Easily add/edit events here. Dates use YYYY-MM format.
// type: "academic" | "professional" | "exchange"
// "exchange" events are rendered as academic (top) but with a distinct style.
// Use end: "present" for ongoing events.
const timelineData = {
    // Global range shown on the axis. Adjust when adding years.
    rangeStart: "2021-09",
    rangeEnd: "2026-09",
    events: {
        en: [
            {
                type: "academic",
                title: "BSc Mathematical Engineering & AI",
                institution: "Comillas ICAI",
                start: "2021-09",
                end: "2025-06",
                logo: "assets/icons/education/comillas.png"
            },
            {
                type: "exchange",
                title: "Exchange — ECE",
                institution: "Cornell University",
                start: "2025-01",
                end: "2025-05",
                logo: "assets/icons/education/cornell.png"
            },
            {
                type: "academic",
                title: "MSc in Artificial Intelligence",
                institution: "Comillas ICAI",
                start: "2025-09",
                end: "2026-06",
                logo: "assets/icons/education/comillas.png"
            },
            {
                type: "professional",
                title: "Energy Data Analyst Intern",
                institution: "Endesa",
                start: "2023-06",
                end: "2023-08",
                logo: "assets/icons/experience/endesa.png"
            },
            {
                type: "professional",
                title: "Research Assistant (UROP)",
                institution: "Imperial College London",
                start: "2024-06",
                end: "2024-08",
                logo: "assets/icons/experience/imperial.png"
            },
            {
                type: "professional",
                title: "Computer Vision Intern",
                institution: "Azzulei Technologies",
                start: "2025-06",
                end: "2025-08",
                logo: "assets/icons/experience/azzulei.png"
            },
            {
                type: "professional",
                title: "Teaching Assistant",
                institution: "Comillas Pontifical University",
                start: "2025-09",
                end: "2026-04",
                logo: "assets/icons/experience/comillas.png"
            }
        ],
        es: [
            {
                type: "academic",
                title: "Grado en Ingeniería Matemática e IA",
                institution: "Comillas ICAI",
                start: "2021-09",
                end: "2025-06",
                logo: "assets/icons/education/comillas.png"
            },
            {
                type: "exchange",
                title: "Intercambio — ECE",
                institution: "Cornell University",
                start: "2025-01",
                end: "2025-05",
                logo: "assets/icons/education/cornell.png"
            },
            {
                type: "academic",
                title: "Máster en Inteligencia Artificial",
                institution: "Comillas ICAI",
                start: "2025-09",
                end: "2026-06",
                logo: "assets/icons/education/comillas.png"
            },
            {
                type: "professional",
                title: "Prácticas en Análisis de Datos Energéticos",
                institution: "Endesa",
                start: "2023-06",
                end: "2023-08",
                logo: "assets/icons/experience/endesa.png"
            },
            {
                type: "professional",
                title: "Asistente de Investigación (UROP)",
                institution: "Imperial College London",
                start: "2024-06",
                end: "2024-08",
                logo: "assets/icons/experience/imperial.png"
            },
            {
                type: "professional",
                title: "Prácticas en Visión por Computador",
                institution: "Azzulei Technologies",
                start: "2025-06",
                end: "2025-08",
                logo: "assets/icons/experience/azzulei.png"
            },
            {
                type: "professional",
                title: "Asistente Docente",
                institution: "Universidad Pontificia Comillas",
                start: "2025-09",
                end: "2026-04",
                logo: "assets/icons/experience/comillas.png"
            }
        ]
    }
};

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations, portfolioDataTranslations, timelineData };
}