'use client'

import { cn } from "@/lib/utils"
import { GithubIcon } from "@/components/icons/github-icon"
import { InstagramIcon } from "@/components/icons/instagram-icon"
import { XIcon } from "@/components/icons/x-icon"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { FullWidthDivider } from "@/components/full-width-divider"
import { copy } from '@/content/copy'
import Link from 'next/link'
import { Mail } from 'lucide-react'

export function Footer() {
	return (
		<footer
			className={cn(
				"relative mx-auto w-full max-w-5xl lg:border-x border-border bg-background",
				"dark:bg-[radial-gradient(35%_80%_at_15%_0%,--theme(--color-foreground/.1),transparent)]"
			)}
		>
			<FullWidthDivider position="top" />
			<div className="grid max-w-5xl grid-cols-6 gap-6 p-6 md:p-8">
				<div className="col-span-6 flex flex-col gap-4 pt-2 md:col-span-3">
					<Link className="w-max" href="/">
						<Logo className="h-5" />
					</Link>
					<p className="max-w-sm text-balance text-muted-foreground text-sm leading-relaxed">
						{copy.footerDescription}
					</p>
					<div className="flex gap-2 mt-2">
						{socialLinks.map((item, index) => (
							<Button
								key={`social-${item.link}-${index}`}
								size="icon"
								variant="outline"
								render={<a href={item.link} target="_blank" rel="noopener noreferrer" />}
								nativeButton={false}
							>
								{item.icon}
							</Button>
						))}
					</div>
				</div>

				<div className="col-span-3 w-full md:col-span-1.5 md:col-start-5">
					<span className="text-foreground font-semibold text-xs uppercase tracking-wider">Navigasi</span>
					<nav aria-label="Footer navigasi" className="mt-3 flex flex-col gap-2.5">
						{navLinks.map(({ href, title }) => (
							<Link
								className="w-max text-sm text-muted-foreground hover:text-foreground transition-colors"
								href={href}
								key={title}
							>
								{title}
							</Link>
						))}
					</nav>
				</div>

				<div className="col-span-3 w-full md:col-span-1.5">
					<span className="text-foreground font-semibold text-xs uppercase tracking-wider">Kontak</span>
					<div className="mt-3 flex flex-col gap-2.5">
						<a
							href={`mailto:${copy.contactEmail}`}
							className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors w-max"
						>
							<Mail size={14} className="shrink-0" />
							{copy.contactEmail}
						</a>
					</div>
				</div>
			</div>
			<FullWidthDivider />
			<div className="flex items-center justify-center gap-2 py-6">
				<p className="text-center font-light text-muted-foreground text-xs">
					{copy.footerRights}
				</p>
			</div>
		</footer>
	)
}

const navLinks = [
	{ title: copy.navHome, href: "/" },
	{ title: copy.navProducts, href: "/produk" },
	{ title: copy.navBlog, href: "/blog" },
	{ title: copy.navAbout, href: "/tentang" },
	{ title: copy.navContact, href: "/kontak" },
]

const socialLinks = [
	{
		icon: <InstagramIcon />,
		link: "https://instagram.com/bantugrow",
	},
	{
		icon: <XIcon />,
		link: "https://x.com/bantugrow",
	},
	{
		icon: <GithubIcon />,
		link: "https://github.com/bantugrow",
	},
]
