### improvements

#### unit testing

[ ] _Redux & Saga_ - especially for the calcs  
[ ] _Components_

#### design

[ ] _more responsive_ - Test different screen sizes: Clever things such as hiding columns in the table, truncating cell data could be worth doing when the viewport size decreases. The transaction summary components use grids so they work with screen size changes. Should check word wrapping for each component to handle overflow, etc as makes sense.  
[ ] _transaction summary component Design_ - Start and End date balances are a little confusing.  
[ ] _Material UI Improvements_ - Play with the Material UI theme to change overall color palette  
[ ] _Table Row Selection_ - Initially had plans to use table row selection to exclude and include transactions in aggregates. Need to remove table row selection or make it useful. Leaving it in without functionality is confusing.

#### state management

[ ] _Validate URL address & query string_ - bad inputs will cause failures in getTransactions.  
[ ] _Add Selectors_ - Cleverly use selectors when possible for filters instead of hitting the API each time.  
[ ] _API pagination_ - Use the pagination feature of etherscan and serve 25 or so transactions at time to the user as they are downloaded to speed up when the user can start looking at data. Stats would have to wait to be loaded after all transactions are downloaded.  
[ ] _Prefetch & Cache Addresses_ - Prefetch transaction and account info for addresses that are listed in the current table view to make navigation within the page nearly instant.  
[ ] _Auto fetch_ - fetch new transactions on an interval, add only recent transactions by sending start blocknumber. Include last updated time on the UI.

#### calculations & data

The transaction summary calculation engine needs more careful testing. If this was a bigger project we would start by building a set of unit tests to see how the engine would perform under some of the following conditions:  
[ ] _Contract addresses_ - balances for contract addresses do not seem to be correct.  
[ ] _Addresses with Block/Uncle rewards_ - block rewards and accrued gas fees do not show up in our block explorer. Most miners will use a mining pool. Mining pool rewards are distributed as normal transactions and will be correctly shown and aggregated.  
[ ] _> 10k transactions_ - the api will only serve 10k transactions at a time. If there are more than 10k transactions aggregates will not be correct. Use start and end block params to load 10k at a time.  
[ ] _Negative start balance_ - there are instances where the start balance is negative. This would need to be investigated. It doesn't seem to happen with ordinary accounts.

#### product

[ ] _Transaction selection_ - allow users to select transactions to exclude or summarize  
[ ] _Copy Address_ - Copy Address to clipboard  
[ ] _Last Updated_ - Add last updated time for each card  
[ ] _Address watchlist_ - label addresses for future use  
[ ] _Change addresses, address groups, and comments_ - allow users to group addresses in groups and aggregate as if it was one account  
[ ] _Save settings to file_ - keep it decentralized :). settings including watched addresses, change address, address groups, exclusions, comments can be uploaded back. The app won't keep any user search history or data. this has the added benefit of keeping this a frontend only app with no db or server

#### documentation

[ ] use a js doc framework
