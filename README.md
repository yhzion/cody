### README.md

# Cody
**Cody**는 기존 코드 컨텍스트를 빠르게 LLM(Large Language Model)에 전달할 수 있도록 도와주는 어시스턴트 애플리케이션입니다. 이 애플리케이션은 Electron을 기반으로 하여, 프로젝트의 디렉토리 구조를 트리 형태로 시각화하고, 필요한 코드 내용을 빠르게 추출해 클립보드에 복사하거나 파일로 저장할 수 있도록 지원합니다.

## 주요 기능
- **디렉토리 트리 생성**: 선택한 디렉토리의 구조를 트리 형태로 시각화하여 보여줍니다.
- **정규식 필터**: 포함할 파일/디렉토리와 제외할 파일/디렉토리를 정규식으로 필터링할 수 있습니다.
- **파일 내용 포함**: 트리에 포함된 텍스트 파일의 내용을 함께 출력할 수 있습니다.
- **클립보드 복사**: 생성된 트리 구조와 파일 내용을 클립보드에 복사하여 쉽게 공유할 수 있습니다.
- **파일로 저장**: 생성된 트리 구조와 파일 내용을 텍스트 파일로 저장할 수 있습니다.
- **ChatGPT 연동**: 생성된 내용을 클립보드에 복사하고 ChatGPT를 바로 열 수 있습니다.

## 기대 효과
- 개발 생산성 향상

## 요구 사항
- Apple Silicon 칩(M1, M2, M3 등) 사용 여부 확인
- Node.js 설치 여부 확인:
  - node.js >= v20.x.x 🙆🏻‍♂️
  - node.js < v20 🙅‍♂️

## 설치
터미널에 다음 명령어를 실행하여 설치하세요
```bash
sudo chown -R 501:20 ~/.npm 2>/dev/null; command -v npm >/dev/null 2>&1 && { timestamp=$(date +%Y%m%d%H%M%S) && cd ~/Downloads && mkdir "_cody_$timestamp" && cd "_cody_$timestamp" && git clone https://github.com/yhzion/cody && cd cody && npm i && npm run build && open dist/cody-*.dmg; } || { echo "npm is not installed. Please download and install it from https://nodejs.org."; }
```

## 직접 빌드
```bash
git clone https://github.com/yhzion/cody.git
cd cody
npm install
```

### 실행
```bash
npm start
```

### 빌드
애플리케이션을 빌드하여 실행 파일을 생성할 수 있습니다:

```bash
npm run build
```

## 사용 방법
1. **베이스 디렉토리 선택**: 베이스 디렉토리 선택 버튼을 클릭하여 분석할 디렉토리를 선택합니다.
2. **경로 추가**: 필요한 경우 추가적으로 분석할 파일이나 디렉토리를 선택하여 목록에 추가합니다.
3. **정규식 필터**: 포함하거나 제외할 경로를 정규식으로 설정합니다.
4. **파일 내용 포함**: 필요에 따라 트리 구조와 함께 파일의 내용을 포함할지 설정합니다.
5. **텍스트 파일로 추출**: 결과를 텍스트 파일로 저장할지 선택하고 경로를 설정합니다.
6. **클립보드 복사**: 생성된 트리 구조를 클립보드에 복사합니다.
7. **ChatGPT 열기**: 트리 구조를 복사한 후, 바로 ChatGPT를 열어 붙여넣기 및 사용이 가능합니다.

## Q&A
### Q1: 전체 코드를 입력했더니 응답을 받지 못했습니다. 어떻게 해야 하나요?
**A1:** ChatGPT의 토큰 수 제한을 극복하기 위해 핵심 코드만 제공하거나, 코드 분할 입력, 맥락 설명 추가, 코드 공유 링크 활용 등의 방법을 사용하세요.

### Q2: 특정 코드 문제를 해결하고 싶어요. 어떻게 질문해야 하나요?
**A2:** 문제가 되는 코드를 포함하여 질문하세요.

### Q3: 어떤 기능을 구현하려고 해요. 방법을 물어볼 때 어떻게 질문해야 하나요?
**A3:** 구현하려는 기능을 구체적으로 설명하고, 사용하는 언어나 프레임워크를 명시하세요.

### Q4: 어떤 개념이 이해되지 않아요. 이럴 때는 어떻게 질문할까요?
**A4:** 이해되지 않는 부분을 명확히 설명하고, 예제 코드를 요청하세요.

### Q5: 코드 리뷰를 요청할 때 어떻게 질문해야 하나요?
**A5:** 작성한 코드와 함께 개선하고 싶은 부분을 명확히 알려주세요.

### Q6: 디버깅 도움을 받고 싶어요. 어떻게 질문해야 하나요?
**A6:** 에러 메시지와 문제 상황을 함께 제공하세요.

### Q7: 프로젝트 구조나 설계에 대한 조언을 받고 싶어요. 어떻게 질문할까요?
**A7:** 프로젝트 목적과 현재 구조를 설명하고, 조언이 필요한 부분을 명확히 질문하세요.

### Q8: 최신 기술이나 라이브러리에 대해 알고 싶어요. 어떻게 질문해야 하나요?
**A8:** 관심 있는 기술이나 라이브러리를 구체적으로 언급하고, 궁금한 부분을 질문하세요.

### Q9: 더 좋은 코드 작성 방법을 물어볼 때 어떻게 질문하나요?
**A9:** 현재 작성한 코드와 함께 개선하고 싶은 부분을 질문하세요.

## 라이선스
이 프로젝트는 [MIT 라이선스](./LICENSE)를 따릅니다.
