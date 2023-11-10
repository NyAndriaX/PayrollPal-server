const validationMessages = [
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
	{ field: "dateDeNaissance", message: "La date de naissance est  requis." },
	{ field: "adresse", message: "L'adresse est  requis." },
	{
		field: "informationsBancaires",
		message: "L'informations bancaires est  requis.",
	},
	{
		field: "nomRepresentant",
		message: "Le nom du réprésentant est  requis.",
	},
	{
		field: "prenomRepresentant",
		message: "Le prenom du réprésentant est  requis.",
	},
	{
		field: "emailRepresentant",
		message: "L'email du réprésentant est  requis.",
	},
	{
		field: "telRepresentant",
		message: "Le numeros téléphone du réprésentant est  requis.",
	},
	{
		field: "adresseRepresentant",
		message: "L'adresse du réprésentant est  requis.",
	},
	{
		field: "raisonSocial",
		message: "La raison social est  requis.",
	},
	{
		field: "adresseEntreprise",
		message: "L'adresse de l'entreprise est  requis.",
	},
	{
		field: "numeroIdentificationFiscale",
		message: "L'adresse de l'entreprise est  requis.",
	},
	{
		field: "idPlacement",
		message: "Le placement n'est pas définie",
	},
	{
		field: "nbrDeJours",
		message: "Le nombre de jours n'est pas définie",
	},
	{
		field: "tjm",
		message: "Le taux journalier n'est pas définie",
	},
];

export { validationMessages };
