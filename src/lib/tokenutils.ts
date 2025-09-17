import { cookies  } from "next/headers";
import { decode } from "next-auth/jwt";


export async function getUserToken(){
    const cookiesdata = await cookies()
    const encryptToken = cookiesdata.get("next-auth.session-token" )?.value || cookiesdata.get("__Secure-next-auth.session-token")?.value;

    const data = await decode({token: encryptToken as string, secret:process.env.NEXTAUTH_SECRET! })
    

    return data?.token
}