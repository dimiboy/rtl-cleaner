import re
import json
import urllib.request
import urllib.error

config_path = r"C:\Users\DimiBoy\.wrangler\config\default.toml"
with open(config_path, "r", encoding="utf-8") as f:
    content = f.read()

m = re.search(r'oauth_token\s*=\s*"([^"]+)"', content)
if not m:
    raise RuntimeError("OAuth token not found")

token = m.group(1)
account_id = "f182458eb5540d5cc594d8ee468a6e06"
base_url = f"https://api.cloudflare.com/client/v4/accounts/{account_id}/pages/projects"

headers = {
    "Authorization": f"Bearer {token}",
    "Content-Type": "application/json"
}

# 1. List projects
req = urllib.request.Request(base_url, headers=headers)
try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        projects = [p["name"] for p in data.get("result", [])]
        print("Existing projects:", projects)
except Exception as e:
    print("Error listing projects:", e)
    projects = []

# 2. Create rtl-cleaner if needed
if "rtl-cleaner" not in projects:
    print("Creating project rtl-cleaner...")
    payload = json.dumps({
        "name": "rtl-cleaner",
        "production_branch": "main"
    }).encode("utf-8")
    req = urllib.request.Request(base_url, data=payload, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            print("Created successfully:", data.get("success"))
    except urllib.error.HTTPError as e:
        print("HTTP Error:", e.code, e.read().decode())
    except Exception as e:
        print("Error:", e)
else:
    print("Project rtl-cleaner already exists.")

# 3. Add custom domain rtl.dimustech.net
domain_url = f"{base_url}/rtl-cleaner/domains"
print("Adding custom domain rtl.dimustech.net...")
payload = json.dumps({"name": "rtl.dimustech.net"}).encode("utf-8")
req = urllib.request.Request(domain_url, data=payload, headers=headers, method="POST")
try:
    with urllib.request.urlopen(req) as resp:
        data = json.loads(resp.read().decode())
        print("Domain result:", data.get("success"), data.get("result"))
except urllib.error.HTTPError as e:
    err_body = e.read().decode()
    if "already exists" in err_body.lower() or "conflict" in err_body.lower():
        print("Domain already attached or pending.")
    else:
        print("HTTP Error adding domain:", e.code, err_body)
except Exception as e:
    print("Error adding domain:", e)

# Check status
req = urllib.request.Request(f"{base_url}/rtl-cleaner", headers=headers)
with urllib.request.urlopen(req) as resp:
    res = json.loads(resp.read().decode())["result"]
    print("Domains:", res.get("domains"))
    print("Subdomain:", res.get("subdomain"))
    print("Canonical URL:", res.get("canonical_deployment", {}).get("url") if res.get("canonical_deployment") else "None")
