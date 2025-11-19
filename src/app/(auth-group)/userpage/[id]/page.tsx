"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Avatar, Badge, Card, Flex, Skeleton, Text, Separator } from "@radix-ui/themes";
import { Mail, User as UserIcon, Calendar, Shield } from "lucide-react";

import { User } from "../../../../../generated/prisma";
import gqlClient from "@/lib/services/gql";
import { GET_USER } from "@/lib/gql/queries";
import EditUserRoleBtn from "@/components/admin-components/edit-user-role-btn";

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | undefined;
  loading: boolean;
}

function InfoItem({ icon, label, value, loading }: InfoItemProps) {
  return (
    <Skeleton loading={loading}>
      <Flex gap="3" align="center" className="!p-4 !rounded-lg !dark:!bg-gray-800/50">
        <div className=" !shrink-0">{icon}</div>
        <Flex direction="column" gap="1" className="!flex-1 !min-w-0">
          <Text size="1" color="gray" weight="medium">
            {label}
          </Text>
          <Text size="3" weight="bold" className="!truncate">
            {value || "N/A"}
          </Text>
        </Flex>
      </Flex>
    </Skeleton>
  );
}

export default function UserPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams() as { id: string };

  useEffect(() => {
    if (!id) return;

    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);

        const data: { getUser: User } = await gqlClient.request(GET_USER, {
          getUserId: id,
        });

        if (data.getUser) setUser(data.getUser);
        else setError("User not found");
      } catch (err) {
        console.error("Error fetching user:", err);
        setError("Failed to load user details");
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [id]);

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getRoleBadgeColor = (role: string | undefined) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return "red";
      case "manager":
        return "blue";
      case "user":
        return "green";
      default:
        return "gray";
    }
  };

  if (error) {
    return (
      <div className="!max-w-2xl !mx-auto !p-6">
        <Card className="!p-8 center">
          <Text size="5" weight="bold" className=" !mb-2">
            {error}
          </Text>
          <Text size="2" color="gray">
            Unable to retrieve user information
          </Text>
        </Card>
      </div>
    );
  }

  return (
    <div className="!max-w-3xl !mx-auto !p-4 !sm:!p-6 !space-y-6">
      {/* Profile Header Card */}
      <Card className="!p-6 !sm:!p-8">
        <Flex direction="column" align="center" gap="5">
          {/* Avatar */}
          <Skeleton loading={loading}>
            <div className="!relative">
              <Avatar
                src={user?.avatar || undefined}
                fallback={user?.name?.[0] || "U"}
                size="9"
                radius="full"
                className="!ring-4 !ring-blue-500/20"
              />
              <div className="!absolute !bottom-2 !right-2 !w-4 !h-4 !bg-green-500 !rounded-full !border-4 !border-white " />
            </div>
          </Skeleton>

          {/* Name and Role */}
          <Flex direction="column" align="center" gap="2">
            <Skeleton loading={loading}>
              <Text size="6" weight="bold" className="center">
                {user?.name || "Unknown User"}
              </Text>
            </Skeleton>

            <Skeleton loading={loading}>
              <Badge
                size="3"
                color={getRoleBadgeColor(user?.role)}
                variant="soft"
                radius="full"
                className="!flex !items-center"
              >
                <Shield className="!w-3 !h-3 !mr-1" />
                {user?.role || "No Role"}
              </Badge>
            </Skeleton>
          </Flex>
        </Flex>
      </Card>

      {/* User Details Card */}
      <Card className="!p-6 !sm:!p-8">
        <Flex direction="column" gap="4">
          <Text size="4" weight="bold" className="!mb-2">
            User Information
          </Text>

          <Separator size="4" />

          <div className="!grid !grid-cols-1 md:!grid-cols-2 !gap-4">
            <InfoItem
              icon={<UserIcon className="!w-5 !h-5" />}
              label="Username"
              value={user?.username}
              loading={loading}
            />

            <InfoItem
              icon={<UserIcon className="!w-5 !h-5" />}
              label="Full Name"
              value={user?.name}
              loading={loading}
            />

            <InfoItem
              icon={<Mail className="!w-5 !h-5" />}
              label="Email"
              value={user?.email || "Not provided"}
              loading={loading}
            />

          </div>
        </Flex>
      </Card>

      {/* Actions Card */}
      <Card className="!p-6">
        <Flex justify="between" align="center" gap="4" wrap="wrap">
          <Text size="3" weight="medium" color="gray">
            Administrative Actions
          </Text>
          <EditUserRoleBtn user={user as User} />
        </Flex>
      </Card>
    </div>
  );
}
