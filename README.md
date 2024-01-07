# TitanX Calendar App - [titan-x-cal.vercel.app](titan-x-cal.vercel.app)
## 

The TitanX Calendar App is a modern web application built with React, utilizing Vite as the build tool and Tailwind CSS for styling. The app features a dynamic calendar that displays incremental days since the TitanX launch date (October 28, 2023), current day information, TitanX launch day, and payout days.

## Features

- Dynamic calendar grid displaying days of the month
- Calculation of incremental days starting from TitanX launch date
- Highlights for today's date, TitanX launch day, and payout days
- Side panel with today's information, TitanX incremental day, and payouts
- Theme toggle between Gruvbox and Gruvbox Dark themes
- Navigation to current day, TitanX launch day, and adjacent months

## Technology Stack

- **React**: A JavaScript library for building user interfaces
- **Vite**: A fast build tool with a modern developer experience
- **pnpm**: An efficient package manager for JavaScript and Node.js
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs

## Installation

To run the TitanX Calendar App locally, you'll need Node.js installed. It is recommended to use [pnpm](https://pnpm.io/) for managing the packages.

1. Clone the repository:

```bash
git clone https://github.com/your-username/titanx-calendar-app.git
cd titanx-calendar-app
```

2. Install depenancies

```bash
pnpm install
```

3. Start the Dev server

```
pnpm dev
```

## Usage
Upon launching the TitanX Calendar App, you will see the current month displayed. You can navigate between months using the "Back" and "Next" buttons. To quickly jump to today's date or to the TitanX launch date, use the "Today" or "TitanX Launch" buttons, respectively. To toggle between Gruvbox and Gruvbox Dark themes, use the "Toggle Theme" button.

In the calendar grid, the current day is highlighted. Days that have payout events are marked with "Payout Day X" labels. The side panel displays today's date, the TitanX incremental day, and any payouts that occur on that day.

## Contributing
Contributions are welcome! Please feel free to submit pull requests with new features, fixes, or improvements.

