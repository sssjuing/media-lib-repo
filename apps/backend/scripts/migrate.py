import requests

resp = requests.get('http://10.9.22.22:1323/api/actresses')

for i in sorted(resp.json(), key=lambda x: x['id']):
  print(i)
  requests.post('http://localhost:1323/api/actresses', json=i)

resp = requests.get('http://10.9.22.22:1323/api/videos')

for i in sorted(resp.json(), key=lambda x: x['id']):
  print(i)
  requests.post('http://localhost:1323/api/videos', json=i)

