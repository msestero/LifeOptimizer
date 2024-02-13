from django.http import HttpResponse
import subprocess
import simple_investment_calculator


def index(request):
    starting_value = request.GET.get('starting', '')
    result = simple_investment_calculator()
    return HttpResponse(f"{result}")