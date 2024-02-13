from django.http import HttpResponse
import subprocess
import simple_investment_calculator


def index(request):
    starting_value = request.GET.get('starting', '')
    args = 
    result = simple_investment_calculator.calculate(args)
    return HttpResponse(f"{result}")