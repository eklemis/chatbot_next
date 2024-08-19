"use client";
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import setAxios from "@/lib/singletons/axios";
import useSWR from "swr";
import { SkeletonCard } from "@/components/compounded/skeleton-card";

interface PagingParams {
	curr_page: number;
	total: number;
}

export function ListPagination({ curr_page, total }: PagingParams) {
	const PER_PAGE = 10;
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious href="#" />
				</PaginationItem>

				<PaginationItem>
					<PaginationLink href="#">1</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#" isActive>
						2
					</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationLink href="#">3</PaginationLink>
				</PaginationItem>
				<PaginationItem>
					<PaginationEllipsis />
				</PaginationItem>
				<PaginationItem>
					<PaginationNext href="#" />
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}

interface Params {
	dictionary: any;
	currPage: number;
	totalPage: number;
}

interface Summary {
	id: string;
	assistantId: string;
	userId: string;
	title: string;
	summary: string;
}

export function SummaryList({ dictionary, currPage, totalPage }: Params) {
	const dict = dictionary.dictionary;

	// Fetcher function for useSWR
	const fetcher = (url: string) => setAxios.get(url).then((res) => res.data);

	// Use useSWR to fetch the summary list
	const { data: summaryList, error } = useSWR<Summary[]>(
		"/api/summaries",
		fetcher
	);

	// Handle loading state
	if (!summaryList && !error) {
		return (
			<div className="flex gap-x-2">
				<SkeletonCard />
				<SkeletonCard />
				<SkeletonCard />
			</div>
		);
	}

	// Handle error state (optional)
	if (error) {
		return <div>Error loading summaries</div>;
	}

	return (
		<section className="w-full flex flex-col items-center justify-center mt-16">
			<h2 className="text-2xl font-bold">Interview Summaries</h2>
			<ul className="flex gap-4 p-4 px-0 w-full max-w-7xl flex-wrap items-center justify-center mt-4">
				{summaryList?.map((list: Summary, idx) => {
					return (
						<li
							className="p-6 rounded-md overflow-clip bg-gradient-to-br to-amber-50 via-rose-50 from-white items-between w-64 max-w-64 h-44 max-h-44 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]"
							key={"IS-" + idx}
						>
							<Link
								className="h-full w-full flex flex-col gap-y-2"
								href={"/admin/summaries/" + list.id}
							>
								<h3 className="text-sm font-bold text-grey-700 flex h-11 min-h-11 line-clamp-2">
									{list?.title}
								</h3>
								<p className="text-[12px] line-clamp-4 text-gray-600">
									<ReactMarkdown>{list.summary}</ReactMarkdown>
								</p>
							</Link>
						</li>
					);
				})}
			</ul>
			{/* <ListPagination curr_page={currPage} total={totalPage} /> */}
		</section>
	);
}
