const freelanceSignupValidationRules = [
	{ field: "nom", message: "Le champ nom est requis." },
	{ field: "prenom", message: "Le champ prénom est requis." },
	{
		field: "tel",
		message: "Le champ téléphone est requis.",
	},
	{ field: "email", message: "L'email n'est pas valide." },
	{ field: "ville", message: "La ville est  requis." },
	{ field: "adresse", message: "L'adresse est  requis." },
	{ field: "codePostal", message: "La code postal est  requis." },
	{ field: "poste", message: "La poste est requis." },
	{ field: "nif", message: "Le numéros de nif n'est pas valide." },
	{ field: "iban", message: "L'IBAN n'est pas valide." },
	{ field: "bic", message: "La BIC n'est pas valide." },
	{ field: "banque", message: "Le nom du banque est requis." },
	{ field: "isAcceptedContract", message: "La contract doit être accepter." },
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

const adminSignupValidationRules = [
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

const companySignupValidationRules = [
	{
		field: "representantNom",
		message: "Le nom du représentant est requis.",
	},
	{
		field: "representantPrenom",
		message: "Le prénom du représentant est requis.",
	},
	{
		field: "representantEmail",
		message: "L'email du représentant est requis.",
	},
	{
		field: "representantTel",
		message: "Le numéro de téléphone du représentant est requis.",
	},
	{
		field: "representantCodePostal",
		message: "Le code postal du représentant est requis.",
	},
	{
		field: "representantAdresse",
		message: "L'adresse du représentant est requise.",
	},
	{
		field: "representantVille",
		message: "La ville du représentant est requise.",
	},
	{
		field: "raisonSocial",
		message: "La raison social est requise.",
	},
	{
		field: "entrepriseVille",
		message: "La ville de l'entreprise est requise.",
	},
	{
		field: "entrepriseAdresse",
		message: "L'adresse de l'entreprise est requise.",
	},
	{
		field: "entrepriseCodePostal",
		message: "Le code postal de l'entreprise est requis.",
	},
];

export {
	freelanceSignupValidationRules,
	companySignupValidationRules,
	adminSignupValidationRules,
};
