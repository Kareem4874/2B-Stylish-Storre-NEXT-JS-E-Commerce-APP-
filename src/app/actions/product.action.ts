"use server"



async function getProducts() {
  try {
    const response = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
      next: { revalidate: 1800 }, 
    });

    if (!response.ok) {
      throw new Error("Failed to fetch products");
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
      message: "There is Error API",
    };
  }
}


async function getproductsdetails(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
      next: { revalidate: 1800 } 
    })

    if (!res.ok) {
      return {
        data: [],
        status: res.status,
        message: "Error fetching product"
      }
    }

    const json = await res.json()
    return {
      data: json.data,
      status: res.status,
      message: json.message
    }
  } catch (error) {
    return {
      data: [],
      status: 500,
      message: "There is Error API"
    }
  }
}



export{
    getProducts,
    getproductsdetails
}
