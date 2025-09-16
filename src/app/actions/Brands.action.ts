import { BrandsResponse } from '../Type/Brands.model';

export async function getBrands(): Promise<BrandsResponse> {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/brands", {
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch brands: ${response.statusText}`);
    }

    const data = await response.json();

    return {
      data: data.data || [],
      status: response.status,
      message: data.message || 'Success',
    };
  } catch (error: unknown) {
    console.error('Error in getBrands:', error);
    return {
      data: [],
      status: 500,
      message: error instanceof Error ? error.message : "There was an error fetching brands",
    };
  }
}