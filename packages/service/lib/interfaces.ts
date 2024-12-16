import { Measurements } from './dtos';

export interface Actress {
  id: number;
  uniqueName: string;
  chineseName: string;
  englistName?: string;
  names?: string[];
  birthDate?: string;
  birthPlace?: string;
  height?: number;
  weight?: number;
  measurements?: Measurements;
  cup?: string;
  bloodGroup?: string;
  debutDate?: string;
  hobbies?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Video {
  id: number;
  serialNumber: string;
  coverPath: string;
  title?: string;
  chineseTitle?: string;
  actresses?: Actress[];
  releaseDate?: string;
  bucketPath?: string;
  mosaic?: boolean;
  tags?: string[];
  synopsis?: string;
  createdAt: string;
  updatedAt: string;
}
