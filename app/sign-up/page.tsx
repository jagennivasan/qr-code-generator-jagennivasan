import SignUpForm from "@/components/forms/SignUpForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
export default async function Signup(){
    const session = await getServerSession(authOptions);
    if(session) redirect("/dashboard")
    return(
       <SignUpForm/>
    )
}