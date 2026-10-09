import type { PortfolioData, TimelineEvent } from "./types.js";

// English portfolio content. All project and career entries are maintained here.

export const siteContent = {
    "journey": {
        "subtitle": "Where I’ve studied, worked and explored new ideas.",
        "academic": "Academic",
        "professional": "Professional",
        "exchange": "Exchange / Abroad",
        "present": "Present"
    },
    "links": {
        "viewWebsite": "Visit website →",
        "viewProgram": "View programme →",
        "viewProject": "View code →",
        "viewAward": "Learn more →"
    },
    "projects": {
        "about": "Inside the project",
        "private": "Private repository",
        "technologies": "Technologies"
    }
};

export const portfolioData: PortfolioData = {
    "experience": [
        {
            "id": "audi",
            "title": "Geometric AI Intern",
            "company": "Audi AG",
            "location": "Ingolstadt, Germany",
            "date": "Jul – Nov 2026",
            "description": "At Audi, I work on classifying 3D structures with deep learning and applying AI to requirements engineering, combining API integrations, bi-encoder models and fine-tuning to analyse and retrieve engineering requirements. I’m also developing several skills for an internal AI coworker, including one that queries a database with over 100,000 entries, focusing on high performance, low latency and minimal token usage.",
            "link": "https://www.audi.com/en.html",
            "logo": "assets/icons/experience/audi.png"
        },
        {
            "id": "comillas-ta",
            "title": "Teaching Assistant",
            "company": "Comillas Pontifical University",
            "location": "Madrid, Spain",
            "date": "Sep 2025 – Apr 2026",
            "description": "Helped design and deploy a GPU cluster now used by AI students for their deep learning coursework.",
            "link": "https://www.comillas.edu/en/",
            "logo": "assets/icons/experience/comillas.png"
        },
        {
            "id": "azzulei",
            "title": "Computer Vision Intern",
            "company": "Azzulei Technologies",
            "location": "Madrid, Spain",
            "date": "Jun – Aug 2025",
            "description": "Built a real-time multi-object tracking system (YOLO) that automates camera control for live sports broadcasts, replacing manual operation. Also prototyped an automated match commentary generator with open-source LLMs and text-to-speech models.",
            "link": "https://azzulei.com/en/",
            "logo": "assets/icons/experience/azzulei.png"
        },
        {
            "id": "imperial-urop",
            "title": "Research Assistant",
            "company": "Imperial College London",
            "location": "Remote (London, UK)",
            "date": "Jun – Aug 2024",
            "description": "Worked with an international team of PhD researchers during the UROP programme. Built PyTorch models using Neural ODEs and physics-informed neural networks to model dynamical systems, including Lotka–Volterra, SIR and Lorenz, across different initial conditions.",
            "link": "https://www.imperial.ac.uk/urop/",
            "logo": "assets/icons/experience/imperial-square.png"
        },
        {
            "id": "endesa",
            "title": "Energy Data Analyst Intern",
            "company": "Endesa",
            "location": "Madrid, Spain",
            "date": "Jun – Aug 2023",
            "description": "Built regression and MLP models estimating daily Iberian ancillary-services costs with >90% accuracy, used for energy market forecasting at one of Spain's largest utilities.",
            "link": "https://www.endesa.com/en",
            "logo": "assets/icons/experience/endesa-square.png"
        }
    ],
    "education": [
        {
            "id": "msc-ai",
            "degree": "Master's Degree in Artificial Intelligence",
            "institution": "Comillas Pontifical University, ETSI ICAI",
            "location": "Madrid, Spain",
            "date": "Sep 2025 – Dec 2026",
            "description": "Class representative and member of the Academic Council. Coursework in generative models, probabilistic AI, MLOps, deep reinforcement learning, geometric deep learning and explainability. Won the 10th Smart Industry Hackathon.",
            "link": "https://www.comillas.edu/en/master-en-inteligencia-artificial-avanzada/",
            "logo": "assets/icons/education/comillas.png"
        },
        {
            "id": "cornell-exchange",
            "degree": "Exchange Student - Electrical & Computer Engineering",
            "institution": "Cornell University",
            "location": "Ithaca, NY, USA",
            "date": "Jan – May 2025",
            "description": "Wrote for the Cornell Healthcare Review about AI in healthcare. Studied data science, engineering ethics and strategic technology management.",
            "link": "https://www.engineering.cornell.edu/ece/",
            "logo": "assets/icons/education/cornell.png"
        },
        {
            "id": "bsc-math-ai",
            "degree": "Bachelor’s Degree in Mathematical Engineering and AI",
            "institution": "Comillas Pontifical University, ETSI ICAI",
            "location": "Madrid, Spain",
            "date": "2021 – 2025",
            "description": "GPA: 8.75/10. Winner of UNIJES Social Tech Challenge for AI-powered autonomous wheelchair project. Strong foundation in mathematics and artificial intelligence.",
            "honors": "Honors in Probability & Statistics, Dynamic Systems, Big Data Architectures, Differential Geometry, Cybersecurity, Advanced Mathematics, and Computer Vision II.",
            "link": "https://www.comillas.edu/en/degrees/bachelors-degree-in-engineering-mathematics-and-artificial-intelligence/",
            "logo": "assets/icons/education/comillas.png"
        }
    ],
    "projects": [
        {
            "title": "TopoSIGMA",
            "tech": "ROS 2 · DINOv2 · Computer Vision · Robotics · Information Geometry",
            "description": "A visual mapping system that builds a map from RGB images and wheel odometry, without additional training. DINOv2 descriptors help it discover places and recognise revisits, while uncertainty-aware loop closure connects them into a compact, queryable graph. The TopoSIGMA paper is being prepared for submission.",
            "link": "https://github.com/manuel-rodriguezvillegas/topo_sigma",
            "image": "assets/projects/toposigma.png",
            "imageWebp": "assets/projects/toposigma.webp",
            "imageWebpSrcset": "assets/projects/toposigma_720.webp 720w, assets/projects/toposigma.webp 1569w",
            "imageWidth": 1569,
            "imageHeight": 1137,
            "imageAlt": "Visual topological graph of an indoor route, with places grouped by room and loop-closure edges highlighted.",
            "category": "Robotics & visual mapping",
            "summary": "Visual mapping from RGB images and wheel odometry, with place recognition and uncertainty-aware loop closure.",
            "imageId": "toposigma"
        },
        {
            "title": "Geometric GNNs for Molecular Property Prediction",
            "tech": "PyTorch Geometric · GIN · EGNN · QM9",
            "description": "How much does 3D geometry help predict a molecule’s properties? I compared topology-only, distance-aware and equivariant graph networks on four quantum properties, testing their sensitivity to coordinate noise and exploring the link between graph curvature and over-squashing.",
            "link": "https://github.com/manuel-rodriguezvillegas/molecular_prediction",
            "image": "assets/projects/molecular_gnn.png",
            "imageWebp": "assets/projects/molecular_gnn.webp",
            "imageWebpSrcset": "assets/projects/molecular_gnn_720.webp 720w, assets/projects/molecular_gnn.webp 1600w",
            "imageWidth": 2847,
            "imageHeight": 1805,
            "imageAlt": "Molecular graph illustrating messages exchanged between atoms and functional groups.",
            "category": "Geometric deep learning",
            "summary": "Comparing topology, distance and equivariance in graph networks for molecular property prediction.",
            "imageId": "molecular-gnn",
            "imageCredit": {
                "text": "Image: TUM DAML",
                "url": "https://www.cs.cit.tum.de/daml/fragment-biased-gnns/"
            }
        },
        {
            "title": "Resource-Efficient LLM Fine-Tuning",
            "tech": "Mistral 7B · QLoRA · PEFT · NF4 · Hugging Face",
            "description": "Fine-tuned Mistral-7B on a single 24 GB GPU using QLoRA and NF4 quantization, training just 0.29% of its parameters. The key lesson came from debugging unexpected model behaviour: tracing it back to how the training data and end-of-sequence masks were constructed.",
            "image": "assets/projects/llm_finetuning.jpg",
            "imageWebp": "assets/projects/llm_finetuning.webp",
            "imageWebpSrcset": "assets/projects/llm_finetuning_720.webp 720w, assets/projects/llm_finetuning.webp 1920w",
            "imageWidth": 1920,
            "imageHeight": 1080,
            "imageAlt": "NVIDIA Jetson computing board and module on a dark background.",
            "category": "Language models",
            "summary": "Fine-tuning Mistral 7B on a single 24 GB GPU while training only 0.29% of its parameters.",
            "imageId": "efficient-llm-finetuning",
            "imageCredit": {
                "text": "Image: NVIDIA",
                "url": "https://nvidianews.nvidia.com/multimedia/autonomous-machines/jetson"
            }
        },
        {
            "title": "Multi-Object Tracking System",
            "tech": "YOLOv8 · Optical Flow · PyTorch · ONNX",
            "description": "A real-time multi-object tracking system for automated sports-camera control, combining YOLOv8 detection with optical flow and ONNX deployment. It also includes a prototype match-commentary pipeline using open-source LLMs and text-to-speech. Developed at Azzulei Technologies.",
            "link": "https://github.com/manuel-rodriguezvillegas/ai_camera",
            "image": "assets/projects/azzulei.png",
            "imageWebp": "assets/projects/azzulei.webp",
            "imageWebpSrcset": "assets/projects/azzulei_720.webp 720w, assets/projects/azzulei.webp 1200w",
            "imageWidth": 1200,
            "imageHeight": 665,
            "imageAlt": "Football broadcast frame with players detected and tracked by the automated camera system.",
            "category": "Computer vision",
            "summary": "Real-time player tracking and automated camera control for live sports broadcasts.",
            "imageId": "multi-object-tracking"
        },
        {
            "title": "Deep RL Car Agent",
            "tech": "PPO · PyTorch · Gymnasium · Stable-Baselines3",
            "description": "Trained a driving agent to navigate 2D tracks using only RGB images. Built a Gymnasium simulator with continuous steering and throttle, trained a PPO policy across multiple tracks, and used saliency maps to see which parts of the road guided its decisions.",
            "link": "https://github.com/NatLey30/CarGameRL",
            "image": "assets/projects/car_game_rl.png",
            "imageWebp": "assets/projects/car_game_rl.webp",
            "imageWebpSrcset": "assets/projects/car_game_rl_720.webp 720w, assets/projects/car_game_rl.webp 1178w",
            "imageWidth": 1178,
            "imageHeight": 1148,
            "imageAlt": "Saliency map showing which pixels influence the deep-RL driving policy on a curved track.",
            "category": "Reinforcement learning",
            "summary": "A driving agent trained with PPO to navigate 2D tracks using only RGB images.",
            "imageId": "deep-rl-car-agent"
        }
    ],
    "skills": {
        "AI & Machine Learning": [
            "Deep Learning",
            "Computer Vision",
            "Natural Language Processing",
            "Agentic AI",
            "Probabilistic AI",
            "Robotics",
            "Deep Reinforcement Learning",
            "Physics-Informed NNs"
        ],
        "Tools & Frameworks": [
            "Python",
            "PyTorch",
            "JAX",
            "ROS 2",
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
    "awards": [
        {
            "title": "Bending Spoons Hackathon Winner",
            "year": "2026",
            "location": "Milan, Italy",
            "description": "Selected among Spain's top 20 tech students for First Ascent and winner of the event's hackathon.",
            "icon": "assets/icons/awards/bending-spoons.svg",
            "link": "https://spain.firstascent.io/"
        },
        {
            "title": "Winner of the 10th Smart Industry Hackathon",
            "year": "2025",
            "location": "Madrid, Spain",
            "description": "Built a virtual assistant with recommendations for train operators.",
            "icon": "assets/icons/awards/caf.png",
            "link": "https://github.com/manuel-rodriguezvillegas/hackathon_kearney"
        },
        {
            "title": "Winner of UNIJES Social Tech Challenge",
            "year": "2024",
            "location": "Bilbao, Spain",
            "description": "Developed a voice-controlled wheelchair.",
            "icon": "assets/icons/awards/trophy.png",
            "link": "https://socialtech-challenge.org"
        },
        {
            "title": "Academic Excellence Scholarship",
            "year": "2021, 2023, 2024",
            "location": "Madrid, Spain",
            "description": "Awarded to university students with outstanding academic records in the Community of Madrid.",
            "icon": "assets/icons/awards/madrid.png",
            "link": "https://www.comunidad.madrid/servicios/educacion/becas-excelencia-universitarios"
        },
        {
            "title": "Baccalaureate Academic Honours",
            "year": "2021",
            "location": "Madrid, Spain",
            "description": "Second-highest GPA in the Community of Madrid.",
            "icon": "assets/icons/awards/madrid.png",
            "link": null
        }
    ]
};

export const timelineData: { events: TimelineEvent[] } = {
    "events": [
        {
            "type": "academic",
            "ref": "bsc-math-ai",
            "title": "BE Mathematical Engineering & AI",
            "institution": "Comillas ICAI",
            "start": "2021-09",
            "end": "2024-12",
            "logo": "assets/icons/education/comillas.png"
        },
        {
            "type": "exchange",
            "ref": "cornell-exchange",
            "title": "Exchange — ECE",
            "institution": "Cornell University",
            "start": "2025-01",
            "end": "2025-05",
            "logo": "assets/icons/education/cornell.png"
        },
        {
            "type": "academic",
            "ref": "msc-ai",
            "title": "Master's Degree in Artificial Intelligence",
            "institution": "Comillas ICAI",
            "start": "2025-09",
            "end": "2026-12",
            "logo": "assets/icons/education/comillas.png"
        },
        {
            "type": "professional",
            "ref": "endesa",
            "title": "Energy Data Analyst Intern",
            "institution": "Endesa",
            "start": "2023-06",
            "end": "2023-08",
            "logo": "assets/icons/experience/endesa-square.png"
        },
        {
            "type": "professional",
            "ref": "imperial-urop",
            "title": "Research Assistant (UROP)",
            "institution": "Imperial College London",
            "start": "2024-06",
            "end": "2024-08",
            "logo": "assets/icons/experience/imperial-square.png"
        },
        {
            "type": "professional",
            "ref": "azzulei",
            "title": "Computer Vision Intern",
            "institution": "Azzulei Technologies",
            "start": "2025-06",
            "end": "2025-08",
            "logo": "assets/icons/experience/azzulei.png"
        },
        {
            "type": "professional",
            "ref": "comillas-ta",
            "title": "Teaching Assistant",
            "institution": "Comillas ICAI",
            "start": "2025-09",
            "end": "2026-04",
            "logo": "assets/icons/experience/comillas.png"
        },
        {
            "type": "professional",
            "ref": "audi",
            "title": "Geometric AI Intern",
            "institution": "Audi AG",
            "start": "2026-07",
            "end": "2026-11",
            "logo": "assets/icons/experience/audi.png"
        }
    ]
};
