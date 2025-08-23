import { logOut } from "@/lib/helper";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

export default function LogOutBtn() {
    return (
        <div>

            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color="red" >Log Out</Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Revoke access</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure want to LogOut?
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant="solid" color="red" onClick={() => logOut()}>
                                Log Out
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>

        </div>
    )
}