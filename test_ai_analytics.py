import requests

BASE_URL = "http://localhost:8001/api/v1/analytics"

def test_analytics():
    print("--- Testing Analytics & Groq AI API ---")
    
    # 1. Finance Savings
    print("\n1. Fetching Finance Savings...")
    resp = requests.get(f"{BASE_URL}/finance/savings")
    print(f"Status: {resp.status_code}, Savings: {resp.json()['internalSavings']}")

    # 2. AI Config Update
    print("\n2. Updating AI Config Weights...")
    payload = {"skillWeight": 50, "workloadWeight": 20}
    resp = requests.patch(f"{BASE_URL}/admin/ai-config", json=payload)
    print(f"Status: {resp.status_code}, New Config: {resp.json()['updatedConfig']}")

    # 3. Groq AI Match Test (REAL AI CALL!)
    print("\n3. Testing Groq AI Match Analysis (This might take a second)...")
    params = {
        "listing": "Senior React Developer with Cloud Experience",
        "skills": "React,TypeScript,Docker,AWS"
    }
    resp = requests.get(f"{BASE_URL}/ai/test-match", params=params)
    print(f"Status: {resp.status_code}")
    if resp.status_code == 200:
        print(f"AI Analysis Result:\n{resp.json()['analysis']}")

if __name__ == "__main__":
    test_analytics()
