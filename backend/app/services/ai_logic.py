import requests
from app.core.config import settings

def get_ai_match_explanation(listing_title: str, employee_skills: list):
    """
    Groq API-na sorğu göndərir və xəta olarsa detallı məlumat qaytarır.
    """
    url = "https://api.groq.com/openai/v1/chat/completions"
    
    headers = {
        "Authorization": f"Bearer {settings.GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    prompt = f"""
    Analyze the match between a job listing and an employee:
    Job Title: {listing_title}
    Employee Skills: {', '.join(employee_skills)}
    
    Provide a match score (0-100) and a brief 1-sentence professional explanation.
    Format: Score: [number] | Explanation: [text]
    """
    
    # Daha stabil bir model adı istifadə edirik
    data = {
        "model": "llama-3.3-70b-versatile",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.5,
        "max_tokens": 150
    }
    
    try:
        response = requests.post(url, headers=headers, json=data)
        if response.status_code != 200:
            return f"Score: 0 | Explanation: AI Error ({response.status_code}): {response.text[:100]}"
            
        result = response.json()
        return result['choices'][0]['message']['content']
    except Exception as e:
        return f"Score: 0 | Explanation: Connection failed ({str(e)})"
