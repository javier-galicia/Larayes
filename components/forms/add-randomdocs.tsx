"use client";
import { useActionState, useEffect } from "react";
import { addRandomDoc } from "../tables/randomdocs/actions";
import { FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "../ui/card";

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
		<Card>
			<CardContent>
				<form action={formAction}>
					<FieldGroup>
						<FieldLabel htmlFor="header">Header</FieldLabel>
						<Input id="header" name="header" type="text" placeholder="Header" />
						<FieldLabel htmlFor="type">Type</FieldLabel>
						<Input id="type" name="type" type="text" placeholder="Type" />
						<FieldLabel htmlFor="status">Status</FieldLabel>
						<Input id="status" name="status" type="text" placeholder="Status" />
						<FieldLabel htmlFor="target">Target</FieldLabel>
						<Input
							id="target"
							name="target"
							type="number"
							placeholder="Target"
						/>
						<FieldLabel htmlFor="limit">Limit</FieldLabel>
						<Input id="limit" name="limit" type="number" placeholder="Limit" />
						<FieldLabel htmlFor="reviewer">Reviewer</FieldLabel>
						<Input
							id="reviewer"
							name="reviewer"
							type="text"
							placeholder="Reviewer"
						/>
						<Button type="submit">
							{isPending ? "Guardando..." : "Add Random Doc"}
						</Button>
					</FieldGroup>

					{state?.message}
				</form>
			</CardContent>
		</Card>
	);
}

export default AddRandomDocs;
