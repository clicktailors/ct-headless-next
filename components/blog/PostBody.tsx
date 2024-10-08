import Section from "../ui/Section";
import Container from "../ui/Container";
import styles from "./PostBody.module.css";

export default function PostBody({ content }: { content: string }) {
	return (
		<Section>
			<Container>
				{/* <div className="max-w-2xl py-20 mx-auto"> */}
				<div
					className={styles.content}
					dangerouslySetInnerHTML={{ __html: content }}
				/>
				{/* </div> */}
			</Container>
		</Section>
	);
}
