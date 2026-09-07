import type { SelectOption } from "~/types/ui/select"

export const countryOfResidenceOptions: SelectOption[] = [
  {label: 'Perú', value: 'Perú', active: false},
  {label: 'Argentina', value: 'Argentina', active: false},
  {label: 'Brasil', value: 'Brasil', active: false},
  {label: 'Chile', value: 'Chile', active: false},
  {label: 'Colombia', value: 'Colombia', active: false},
  {label: 'Ecuador', value: 'Ecuador', active: false},
  {label: 'México', value: 'México', active: false},
  {label: 'Bermudas', value: 'Bermudas', active: false},
  {label: 'Bolivia', value: 'Bolivia', active: false},
]

export const digitalDisciplineOptions: SelectOption[] = [
  {
    label: 'Engineering',
    value: 'Engineering',
    active: false,
    specialty: [
      {
        label: 'Front-end Web',
        value: 'Front-end Web',
        active: false,
        children: [
          { label: 'Javascript', active: false },
          { label: 'TypeScript' , active: false},
          { label: 'React', active: false},
          { label: 'Angular JS', active: false},
          { label: 'Vue JS', active: false }
        ]
      },
      {
        label: 'Front-end Mobile',
        value: 'Front-end Mobile',
        active: false,
        children: [
          { label: 'Swift', active: false },
          { label: 'Kotlin', active: false },
          { label: 'Flutter', active: false },
          { label: 'React Native', active: false },
          { label: 'Ionic', active: false },
          { label: 'Objective C', active: false },
          { label: 'Java Mobile', active: false },
        ]
      },
      {
        label: 'Backend',
        value: 'Backend',
        active: false,
        children: [
          { label: 'Java', active: false},
          { label: 'Python', active: false},
          { label: '.Net', active: false},
          { label: 'PHP', active: false},
          { label: 'Go', active: false},
          { label: 'Ruby', active: false},
          { label: 'Javascript Backend', active: false},
          { label: 'C++', active: false},
          { label: 'C#', active: false},
          { label: 'Laravel', active: false},
          { label: 'Flask', active: false},
          { label: 'Django', active: false},
          { label: 'Node JS', active: false},
          { label: 'Spring Boot', active: false},
          { label: 'ASP .NET', active: false},
          { label: 'Express.js', active: false},
        ]
      },
      {
        label: 'QA',
        value: 'QA',
        active: false,
        children: [
          { label: 'Selenium', active: false },
          { label: 'JUnit/TestNG', active: false },
          { label: 'Cypress', active: false },
        ]
      },
      {
        label: 'Architecture',
        value: 'Architecture',
        active: false,
        children: [
          { label: 'Kafka', active: false },
          { label: 'Docker', active: false },
          { label: 'Kubernetes', active: false },
          { label: 'AWS', active: false },
          { label: 'GCP', active: false },
          { label: 'Azure', active: false },
          { label: 'Digital Ocean', active: false },
          { label: 'Heroku', active: false },
        ]
      },
      {
        label: 'DevOps',
        value: 'DevOps',
        active: false,
        children: [
          { label: 'Docker', active: false },
          { label: 'Kubernetes', active: false },
          { label: 'AWS', active: false },
          { label: 'GCP', active: false },
          { label: 'Azure', active: false },
          { label: 'Digital Ocean', active: false },
          { label: 'Heroku', active: false },
        ]
      },
      {
        label: 'Data',
        value: 'Data',
        active: false,
        children: [
          { label: 'Python', active: false },
          { label: 'R', active: false },
          { label: 'SQL', active: false },
          { label: 'Scala', active: false },
          { label: 'Java (lenguajes) / Pandas', active: false },
          { label: 'NumPy', active: false },
          { label: 'TensorFlow', active: false },
          { label: 'Apache Spark', active: false },
          { label: 'Scikit-learn', active: false },
          { label: 'Hadoop', active: false },
          { label: 'D3.js (framework/librerías)  / Azure', active: false },
          { label: 'GCP', active: false },
          { label: 'AWS', active: false },
          { label: 'Tableau', active: false },
          { label: 'Power BI', active: false },
          { label: 'Snowflake (plataformas) / MySQL / PostgreSQL', active: false },
          { label: 'Mongo DB', active: false },
          { label: 'Cassandra', active: false },
          { label: 'Elastic Search', active: false },
          { label: 'Redis (DB)', active: false },
        ]
      },
      {
        label: 'SRE',
        value: 'SRE',
        active: false,
        children: [
          { label: 'Dynatrace', active: false },
          { label: 'Splunk', active: false },
          { label: 'Prometheus', active: false },
          { label: 'Grafana', active: false },
          { label: 'Datadog', active: false },
          { label: 'New Relic', active: false },
        ]
      },
    ]
  },
  {
    label: 'Design', value: 'Design', active: false,
    specialty: [
      { label: "Product Design", value: "Product Design", active: false, },
      { label: "UX", value: "UX", active: false, },
      { label: "UI", value: "UI", active: false, },
      { label: "User Research", value: "User Research", active: false, },
      { label: "Service Design", value: "Service Design", active: false, },
      { label: "Content Design", value: "Content Design", active: false, },
      { label: "Design Ops", value: "Design Ops", active: false, },
      { label: "Design Systems", value: "Design Systems", active: false, }
    ]
  },
  {
    label: 'Delivery & Ops', value: 'Delivery & Ops', active: false,
    specialty: [
      { label: "Software Delivery", value: "Software Delivery", active: false, },
      { label: "Agile Coaching", value: "Agile Coaching", active: false, },
      { label: "Project Management", value: "Project Management", active: false, },
      { label: "Program Management", value: "Program Management", active: false, }
    ]
  },
  {
    label: 'Data & AI', value: 'Data & AI', active: false,
    specialty: [
      { label: "Data Analysis", value: "Data Analysis", active: false },
      { label: "Data Engineering", value: "Data Engineering", active: false },
      { label: "Data Science", value: "Data Science", active: false },
      { label: "Data Architecture", value: "Data Architecture", active: false },
      { label: "ML Engineering", value: "ML Engineering", active: false },
      { label: "Pompt & NLP Engineering", value: "Pompt & NLP Engineering", active: false },
    ]
  },
  {
    label: 'Product', value: 'Product', active: false,
    specialty: [
      { label: "Product Discovery", value: "Product Discovery", active: false },
      { label: "Product Strategy", value: "Product Strategy", active: false },
      { label: "Product Delivery & Execution", value: "Product Delivery & Execution", active: false },
      { label: "Product Ops", value: "Product Ops", active: false },
      { label: "Product Analytics", value: "Product Analytics", active: false },
    ]
  },
  {
    label: 'Growth & Marketing', value: 'Growth & Marketing', active: false,
    specialty: [
      { label: "MarTech", value: "MarTech", active: false },
      { label: "Growth", value: "Growth", active: false }
    ]
  }
]

