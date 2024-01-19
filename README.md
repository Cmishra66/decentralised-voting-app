Technologies Used:

Solidity: Smart contract programming language.
OpenZeppelin Contracts: Reusable smart contract components following best practices.
tested using foundry.

Efficiency Considerations:

Gas Costs: Gas costs are kept relatively low by using simple arithmetic for the exchange rate calculation.
Security: The contract checks for sufficient balances and ensures that the exchange rate is greater than zero.
Events: Events are emitted to log swap details, providing transparency for users.
Testing:

Test the contract using various scenarios, including valid swaps, invalid swaps, and rate updates.
Conduct gas efficiency tests to ensure the contract operates with reasonable gas costs.
Certainly! Here's an example document outlining test cases for the ERC-20 Token Swap Smart Contract:

---

# ERC-20 Token Swap Smart Contract - Test Cases

## Test Case 1: Initial Setup

**Objective:** Verify the correct initialization of the contract.

1. **Input:**
   - ERC-20 TokenA with decimals = 18
   - ERC-20 TokenB with decimals = 18
   - Exchange rate: 100 (1 TokenA = 100 TokenB).

2. **Expected Result:**
   - Contract is deployed successfully.
   - TokenA and TokenB addresses are set correctly.
   - Exchange rate is set correctly.

## Test Case 2: Swap TokenA for TokenB

**Objective:** Test the swap of TokenA for TokenB.

1. **Input:**
   - User has 100 TokenA.
   - User initiates a swap of 50 TokenA.

2. **Actions:**
   - User calls `swapAForB` with 50 TokenA.

3. **Expected Result:**
   - 50 TokenA is transferred from the user to the contract.
   - The contract transfers 5000 TokenB (50 * exchangeRate) to the user.
   - Swap event is emitted.

## Test Case 3: Swap TokenB for TokenA

**Objective:** Test the swap of TokenB for TokenA.

1. **Input:**
   - User has 200 TokenB.
   - User initiates a swap of 100 TokenB.

2. **Actions:**
   - User calls `swapBForA` with 100 TokenB.

3. **Expected Result:**
   - 100 TokenB is transferred from the user to the contract.
   - The contract transfers 1 TokenA (100 / exchangeRate) to the user.
   - Swap event is emitted.

## Test Case 4: Invalid Swap (Insufficient Balance)

**Objective:** Test an invalid swap when the user has an insufficient balance.

1. **Input:**
   - User has 10 TokenA.
   - User initiates a swap of 20 TokenA.

2. **Actions:**
   - User calls `swapAForB` with 20 TokenA.

3. **Expected Result:**
   - Revert: Insufficient balance of TokenA.

## Test Case 5: Set New Exchange Rate

**Objective:** Test the ability to set a new exchange rate.

1. **Input:**
   - Owner sets a new exchange rate: 150 (1 TokenA = 150 TokenB).

2. **Actions:**
   - Owner calls `setExchangeRate` with 150.

3. **Expected Result:**
   - Exchange rate is updated to 150.

## Test Case 6: Swap TokenA for TokenB with New Exchange Rate

**Objective:** Test a swap after updating the exchange rate.

1. **Input:**
   - User has 100 TokenA.
   - User initiates a swap of 50 TokenA.

2. **Actions:**
   - User calls `swapAForB` with 50 TokenA.

3. **Expected Result:**
   - 50 TokenA is transferred from the user to the contract.
   - The contract transfers 7500 TokenB (50 * newExchangeRate) to the user.
   - Swap event is emitted.

