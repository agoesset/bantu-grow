import type React from "react";
import Image from "next/image";

export const LogoIcon = (props: React.ComponentProps<"span">) => (
	<span {...props} className="inline-block size-5 select-none align-middle">
		<Image
			src="/logo.png"
			alt="BantuGrow Icon"
			width={20}
			height={20}
			className="size-full object-contain"
		/>
	</span>
);

export const Logo = ({ className, ...props }: React.ComponentProps<"div"> & { className?: string }) => (
	<div
		className={`flex items-center gap-2 font-sans font-extrabold text-base tracking-tight text-foreground select-none ${className || ""}`}
		{...props}
		aria-label="BantuGrow"
	>
		<span className="sr-only">BantuGrow</span>
		<div className="relative size-6 shrink-0" aria-hidden="true">
			<Image
				src="/logo.png"
				alt=""
				fill
				sizes="24px"
				className="object-contain"
				priority
			/>
		</div>
		<span aria-hidden="true">Bantu<span className="text-primary">Grow</span></span>
	</div>
);
