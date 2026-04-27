import requests

BASE_URL = "http://localhost:8001/api/v1/hr"

def test_hr():
    print("--- Testing HR & Swaps API ---")
    
    # 1. Skill Gap Analysis
    print("\n1. Running Skill Gap Analysis...")
    resp = requests.get(f"{BASE_URL}/skill-gap")
    print(f"Status: {resp.status_code}")
    if resp.status_code == 200:
        data = resp.json()
        print(f"Recommendation: {data['recommendation']}")
        print(f"Missing Skills: {len(data['missingSkills'])}")

    # 2. Create Swap
    print("\n2. Creating a Swap Proposal...")
    payload = {
        "fromEmployeeId": "emp_001",
        "toEmployeeId": "emp_002",
        "duration": "3 months",
        "salarySplit": {"companyA": 50, "companyB": 50}
    }
    resp = requests.post(f"{BASE_URL}/swaps", json=payload)
    print(f"Status: {resp.status_code}")
    if resp.status_code == 200:
        swap_id = resp.json()['id']
        print(f"Swap created with ID: {swap_id}")
    else:
        return

    # 3. Update Swap Status
    print(f"\n3. Approving Swap {swap_id}...")
    resp = requests.patch(f"{BASE_URL}/swaps/{swap_id}", params={"status": "approved"})
    print(f"Status: {resp.status_code}")
    if resp.status_code == 200:
        print(f"New Status: {resp.json()['status']}")

    # 4. Instant Replacement
    print("\n4. Finding Instant Replacement for emp_001...")
    resp = requests.get(f"{BASE_URL}/instant-replacement/emp_001")
    print(f"Status: {resp.status_code}")
    if resp.status_code == 200:
        candidates = resp.json()['candidates']
        print(f"Found {len(candidates)} candidates")

if __name__ == "__main__":
    test_hr()
