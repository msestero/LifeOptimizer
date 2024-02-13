from django.http import HttpResponse
import subprocess
from .simple_investment_calculator import calculate


def index(request):
    initial_investment = request.GET.get('initial_investment', '')
    years_of_growth = request.GET.get('years_of_growth', '')
    yearly_growth = request.GET.get('yearly_growth', 0.06)
    monthly_contributions = request.GET.get('montly_contributions', 0)
    yearly_contributions = request.GET.get('yearly_contributions', 0)

    args = {
        "initial_investment": initial_investment,
        "years_of_growth": years_of_growth,
        "yearly_growth": yearly_growth,
        "monthly_contributions": monthly_contributions,
        "yearly_contributions": yearly_contributions,
    }
    result = calculate(args)
    return HttpResponse(result)