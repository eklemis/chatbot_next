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

export function ListPagination() {
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
	interviewList: any[];
}
export function SummaryList({ dictionary, interviewList }: Params) {
	const dict = dictionary.dictionary;
	return (
		<section className="">
			<h2 className="text-2xl font-bold">Interview Summaries</h2>
			<ul className="flex gap-4 p-4 px-0 w-full items-center justify-center">
				{interviewList.map((list, idx) => {
					return (
						<li
							className="flex relative p-2 rounded overflow-clip bg-slate-50 items-center justify-center text-center w-52 max-w-52 h-40 max-h-40 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
							key={"IS-" + idx}
						>
							<Link href="#">{list.title}</Link>
							<div className="absolute flex items-center justify-center bottom-0 h-7 bg-slate-200 w-full">
								<p className="text-[8px] text-slate-500 text-center">
									{list.assistantId}
								</p>
							</div>
						</li>
					);
				})}
			</ul>
			<ListPagination />
		</section>
	);
}
