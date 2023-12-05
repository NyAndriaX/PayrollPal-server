const placementValidationMessage = [
	{ field: "idFreelance", message: "Le Freelance est requis." },
	{
		field: "idFreelanceChasseur",
		message: "Le freelance chasseur est requis.",
	},
	{ field: "idEntreprise", message: "L'entreprise est requis." },
	{
		field: "tjm",
		message: "la taux journaliére moyen est requis.",
	},
];
const adminValidationSignupMessage = [
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
const companyValidationSignupMessage = [
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
	placementValidationMessage,
	adminValidationSignupMessage,
	companyValidationSignupMessage,
};
