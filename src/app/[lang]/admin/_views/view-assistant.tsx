"use client";

import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Assistant } from "@/lib/assistant/application/port/in/assistant";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Pencil1Icon } from "@radix-ui/react-icons";

export function ViewAssistant({
	assistant_id,
	dictionary,
	assistant,
}: {
	assistant_id: string;
	dictionary: any;
	assistant: Assistant;
}) {
	const general_dict = dictionary.general;

	return (
		<section className="w-full md:max-w-2xl md:border p-4 md:p-8 rounded">
			<div className="flex justify-between">
				<h1 className="font-bold">View Assistant</h1>
				<Link
					className="flex items-center gap-x-2 text-blue-700"
					href={"/admin/assistants/" + assistant_id + "?edit=true"}
				>
					<Pencil1Icon /> Edit
				</Link>
			</div>
			<div>
				<div className="grid gap-4 py-4">
					<div className="flex items-center gap-x-4 justify-between">
						<div className="w-full">
							<Label>Name</Label>
							<Input placeholder="ex. Ben" value={assistant.name} readOnly />
						</div>
						<div className="w-full">
							<Label>Model</Label>
							<Input placeholder="ex. Ben" value={assistant.model} readOnly />
						</div>
					</div>
					<div>
						<Label>Description</Label>
						<Textarea readOnly>{assistant.description}</Textarea>
					</div>
					<div>
						<Label>Instructions</Label>
						<Textarea rows={8} readOnly>
							{assistant.instruction}
						</Textarea>
					</div>
					<div className="flex items-center gap-x-4 justify-between">
						<div className="w-full">
							<Label>Top P</Label>
							<Input
								type="number"
								placeholder="ex. Ben"
								value={assistant.top_p}
								readOnly
							/>
						</div>
						<div className="w-full">
							<Label>Temperature</Label>
							<Input
								type="number"
								placeholder="ex. Ben"
								value={assistant.temperature}
								readOnly
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