export const specialtyOptions: SelectOption[] = [
  {
    label: 'Front-end Web',
    value: 'Front-end Web',
    active: false,
    children: [
      { label: 'Javascript', active: false },
      { label: 'TypeScript' , active: false},
      { label: 'React', active: false},
      { label: 'Angular JS', active: false},
      { label: 'Vue JS', active: false }
    ]
  },
  {
    label: 'Front-end Mobile',
    value: 'Front-end Mobile',
    children: [
      { label: 'Swift', active: false },
      { label: 'Kotlin', active: false },
      { label: 'Flutter', active: false },
      { label: 'React Native', active: false },
      { label: 'Ionic', active: false },
      { label: 'Objective C', active: false },
      { label: 'Java Mobile', active: false },
    ]
  },
  {
    label: 'Backend',
    value: 'Backend',
    children: [
      { label: 'Java', active: false},
      { label: 'Python', active: false},
      { label: '.Net', active: false},
      { label: 'PHP', active: false},
      { label: 'Go', active: false},
      { label: 'Ruby', active: false},
      { label: 'Javascript Backend', active: false},
      { label: 'C++', active: false},
      { label: 'C#', active: false},
      { label: 'Laravel', active: false},
      { label: 'Flask', active: false},
      { label: 'Django', active: false},
      { label: 'Node JS', active: false},
      { label: 'Spring Boot', active: false},
      { label: 'ASP .NET', active: false},
      { label: 'Express.js', active: false},
    ]
  },
  {
    label: 'QA',
    value: 'QA',
    children: [
      { label: 'Selenium', active: false },
      { label: 'JUnit/TestNG', active: false },
      { label: 'Cypress', active: false },
    ]
  },
  {
    label: 'Architecture',
    value: 'Architecture',
    children: [
      { label: 'Kafka', active: false },
      { label: 'Docker', active: false },
      { label: 'Kubernetes', active: false },
      { label: 'AWS', active: false },
      { label: 'GCP', active: false },
      { label: 'Azure', active: false },
      { label: 'Digital Ocean', active: false },
      { label: 'Heroku', active: false },
    ]
  },
  {
    label: 'DevOps',
    value: 'DevOps',
    children: [
      { label: 'Docker', active: false },
      { label: 'Kubernetes', active: false },
      { label: 'AWS', active: false },
      { label: 'GCP', active: false },
      { label: 'Azure', active: false },
      { label: 'Digital Ocean', active: false },
      { label: 'Heroku', active: false },
    ]
  },
  {
    label: 'Data',
    value: 'Data',
    children: [
      { label: 'Python', active: false },
      { label: 'R', active: false },
      { label: 'SQL', active: false },
      { label: 'Scala', active: false },
      { label: 'Java (lenguajes) / Pandas', active: false },
      { label: 'NumPy', active: false },
      { label: 'TensorFlow', active: false },
      { label: 'Apache Spark', active: false },
      { label: 'Scikit-learn', active: false },
      { label: 'Hadoop', active: false },
      { label: 'D3.js (framework/librerías)  / Azure', active: false },
      { label: 'GCP', active: false },
      { label: 'AWS', active: false },
      { label: 'Tableau', active: false },
      { label: 'Power BI', active: false },
      { label: 'Snowflake (plataformas) / MySQL / PostgreSQL', active: false },
      { label: 'Mongo DB', active: false },
      { label: 'Cassandra', active: false },
      { label: 'Elastic Search', active: false },
      { label: 'Redis (DB)', active: false },
    ]
  },
  {
    label: 'SRE',
    value: 'SRE',
    children: [
      { label: 'Dynatrace', active: false },
      { label: 'Splunk', active: false },
      { label: 'Prometheus', active: false },
      { label: 'Grafana', active: false },
      { label: 'Datadog', active: false },
      { label: 'New Relic', active: false },
    ]
  },
]

