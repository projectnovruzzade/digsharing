import requests
import json

# Backend 8001 portunda işləyir
BASE_URL = "http://localhost:8001/api/v1/marketplace"

def test_marketplace():
    print("--- Testing Marketplace API ---")
    
    # 1. Get Listings
    print("\n1. Getting listings...")
    resp = requests.get(f"{BASE_URL}/listings")
    
    if resp.status_code != 200:
        print(f"FAILED: Status {resp.status_code}")
        print(f"Response: {resp.text}")
        return

    listings = resp.json()
    print(f"SUCCESS: Found {len(listings)} listings")
    
    if len(listings) > 0:
        listing_id = listings[0]['id']
        print(f"Listing ID: {listing_id}")
    else:
        print("No listings found to test further.")
        return

    # 2. Get Single Listing
    print(f"\n2. Getting listing {listing_id}...")
    resp = requests.get(f"{BASE_URL}/listings/{listing_id}")
    print(f"Status: {resp.status_code}")

    # 3. Apply to Listing
    print(f"\n3. Applying to listing {listing_id}...")
    payload = {
        "listingId": listing_id,
        "applicantId": "emp_001",
        "note": "Interested in this project"
    }
    resp = requests.post(f"{BASE_URL}/listings/{listing_id}/apply", json=payload)
    print(f"Status: {resp.status_code}")
    if resp.status_code == 200:
        print("Application successful!")

    # 4. Get Applications
    print("\n4. Getting applications for emp_001...")
    resp = requests.get(f"{BASE_URL}/applications", params={"applicant_id": "emp_001"})
    if resp.status_code == 200:
        apps = resp.json()
        print(f"SUCCESS: Found {len(apps)} applications")
    else:
        print(f"FAILED: Status {resp.status_code}")

if __name__ == "__main__":
    test_marketplace()
