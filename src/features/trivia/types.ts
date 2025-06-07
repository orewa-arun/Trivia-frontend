export type Question = {
  id: number;
  question: string;
  options: string[];
  question_type: string;
  category: string;
};

export type AdSectionType = {
  id: number;
  title : string;
  content: string;
  duration: number;
  image_url?: string;
  video_url?: string;
  audio_url?: string;
  type?: string;
};