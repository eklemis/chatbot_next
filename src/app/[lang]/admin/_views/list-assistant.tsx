//View that list paged assitants
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
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import {
	DotsHorizontalIcon,
	TrashIcon,
	Pencil2Icon,
} from "@radix-ui/react-icons";
import { SkeletonCard } from "@/components/compounded/skeleton-card";
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
	const [assistants, setAssistants] = useState<Assistant[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchAssistants = async () => {
			try {
				const response: AxiosResponse<Assistant[]> = await axios.get(
					"/api/assistants"
				);
				setAssistants(response.data);
			} catch (error) {
				console.error("Failed fetching assistants:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchAssistants();
	}, []);

	return (
		<Carousel className="w-full">
			{!loading && (
				<CarouselContent className="-ml-1 gap-x-2 w-11/12">
					{assistants.map((assistant, index) => (
						<CarouselItem
							key={index}
							className="pl-1 md:basis-1/2 lg:basis-1/3"
						>
							<Card className="p-1 border w-46 h-full">
								<CardContent className="flex flex-col aspect-square items-center justify-between p-6 gap-y-2 relative">
									<DropdownMenu key={"dm-assistant-" + index}>
										<DropdownMenuTrigger className="absolute h-6 right-2 top-0">
											<DotsHorizontalIcon className=" text-gray-500" />
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuItem>Open</DropdownMenuItem>
											<DropdownMenuItem className="flex gap-x-1">
												<Pencil2Icon /> <span>Edit</span>
											</DropdownMenuItem>
											<DropdownMenuItem className="flex gap-x-1 text-red-700">
												<TrashIcon /> <span>Delete</span>
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem className="flex gap-x-1">
												<span>Change Avatar</span>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
									<Avatar>
										<AvatarImage
											src="https://github.com/shadcn.png"
											alt="@shadcn"
										/>
										<AvatarFallback>
											{assistant.name.substring(0, 2).toUpperCase()}
										</AvatarFallback>
									</Avatar>
									<span className="font-semibold text-gray-700 mt-2 text-center">
										{assistant.name}
									</span>
									<span className="text-gray-500 font-semibold">
										{assistant.description}
									</span>
									<span className="text-sm text-gray-500 absolute bottom-2 mb-1">
										{assistant.model}
									</span>
								</CardContent>
							</Card>
						</CarouselItem>
					))}
				</CarouselContent>
			)}
			{loading && (
				<div className="flex gap-x-2">
					<SkeletonCard />
					<SkeletonCard />
					<SkeletonCard />
				</div>
			)}
			<CarouselPrevious />
			<CarouselNext />
		</Carousel>
	);
}
