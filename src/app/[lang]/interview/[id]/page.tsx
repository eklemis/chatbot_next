import { getDictionary } from "../../dictionaries";
import { Chatbox } from "./chatbox";
import setAxios from "@/lib/singletons/axios";
import { Slash } from "lucide-react";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

function BreadcrumbWithCustomSeparator() {
	return (
		<Breadcrumb>
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<Slash />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbPage>Interview</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
async function getInterviewId(): Promise<string> {
	let interviewRequestResp = await setAxios.get("/api/interview");
	console.log("interviewResp:", interviewRequestResp.data);
	let interviewId = interviewRequestResp.data.interview_id;
	return Promise.resolve(interviewId);
}

export default async function Page({
	params,
}: {
	params: { lang: string; id: string };
}) {
	const lang = params.lang;
	const assistantId = params.id;
	const dict = await getDictionary(lang); // en
	const interviewId = await getInterviewId();
	return (
		<>
			<nav className="p-2 sticky top-0 bg-slate-50 z-50 flex justify-between">
				<BreadcrumbWithCustomSeparator />
				<div className=" text-sm">
					<p>
						Assistant <span className=" text-gray-500">{assistantId}</span>
					</p>
				</div>
			</nav>
			<main>
				<Chatbox assistantId={assistantId} interviewId={interviewId} />
			</main>
		</>
	);
}
