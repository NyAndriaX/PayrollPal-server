const DayValidityValidationMessages = [
	{
		field: "idPlacement",
		message: "L'Id du placement  est requis.",
	},
	{
		field: "nbrDeJours",
		message: "Le nombre de jours travaillé  est requis.",
	},
	{
		field: "tjm",
		message: "Le taux journaliére moyen  est requis.",
	},
];
const freelanceValidationSignupMessage = [
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
];

export { DayValidityValidationMessages, freelanceValidationSignupMessage };
