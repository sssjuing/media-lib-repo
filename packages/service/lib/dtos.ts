export interface Measurements {
  bust: number;
  waist: number;
  hips: number;
}

export interface ActressDTO {
  id: number;
  unique_name: string;
  chinese_name: string;
  english_name: string | null;
  names: string[] | null;
  birth_date: string | null;
  birth_place: string | null;
  height: number | null;
  weight: number | null;
  measurements: Measurements | null;
  cup: string | null;
  blood_group: string | null;
  debut_date: string | null;
  hobbies: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface SubmitActressDTO {
  unique_name: string;
  chinese_name: string;
  names?: string;
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
}

export interface VideoDTO {
  id: number;
  serial_number: string;
  cover_path: string;
  title: string | null;
  chinese_title: string | null;
  actresses: ActressDTO[] | null;
  release_date: string | null;
  video_path: string | null;
  mosaic: boolean | null;
  tags: string[] | null;
  synopsis: string | null;
  created_at: string;
  updated_at: string;
  cover_url: string;
  video_url: string | null;
}

export interface SubmitVideoDTO {
  serial_number: string;
  cover_path: string;
  title?: string;
  chinese_title?: string;
  actresses?: Array<Pick<ActressDTO, 'id'>>;
  release_date?: string;
  video_path?: string;
  mosaic?: boolean;
  tags?: string[];
  synopsis?: string;
}
