"use client";
import { useActionState, useEffect } from "react";
import { addRandomDoc } from "../tables/randomdocs/actions";

const initialState = {
	message: "",
};

type AddRandomDocsProps = {
	onAdd: () => void;
};

function AddRandomDocs({ onAdd }: AddRandomDocsProps) {
	const [state, formAction, isPending] = useActionState(
		addRandomDoc,
		initialState,
	);

	useEffect(() => {
		if (state.message === "successful") {
			void onAdd();
		}
	}, [state]);

	return (
		<form action={formAction}>
			<input type="text" name="header" placeholder="Header" />
			<input type="text" name="type" placeholder="Type" />
			<input type="text" name="status" placeholder="Status" />
			<input type="number" name="target" placeholder="Target" />
			<input type="number" name="limit" placeholder="Limit" />
			<input type="text" name="reviewer" placeholder="Reviewer" />
			<button type="submit" disabled={isPending}>
				{isPending ? "Guardando..." : "Add Random Doc"}
			</button>
			{state?.message}
		</form>
	);
}

export default AddRandomDocs;
