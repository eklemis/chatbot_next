import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
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
		<Breadcrumb className="z-50">
			<BreadcrumbList>
				<BreadcrumbItem>
					<BreadcrumbLink href="/">Home</BreadcrumbLink>
				</BreadcrumbItem>
				<BreadcrumbSeparator>
					<Slash />
				</BreadcrumbSeparator>
				<BreadcrumbItem>
					<BreadcrumbPage>Admin</BreadcrumbPage>
				</BreadcrumbItem>
			</BreadcrumbList>
		</Breadcrumb>
	);
}
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<nav className="sticky top-0 flex w-full items-center justify-between border-slate-100 border-b p-1 bg-slate-50">
				<BreadcrumbWithCustomSeparator />
				<NavigationMenu>
					<NavigationMenuList>
						<NavigationMenuItem>
							<Link href="/docs" legacyBehavior passHref>
								<NavigationMenuLink className={navigationMenuTriggerStyle()}>
									Documentation
								</NavigationMenuLink>
							</Link>
						</NavigationMenuItem>
					</NavigationMenuList>
				</NavigationMenu>
			</nav>

			<main className=" w-full flex justify-center">{children}</main>
		</>
	);
}
