"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ComboboxModel } from "@/components/compounded/model-combobox";
import { Button } from "@/components/ui/button";
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
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Assistant } from "@/lib/assistant/application/port/in/assistant";
import { useState } from "react";
import setAxios from "@/lib/singletons/axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
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

export function EditAssistantForm({
	assistant_id,
	dictionary,
	assistant,
}: {
	assistant_id: string;
	dictionary: any;
	assistant: Assistant;
}) {
	const [submitting, setSubmitting] = useState(false);
	const { toast } = useToast();
	const router = useRouter();

	const general_dict = dictionary.general;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: assistant?.name || "",
			model: assistant?.model || "",
			description: assistant?.description || "",
			instruction: assistant?.instruction || "",
			top_p: assistant?.top_p || 1,
			temperature: assistant?.temperature || 1,
		},
	});

	async function submitHandler(data: z.infer<typeof formSchema>) {
		setSubmitting(true);
		let updateAssistantResp = await setAxios.put(
			"/api/assistants/" + assistant_id,
			{
				name: data.name,
				model: data.model,
				description: data.description,
				instruction: data.instruction,
				top_p: data.top_p,
				temperature: data.temperature,
			}
		);
		console.log("Update repsponse:", updateAssistantResp);
		if (updateAssistantResp.status === 200) {
			toast({
				title: "Update Status",
				description: "Successfully update the assistant!",
			});
		}
		setSubmitting(false);
		router.push("/admin/");
	}

	return (
		<section className="w-full md:max-w-2xl md:border p-4 md:p-8 rounded">
			<h1 className="font-bold">Change Assistant</h1>
			<Form {...form}>
				<div className="grid gap-4 py-4">
					<form
						onSubmit={form.handleSubmit(submitHandler)}
						className="space-y-8 w-full"
					>
						<div className="flex items-center gap-x-4 justify-between">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="ex. Ben" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="model"
								render={({ field }) => (
									<FormItem className="w-full">
										<FormLabel>Model</FormLabel>
										<FormControl>
											<ComboboxModel {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
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
														The description of the assistant. The maximum length
														is 512 characters.
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
														The system instructions that the assistant uses. The
														maximum length is 256,000 characters.
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
															What sampling temperature to use, between 0 and 2.
															Higher values like 0.8 will make the output more
															random, while lower values like 0.2 will make it
															more focused and deterministic.
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
															called nucleus sampling, where the model considers
															the results of the tokens with top_p probability
															mass. So 0.1 means only the tokens comprising the
															top 10% probability mass are considered. <br></br>
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
								{general_dict.update}
								{submitting ? "..." : ""}
							</Button>
						</div>
					</form>
				</div>
			</Form>
		</section>
	);
}
