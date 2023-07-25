import django
import os
import sys
import time
import json
import requests


sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
from sales_rest.models import AutomobileVO






def poll(repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
            response = requests.get("http://inventory-api:8000/api/automobiles/")

            if response.status_code == 200:
                automobiles_data = response.json()['autos']

                for auto_data in automobiles_data:
                    vin = auto_data['vin']
                    sold = auto_data['sold']

                    # Create or update AutomobileVO instance
                    AutomobileVO.objects.update_or_create(
                        vin=vin,
                        defaults={
                            'sold': sold,
                        }
                    )

            else:
                print(f"Received status code {response.status_code} when trying to fetch automobile data")

        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(1) 

if __name__ == "__main__":
    poll()