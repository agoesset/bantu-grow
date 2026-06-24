import { cn } from "@/lib/utils";
import { FullWidthDivider } from "@/components/full-width-divider";
import { GridFiller } from "@/components/grid-filler";
import Link from "next/link";
import { type BlogPost } from "@/lib/blog";
import { copy } from "@/content/copy";

interface BlogsSectionProps {
	posts: BlogPost[];
}

export function BlogsSection({ posts }: BlogsSectionProps) {
	return (
		<div className="mx-auto w-full max-w-5xl py-4 lg:border-x">
			<div className="space-y-2 px-4 py-8 md:py-12">
				<h1 className="font-semibold text-2xl tracking-wide md:text-4xl">
					{copy.blogHeadline}
				</h1>
				<p className="text-muted-foreground text-sm">
					{copy.blogDescription}
				</p>
			</div>
			<FullWidthDivider contained={true} />
			<div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 md:grid-cols-3">
				{posts.map((blog) => (
					<BlogCard
						key={blog.slug}
						title={blog.title}
						date={blog.date}
						category={blog.category}
						author={blog.author}
						description={blog.excerpt}
						href={`/blog/${blog.slug}`}
					/>
				))}
				<GridFiller
					className="bg-background"
					mdColumns={3}
					smColumns={4}
					totalItems={posts.length}
				/>
			</div>
			<FullWidthDivider contained={true} />
		</div>
	);
}

interface BlogCardProps {
	title: string;
	date: string;
	description: string;
	category: string;
	author: string;
	href: string;
	className?: string;
}

function BlogCard({
	title,
	date,
	description,
	category,
	author,
	href,
	className,
	...props
}: BlogCardProps & Omit<React.ComponentProps<typeof Link>, "href" | "title">) {
	return (
		<Link
			href={href}
			className={cn(
				"group w-full bg-background px-6 py-12 text-muted-foreground hover:cursor-pointer hover:text-foreground active:bg-accent md:px-8 active:dark:bg-accent/50 flex flex-col justify-between",
				className
			)}
			{...props}
		>
			<div>
				<h3 className="mb-3 line-clamp-2 font-medium text-foreground text-lg md:text-xl group-hover:text-primary transition-colors">
					{title}
				</h3>
				<div className="mb-3 flex items-center gap-2">
					<span className="text-muted-foreground text-xs group-hover:text-foreground">
						{category}
					</span>
					<div className="inline-flex size-1 rounded-full bg-muted-foreground" />
					<span className="text-muted-foreground text-xs group-hover:text-foreground">
						{date}
					</span>
				</div>
				<p className="mb-8 line-clamp-3 text-muted-foreground text-sm tracking-wide group-hover:text-foreground">
					{description}
				</p>
			</div>
			<div className="flex items-center gap-1.5 mt-auto">
				by
				<span className="font-medium font-mono text-foreground/80 text-xs group-hover:text-foreground md:text-sm">
					{author}
				</span>
			</div>
		</Link>
	);
}
