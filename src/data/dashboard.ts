interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  type: 'Virtual' | 'Presencial';
  date: string;
  time: string;
}

interface Benefit {
  id: number;
  title: string;
  description: string;
  isNew: boolean;
  image: string;
}

export const recentMembers: Member[] = [
  {
    id: 1,
    name: "María Quispe",
    role: "Estudiante",
    avatar: "/avatars/avatar1.jpg"
  },
  {
    id: 2,
    name: "Ana Torres",
    role: "Profesional",
    avatar: "/avatars/avatar2.jpg"
  },
  {
    id: 3,
    name: "Lucía Mendoza",
    role: "Estudiante",
    avatar: "/avatars/avatar3.jpg"
  },
  {
    id: 4,
    name: "Carmen Vega",
    role: "Profesional",
    avatar: "/avatars/avatar4.jpg"
  },
  {
    id: 5,
    name: "Patricia Luna",
    role: "Estudiante",
    avatar: "/avatars/avatar5.jpg"
  }
];

export const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "Workshop: Innovación en Minería",
    description: "Queremos que conozcas el verdadero poder de la innovación en minería a través de casos prácticos y experiencias reales.",
    type: "Virtual",
    date: "15 Feb, 2025",
    time: "2:00pm"
  },
  {
    id: 2,
    title: "Conferencia: Liderazgo Femenino en la Industria",
    description: "Únete a nuestras speakers internacionales para descubrir las claves del liderazgo efectivo en el sector minero.",
    type: "Virtual",
    date: "20 Feb, 2025",
    time: "3:00pm"
  },
  {
    id: 3,
    title: "Networking: Mujeres en Tecnología Minera",
    description: "Conecta con profesionales del sector y descubre las últimas tendencias en tecnología aplicada a la minería.",
    type: "Presencial",
    date: "25 Feb, 2025",
    time: "5:00pm"
  },
  {
    id: 4,
    title: "Taller: Sostenibilidad en Minería",
    description: "Aprende sobre las mejores prácticas en sostenibilidad y su implementación en proyectos mineros actuales.",
    type: "Virtual",
    date: "28 Feb, 2025",
    time: "4:00pm"
  },
  {
    id: 5,
    title: "Panel: El Futuro de la Minería",
    description: "Expertos del sector discutirán las tendencias y desafíos que enfrentará la industria en los próximos años.",
    type: "Virtual",
    date: "1 Mar, 2025",
    time: "6:00pm"
  }
];

export const highlightedBenefits: Benefit[] = [
  {
    id: 1,
    title: "Curso de Liderazgo",
    description: "Acceso gratuito al curso 'Liderazgo en Minería' con certificación internacional y mentorías personalizadas.",
    isNew: true,
    image: "/images/leadership-course.jpg"
  },
  {
    id: 2,
    title: "Programa de Mentoría",
    description: "Conecta con profesionales experimentadas del sector minero para impulsar tu desarrollo profesional.",
    isNew: true,
    image: "/images/mentorship.jpg"
  },
  {
    id: 3,
    title: "Biblioteca Digital",
    description: "Acceso ilimitado a nuestra biblioteca digital con más de 1000 recursos especializados en minería.",
    isNew: false,
    image: "/images/digital-library.jpg"
  },
  {
    id: 4,
    title: "Descuentos en Certificaciones",
    description: "Obtén hasta 50% de descuento en certificaciones internacionales del sector minero.",
    isNew: false,
    image: "/images/certifications.jpg"
  },
  {
    id: 5,
    title: "Red de Networking",
    description: "Acceso exclusivo a nuestra red de profesionales y eventos de networking mensuales.",
    isNew: true,
    image: "/images/networking.jpg"
  }
]; 