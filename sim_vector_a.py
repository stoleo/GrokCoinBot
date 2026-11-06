# Portfolio EV calculation for Vector A: Bot Launching

def calc_vector_a_ev():
    p_fail = 0.60
    r_fail = -1.0  # Net loss in SOL after partial recovery/sell
    
    p_mid = 0.25
    r_mid = 5.5   # Net profit in SOL
    
    p_grad = 0.15
    # Conditional breakdown of graduates:
    p_grad_stall = 0.70  # stall at $100k-$150k
    r_grad_stall = 22.5
    
    p_grad_mid = 0.25    # run to $500k-$1M
    r_grad_mid = 93.5
    
    p_grad_moon = 0.05   # run to $5M+
    r_grad_moon = 500.0
    
    r_grad_weighted = (p_grad_stall * r_grad_stall) + (p_grad_mid * r_grad_mid) + (p_grad_moon * r_grad_moon)
    
    ev_sol = (p_fail * r_fail) + (p_mid * r_mid) + (p_grad * r_grad_weighted)
    sol_price = 180.0
    ev_usd = ev_sol * sol_price
    
    return {
        "ev_sol": ev_sol,
        "ev_usd": ev_usd,
        "r_grad_weighted": r_grad_weighted,
        "p_grad": p_grad
    }

res_a = calc_vector_a_ev()
print("Vector A EV per Launch:")
for k, v in res_a.items():
    print(f"  {k}: {v}")
