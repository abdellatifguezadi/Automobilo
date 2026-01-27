export interface Car {
  id: number;
  marque_id: number;
  modele: string;
  prix: number;
  carburant: string;
  image: string;
  disponibilite: boolean;
  dateDeMiseEnVente: string;
}

export interface Marque {
  id: number;
  titre: string;
}