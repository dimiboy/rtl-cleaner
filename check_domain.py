import urllib.request, json, re
token = re.search(r'oauth_token\s*=\s*"([^"]+)"', open(r'C:\Users\DimiBoy\.wrangler\config\default.toml').read()).group(1)
url = 'https://api.cloudflare.com/client/v4/accounts/f182458eb5540d5cc594d8ee468a6e06/pages/projects/rtl-cleaner/domains'
req = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + token})
res = json.loads(urllib.request.urlopen(req).read().decode())['result']
for d in res:
    print("Domain:", d['name'], "Status:", d['status'], "Cert:", d.get('certificate_authority'))
