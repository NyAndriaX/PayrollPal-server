const freelanceValidationMessage = [
	{ field: "nom", message: "Le champ nom est requis." },
	{ field: "prenom", message: "Le champ prénom est requis." },
	{ field: "tel", message: "Le numeros téléphone est requis." },
	{ field: "email", message: "L'email n'est pas valide." },
	{
		field: "password",
		message:
			"Le champ mot de passe est requis. Le mot de passe doit avoir au moins 8 caractères et contenir au moins un chiffre.",
	},
	{
		field: "isPasswordConfirmed",
		message: "Le mot de passe est incorrect",
	},
];
const updatedDataFreelanceMessage = [
	{ field: "nom", message: "Le champ nom est requis." },
	{ field: "prenom", message: "Le champ prénom est requis." },
	{ field: "tel", message: "Le numeros téléphone est requis." },
	{ field: "email", message: "L'email n'est pas valide." },
	{
		field: "password",
		message:
			"Le champ mot de passe est requis. Le mot de passe doit avoir au moins 8 caractères et contenir au moins un chiffre.",
	},
	{
		field: "isPasswordConfirmed",
		message: "Le mot de passe est incorrect",
	},
	{
		field: "nif",
		message: "Le numéros d'identification fiscale est incorrect",
	},
	{ field: "iban", message: "L'IBAN est incorrect." },
	{ field: "bic", message: "Le bic est incorrect" },
	{ field: "iban", message: "L'IBAN est incorrect." },
	{ field: "cin", message: "La cin est incorrect" },
];

export { freelanceValidationMessage, updatedDataFreelanceMessage };
