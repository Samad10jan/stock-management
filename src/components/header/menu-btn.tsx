import { Button, DropdownMenu } from "@radix-ui/themes";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

export default function DropMenu() {
    return (
        <div   >
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

                    <Link href={"/login"}>
                        <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
                            Log Out
                        </DropdownMenu.Item>
                    </Link>
                </DropdownMenu.Content>
            </DropdownMenu.Root>


        </div>

    )
}