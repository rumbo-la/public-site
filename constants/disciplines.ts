import {IconDisciplineDataAi, IconDisciplineDeliveryOps, IconDisciplineDesign, IconDisciplineEngineering, IconDisciplineGrowthMarketing, IconDisciplineProduct } from '~/components/icon'
export const disciplines = [
  {
    title: 'Engineering',
    icon: IconDisciplineEngineering,
    children: [
      'Mobile',
      'Web',
      'Backend',
      'Fullstack',
      'QA',
      'Architecture',
      'DevOps'
    ],
    childrenFractional: [
      "CTO",
      "Tech Lead",
      "Cloud Expert",
      "Software Architect",
      "DevOps Expert",
      "Mobile Architect"
    ]
  },
  {
    title: 'Design',
    icon: IconDisciplineDesign,
    children: [
      'Product Design',
      'UX',
      'UI',
      'User Research',
      'Service Design',
      'Content Design',
      'Design Ops',
      'Design Systems'
    ],
    childrenFractional: [
      "Head of Design",
      "Design System Expert",
      "User Research Expert",
      "Service Design Expert"
    ]
  },
  {
    title: 'Delivery & Ops',
    icon: IconDisciplineDeliveryOps,
    children: [
      'Software Delivery',
      'Agile Coaching',
      'Project Management',
      'Program Management'
    ],
    childrenFractional: [
      "Head of Delivery",
      "Agile Coach",
      "Agile Ops Expert",
      "Software Delivery Expert"
    ]
  },
  {
    title: 'Data & AI',
    icon: IconDisciplineDataAi,
    children: [
      'Data Analysis',
      'Data Engineering',
      'Data Science',
      'Data Architecture',
      'ML Engineering',
      'Pompt & NLP Engineering'
    ],
    childrenFractional: [
      "Head of Data Science",
      "Head of Data Engineering",
      "GenAI Expert",
      "Data Architect"
    ]
  },
  {
    title: 'Product',
    icon: IconDisciplineProduct,
    children: [
      'Product Discovery',
      'Product Strategy',
      'Product Delivery & Execution',
      'Product Ops',
      'Product Analytics'
    ],
    childrenFractional: [
      "Head of Product",
      "Product Coach",
      "Product Analytics Expert"
    ]
  },
]