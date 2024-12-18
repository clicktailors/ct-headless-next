import Image from "next/image";

export default function Avatar({
	author,
}: {
	author?: {
		node: {
			firstName?: string;
			lastName?: string;
			name?: string;
			avatar?: { url: string };
		};
	};
}) {
	if (!author?.node?.avatar) return null;

	const isAuthorHaveFullName = author.node.firstName && author.node.lastName;
	const name = isAuthorHaveFullName
		? `${author.node.firstName} ${author.node.lastName}`
		: author.node.name || null;

	return (
		<div className="flex items-center">
			<div className="w-10 h-10 relative mr-4">
				<Image
					src={author.node.avatar.url}
					width={48}
					height={48}
					className="rounded-full"
					alt={name || "Avatar"}
					priority
				/>
			</div>
			<div className="text-lg font-bold">{name}</div>
		</div>
	);
}
