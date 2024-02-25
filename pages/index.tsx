import { title, subtitle } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
	return (
		<DefaultLayout>
			<section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
				<div className="max-w-xl text-center justify-center items-center">
					<h1 className={title({ color: "blue" })}>Empower Enagage Educate</h1>
					<br />
					<h4 className={subtitle({ class: "mt-4" })}>
						Welcome to the Quiz Hub, where you can create, take, and view your quizzes and results.
					</h4>
				</div>

			</section>
		</DefaultLayout>
	);
}
