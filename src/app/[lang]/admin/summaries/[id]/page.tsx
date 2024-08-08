import React from "react";
import { getDictionary } from "../../../dictionaries";
import { PrismaLoadInterview } from "../../../../../lib/interview/adapter/in/prisma/prisma_loadinterview.adapter";
import { Label } from "@/components/ui/label";
import ReactMarkdown from "react-markdown";
import { LoadAssistantController } from "@/lib/assistant/adapter/in/load_assistant.controller";

export default async function Page({
	params,
	searchParams,
}: {
	params: { lang: string; id: string };
	searchParams: { edit?: string };
}) {
	const isEditing = searchParams.edit === "true";

	const lang = params.lang;
	const summary_id = params.id;

	const loader = new PrismaLoadInterview();
	const summaryObj = await loader.load(summary_id);

	const assistantId = summaryObj ? summaryObj.assistantId : "";
	const assistantLoader = new LoadAssistantController();
	await assistantLoader.loadAssistant(assistantId);

	const dict = await getDictionary(lang); // en

	return (
		<section className="p-10 flex flex-col mt-2 gap-y-2">
			<h1 className="text-3xl font-bold">{summaryObj?.title}</h1>
			<p className="text-gray-500">
				Interview with{" "}
				<span className="font-bold text-yellow-900">
					{assistantLoader.getAssistantName()}
				</span>
			</p>
			<div className="px-16 py-8 border mt-4 rounded">
				<ReactMarkdown>{summaryObj?.summary}</ReactMarkdown>
			</div>
		</section>
	);
}
