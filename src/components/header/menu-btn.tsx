import { logOut } from "@/lib/helper";
import { Button, DropdownMenu } from "@radix-ui/themes";
import Link from "next/link";

export default function DropMenu() {
    return (
      
            <DropdownMenu.Root >
                <DropdownMenu.Trigger >
                    <div>

                    <div className="hidden md:inline">

                        <Button variant="surface">
                            <DropdownMenu.TriggerIcon />
                        </Button>
                    </div>
                    <div className="md:hidden sm:inline">
                        <Button variant="surface" size={"1"}>
                            <DropdownMenu.TriggerIcon />
                        </Button>

                    </div>
                    </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <Link href={"/profile"}> <DropdownMenu.Item>My Profile</DropdownMenu.Item></Link>
                    <DropdownMenu.Separator />

                  
                        <DropdownMenu.Item shortcut="⌘ ⌫" color="red" onClick={()=>logOut()}>
                            Log Out
                        </DropdownMenu.Item>
                   
                </DropdownMenu.Content>
            </DropdownMenu.Root>


    

    )
}