// List all created Assistants and Serve adding New Assistant
// Potentially List latest thread/converation with Assistants
import { getDictionary } from "../dictionaries";
import { Circle, CheckCircle2 } from "lucide-react";

export default async function Page({ params }: { params: { lang: string } }) {
	const lang = params.lang;
	const dict = await getDictionary(lang);

	return (
		<section className="flex flex-col items-center justify-center gap-y-4 p-4">
			<h1 className="text-3xl font-bold">Milestones</h1>
			<div className="flex flex-col md:flex-row gap-5 items-start justify-between">
				<section className="flex flex-col gap-y-2 p-8 rounded w-full bg-gray-50 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
					<h2 className="text-xl font-bold">Completed</h2>
					<ul className="flex flex-col gap-y-1">
						<li className="flex items-center gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<CheckCircle2 className="w-4 h-4 text-gray-500" />
							Create Assistant
						</li>
						<li className="flex items-center gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<CheckCircle2 className="w-4 h-4 text-gray-500" />
							Interview with an Assistant
						</li>
						<li className="flex items-center gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<CheckCircle2 className="w-4 h-4 text-gray-500" />
							Assistant provide summary
						</li>
					</ul>
				</section>
				<section className="flex flex-col gap-y-2 p-8 rounded w-full bg-gray-50 shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)]">
					<h2 className="text-xl font-bold">Remaining</h2>
					<ul className="flex flex-col gap-y-1">
						<li className="flex items-center gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<Circle className="w-4 h-4 text-gray-500" />
							Change and Delete Assistants
						</li>
						<li className="flex items-center gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<Circle className="w-4 h-4 text-gray-500" />
							Save interview summary result
						</li>
						<li className="flex items-center gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<Circle className="w-4 h-4 text-gray-500" />
							Listing interview results
						</li>
						<li className="flex items-center gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<Circle className="w-4 h-4 text-gray-500" />
							User authentication for RBAC implementation
						</li>
						<li className="flex items-center gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<Circle className="w-4 h-4 text-gray-500" />
							Integrate with other CMS
						</li>
					</ul>
				</section>
			</div>
		</section>
	);
}
