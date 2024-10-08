"use client";
import setAxios from "@/lib/singletons/axios";
import ReactMarkdown from "react-markdown";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";

interface Params {
	summaryId: string;
}

export function Summary({ summaryId }: Params) {
	interface SummaryObj {
		id: string;
		assistantId: string;
		assistantName: string;
		title: string;
		summary: string;
	}

	// Fetcher function for useSWR
	const fetcher = (url: string) => setAxios.get(url).then((res) => res.data);

	// Use useSWR to fetch the summary data
	const { data: summaryObj, error } = useSWR<SummaryObj>(
		`/api/summaries/${summaryId}`,
		fetcher
	);

	// Handle loading state
	if (!summaryObj && !error) {
		return (
			<div className="p-10 flex flex-col mt-2 space-y-3 min-h-[calc(100vh-100px)] w-full">
				<Skeleton className="h-10 w-full" />
				<Skeleton className="h-4  w-96" />
				<div className="space-y-2 mt-10">
					<Skeleton className="h-[125px] w-full rounded-xl" />
				</div>
			</div>
		);
	}

	// Handle error state (optional)
	if (error) {
		return <div>Error loading summary</div>;
	}

	return (
		<section className="p-10 flex flex-col mt-2 gap-y-2">
			<h1 className="text-3xl font-bold">{summaryObj?.title}</h1>
			<p className="text-gray-500">
				Interview with{" "}
				<span className="font-bold text-yellow-900">
					{summaryObj?.assistantName}
				</span>
			</p>
			<div className="px-16 py-8 border mt-4 rounded">
				<ReactMarkdown>{summaryObj?.summary}</ReactMarkdown>
			</div>
		</section>
	);
}
