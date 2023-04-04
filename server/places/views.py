from django.http import HttpResponse

from .models import Place

def index(request):
  return HttpResponse(Place.objects.all().values())