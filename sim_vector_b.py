# Sniper EV Model for Vector B

def calc_vector_b_ev():
    # Capital per snipe: 0.75 SOL
    # Jito tip / priority fee: 0.02 SOL
    # Total outlay: 0.77 SOL
    
    # Distribution of grok-mint tokens:
    # Since grok-mints are AI bot coins (higher curiosity & social proof than generic pump.fun spam),
    # let's test realistic conservative win rates:
    # 55% Rug/Instant-dump/Stall: Average loss = -50% on token + fee = -0.375 SOL - 0.02 SOL = -0.395 SOL
    # 25% Small pump (1.5x - 2x): Sell at +1.75x -> gross return = 1.31 SOL -> Net profit = +0.54 SOL
    # 15% Medium runner (3x - 5x): Sell stepped -> gross return = 2.80 SOL -> Net profit = +2.03 SOL
    # 5% Graduation runner (10x - 20x): Sell stepped through Raydium -> gross return = 9.5 SOL -> Net profit = +8.73 SOL
    
    p_loss = 0.55
    r_loss = -0.395
    
    p_small = 0.25
    r_small = 0.54
    
    p_med = 0.15
    r_med = 2.03
    
    p_runner = 0.05
    r_runner = 8.73
    
    ev_sol = (p_loss * r_loss) + (p_small * r_small) + (p_med * r_med) + (p_runner * r_runner)
    sol_price = 180.0
    ev_usd = ev_sol * sol_price
    
    return {
        "snipe_size_sol": 0.75,
        "ev_sol_per_snipe": ev_sol,
        "ev_usd_per_snipe": ev_usd,
        "roi_per_trade_pct": (ev_sol / 0.77) * 100,
        "ev_per_100_snipes_sol": ev_sol * 100,
        "ev_per_100_snipes_usd": ev_usd * 100
    }

res_b = calc_vector_b_ev()
print("Vector B Sniper EV:")
for k, v in res_b.items():
    print(f"  {k}: {v}")
