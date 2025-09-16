import { cookies  } from "next/headers";
import { decode } from "next-auth/jwt";


export async function getUserToken(){
    const cookiesdata = await cookies()
    const encryptToken = cookiesdata.get("next-auth.session-token")?.value;

    const data = await decode({token: encryptToken, secret:process.env.AUTH_SECRET! })
    

    return data?.token
}