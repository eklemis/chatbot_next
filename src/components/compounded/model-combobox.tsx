"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import Models from "@/lib/domain/models";

interface Model {
	value: string;
	label: string;
}
interface ComboboxModelProps {
	value: string;
	onChange: (value: string) => void;
}

export function ComboboxModel({ value, onChange }: ComboboxModelProps) {
	const [open, setOpen] = React.useState(false);
	const llm_models: Model[] = [
		{
			value: Models.GPT35Turbo,
			label: "GPT-3.5 Turbo",
		},
		{
			value: Models.GPT4,
			label: "GPT-4",
		},
		{
			value: Models.GPT4o,
			label: "GPT-4o",
		},
	];
	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-full justify-between"
				>
					{value
						? llm_models.find((model) => model.value === value)?.label
						: "Select model..."}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-full p-0">
				<Command className="w-full">
					<CommandInput placeholder="Search model..." />
					<CommandEmpty>No model found.</CommandEmpty>
					<CommandList className="w-full">
						<CommandGroup className="w-full">
							{llm_models.map((model) => (
								<CommandItem
									key={"mdl-" + model.value}
									value={model.value}
									onSelect={() => {
										onChange(model.value);
										setOpen(false);
									}}
									onClick={() => {
										onChange(model.value);
										setOpen(false);
									}}
									className="w-full"
								>
									<Check
										className={cn(
											"mr-2 h-4 w-4",
											value === model.value ? "opacity-100" : "opacity-0"
										)}
									/>
									{model.label}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
