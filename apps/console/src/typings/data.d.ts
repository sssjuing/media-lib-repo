interface ResourceDTO {
  id: string;
  name: string;
  url: string;
  status: 'waiting' | 'downloading' | 'unfinished' | 'success';
  created_at: string | null;
}

interface SegmentDTO {
  u: string;
  p: string;
  s: number;
}
