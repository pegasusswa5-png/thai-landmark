export interface LocalPlace {
  id: string;
  name: { th: string; en: string };
  region: 'north' | 'central' | 'south' | 'isan';
  type: 'hidden-gem' | 'recommended' | 'culture' | 'nature';
  description: { th: string; en: string };
  location: { th: string; en: string };
  bannerUrl: string;
  images: string[];
  videos: {
    title: { th: string; en: string };
    url: string;
    duration: string;
    author: string;
  }[];
  reviews: {
    id: string;
    author: string;
    rating: number;
    comment: { th: string; en: string };
    date: string;
    avatarUrl: string;
  }[];
}

export interface Accommodation {
  id: string;
  name: { th: string; en: string };
  region: 'north' | 'central' | 'south' | 'isan';
  priceRange: string;
  rating: number;
  bannerUrl: string;
  description: { th: string; en: string };
  amenities: { th: string[]; en: string[] };
  contact: string;
}

export interface LocalFood {
  id: string;
  name: { th: string; en: string };
  shopName: { th: string; en: string };
  region: 'north' | 'central' | 'south' | 'isan';
  price: string;
  bannerUrl: string;
  description: { th: string; en: string };
  videoUrl: string;
  videoAuthor: string;
}

export interface UserProfile {
  name: string;
  email: string;
  language: 'th' | 'en';
  favoritePlaces: string[];
  isLoggedIn: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}
