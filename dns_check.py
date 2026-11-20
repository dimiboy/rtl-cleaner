import urllib.request, json, re
token = re.search(r'oauth_token\s*=\s*"([^"]+)"', open(r'C:\Users\DimiBoy\.wrangler\config\default.toml').read()).group(1)
zone_id = "4aa1c83d6b40ac1c1325fed6f15b62b3"
url = f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records?name=rtl.dimustech.net"
req = urllib.request.Request(url, headers={'Authorization': 'Bearer ' + token})
res = json.loads(urllib.request.urlopen(req).read().decode())['result']
print("DNS records for rtl.dimustech.net:", len(res))
for r in res:
    print(r['type'], r['name'], "->", r['content'], "proxied:", r['proxied'])

# If no DNS record exists, create CNAME rtl -> rtl-cleaner.pages.dev
if len(res) == 0:
    print("Creating CNAME record...")
    post_data = json.dumps({
        "type": "CNAME",
        "name": "rtl.dimustech.net",
        "content": "rtl-cleaner.pages.dev",
        "proxied": True,
        "ttl": 1
    }).encode('utf-8')
    create_req = urllib.request.Request(f"https://api.cloudflare.com/client/v4/zones/{zone_id}/dns_records", data=post_data, headers={'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json'}, method='POST')
    try:
        c_res = json.loads(urllib.request.urlopen(create_req).read().decode())
        print("CNAME created successfully:", c_res.get('success'))
    except Exception as e:
        print("Error creating CNAME:", e)
