export interface IProduct {
  id: string;
  pName: string;
  pSlug: string;
  pStatus: boolean;
  pFeatured: boolean;
  pCategory: number;
  pQty: number;
  pPrice: number;
  pPriceSale: number;
  pDesc: string;
  pSize: string;
  pColor: string;
  pStar: number;
  pImapImageDefaultges: string;
  pImages: string;
  pSpecification: string;
  createdAt: Date;
  updatedAt: Date;
}
