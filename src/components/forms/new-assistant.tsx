"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { PlusIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	FormDescription,
} from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { ComboboxModel } from "../compounded/model-combobox";
import Models from "@/lib/domain/models";
import { useState } from "react";

const FormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "Assistant name must be at least 2 characters.",
		})
		.max(256),
	model: z.string().nonempty({ message: "Model is required" }),
	description: z.string().max(512),
	instruction: z.string().max(256000),
});

export function NewAssistantForm(dictionary: any) {
	const dict = dictionary.dictionary.assistant;
	const general_dict = dictionary.dictionary.general;
	const button_label = dict.create_assistant;
	const form_title = dict.title;
	const form_description = dict.formDescription;
	const default_model: string = Models.GPT4o;
	const [selectedModel, setSelectedModel] = useState(default_model);

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			//model: Models.GPT4o,
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		toast({
			title: "You submitted the following values:",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">{JSON.stringify(data, null, 2)}</code>
				</pre>
			),
		});
	}

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button>
					<PlusIcon className="mr-2 h-4 w-4" /> {button_label}
				</Button>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{form_title}</SheetTitle>
					<SheetDescription>{form_description}</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full space-y-6"
						>
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="Add name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="model"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Model</FormLabel>
										<FormControl>
											<ComboboxModel
												value={selectedModel}
												onChange={(newValue) => setSelectedModel(newValue)}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="model"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Description</FormLabel>
										<FormDescription>
											The description of the assistant. The maximum length is
											512 characters.
										</FormDescription>
										<FormControl>
											<Textarea
												placeholder="Add description"
												id="description"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="model"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Instruction</FormLabel>
										<FormDescription>
											The system instructions that the assistant uses. The
											maximum length is 256,000 characters.
										</FormDescription>
										<FormControl>
											<Textarea
												placeholder="Add instruction"
												id="instruction"
												rows={8}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</form>
					</Form>
				</div>
				<SheetFooter>
					<SheetClose asChild>
						<Button type="submit">{general_dict.create}</Button>
					</SheetClose>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
