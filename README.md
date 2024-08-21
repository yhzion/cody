### README.md

````markdown
# Cody

**Cody**는 기존 코드 컨텍스트를 빠르게 LLM(Large Language Model)에 전달할 수 있도록 도와주는 어시스턴트 애플리케이션입니다. 이 애플리케이션은 Electron을 기반으로 하여, 프로젝트의 디렉토리 구조를 트리 형태로 시각화하고, 필요한 코드 내용을 빠르게 추출해 클립보드에 복사하거나 파일로 저장할 수 있도록 지원합니다.

## 주요 기능

- **디렉토리 트리 생성**: 선택한 디렉토리의 구조를 트리 형태로 시각화하여 보여줍니다.
- **정규식 필터**: 포함할 파일/디렉토리와 제외할 파일/디렉토리를 정규식으로 필터링할 수 있습니다.
- **파일 내용 포함**: 트리에 포함된 텍스트 파일의 내용을 함께 출력할 수 있습니다.
- **클립보드 복사**: 생성된 트리 구조와 파일 내용을 클립보드에 복사하여 쉽게 공유할 수 있습니다.
- **파일로 저장**: 생성된 트리 구조와 파일 내용을 텍스트 파일로 저장할 수 있습니다.
- **ChatGPT 연동**: 생성된 내용을 클립보드에 복사하고 ChatGPT를 바로 열 수 있습니다.

## 설치 및 실행

### 요구 사항

- Node.js (버전 14 이상)
- npm 또는 yarn
- Electron

### 설치

```bash
git clone https://github.com/yourusername/cody.git
cd cody
npm install
```
````

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

## 파일 구조

```plaintext
├── 📁 utils
│   ├── 📄 colors.cjs
│   └── 📄 fileSystem.cjs
├── 📄 .gitignore
├── 📄 LICENSE
├── 📄 README.md
├── 📄 fox.icns
├── 📄 icon_128x128.png
├── 📄 index.html
├── 📄 main.cjs
├── 📄 package.json
├── 📄 preload.js
├── 📄 renderer.js
└── 📄 styles.css
```

- **utils/colors.cjs**: 콘솔 출력에 사용할 색상 스타일을 정의합니다.
- **utils/fileSystem.cjs**: 디렉토리 트리를 생성하고, 파일 내용을 처리하는 로직이 포함되어 있습니다.
- **main.cjs**: Electron 메인 프로세스를 설정하고, 애플리케이션 창을 생성합니다.
- **preload.js**: Renderer 프로세스와 Main 프로세스 간의 안전한 통신을 위한 브리지 스크립트입니다.
- **renderer.js**: UI에서 발생하는 이벤트를 처리하고, 사용자 인터페이스를 업데이트합니다.
- **index.html**: 애플리케이션의 메인 HTML 구조입니다.
- **styles.css**: 애플리케이션의 스타일을 정의하는 CSS 파일입니다.

## 라이선스

이 프로젝트는 [MIT 라이선스](./LICENSE)를 따릅니다.

```

이 README.md는 프로젝트의 기능과 사용 방법을 간단하게 설명하고 있으며, 코드베이스 구조도 포함하고 있어 사용자가 쉽게 이해할 수 있도록 구성되어 있습니다. 필요에 따라 프로젝트에 맞게 추가 설명을 포함하거나 수정할 수 있습니다.
```