import { Pracownik } from "./pracownikTypes.js";

export interface PaniBasia extends Pracownik {
    graNaSkrzypcach: boolean;
    bezNiejTenZakładUpadnie: boolean;
  }
  
  export interface Piesek extends Pracownik {
    isPies: boolean;
  }

  export type Priority = "brak" | "na kiedyś" | "jak się upomną";