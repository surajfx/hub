export interface WishTemplate {
  id: string;
  slug: string;
  title: string;
  emoji: string;
  description: string;
  coverImage: string;
  theme: {
    primary: string;
    secondary: string;
    background: string;
    accent: string;
  };
  experienceFeatures: string[];
  isFeatured?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  category?: string;
}

export interface CustomizationField {
  id: string;
  type: 'text' | 'textarea' | 'photo' | 'date' | 'select' | 'multiphoto';
  label: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  maxPhotos?: number;
  options?: { value: string; label: string }[];
  defaultValue?: string | string[];
  helpText?: string;
}

export interface CustomizationStep {
  id: string;
  title: string;
  description?: string;
  fields: CustomizationField[];
}

export interface WishMedia {
  url: string;
  publicId: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface WishContent {
  [key: string]: string | string[] | WishMedia[] | Date | undefined;
}

export interface CreatedWish {
  id: string;
  templateId: string;
  recipient: {
    name: string;
    nickname?: string;
  };
  sender: {
    name: string;
  };
  content: WishContent;
  media: WishMedia[];
  settings: {
    music?: string;
    theme?: string;
    language?: string;
  };
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  viewCount?: number;
}

export interface DemoData {
  recipient: { name: string; nickname?: string };
  sender: { name: string };
  content: WishContent;
  media: WishMedia[];
}

export interface WishExperienceConfig {
  id: string;
  template: WishTemplate;
  demoData: DemoData;
  customizationSteps: CustomizationStep[];
  renderer: string; // component name reference
}
