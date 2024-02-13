from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("simple_investment/", include("simple_investment.urls")),
    path("admin/", admin.site.urls),
]