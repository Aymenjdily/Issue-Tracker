"use client";

import { TextField, Button, Callout } from "@radix-ui/themes";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IssueSchema } from "@/app/validationsSchemas";
import { z } from "zod";
import { ErrorMessage, Spinner } from "@/app/components";
import { Issue } from "@prisma/client";
import SimpleMDE from 'react-simplemde-editor';

type IssueFormData = z.infer<typeof IssueSchema>;

interface Props {
  issue?: Issue
}

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(IssueSchema),
  });

  const Submit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if(issue){
        await axios.patch(`/api/issues/${issue.id}`, data)
      } else {
        const response = await axios.post("/api/issues", data);
        if (response.status === 201) {
          router.push("/issues/list");
          router.refresh()
          reset();
          setIsSubmitting(false);
        }
      }
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form onSubmit={Submit} className="space-y-3">
        <TextField.Root>
          <TextField.Input defaultValue={issue?.title} placeholder="Title" {...register("title")} />
        </TextField.Root>
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <Button disabled={isSubmitting}>
          { issue ? 'Update Issue' : 'Submit New Issue' } {isSubmitting && <Spinner />}{" "}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
