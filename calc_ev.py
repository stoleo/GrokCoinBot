def hash_fnv(s):
    h = 2166136261
    for c in s.lower():
        h ^= ord(c)
        h = (h * 16777619) & 0xFFFFFFFF
    h ^= (h >> 15)
    h = (h * 2246822507) & 0xFFFFFFFF
    h ^= (h >> 13)
    return h & 0xFFFFFFFF

TIERS = [
    (0.70, 20, 50, 5),
    (0.18, 60, 100, 10),
    (0.08, 110, 200, 10),
    (0.03, 210, 350, 10),
    (0.01, 360, 500, 10)
]

def credit_for(handle):
    h = hash_fnv(handle)
    r = (h % 10000) / 10000.0
    pick = h >> 14
    acc = 0.0
    for share, start, to, step in TIERS:
        acc += share
        if r < acc:
            steps_cnt = int((to - start) / step) + 1
            return start + (pick % steps_cnt) * step
    return 500

ev = 0.0
for share, start, to, step in TIERS:
    steps_cnt = int((to - start) / step) + 1
    avg = (start + to) / 2.0
    ev += share * avg
    print(f"Tier {start}-{to} (share {share*100}%): Avg=${avg}, Contribution=${share*avg:.2f}")
print(f"Theoretical Overall EV = ${ev:.2f}")

samples = ["elonmusk", "grok", "ai_dev", "solana", "pumpfun", "alpha_trader", "grok_bot_01"]
for s in samples:
    print(f"Handle @{s}: ${credit_for(s)} USDC")

# Check distribution of 100,000 random handles
import random
import string

n = 100000
total_credit = 0
tier_counts = {t[1]: 0 for t in TIERS}
high_value_handles = []

for _ in range(n):
    h = ''.join(random.choices(string.ascii_lowercase + string.digits, k=8))
    c = credit_for(h)
    total_credit += c
    if c >= 450 and len(high_value_handles) < 5:
        high_value_handles.append((h, c))

print(f"Simulated Mean EV over {n} handles: ${total_credit / n:.2f}")
print(f"Sample high value handles (>=450): {high_value_handles}")
