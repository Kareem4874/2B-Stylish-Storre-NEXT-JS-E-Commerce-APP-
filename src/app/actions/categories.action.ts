"use server"

async function getcategories() {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
      next: { revalidate: 1800 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const data = await response.json();

    return {
      data: data.data,
      status: response.status,
      message: data.message,
    };
  } catch (error: unknown) {
    return {
      data: [],
      status: 500,
      message: error instanceof Error ? error.message : "There is Error API",
    };
  }
}


export{
    getcategories
}
