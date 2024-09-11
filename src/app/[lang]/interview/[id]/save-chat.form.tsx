import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { date, z } from "zod";
import { Button } from "@/components/ui/button";
import setAxios from "@/lib/singletons/axios";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Params {
	assistantId: string;
	assistantName: string;
	content: string;
	onCancel: () => void;
}

const formSchema = z.object({
	title: z.string().min(2, {
		message: "Title must be at least 2 characters.",
	}),
	assistant_id: z.string().min(2, {
		message: "Assistant Id cannot be empty.",
	}),
	summary: z.string().min(20, {
		message: "Title must be at least 20 characters.",
	}),
});

export function SaveChatForm({
	assistantId,
	assistantName,
	content,
	onCancel,
}: Params) {
	const { toast } = useToast();
	const [isSaving, setIsSaving] = useState(false);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			assistant_id: assistantId,
			summary: content,
		},
	});
	async function onSubmit(data: z.infer<typeof formSchema>) {
		setIsSaving(true);
		setAxios
			.post("/api/summaries", data)
			.then((resp) => {
				console.log("Server response:", resp);
				setIsSaving(false);
				toast({
					description: "Your summary has been saved.",
				});
				onCancel();
			})
			.catch((err) => {
				console.error("Error on saving:", err);
				setIsSaving(false);
				toast({
					variant: "destructive",
					title: "Save failed! Something went wrong.",
					description: "There was a problem with the database.",
				});
			});
	}
	return (
		<Form {...form}>
			<CardHeader className="mt-12">
				<CardTitle>Save New Interview Summary</CardTitle>
				<CardDescription>
					Save the summary of the interview to be kept as Organizational
					Knowledge
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Title</FormLabel>
								<FormControl>
									<Input placeholder="Exit Interview with Fred" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="assistant_id"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Assistant ID</FormLabel>
								<FormControl>
									<Input placeholder="asst_xxxx" {...field} readOnly />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="summary"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Summary</FormLabel>
								<FormControl>
									<Input type="hidden" {...field} readOnly />
								</FormControl>
								<div className="border p-5 max-h-80 overflow-scroll rounded-md">
									<ReactMarkdown>{content}</ReactMarkdown>
								</div>
								<FormMessage />
							</FormItem>
						)}
					/>

					<CardFooter className=" flex gap-x-2">
						<Button type="submit" disabled={isSaving}>
							{isSaving ? "Saving" : "Save"}
						</Button>
						<Button onClick={onCancel} variant="ghost">
							Cancel
						</Button>
					</CardFooter>
				</form>
			</CardContent>
		</Form>
	);
}
