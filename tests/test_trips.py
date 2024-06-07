import requests

def test_trips_get(api_url):
    response = requests.get(f'{api_url}/trips')
    assert response.status_code == 200