export const yearsOfExperienceOptions: SelectOption[] = [
  { label: 'Menos de 2 años', value: 'Menos de 2 años', active: false,},
  { label: '2 - 5 años', value: '2 - 5 años', active: false,},
  { label: '5 - 8 años', value: '5 - 8 años', active: false,},
  { label: 'Más de 8 años', value: 'Más de 8 años', active: false,},
]

export const industriesOfExpertiseOptions: SelectOption[] = [
  { label: 'SaaS', value: "SaaS",  active: false },
  { label: 'Banca', value: "Banca",  active: false },
  { label: 'Seguros', value: "Seguros",  active: false },
  { label: 'Consultoría', value: "Consultoría",  active: false },
  { label: 'Retail', value: "Retail",  active: false },
  { label: 'Tech', value: "Tech",  active: false },
  { label: 'eCommerce', value: "eCommerce",  active: false },
  { label: 'AI', value: "AI",  active: false },
  { label: 'Consumo masivo', value: "Consumo masivo",  active: false },
  { label: 'Gobierno', value: "Gobierno",  active: false },
  { label: 'Educación', value: "Educación",  active: false },
  { label: 'Salud', value: "Salud",  active: false },
  { label: 'Transporte', value: "Transporte",  active: false },
  { label: 'Logística', value: "Logística",  active: false },
  { label: 'Medios y entretenimientos', value: "Medios y entretenimientos",  active: false },
  { label: 'Telecomunicaciones', value: "Telecomunicaciones",  active: false },
  { label: 'Energía', value: "Energía",  active: false },
  { label: 'Otros', value: "Otros", active: false },
]

export const workDisciplineOptions: SelectOption[] = [
  { label: 'Engineering', value: "Engineering", active: false,},
  { label: 'Design', value: "Design", active: false,},
  { label: 'Delivery & Ops', value: "Delivery & Ops", active: false,},
  { label: 'Data & AI', value: "Data & AI", active: false,},
  { label: 'Product', value: "Product", active: false,},
  { label: 'Growth & Marketing', value: "Growth & Marketing", active: false,}
]

export const workSchemeOptions: SelectOption[] = [
  { label: 'Full time', value: "Full time", active: false,},
  { label: 'Por horas', value: "Por horas", active: false,},
  { label: 'Por proyecto', value: "Por proyecto", active: false,},
]

export const workModeOptions: SelectOption[] = [
  { label: 'Remoto', value: "Remoto", active: false,},
  { label: 'Híbrido', value: "Híbrido", active: false,},
  { label: 'Presencial', value: "Presencial", active: false,},
]

export const preferredBenefitsOptions: SelectOption[] = [
  { label: 'Cobertura de salud', value: 'Cobertura de salud', active: false },
  { label: 'Viaje de empresa', value: 'Viaje de empresa', active: false },
  { label: 'Seguro dental', value: 'Seguro dental', active: false },
  { label: 'Training', value: 'Training', active: false },
  { label: 'Acceso a coworking', value: 'Acceso a coworking', active: false },
  { label: 'Clases de inglés', value: 'Clases de inglés', active: false },
  { label: 'Bono por desempeño', value: 'Bono por desempeño', active: false },
  { label: 'Convenio o acceso a gimnasio', value: 'Convenio o acceso a gimnasio', active: false },
  { label: 'Participación (equity)', value: 'Participación (equity)', active: false },
]

export const learnAboutRumboOptions: SelectOption[] = [
  { label: 'LinkedIn', value: 'LinkedIn',active: false },
  { label: 'Amigos', value: 'Amigos', active: false },
  { label: 'Google', value: 'Google', active: false },
  { label: 'Instagram', value: 'Instagram', active: false },
]

export const productInterestOptions: SelectOption[] = [
  { label: 'Staff Augmentation', value: 'Staff Augmentation',active: false },
  { label: 'Fractional Staffing', value: 'Fractional Staffing',active: false },
  { label: 'Hiring', value: 'Hiring',active: false },
  { label: 'Solución integral', value: 'Solución integral',active: false },
]