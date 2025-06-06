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
  ad_image_url?: string;
  ad_video_url?: string;
  ad_audio_url?: string;
  ad_type?: string;
};