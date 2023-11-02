import { Pencil2Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { Button } from "@radix-ui/themes";

const EditIssueButton = ({ issueId }: { issueId: string }) => {
  return (
    <Button color="blue">
      <Pencil2Icon />
      <Link href={`/issues/edit/${issueId}`}>Edit Issue</Link>
    </Button>
  );
};

export default EditIssueButton;
