export class Depence {
    constructor(
        public _id: number,
        public dad: string,
        public dad_date: string,
        public bc: string,
        public bc_date: string,
        public immat: string,
        public libelle: string,
        public description: string,
        public montant: string,
        public facture: string,
        public fournisseur: string,
        public intervention_date: string,

    ) { }
}