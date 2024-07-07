export interface Clipping {
  title: string;
  author: string;
  text: string;
  pageLocation: number;
  dateAdded: string;
}

export interface GroupedClipping {
  title: string;
  author: string;
  highlights: Clipping[];
}

export interface Sync {
  title: string;
  author: string;
  highlightCount: number;
}
