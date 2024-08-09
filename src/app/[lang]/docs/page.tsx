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
				<section className="flex flex-col gap-y-2 p-8 rounded w-full bg-gray-50 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
					<h2 className="text-xl font-bold">Completed</h2>
					<ul className="flex flex-col gap-y-1">
						<li className="flex items-start gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<CheckCircle2 className="min-w-5 min-h-5 w-5 h-5 text-green-600" />
							Create Assistant
						</li>
						<li className="flex items-start gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<CheckCircle2 className="min-w-5 min-h-5 w-5 h-5 text-green-600" />
							Interview with an Assistant
						</li>
						<li className="flex items-start gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<CheckCircle2 className="min-w-5 min-h-5 w-5 h-5 text-green-600" />
							Assistant provide summary
						</li>
						<li className="flex items-start gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<CheckCircle2 className="min-w-5 min-h-5 w-5 h-5 text-green-600" />
							Save interview summary result
						</li>
						<li className="flex items-start gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<CheckCircle2 className="min-w-5 min-h-5 w-5 h-5 text-green-600" />
							Listing interview results
						</li>
						<li className="flex items-start gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<CheckCircle2 className="min-w-5 min-h-5 w-5 h-5 text-green-600" />
							Change Assistants
						</li>
						<li className="flex items-start gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<CheckCircle2 className="min-w-5 min-h-5 w-5 h-5 text-green-600" />
							Autostart conversation by AI Assistant
						</li>
					</ul>
				</section>
				<section className="flex flex-col gap-y-2 p-8 rounded w-full bg-gray-50 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
					<h2 className="text-xl font-bold">Remaining</h2>
					<ul className="flex flex-col gap-y-1">
						<li className="flex items-start gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<Circle className="min-w-5 min-h-5 w-5 h-5 text-gray-500" />
							Delete Assistants
						</li>
						<li className="flex items-start gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<Circle className="min-w-5 min-h-5 w-5 h-5 text-gray-500" />
							User authentication for RBAC implementation
						</li>
						<li className="flex items-start gap-x-1 p-2 rounded bg-slate-200 text-sm px-4">
							<Circle className="min-w-5 min-h-5 w-5 h-5 text-gray-500" />
							Integrate with other CMS
						</li>
					</ul>
				</section>
			</div>
		</section>
	);
}
