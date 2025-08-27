import { Button } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col justify-center items-center *:mt-3 ">
            <Link href={"/"}><Button variant="soft" className="hover:!scale-105 hover:!ring-2 !ring-blue-600 !transition-all !delay-200" >Go to home page</Button></Link>
            <Image src={"/not-found.png"} alt="not-found" width={500} height={500} />
        </div>
    )
}