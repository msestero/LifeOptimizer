import argparse
import sys
import matplotlib.pyplot as plt
import json


NUM_MONTHS = 12

def calculate(args):
    result = float(args["initial_investment"])
    invested = result
    yearly_total = [invested]
    monthly_total = [invested]
    monthly_roi = []
    for i in range(int(args["years_of_growth"])):
        for i in range(NUM_MONTHS):
            monthly_roi.append(round(result * ((1 + float(args["yearly_growth"])) ** (1 / NUM_MONTHS) - 1), 2))
            result *= (1 + float(args["yearly_growth"])) ** (1 / NUM_MONTHS)
            result += float(args["monthly_contributions"])
            result = round(result, 2)
            monthly_total.append(result)
        result += float(args["yearly_contributions"])
        yearly_total.append(result)
    monthly_total = list(map(lambda x: round(x, 2), monthly_total))
    res = {
        "result": result,
        "yearly_total": yearly_total,
        "monthly_total": monthly_total,
        "monthly_roi": monthly_roi
    }
    res = json.dumps(res)
    return res

