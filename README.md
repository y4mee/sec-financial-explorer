# SEC Finance Data Explorer

## Overview
This Project is a financial data explorer which fetches the data from the SEC EDGAR API and displays it cleanly with the responsive UI 
in Tabular and a Graphical Format. Users can search for the company by using CIK and can see revenue of the company for several available years.


## Setup 
### Instructions

- Clone the repository:
```bash
git clone https://github.com/<your-username>/sec-financial-explorer.git
```

- Navigate to the project folder:
```bash
cd sec-financial-explorer
```

- Install dependencies: 
```bash
npm install
```
- Run the development server:
```bash
npm run dev
```

- Open in browser:
http://localhost:3000


## Tech Stack
- Next.js (React) – Frontend framework
- Context API – State management
- Tailwind CSS – Styling
- SEC EDGAR API – Data source

## Limitations
- Companies can be serach only through CIK (company name not implemented)
- Displays only the revenue data
- Depends on availability of SEC data for each company