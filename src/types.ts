export interface ProductSubcategory {
  id: string;
  name: string;
  description: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  subcategories: ProductSubcategory[];
  coverImage: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  subcategory: string;
  location: string;
  year: number;
  image: string;
  description: string;
  difficulty?: string;
  materials?: string[];
  dimensions?: string;
  highlights?: string[];
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface CompanyValue {
  title: string;
  description: string;
  accentTitle?: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  phone: string;
  company?: string;
  interestCategory: string;
  message: string;
  appointmentDate?: string;
}
