# Vector D: Sybil Whitelist Unit Economics

def calc_vector_d_sybil():
    # Number of farmed accounts
    N = 100
    
    # Cost structure per account:
    c_x_account = 1.20   # Cost of aged Twitter account ($)
    c_proxy = 0.10       # Residential proxy bandwidth & captcha
    c_labor_automation = 0.20 # Cloud VM / serverless execution
    total_cost_per_acc = c_x_account + c_proxy + c_labor_automation
    
    # Case 1: Random handles (no pre-filtering)
    ev_random = 64.0
    net_profit_random = (ev_random - total_cost_per_acc) * N
    
    # Case 2: Pre-screened handles targeting top tier ($400 - $500, avg $480)
    # The farmer changes the Twitter handle or registers vanity handles that hash to >=$450
    ev_targeted = 480.0
    
    # Verification / Drop-off rate (anti-sybil attrition, e.g. 30% get flagged or delayed)
    success_rate = 0.70
    realized_credit_per_acc = ev_targeted * success_rate
    
    total_farm_cost = total_cost_per_acc * N
    gross_credits_harvested = N * realized_credit_per_acc
    net_profit_targeted = gross_credits_harvested - total_farm_cost
    
    # Conversion paths:
    # Path A: Direct withdrawal (100% liquid cash)
    cash_withdrawn = gross_credits_harvested
    
    # Path B: Used as Dev Buy on bot launch
    # 70 successful bots funded with $480 each (~2.66 SOL dev buy)
    # Even if only 10% graduate, dev bags yield:
    sol_price = 180.0
    graduating_bots = int(N * success_rate * 0.10) # 7 bots graduate
    dev_bag_payout_per_grad = 32.0 * sol_price    # ~32 SOL graduation bag for 2.66 SOL dev buy
    total_dev_bag_value = graduating_bots * dev_bag_payout_per_grad
    
    return {
        "accounts_farmed": N,
        "total_cost": total_farm_cost,
        "gross_credits_random": N * ev_random,
        "net_profit_random": net_profit_random,
        "gross_credits_targeted": gross_credits_harvested,
        "net_profit_targeted": net_profit_targeted,
        "roi_targeted_cash_pct": (net_profit_targeted / total_farm_cost) * 100,
        "graduating_bots_funded": graduating_bots,
        "dev_bag_launch_value": total_dev_bag_value
    }

res_d = calc_vector_d_sybil()
print("Vector D Sybil Economics:")
for k, v in res_d.items():
    print(f"  {k}: {v}")
