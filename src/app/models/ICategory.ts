export interface ICategory {
  id: string;
  cName: string;
  cSlug: string;
  cStatus: boolean;
  cFeatured: boolean;
  cDesc: string;
  cImage: string;
  createdAt: Date;
  updatedAt: Date;
}
