import requests

from dotenv import load_dotenv
import string
import random

def generate_random_string(length):
    # Define the pool of characters: letters (uppercase and lowercase) and digits
    characters = string.ascii_letters + string.digits
    # Generate a random string
    random_string = ''.join(random.choices(characters, k=length))
    return random_string


def test_empty_register(api_url):
    response = requests.post(f'{api_url}/auth/register')
    assert response.status_code == 400


def test_valid_register(api_url):
    data = {
        'email': f'{generate_random_string(10)}@wp.pl',
        'password': 'asleijflisejf'
    }
    response = requests.post(f'{api_url}/auth/register', json=data)
    assert response.status_code == 201

def test_login(api_url):
    data = {
        'email': f'dupa@wp.pl',
        'password': 'asleijflisejf'
    }
    response = requests.post(f'{api_url}/auth/login', json=data)
    assert response.status_code == 200
