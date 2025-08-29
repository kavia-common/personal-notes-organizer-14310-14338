export interface Tag {
  id?: string;
  name: string;
  color?: string | null;
}

export interface Note {
  id?: string;
  title: string;
  content: string;
  tags: Tag[];
  category?: string | null;
  createdAt?: string;
  updatedAt?: string;
  archived?: boolean;
  pinned?: boolean;
}
