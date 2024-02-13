import argparse
import sys
import matplotlib.pyplot as plt


def show_investment(monthly_data):
    x = range(len(monthly_data))
    y = monthly_data
    plt.plot(x, y)

    plt.xlabel('months')
    plt.ylabel('dollars')
    plt.title('Investment')

    plt.show()


NUM_MONTHS = 12

def get_arguments():
    parser = argparse.ArgumentParser()

    if not sys.stdin.isatty():
        parser.add_argument('initial_invesment', nargs='?', type=argparse.FileType('r'), default=sys.stdin)
    else:
        parser.add_argument("initial_invesment", help="How much is currently invested", type=float)

    parser.add_argument("--monthly", help="How much that will be invested on a monthly basis", type=float, default=0)
    parser.add_argument("--yearly", help="How much that will be invested on a yearly basis", type=float, default=0)
    parser.add_argument("--growth", help="The average expected growth each year", type=float, default=0.08)
    parser.add_argument("years_of_growth", help="The number of years_of_growth you will let the money grow", type=int)

    return parser.parse_args()

def calculate(args):
    if not sys.stdin.isatty():
        result = float(args.initial_invesment.read().splitlines()[0])
    else:
        result = float(args.initial_invesment)
    invested = result
    monthly_data = [invested]
    for i in range(args.years_of_growth):
        for i in range(NUM_MONTHS):
            result *= (1 + args.growth) ** (1 / NUM_MONTHS)
            result += args.monthly
        result += args.yearly
        monthly_data.append(result)
    monthly_data = list(map(lambda x: round(x, 2), monthly_data))
    return result


if __name__ == "__main__":
    args = get_arguments()
    result = calculate(args)
    print(result)
