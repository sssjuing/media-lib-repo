export interface FileDTO {
  key: string;
  name: string;
  ftype: 'file' | 'directory';
  size: number;
  last_modified: string;
  url: string | null;
  // url: FileDTO['ftype'] extends 'file' ? string : null;
}
