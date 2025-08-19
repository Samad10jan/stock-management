import { Button, Dialog, Flex, Select, Text } from "@radix-ui/themes"
import { useState } from "react"
import { RoleType, User } from "../../../generated/prisma"
import gqlClient from "@/lib/services/gql"
import { EDIT_ROLE } from "@/lib/gql/mutation"
import CallOutMessage from "../reuseable-componets/call-out"

export default function EditUserRoleBtn({ user }: { user?: User }) {
  const [role, setRole] = useState<RoleType | undefined>(user?.role)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleEdit() {
    try {
      setLoading(true)
      const data: { updateUserRole: { id: string; role: RoleType } } =
        await gqlClient.request(EDIT_ROLE, {
          userId: user?.id,
          role,
        })

      if (data.updateUserRole) {
        setMessage("Role Updated")
      }
    } catch (err: any) {
      console.error(err.message)
      setMessage("Role Unable To Update")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>Edit Role</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit Role</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to Role
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Select.Root
              value={role}
              onValueChange={(value) => setRole(value as RoleType)}
            >
              <Select.Trigger />
              <Select.Content>
                <Select.Group>
                  <Select.Label>Role</Select.Label>
                  <Select.Item value={RoleType.manager}>Manager</Select.Item>
                  <Select.Item value={RoleType.staff}>Staff</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end" mb="5">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>

          
            <Button
              style={{ width: "100%", margin: "20px 0" }}
              onClick={handleEdit}
              disabled={loading}
            >
              <Text>Save</Text>
            </Button>
         
        </Flex>

        <CallOutMessage message={message} />
      </Dialog.Content>
    </Dialog.Root>
  )
}
