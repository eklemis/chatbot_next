//FORM for Adding New Assistant
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { PlusIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
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
} from "@/components/ui/form";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { ComboboxModel } from "../../../../components/compounded/model-combobox";
import Models from "@/lib/assistant/domain/models";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const FormSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "Name must be at least 2 characters.",
		})
		.max(256),
	model: z.string().nonempty({ message: "Model is required" }),
	description: z.string().max(512),
	instruction: z.string().max(256000),
	top_p: z.coerce.number().min(0).max(1),
	temperature: z.coerce.number().min(0).max(2),
});

export function NewAssistantForm(dictionary: any) {
	const { toast } = useToast();
	const [submitting, setSubmitting] = useState(false);
	const [sheetOpen, setSheetOpen] = useState(false);

	const dict = dictionary.dictionary.assistant;
	const general_dict = dictionary.dictionary.general;
	const button_label = dict.create_assistant;
	const form_title = dict.title;
	const form_description = dict.formDescription;

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			name: "",
			model: Models.GPT4o,
			top_p: 1.0,
			temperature: 1.0,
		},
	});

	async function onSubmit(data: z.infer<typeof FormSchema>) {
		setSubmitting(true);
		let assistant = await axios.post("/api/assistants", data);
		toast({
			title: "The Assistant Has Been Created",
			description: (
				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
					<code className="text-white">
						{JSON.stringify(assistant, null, 2)}
					</code>
				</pre>
			),
		});
		form.reset();
		setSubmitting(false);
		setSheetOpen(false);
	}

	return (
		<Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
			<SheetTrigger asChild>
				<Button>
					<PlusIcon className="mr-2 h-4 w-4" /> {button_label}
				</Button>
			</SheetTrigger>
			<SheetContent className="w-1/3">
				<SheetHeader>
					<SheetTitle>{form_title}</SheetTitle>
					<SheetDescription>{form_description}</SheetDescription>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="w-full space-y-4"
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
											<ComboboxModel {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center gap-x-1">
											<FormLabel>Description</FormLabel>
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger asChild>
														<Button
															variant="ghost"
															className="inline-block p-1 rounded-full text-sm w-6 h-6"
														>
															<QuestionMarkCircledIcon />
														</Button>
													</TooltipTrigger>
													<TooltipContent>
														<p className="flex w-64">
															The description of the assistant. The maximum
															length is 512 characters.
														</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</div>
										<FormControl>
											<Textarea
												placeholder="Add description"
												id="description"
												{...field}
												rows={2}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="instruction"
								render={({ field }) => (
									<FormItem>
										<div className="flex items-center gap-x-1">
											<FormLabel>Instruction</FormLabel>
											<TooltipProvider>
												<Tooltip>
													<TooltipTrigger asChild>
														<Button
															variant="ghost"
															className="inline-block p-1 rounded-full text-sm w-6 h-6"
														>
															<QuestionMarkCircledIcon />
														</Button>
													</TooltipTrigger>
													<TooltipContent>
														<p className="flex w-64">
															The system instructions that the assistant uses.
															The maximum length is 256,000 characters.
														</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										</div>
										<FormControl>
											<Textarea
												placeholder="Add instruction"
												id="instruction"
												{...field}
												rows={6}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex items-center justify-between gap-x-4">
								<FormField
									control={form.control}
									name="temperature"
									render={({ field }) => (
										<FormItem className="w-full">
											<div className="flex items-center gap-x-1">
												<FormLabel>Temperature</FormLabel>
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger asChild>
															<Button
																variant="ghost"
																className="inline-block p-1 rounded-full text-sm w-6 h-6"
															>
																<QuestionMarkCircledIcon />
															</Button>
														</TooltipTrigger>
														<TooltipContent>
															<p className="flex w-64">
																What sampling temperature to use, between 0 and
																2. Higher values like 0.8 will make the output
																more random, while lower values like 0.2 will
																make it more focused and deterministic.
															</p>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</div>
											<FormControl>
												<Input
													{...field}
													type="number"
													className="w-full"
													min={0.0}
													max={2.0}
													step={0.1}
													value={Number(field.value)}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="top_p"
									render={({ field }) => (
										<FormItem className=" w-full">
											<div className="flex items-center gap-x-1">
												<FormLabel>Top P</FormLabel>
												<TooltipProvider>
													<Tooltip>
														<TooltipTrigger asChild>
															<Button
																variant="ghost"
																className="inline-block p-1 rounded-full text-sm w-6 h-6"
															>
																<QuestionMarkCircledIcon />
															</Button>
														</TooltipTrigger>
														<TooltipContent className="flex flex-col">
															<p className="w-64">
																An alternative to sampling with temperature,
																called nucleus sampling, where the model
																considers the results of the tokens with top_p
																probability mass. So 0.1 means only the tokens
																comprising the top 10% probability mass are
																considered. <br></br>
																<br></br>
															</p>
															<span className="font-semibold italic w-64">
																We generally recommend altering this or
																temperature but not both.
															</span>
														</TooltipContent>
													</Tooltip>
												</TooltipProvider>
											</div>
											<FormControl>
												<Input
													{...field}
													type="number"
													className="w-full"
													min={0.0}
													max={1.0}
													step={0.1}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className="">
								<Button type="submit" disabled={submitting}>
									{general_dict.create}
									{submitting ? "..." : ""}
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</SheetContent>
		</Sheet>
	);
}
