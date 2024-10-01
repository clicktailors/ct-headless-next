import styles from "./PostBody.module.css";

export default function PostBody({ content }: { content: string }) {
	return (
		<div className="max-w-2xl py-20 mx-auto">
			<div
				className={styles.content}
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</div>
	);
}
