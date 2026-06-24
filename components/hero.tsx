import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { RocketIcon, ArrowRightIcon, PhoneCallIcon, Sparkles } from "lucide-react";
import { copy } from "@/content/copy";
import Link from "next/link";

export function HeroSection() {
	return (
		<section className="relative mx-auto w-full max-w-5xl">
			{/* Top Shades */}
			<div
				aria-hidden="true"
				className="absolute inset-0 isolate hidden overflow-hidden contain-strict lg:block pointer-events-none"
			>
				<div className="absolute inset-0 -top-14 isolate -z-10 bg-[radial-gradient(35%_80%_at_49%_0%,--theme(--color-foreground/.08),transparent)] contain-strict" />
			</div>

			{/* X Bold Faded Borders */}
			<div
				aria-hidden="true"
				className="absolute inset-0 mx-auto hidden min-h-screen w-full max-w-5xl lg:block pointer-events-none"
			>
				<div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 left-0 z-10 h-full w-px bg-foreground/15" />
				<div className="mask-y-from-80% mask-y-to-100% absolute inset-y-0 right-0 z-10 h-full w-px bg-foreground/15" />
			</div>

			{/* main content */}
			<div className="relative flex flex-col items-center justify-center gap-5 pt-28 pb-20 px-4 md:px-8">
				{/* X Content Faded Borders */}
				<div
					aria-hidden="true"
					className="absolute inset-0 -z-1 size-full overflow-hidden pointer-events-none"
				>
					<div className="absolute inset-y-0 left-4 w-px bg-linear-to-b from-transparent via-border to-border md:left-8" />
					<div className="absolute inset-y-0 right-4 w-px bg-linear-to-b from-transparent via-border to-border md:right-8" />
					<div className="absolute inset-y-0 left-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:left-12" />
					<div className="absolute inset-y-0 right-8 w-px bg-linear-to-b from-transparent via-border/50 to-border/50 md:right-12" />
				</div>

				<Link
					className={cn(
						"group mx-auto flex w-fit items-center gap-3 rounded-full border bg-card px-3 py-1 shadow transition-colors hover:bg-muted/50",
						"fade-in slide-in-from-bottom-10 animate-in fill-mode-backwards transition-all delay-500 duration-500 ease-out"
					)}
					href="/produk"
				>
					<Sparkles className="size-3 text-primary animate-pulse" />
					<span className="text-xs font-medium">Solusi Digital UMKM Indonesia 🇮🇩</span>
					<span className="block h-5 border-l" />

					<ArrowRightIcon className="size-3 duration-150 ease-out group-hover:translate-x-1" />
				</Link>

				<h1
					className={cn(
						"fade-in slide-in-from-bottom-10 animate-in text-balance fill-mode-backwards text-center text-4xl tracking-tight font-extrabold delay-100 duration-500 ease-out md:text-5xl lg:text-6xl text-foreground",
						"text-shadow-[0_0px_50px_theme(--color-foreground/.2)]"
					)}
				>
					{copy.heroHeadline}
				</h1>

				<p className="fade-in slide-in-from-bottom-10 mx-auto max-w-2xl animate-in fill-mode-backwards text-center text-base text-muted-foreground leading-relaxed delay-200 duration-500 ease-out sm:text-lg">
					{copy.heroDescription}
				</p>

				<div className="fade-in slide-in-from-bottom-10 flex animate-in flex-row flex-wrap items-center justify-center gap-4 fill-mode-backwards pt-4 delay-300 duration-500 ease-out">
					<Link
						href="/produk"
						className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}
					>
						Lihat Produk
						<ArrowRightIcon className="ml-1.5 h-4 w-4 shrink-0 inline-block align-middle" data-icon="inline-end" />
					</Link>
					<Link
						href="/kontak"
						className={cn(buttonVariants({ size: "lg" }), "rounded-full flex items-center justify-center")}
					>
						<PhoneCallIcon className="mr-1.5 h-4 w-4 shrink-0" data-icon="inline-start" />
						{copy.heroCta}
					</Link>
				</div>
			</div>
		</section>
	);
}
