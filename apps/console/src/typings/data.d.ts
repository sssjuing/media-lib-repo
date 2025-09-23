interface ResourceDTO {
  id: string;
  name: string;
  url: string;
  downloading: boolean;
  success: boolean;
  created_at: string | null;
}

interface SegmentDTO {
  u: string;
  p: string;
  s: number;
}
