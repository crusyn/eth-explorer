# Eth Explore

A block explorer with a transaction summary for quick analysis.

## running the app

1. clone the repo `git clone git@github.com:crusyn/eth-explorer.git`
2. `cd eth-explorer`
3. run `npm install`
4. run `npm start`
5. the app will load at http://localhost:3000.

## usage

This block explorer was built for folks who want transaction summary information for ethereum accounts.

Many users like to review aggregate ethereum transaction summary information and/or filter it for a specific date range.

Miners often have large amounts of incoming and outgoing transactions to and from their addresses. The best way I know of to analyze this actual return data today is to download a CSV of the transactions and do some analysis in your favorite spreadsheet app. This app hopes to make this quicker and easier!

### search

A user can search for an address by entering it into the search text area at the top of the window.

### filter dates

A user can filter transaction data to see a summary and underlying transactions. A filter can be made up of a start date, end date or both.

### transactions

Transactions are listed in the third card in a data table. The data table can be sorted on any field. Transactions can also be selected, but this doesn't do anything yet :).

### browser bookmarks and links

The application is driven by the browser URL in the following form:
`domain.com/{ethereumAddress}?start={startTime}&end={endTime}`

A user can bookmark a particular address with or without filters to reference them at a later time.

## architecture

This is a react application using redux & saga for state management.

We have another doc that dives into [detailed architecture](arch.md).

## design

Used Material UI components including:

- Material Table components for `TransactionDataGrid.js`
- Material circular progress loading indicator between transaction and account data fetches
- Typography throughout the app so it can quickly be updated with a new theme

## improvements

Find a list of [design, testing, product, data and doc improvements to work on.](improvements.md)
