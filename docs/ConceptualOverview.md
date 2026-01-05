# Conceptual Overview

## 0) Identity
- We built Donut Miner as GlazeCorp, contributing to the DonutDAO ecosystem so $DONUT can behave like a store of value on Base.
- The product is a rotating mining lane where people pay to sit in the miner seat and continuously earn newly glazed $DONUT while they hold it.
- It plugs into the wider Donut loop: the miner seat pays a share of each handoff to the DonutDAO treasury, and that treasury share can be routed into auctions that pull $DONUT back when people want the accumulated assets.

## 1) The core idea
- Picture a single conveyor-belt workstation. Only one person can hold the wrench (the miner seat) at a time. The longer they hold it, the more donuts they glaze per second.
- A countdown clock starts with a sticker price for the wrench. The price slides downward over an hour until someone new grabs it.
- The moment someone else grabs the wrench, the previous worker gets paid for their time and for passing it on. The treasury also gets a slice, and a helper (if one exists) can get a finder’s fee.
- After each handoff, the starting price for the next hour floats up or down based on how much was just paid, and the glaze rate slowly halves over months until it reaches a steady tail.
- Key concepts: the miner seat (who currently accrues $DONUT), the sliding seat price, the glaze rate (donuts per second), the treasury skim, and the optional helper reward.

## 2) Why this exists
- Problem: aligning long-term value for $DONUT with day-to-day participation, without relying on a central operator.
- Traditional sales or fixed-rate farming either run out of steam or concentrate control. Here, the seat naturally changes hands as prices fall and incentives refresh.
- Principle: make it costly to ignore the system (because the price keeps dropping) and rewarding to engage (because you earn while seated and get paid when replaced).

## 3) The cast of characters
- Seat holder: the person currently in the miner seat. They want to earn $DONUT over time and a payout when someone takes their spot. Their risk is someone replacing them sooner than expected or at a low price.
- Challenger: anyone eyeing the seat. They want to pay the lowest possible price before someone else does. Their risk is overpaying if they act too early.
- Helper: an optional referrer who can receive part of the fee when a challenger takes the seat. Their risk is minimal beyond time spent coordinating.
- Treasury: receives a guaranteed slice of every paid takeover. Depending on configuration, its share can be converted through auctions that draw $DONUT from buyers in exchange for accumulated assets.
- Auction buyer: someone who trades their $DONUT to collect the assets the treasury has accumulated (such as the seat payments). They want a fair swap and face the risk of prices moving while the auction clock runs.
- Observers: anyone watching price drift or glaze-rate halvings to time their moves.

## 4) The system loop
1. A one-hour timer starts with a listed seat price.
2. As time passes, the listed price trickles down toward zero.
3. Anyone can pay the current price to take the seat. Payment is split automatically: most goes to the outgoing seat holder, a fee goes to the treasury, and a helper can take a cut of that fee.
4. The outgoing holder is also credited with all $DONUT glazed during their time in the seat, at the prevailing glaze rate.
5. The new holder sets the stage for the next round: the starting price for the next hour adjusts based on what they just paid, and the glaze rate updates according to the long-term halving schedule.
6. Treasury share accumulates and can be auctioned for $DONUT, letting others reclaim those assets while returning $DONUT toward the treasury’s chosen receiver.
7. The loop repeats as the timer restarts.

## 5) Incentives and value flow
- Seat holders earn in two ways: the time-based $DONUT glazing and the bulk of whatever the next taker pays.
- Challengers pay in the system’s quote asset (wrapped ETH in this setup). The longer they wait, the cheaper the seat gets—but waiting too long invites someone else to grab it first.
- Fees: 20% of the takeover payment is earmarked as a fee. If no helper is named, the treasury receives the whole fee. If a helper is named, they receive one-quarter of the fee (5% of the payment) and the treasury receives the rest (15%).
- Treasury flow: its share can sit idle or be paired with auctions that swap accumulated assets for $DONUT, effectively recycling value back toward the ecosystem.
- Example: if the current seat price is 0.0100 ETH and someone pays it with no helper, 0.0080 ETH goes to the outgoing holder, 0.0020 ETH to the treasury. The outgoing holder also receives their accrued $DONUT for the time they held the seat.

## 6) The rules of the system
- Allowed: anyone can watch the clock, pay the current seat price, and name who gets the seat next (often themselves). Anyone can point to a helper to share part of the fee.
- Discouraged by design: overpaying early (because the clock ticks down), staying asleep (because someone else can claim the seat for cheap), and idle treasury balances (because auctions can convert them).
- Automatic enforcement: price decay every second of the hour; fee splits on every paid handoff; $DONUT glazing credited to the outgoing holder based on exact time in the seat; a halving schedule that reduces the glaze rate every 30 days until it settles at a small tail.
- Open choices: how aggressively challengers time their entry, whether to name a helper, and whether the treasury routes its receipts into auctions or keeps them parked.

