import { Measurements } from './dtos';

export interface Actress {
  id: number;
  unique_name: string;
  chinese_name: string;
  english_name?: string;
  other_names?: string[];
  birth_date?: string;
  birth_place?: string;
  height?: number;
  weight?: number;
  measurements?: Measurements;
  cup?: string;
  blood_group?: string;
  debut_date?: string;
  hobbies?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: number;
  serial_number: string;
  cover_url: string;
  title?: string;
  chinese_title?: string;
  actresses?: Actress[];
  release_date?: string;
  video_url?: string;
  mosaic?: boolean;
  tags?: string[];
  m3u8_url?: string;
  synopsis?: string;
  created_at: string;
  updated_at: string;
}
