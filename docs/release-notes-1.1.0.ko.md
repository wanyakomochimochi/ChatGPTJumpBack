# 버전 1.1.0

## 개요

- 이 기능은 ChatGPT를 사용할 때 AI에 질문을 보내거나 스크롤 버튼을 누른 후 원래 위치로 한 번에 돌아갈 수 있게 해줍니다. 이전 대화 기록을 읽다가 질문하고 싶을 때 다시 위치를 찾을 필요가 없습니다. AI의 답변을 본 후 새로운 질문이 떠올라도 문제없습니다! 몇 번의 클릭만으로 언제든지 원래 위치로 돌아올 수 있습니다.

## 주요 기능

- ChatGPT 페이지에서 원클릭 또는 키보드 단축키로 돌아가기
- 간단한 아이콘 동작 (ON = 컬러, OFF = 회색)
- 다국어 UI 지원 (en/ja/zh-CN/es/pt-BR/ko/de/fr/hi)
- 분석 없음; ON/OFF 설정은 로컬에만 저장됨

## 단축키

- Alt+J (Mac에서는 Alt+Shift+J) — chrome://extensions/shortcuts 에서 설정 가능

## 권한

- contextMenus, tabs, storage, scripting (기존 탭에 스크립트 주입에만 사용)

## 변경 사항

### v1.1.0
- 기능이 확장되어 이제 가장 최근 위치뿐만 아니라 페이지의 이전 위치로도 반복해서 돌아갈 수 있습니다.

### v1.0.2
- README의 GIF 데모 수정/업데이트.
- 정보 메뉴 링크가 이제 브라우저 언어에 따라 JA/EN의 Chrome Web Store를 엽니다.

### v1.0.1
- README에 사용 고지 추가
  (비공식 도구이며 OpenAI와 관련 없음, 본인 책임하에 사용, 가시 DOM에서만 작동함을 명시)
- 컨텍스트 메뉴 생성 시 발생한 경쟁 상태 수정

## 링크
- README (영어): https://github.com/wanyakomochimochi/ChatGPTJumpBack#readme (English)
- 변경 기록: https://github.com/wanyakomochimochi/ChatGPTJumpBack/blob/main/CHANGELOG.md (English)
- 저장소: https://github.com/wanyakomochimochi/ChatGPTJumpBack (English)
