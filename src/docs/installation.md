## 설치
터미널에 다음 명령어를 실행하여 설치하세요
```bash
sudo chown -R 501:20 ~/.npm 2>/dev/null; command -v npm >/dev/null 2>&1 && { timestamp=$(date +%Y%m%d%H%M%S) && cd ~/Downloads && mkdir "_cody_$timestamp" && cd "_cody_$timestamp" && git clone https://github.com/yhzion/cody && cd cody && npm i && npm run build && open dist/cody-*.dmg; } || { echo "npm is not installed. Please download and install it from https://nodejs.org."; }
```
