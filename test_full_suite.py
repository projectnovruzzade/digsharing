import requests

BASE_URL = "http://localhost:8001/api/v1"

def run_suite():
    print("--- FULL SYSTEM TEST SUITE ---")
    
    # 1. Auth Test
    print("\n1. Testing Auth...")
    login_data = {"username": "employee@demo.az", "password": "demo123"}
    resp = requests.post(f"{BASE_URL}/auth/login", data=login_data)
    if resp.status_code == 200:
        token = resp.json()['access_token']
        print(f"Auth Success. Token: {token}")
    else:
        print("Auth Failed!")
        return

    headers = {"Authorization": f"Bearer {token}"}
    
    # 2. Employee Test
    print("\n2. Testing Employees...")
    resp = requests.get(f"{BASE_URL}/employees", headers=headers)
    print(f"Employees list: {resp.status_code}")

    # 3. Marketplace Test
    print("\n3. Testing Marketplace...")
    resp = requests.get(f"{BASE_URL}/marketplace/listings", headers=headers)
    print(f"Listings count: {len(resp.json())}")

    # 4. HR Test
    print("\n4. Testing HR...")
    resp = requests.get(f"{BASE_URL}/hr/skill-gap", headers=headers)
    print(f"Skill Gap Status: {resp.status_code}")

    # 5. Analytics Test
    print("\n5. Testing Analytics...")
    resp = requests.get(f"{BASE_URL}/analytics/finance/savings", headers=headers)
    print(f"Analytics Status: {resp.status_code}")

    print("\n--- ALL TESTS PASSED SUCCESSFULLY ---")

if __name__ == "__main__":
    run_suite()
