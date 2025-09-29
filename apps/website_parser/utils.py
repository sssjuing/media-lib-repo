import cloudscraper
from bs4 import BeautifulSoup

def get_html(url):
    scraper = cloudscraper.create_scraper()
    response = scraper.get(url)
    return response.content

def open_html(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        html_content = file.read()
    return html_content

def parse_html(html):
    soup = BeautifulSoup(html, "html.parser")
    video_details = soup.select_one("div[x-show=\"currentTab === 'video_details'\"]")
    if not video_details:
        print("未找到匹配的 video_details 标签！")
        return
    result = {}
    result['synopsis'] = video_details.select("div.text-secondary:nth-of-type(1)")[0].get_text(strip=True)
    # result['release_date'] = video_details[0].select("time")[0].get_text(strip=True)
    result['release_date'] = video_details.select_one("time").get_attribute_list('datetime')[0]
    result['serial_number'] = video_details.select_one("div.text-secondary:nth-of-type(2) span:nth-of-type(2)").get_text(strip=True)
    result['title'] = video_details.select_one("div.text-secondary:nth-of-type(3) span:nth-of-type(2)").get_text(strip=True)
    actresses = video_details.select("div.text-secondary:nth-of-type(4) a")
    result['actresses'] = [a.get_text(strip=True) for a in actresses]
    result['cover_url'] = soup.select_one('link[rel="preload"][as="image"]')['href']
    result['m3u8_url'] = ''
    return result


if __name__ == "__main__":
    # html = get_html("https://httpbin.org/headers")
    html = get_html("https://njavtv.com/zooo-184")
    # print(html)
    # html = open_html("apps/website_parser/atid-487.html")
    result = parse_html(html)
    print(result)

# wget -U "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36" --referer="https://www.google.com/" --header="Accept-Language: zh-CN,zh;q=0.9,en;q=0.8" --header="Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" --header="Cache-Control: no-cache" --cookies=on --keep-session-cookies -O index.html https://njavtv.com/dm58/atid-487
