import pytest
import requests

from dotenv import load_dotenv
import os

@pytest.fixture
def api_url():
    load_dotenv()
    host = os.getenv("HOST")
    port = os.getenv("PORT")
    return f"http://{host}:{port}"

@pytest.fixture
def credentials(api_url):
    data = {
        'email': f'dupa@wp.pl',
        'password': 'asleijflisejf'
    }
    response = requests.post(f'{api_url}/auth/register', json=data)
    if response.status_code == 201:
        return response.json()
    response = requests.post(f'{api_url}/auth/login', json=data)
    if response.status_code == 200:
        return response.json()
    return {}