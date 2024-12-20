import { Priority } from "./otherTypes.js";
export interface Raport {
  efektywność: number;
  priorytet: Priority;
}

export interface RaportPracownika {
  obniżonaEfektywność: boolean;
  spadekPensji: number;
}

export interface RaportPieseczka {
  szczekanie: true;
  isPies: true;
  aKtoToJestTakimSłodkimPieseczkiem: true;
}

export type RaportPracowników = Record<number, RaportPracownika>;
