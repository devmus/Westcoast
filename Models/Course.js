export default class Kurs {
  #id = 0;
  #kurstitel = '';
  #beskrivning = '';
  #omdome = '';
  #kursdagar = '';
  #kursstart = '';
  #kursnummer = '';
  #distans = false;
  #bild = [];

  constructor(
    id,
    kurstitel,
    beskrivning,
    omdome,
    kursdagar,
    kursstart,
    kursnummer,
    distans,
    bild
  ) {
    this.#id = id;
    this.#kurstitel = kurstitel;
    this.#beskrivning = beskrivning;
    this.#omdome = omdome;
    this.#kursdagar = kursdagar;
    this.#kursstart = kursstart;
    this.#kursnummer = kursnummer;
    this.#distans = distans;
    this.#bild = bild;
  }

  get id() {
    return this.#id;
  }

  get kurstitel() {
    return this.#kurstitel;
  }

  get beskrivning() {
    return this.#beskrivning;
  }

  get omdome() {
    return this.#omdome;
  }

  get kursdagar() {
    return this.#kursdagar;
  }

  get kursstart() {
    return this.#kursstart;
  }

  get kursnummer() {
    return this.#kursnummer;
  }

  get distans() {
    return this.#distans;
  }

  get bild() {
    return this.#bild;
  }
}
