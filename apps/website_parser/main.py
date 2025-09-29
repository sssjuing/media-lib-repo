# main.py
from fastapi import FastAPI
from pydantic import BaseModel, HttpUrl
from utils import get_html, parse_html

# 请求体模型
class ParseIn(BaseModel):
    url: HttpUrl      # 自动做 URL 格式校验

app = FastAPI(title="Parse API")

@app.post("/api/parse")
def parse_endpoint(payload: ParseIn):
    # 这里可以写真正的解析逻辑
    html = get_html(str(payload.url))
    result = parse_html(html)
    return {"url": str(payload.url), "result": result}

# # 本地调试
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)