## 7) A concrete walkthrough (with numbers)
- Starting state: the seat price is 0.0100 ETH with 30 minutes left on the clock. The glaze rate is 4.0 $DONUT per second because the system is in its early phase.
- Person A currently holds the seat. Over their 30 minutes, they have glazed 7,200 $DONUT (4 per second for 1,800 seconds).
- Person B decides not to wait the full decay and pays 0.0100 ETH. Payment split: 0.0080 ETH to Person A, 0.0020 ETH to the treasury (no helper named).
- Person A also receives the 7,200 $DONUT from their time in the seat. Their role ends as soon as Person B takes over.
- The new hour restarts with a higher starting price, roughly double what Person B paid (subject to a minimum and maximum), and the glaze rate is refreshed based on how many 30-day halvings have passed since the system launched.
- If an hour ever expires with no taker, the price hits zero. The next taker can claim the seat for free, but the starting price for the following hour still snaps back to the minimum floor.

## 8) What this solves (and what it does not)
- Solves: keeps $DONUT issuance tied to active participation; continually routes value toward the treasury; creates a predictable cadence where anyone can step in without permission.
- Limits: it does not guarantee profit, price stability, or uninterrupted demand. Seat holders can be displaced quickly, and auctions depend on buyers’ willingness to trade $DONUT for the accumulated assets.
- This is NOT: a promise of returns, a fixed-interest product, or a custodial service. Participants always bear timing and market risks.

## 9) Power, incentives, and trust
- Influence comes from participation, not from admin controls. Anyone willing to pay the listed price can take the seat; no one can lock others out while the timer runs.
- Users are trusting the on-chain rules to execute the splits and timing precisely. They are not trusting GlazeCorp to approve entrants or release rewards manually.
- Human input remains in choices like setting the treasury destination and deciding whether to run auctions with accumulated assets.
- Incentive design reduces reliance on trust: the sliding price pressures timely action, the fee split rewards turnover, and the halving schedule limits long-term issuance.

## 10) What keeps this system honest
- Rewarded behaviors: claiming the seat when it is fairly priced, rotating the seat so prior holders get paid, and routing treasury receipts back toward $DONUT through auctions.
- Discouraged behaviors: waiting forever (the price can hit zero and someone else will pounce), trying to reenter without paying (you must match the current price), or expecting constant glaze rates (they fall over time).
- If people act selfishly by overpaying, the next starting price rises, making it likelier others will wait for a better entry. If participation slows, the price drifts down to free, inviting re-engagement.

## 11) FAQ
1. **Who can take the miner seat?** Anyone willing to pay the current listed price before the hour runs out.
2. **What do I earn while I hold the seat?** You accrue $DONUT every second, and you receive most of the payment when someone replaces you.
3. **What happens if nobody takes the seat for an hour?** The price drops to zero, so the next person can claim it for free and restart the clock.
4. **How does the price change after each handoff?** It resets based on what the last taker paid, nudging the next starting price upward or downward within set bounds.
5. **Why does the glaze rate fall over time?** The system halves the per-second $DONUT output roughly every month to slow issuance, with a small tail that never fully stops.
6. **Can I name someone else to get the seat?** Yes. The payer chooses who becomes the next seat holder, even if that’s a different address.
7. **What is the helper option for?** To give a portion of the fee (5% of the payment) to a referrer or facilitator, while the treasury still keeps the rest of the fee.
8. **Where does the treasury’s share go?** It accumulates and can be auctioned for $DONUT, returning value toward the ecosystem without manual redistribution.
9. **How do the auctions work?** They also use a sliding one-way price: assets in the treasury bucket are sold for $DONUT, with the ask price decaying over a configurable period until someone buys.
10. **What if I pay right before the hour ends?** You still become the seat holder, but you risk being replaced quickly if someone else is watching and the next price is low.
11. **Do I need technical tools to participate?** You need to send the payment asset and know the current timer and price; everything else is handled by the on-chain rules.
12. **What controls does GlazeCorp have?** We built the system, but seat-taking is permissionless. Configuration like where the treasury sends value is managed on-chain, not by off-chain discretion.

## 12) Glossary
- **$DONUT**: The token users glaze while holding the seat; intended as a store-of-value within DonutDAO.
- **Seat holder**: The current participant earning $DONUT over time.
- **Challenger**: Someone attempting to take the seat by paying the listed price.
- **Helper**: An optional referrer who can receive part of the fee during a takeover.
- **Treasury share**: The fixed cut of every paid takeover directed toward DonutDAO’s treasury address.
- **Sliding price**: The hourly countdown that lowers the seat’s cost until someone buys.
- **Takeover payment**: The amount a challenger pays to claim the seat.
- **Glaze rate**: The number of $DONUT minted per second to the seat holder.
- **Halving schedule**: The periodic reduction of the glaze rate (about every 30 days) until a small floor is reached.
- **Tail rate**: The minimum glaze rate that persists after all halvings.
- **Epoch**: A one-hour window for the seat price decay before it hits zero.
- **Finder’s fee**: The helper’s share (5%) of a paid takeover when a helper is named.
- **Treasury auction**: A mechanism to trade accumulated assets (like prior payments) for $DONUT using a similar sliding price.
- **Accumulated assets**: Funds held by the treasury from previous seat takeovers.
- **Quote asset**: The currency used to pay for the seat (wrapped ETH in this setup).
- **Price reset**: The adjustment of the next hour’s starting price based on what was just paid.
- **Seat metadata**: Optional descriptive text attached when someone takes the seat (for example, a URL), used for signaling rather than control.
- **Participation risk**: The chance you pay too soon, get displaced quickly, or face thin demand in auctions.
- **Zero-price claim**: The scenario where the clock reaches zero and the next entrant can take the seat for free, restarting the cycle.
