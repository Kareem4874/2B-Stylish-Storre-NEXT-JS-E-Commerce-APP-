export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface BrandsResponse {
    data: Brand[];
    status: number;
    message: string;
  }