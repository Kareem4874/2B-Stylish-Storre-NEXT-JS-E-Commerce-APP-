"use server"
import { getUserToken } from "@/lib/tokenutils";
import axios from "axios";

const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

async function getAuthHeaders() {
    const token = await getUserToken();
    return { token: token as string };
}

export async function getUserCart() {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.get(`${BASE_URL}/cart`, { headers });
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

export async function addProductToCart(productId: string) {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.post(
            `${BASE_URL}/cart`,
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
            message: "Failed to add product to cart",
        };
    }
}

export async function updateCartProductQuantity(productId: string, count: number) {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.put(
            `${BASE_URL}/cart/${productId}`,
            { count },
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
            message: "Failed to update cart quantity",
        };
    }
}

export async function removeCartItem(productId: string) {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.delete(`${BASE_URL}/cart/${productId}`, { headers });
        return {
            data: response.data,
            status: response.status,
            message: response.data.message,
        };
    } catch (error: unknown) {
        return {
            data: [],
            status: 500,
            message: "Failed to remove cart item",
        };
    }
}

export async function clearUserCart() {
    try {
        const headers = await getAuthHeaders();
        const response = await axios.delete(`${BASE_URL}/cart`, { headers });
        return {
            data: response.data,
            status: response.status,
            message: response.data.message,
        };
    } catch (error: unknown) {
        return {
            data: [],
            status: 500,
            message: "Failed to clear user cart",
        };
    }
}

