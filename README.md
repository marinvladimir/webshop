# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

SPA katalog proizvoda - Dokumentacija
Sadržaj
Uvod
Postavljanje i Pokretanje Projekta
Struktura Projekta
Glavne Značajke
Autentifikacija
Upravljanje Košaricom
Filtriranje i Sortiranje
Pretraga
Paginacija
Sigurnosne Mjere
CI/CD Proces

Ovaj projekt predstavlja jednostavnu SPA katalog proizvoda aplikaciju razvijenu pomoću React-a s TypeScript-om. Aplikacija podržava autentifikaciju korisnika, omogućuje pretraživanje i filtriranje proizvoda, sortiranje po cijeni i nazivu, upravljanje košaricom i paginaciju.

Postavljanje i Pokretanje Projekta
Prije nego što počnete, osigurajte da imate instalirane sljedeće alate:

Node.js (verzija 14 ili novija)
npm ili yarn
Koraci za Postavljanje:

yarn install
yarn run dev

Glavne Značajke
Autentifikacija
Aplikacija koristi autentifikaciju putem DummyJSON API-ja. Nakon uspješne prijave, korisnički token se pohranjuje u localStorage. Token se koristi za autorizaciju API zahtjeva i automatski se osvježava kada istekne.

USER EXAMPLE:
user: emilys
pass: emilyspass

Login: Korisnici se prijavljuju pomoću korisničkog imena i lozinke. Ako prijava uspije, token se pohranjuje u localStorage.
Token Refresh: Token se automatski osvježava koristeći refresh token mehanizam.

Upravljanje Košaricom
Korisnici mogu dodavati proizvode u košaricu. Informacije o košarici pohranjuju se u localStorage kako bi se osigurala postojanost podataka između sesija.

Filtriranje i Sortiranje
Aplikacija podržava filtriranje proizvoda prema kategoriji i cjenovnom rasponu. Također, korisnici mogu sortirati proizvode po cijeni (uzlazno ili silazno) i nazivu (po abecedi).

Pretraga
Pretraživanje proizvoda implementirano je pomoću input trake s debouncing-om.

Paginacija
Aplikacija podržava paginaciju kako bi omogućila pregled velikih skupova podataka. Broj prikazanih stavki po stranici može se promijeniti pomoću padajućeg izbornika (default 20).

Sigurnosne Mjere
HTTPS: Osigurava šifriranje podataka tijekom prijenosa između klijenta i servera.
Sigurno pohranjivanje osjetljivih podataka: Koristi se localStorage za pohranu tokena, s planom prelaska na sigurnije metode poput HttpOnly kolačića.
Zaštita od XSS i CSRF napada: Sanitizacija korisničkog unosa i implementacija CSRF tokena za zaštitu od napada.
Ograničenje pristupa i autentifikacija: Stroge kontrole pristupa osiguravaju da samo ovlašteni korisnici mogu pristupiti resursima (Content Security Policy, CSP)
Third-Party Security Vulnerabilitiji
Potreban update 3rd-party dependencyja i libova na zadnju secure verziju pomoću toolova kao npm (Node Package Manager) audit.
Uporaba Lintera za detektiranje vulnerabilityja
Sonar za bolji pregled i praćenje statusa code smellova, vulnerabilityja i code bugova, te drugih problema.

CI/CD Proces
Kontinuirana Integracija (CI):
U idealnom svijetu, svaki push na repozitorij pokreće CI pipeline koji provodi jedinične testove, integracijske testove, i provjerava kvalitetu koda (merge request).
Kontinuirana Implementacija (CD):
Nakon uspješne CI provjere, aplikacija se automatski implementira na staging okruženje. Ako svi testovi prođu, može se implementirati u produkcijsko okruženje.
