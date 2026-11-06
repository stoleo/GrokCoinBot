# Vector C: Asymmetric Edge of Locked vs Words Only

def calc_vector_c_ev():
    # Capital per position: 1.5 SOL
    # Entry zone: $10,000 - $14,000 Market Cap on bonding curve
    
    # Strat A: Words Only (Unverified / No locks)
    # 75% Dump/Fail below entry: loss -50% = -0.75 SOL
    # 18% Reaches 25k (1.8x): profit = +1.20 SOL
    # 7% Graduates (5x): profit = +6.00 SOL
    ev_words = (0.75 * -0.75) + (0.18 * 1.20) + (0.07 * 6.00)
    
    # Strat B: Triple Locked (Locked Dex @ 30k + Locked Bag + Auto Buyback)
    # Since dev cannot sell (bag locked) and Dex payment is guaranteed at 30k, community confidence is high.
    # 25% Fail to reach 30k (fails around 18k): sell at breakeven or small loss = -0.30 SOL
    # 45% Hits 30k DEX trigger & peaks at 35k-45k (2.8x): profit = +2.70 SOL
    # 30% Graduates to Raydium (5x to 15x, average 6.5x): profit = +8.25 SOL
    ev_locked = (0.25 * -0.30) + (0.45 * 2.70) + (0.30 * 8.25)
    
    sol_price = 180.0
    return {
        "ev_words_sol": ev_words,
        "ev_words_usd": ev_words * sol_price,
        "ev_locked_sol": ev_locked,
        "ev_locked_usd": ev_locked * sol_price,
        "alpha_differential_sol": ev_locked - ev_words,
        "alpha_differential_usd": (ev_locked - ev_words) * sol_price
    }

res_c = calc_vector_c_ev()
print("Vector C Locked vs Words Only Analysis:")
for k, v in res_c.items():
    print(f"  {k}: {v}")
