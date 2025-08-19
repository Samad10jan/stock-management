import { Button, DropdownMenu } from "@radix-ui/themes";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function DropMenu() {
    return (
        <div>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <Button variant="surface">
                        <DropdownMenu.TriggerIcon />
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                   <Link href={"/profile"}> <DropdownMenu.Item>My Profile</DropdownMenu.Item></Link>
                    <DropdownMenu.Separator />
                  
                   <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
                        Log Out
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>


        </div>
    )
}