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
