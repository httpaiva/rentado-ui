//@ts-nocheck
import {
  Button,
  DocumentEditor,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components";
import { templateSchema } from "../schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Template } from "@/types/Template";

type Props = {
  template?: Template;
  onSubmit?: (values: z.infer<typeof templateSchema>) => Promise<void>;
  buttonText?: string;
  isReadOnly?: boolean;
};

export const DocumentForm = ({
  onSubmit,
  buttonText = "Salvar",
  template,
  isReadOnly = false,
}: Props) => {
  const form = useForm<z.infer<typeof templateSchema>>({
    resolver: zodResolver(templateSchema),
    defaultValues: {
      title: template?.title,
      content: template?.content,
    },
  });
  const shouldShowSubmitButton = onSubmit;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 flex flex-col w-[900px]"
      >
        {shouldShowSubmitButton && <Button type="submit">{buttonText}</Button>}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Titulo</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Insira o titulo do documento" disabled={isReadOnly} />
              </FormControl>
              <FormDescription>Insira o titulo do documento</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Conteudo</FormLabel>
              <FormControl>
                <DocumentEditor {...field} isReadOnly={isReadOnly} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
