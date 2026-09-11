# BALLERS – Bokningssystem

Ett bokningssystem för sporthallar där användaren kan se hallar, tillgängliga tider och skapa bokningar.

Projektet är byggt med React och TypeScript. React Router används för navigering mellan olika sidor och dynamiska routes för de olika hallarna.

## Teknik

- React
- TypeScript
- Vite
- React Router v8
- json-server
- CSS
- Git & GitHub

## Kom igång

### 1. Klona och öppna projektet

Börja med att öppna projektets repository på GitHub.
Klicka på:

**Code → kopiera URL:en**

Öppna sedan projektet i VS Code.
Klicka:

**Ctrl + Ö**

**Bash**
Klona sedan projektet genom att skriva:

    git clone <repository-url>

Byt ut `<repository-url>` mot URL:en du kopierade från GitHub.

**Bash:**
    cd bokningssystem_typescript

### 2. Installera dependencies

**Bash**
    npm install
    
### 3. Starta json-server
Starta servern med:
**Bash**
    npm run server

Låt denna terminal vara öppen medan projektet körs.

### 4. Starta utvecklingsservern

Öppna en **ny terminal** i VS Code.
**Bash**
    npm run dev

Vite startar projektet och visar en lokal adress i terminalen, exempelvis:

 Håll inne ctrl & klicka på   http://localhost:5173/ 
 
Öppna adressen i webbläsaren.
Nu ska BALLERS vara igång.


## Funktioner

- Startsida
- Navigation mellan olika sidor
- Visa alla sporthallar
- Visa information om en specifik hall
- Dynamiska routes för hallar
- Visa tillgängliga tider
- Skapa bokningar
- Återanvändbara React-komponenter
- Responsiv desig

## TypeScript

Projektet är byggt med TypeScript.

TypeScript används för att skapa tydliga typer och struktur i koden.

För hallar har vi skapat en `Hall`-interface:

    export interface Hall {
      id: string;
      name: string;
      price: number;
      description: string;
    }

Det innebär att varje hall innehåller:

- `id` som är en `string`
- `name` som är en `string`
- `price` som är ett `number`
- `description` som är en `string`

Det gör det tydligare vilken typ av data som används i projektet.
TypeScript hjälper även till att upptäcka fel under utvecklingen.


## React-komponenter

Projektet är uppdelat i återanvändbara komponenter.
Exempel på komponenter:

- `Header`
- `HallCard`
- `BookingCalendar`
- `Input`

## Projektstruktur

Projektet är uppdelat i olika mappar för att göra koden mer strukturerad.

    src/
    │
    ├── components/
    │   ├── Header.tsx
    │   ├── Header.css
    │   ├── HallCard.tsx
    │   ├── BookingCalendar.tsx
    │   ├── Input.tsx
    │   └── ...
    │
    ├── data/
    │   └── halls.ts
    │
    ├── pages/
    │   ├── HomePage.tsx
    │   ├── HomePage.css
    │   ├── HallsPage.tsx
    │   ├── HallsPage.css
    │   ├── HallPage.tsx
    │   └── ...
    │
    ├── types/
    │   └── hall.ts
    │
    ├── App.tsx
    ├── main.tsx
    └── router.tsx


## Styling

Projektet använder CSS för styling.
CSS-filerna är uppdelade efter komponenter och sidor.


## json-server

Projektet använder `json-server` för att simulera ett backend/API.
Det gör att projektet kan arbeta med data utan att behöva bygga ett eget backend-system.
När servern körs kan frontend-applikationen kommunicera med den data som finns i projektet.

## Git och GitHub

Projektet versionshanteras med Git och GitHub.
Under utvecklingen används olika branches för att kunna arbeta med olika funktioner separat från `main`.

## Madeleine, Rasmus, Flora & Teddy
