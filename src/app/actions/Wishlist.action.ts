"use server"
import { getUserToken } from "@/lib/tokenutils";
import axios from "axios";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

async function getAuthHeaders() {
    const token = await getUserToken();
    return { token: token as string };
}

export async function getUserWishlist() {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${BASE_URL}/wishlist`, { headers });
        return {
            data: response.data,
            status: response.status,
            message: response.data.message,
        };
    } catch (error: unknown) {
        return {
            data: [],
            status: 500,
            message: "There is Error API",
        };
    }
}

export async function addProductToWishlist(productId: string) {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.post(
            `${BASE_URL}/wishlist`,
            { productId },
            { headers }
        );
        return {
            data: response.data,
            status: response.status,
            message: response.data.message,
        };
    } catch (error: unknown) {
        return {
            data: [],
            status: 500,
            message: "Failed to add product to wishlist",
        };
    }
}

export async function removeProductFromWishlist(productId: string) {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.delete(`${BASE_URL}/wishlist/${productId}`, { headers });
        return {
            data: response.data,
            status: response.status,
            message: response.data.message,
        };
    } catch (error: unknown) {
        return {
            data: [],
            status: 500,
            message: "Failed to remove product from wishlist Should Sign in first"
        };
    }
}


