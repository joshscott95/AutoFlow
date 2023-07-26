from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import Technician, Appointment, AutomobileVO

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

class AppointmentListEncoder(ModelEncoder):
     model = Appointment
     properties = [
        "id",
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
        "vip"
     ]

     encoders = {"technician": TechnicianListEncoder(),}

@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianListEncoder,
                safe=False,
                )
        except TypeError:
            return JsonResponse(
                {"message": "Invalid technician data"},
                status=400,)

@require_http_methods(["DELETE"])
def api_delete_technician(request, id):
    if Technician.objects.filter(id=id).count() > 0:
        technician = Technician.objects.filter(id=id)
        technician.delete()
        return JsonResponse({"message": "Technician deleted successfully"})
    else:
        return JsonResponse({"message": "Invalid technician id"},
        status=400,)

@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentListEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.get(id=content["technician"])
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid technician id"},
                status=400,
            )
        if AutomobileVO.objects.filter(vin=content["vin"]).count() > 0:
            content["vip"] = "Yes"
        else:
            content["vip"] = "No"
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentListEncoder,
            safe=False,)

@require_http_methods(["DELETE"])
def api_delete_appointment(request, id):
    if Appointment.objects.filter(id=id).count() > 0:
        appointment = Appointment.objects.filter(id=id)
        appointment.delete()
        return JsonResponse({"message": "Appointment deleted successfully"})
    else:
        return JsonResponse({"message": "Invalid appointment id"},
        status=400,)

@require_http_methods(["PUT"])
def api_cancel_appointment(request, id):
    try:
        content = {"status": "canceled"}
        Appointment.objects.filter(id=id).update(**content)
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
        appointment, encoder=AppointmentListEncoder, safe=False,)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Invalid appointment id"},
        status=400,)

@require_http_methods(["PUT"])
def api_finish_appointment(request, id):
    try:
        content = {"status": "finished"}
        Appointment.objects.filter(id=id).update(**content)
        appointment = Appointment.objects.get(id=id)
        return JsonResponse(
        appointment, encoder=AppointmentListEncoder, safe=False,)
    except Appointment.DoesNotExist:
        return JsonResponse({"message": "Invalid appointment id"},
        status=400,)
