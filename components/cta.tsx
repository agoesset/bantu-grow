'use client'

import { buttonVariants } from "@/components/ui/button"
import { DecorIcon } from "@/components/decor-icon"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"
import { copy } from "@/content/copy"
import { cn } from "@/lib/utils"

export function CallToAction() {
	return (
		<div className="relative mx-auto flex w-full max-w-3xl flex-col justify-between gap-y-6 border-y border-border/80 px-6 py-12 dark:bg-[radial-gradient(35%_80%_at_25%_0%,--theme(--color-foreground/.08),transparent)]">
			<DecorIcon className="size-4" position="top-left" />
			<DecorIcon className="size-4" position="top-right" />
			<DecorIcon className="size-4" position="bottom-left" />
			<DecorIcon className="size-4" position="bottom-right" />

			<div className="pointer-events-none absolute -inset-y-6 -left-px w-px border-l border-border/60" />
			<div className="pointer-events-none absolute -inset-y-6 -right-px w-px border-r border-border/60" />

			<div className="absolute top-0 left-1/2 -z-10 h-full border-l border-dashed border-border/40" />

			<h2 className="text-center font-extrabold text-2xl md:text-3xl lg:text-4xl text-foreground">
				Siap Tumbuh Bersama BantuGrow?
			</h2>
			<p className="text-balance text-center text-muted-foreground text-sm md:text-base leading-relaxed max-w-lg mx-auto">
				Hubungi kami sekarang dan temukan solusi digital terbaik untuk operasional bisnis UMKM Anda.
			</p>

			<div className="flex items-center justify-center gap-4 pt-2">
				<Link
					href="/produk"
					className={cn(buttonVariants({ variant: "outline" }))}
				>
					Jelajahi Produk
				</Link>
				<Link
					href="/kontak"
					className={cn(buttonVariants({ variant: "default" }), "flex items-center gap-1.5")}
				>
					{copy.heroCta}
					<ArrowRightIcon className="h-4 w-4" data-icon="inline-end" />
				</Link>
			</div>
		</div>
	)
}
