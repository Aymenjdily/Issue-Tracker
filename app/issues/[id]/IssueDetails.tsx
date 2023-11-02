import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@prisma/client";
import { Text, Heading, Card } from "@radix-ui/themes";
import React from "react";
  import ReactMarkDown from "react-markdown";

const IssueDetails = ({ issue }: { issue: Issue }) => {
  return (
    <>
      <Heading>{issue?.title}</Heading>
      <div className="flex space-x-3 my-2">
        <IssueStatusBadge status={issue?.status!} />
        <Text>{issue?.createdAt.toDateString()}</Text>
      </div>
      <Card className="prose mt-4 max-w-full">
        <ReactMarkDown>{issue?.description}</ReactMarkDown>
      </Card>
    </>
  );
};

export default IssueDetails;
