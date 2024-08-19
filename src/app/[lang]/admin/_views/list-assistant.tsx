"use client";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useSWR from "swr";
import axios from "axios";
import {
	DotsHorizontalIcon,
	TrashIcon,
	Pencil2Icon,
} from "@radix-ui/react-icons";
import { SkeletonCard } from "@/components/compounded/skeleton-card";
import Link from "next/link";

axios.defaults.baseURL = process.env.BASE_PATH;

interface Assistant {
	id: string;
	name: string;
	model: string;
	description: string;
	instruction: string;
	tools: string[];
	avatar: string;
	top_p: number;
	temperature: number;
}

export function AssistantList(dictionary: any) {
	const dict = dictionary.dictionary;
	const imageList = [
		"https://i.ibb.co.com/SKwpx5z/openart-assistant-6.jpg",
		"https://i.ibb.co.com/zxSXs0q/openart-assistant-2.jpg",
		"https://i.ibb.co.com/PNBTv9R/openart-assistant-1.jpg",
		"https://i.ibb.co.com/Wc72vLP/openart-assistant-5.jpg",
		"https://i.ibb.co.com/ftjn7JD/openart-assistant-4.jpg",
		"https://i.ibb.co.com/h9SGvb4/openart-assistant-3.jpg",
	];

	// Fetcher function for useSWR
	const fetcher = (url: string) => axios.get(url).then((res) => res.data);

	// Use useSWR to fetch the assistants
	const { data: assistants, error } = useSWR<Assistant[]>(
		"/api/assistants",
		fetcher
	);

	// Handle loading state
	if (!assistants && !error) {
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
		return <div>Error loading assistants</div>;
	}

	return (
		<Carousel className="w-fit flex items-center justify-center z-10">
			<CarouselContent className="-ml-1 gap-x-2 w-11/12">
				{assistants?.map((assistant, index) => (
					<CarouselItem
						key={index}
						className="pl-1 max-w-60 md:basis-1/2 lg:basis-1/3"
					>
						<Card className="p-1 border h-full">
							<CardContent className="flex flex-col gap-y-4 items-center justify-between p-4 relative">
								<DropdownMenu key={"dm-assistant-" + index}>
									<DropdownMenuTrigger className="absolute h-6 right-2 top-0">
										<DotsHorizontalIcon className=" text-gray-500" />
									</DropdownMenuTrigger>
									<DropdownMenuContent>
										<DropdownMenuItem>
											<Link
												href={"/admin/assistants/" + assistant.id}
												className="flex w-full gap-x-2"
											>
												<span>Open</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem className="flex gap-x-1">
											<Link
												href={
													"/admin/assistants/" + assistant.id + "?edit=true"
												}
												className="flex w-full gap-x-2"
											>
												<Pencil2Icon /> <span>Edit</span>
											</Link>
										</DropdownMenuItem>
										<DropdownMenuItem className="flex gap-x-2 text-red-700">
											<TrashIcon /> <span>Delete</span>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem className="flex gap-x-1">
											<span>Change Avatar</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
								<div className="flex flex-col gap-y-2 items-center">
									<Avatar className="w-20 h-20">
										<AvatarImage
											src={imageList[index]}
											className="object-cover"
											alt="@shadcn"
										/>
										<AvatarFallback>
											{assistant.name.substring(0, 2).toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<span className="font-semibold text-gray-700 text-center">
										{assistant.name}
									</span>
								</div>
								<div className="w-full flex flex-col gap-y-2 min-h-24 max-w-60 rounded-sm border border-gray-400 p-2 shadow-[5px_5px_0px_0px_rgba(156,163,178)]">
									<p className="text-sm text-gray-500 self-start">
										Model:
										<span className="font-bold text-gray-700">
											{" " + assistant.model}
										</span>
									</p>
									<span className="text-gray-500 text-sm">
										{assistant.description ? assistant.description : "-"}
									</span>
								</div>
							</CardContent>
						</Card>
					</CarouselItem>
				))}
			</CarouselContent>
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
