import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import React, { cache } from "react";
import { Grid, Box, Flex } from "@radix-ui/themes";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";
import AssigneeSelect from "./AssigneeSelect";

interface Props {
  params: { id: string };
}

const fetchUser = cache((issueId: string) => {
  return prisma.issue.findUnique({ where: { id: issueId }})
})

const IssueDetailPage = async ({ params }: Props) => {
  const session = await getServerSession(authOptions);
  const issue = await fetchUser(params.id)

  if (!issue) notFound;

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue!} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue!} />
            <EditIssueButton issueId={issue?.id!} />
            <DeleteIssueButton issueId={issue?.id!} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props){
  const issue = await fetchUser(params.id)

  return {
    title: issue?.title,
    description: 'Details of issue' + issue?.id
  }
}

export default IssueDetailPage;
