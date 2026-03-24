export default function Loading() {
	return (
		<div className="fixed top-0 left-0 right-0 h-[2px] z-[9999] overflow-hidden">
			<div className="h-full bg-foreground/30 animate-shimmer" />
		</div>
	);
}
