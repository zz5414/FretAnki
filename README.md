# 할 일

- flac 파일 opus로 변환 및 최적화
  - https://chatgpt.com/share/682c9bc7-177c-8006-8829-547ae6e69481
  - preload또는 audio sprite를 사용하여 최적화
  - preload는 하였지만, 여전히 퀴즈를 준비중이라는 메세지와 함께 한번은 로딩이 필요해서 사용자경험이 갑갑함
- 가상악기 사용하여 음을 내기
- 코드 이해
- 라우터 구성
- 다음 연습 버튼 버그 수정
- 연습화면에서 현재 무슨 단계인지 표시
- 자유 연습 화면면
- 로그인 기능 구현 - firebase로 간단하게
- 로그인에 따른 개인화 기능
  - 개인별 진행 상황에 따른 단계를 자동 스크롤
- 간단한 멜로디 연주를 통해 복습하는 기능
- 지판보고 코드 구성음 맞추기
- 음을 들려주고 음을 맞춰보는 기능
- 스케일 연습 기능
- 오답노트 기능
- 음표로 학습 기능
- 스킨 기능
- Donation 버튼 추가

이제 기타가 상단에 붙을 것입니다. 하지만 만약 여전히 반응형 제어가 어렵다면, 완전히 새로운 HTML/CSS 기반 프렛보드를 만들 수도 있습니다:
HTML/CSS 방식의 장점:
🎯 완벽한 레이아웃 제어: Flexbox/Grid로 정확한 배치
📱 진정한 반응형: Tailwind CSS로 쉬운 반응형 구현
⚡ 성능 향상: SVG보다 가벼움
🔧 유지보수 용이: CSS로 간단한 스타일 수정
어떤 방법을 선호하시나요?
현재 SVG 방식 유지 (위에서 수정한 대로)
HTML/CSS로 완전 재설계 (시간이 걸리지만 장기적으로 더 좋음)
우선 위의 수정으로 간격 문제가 해결되는지 확인해보시고, 필요하면 HTML/CSS 방식으로 재설계하겠습니다!

멜로디 퀴즈가 6번줄만 있을 때, GABABBAA와같이 똑같은 음이 반복되는 경우가 발생한다. 버그를 고쳐달라

모바일 화면 932x430에서 8단계 멜로디 연습은 여전히 두줄이야
모바일인 경우 더 공격적으로 크기를 줄여줄래?

멜로디 듣기를 두번 누르면 두번 되는 버그가 존재한다
멜로디 재생중에는 재생중이라는 것을 알 수 있게 퀴즈 부분의 UI가 변경되고
재생중에 누르면 재생이 멈추고 UI가 원래대로 돌아오면 좋겠다

# 완료

- 모자란 음 채우기
  - 모자란 음은 채웠으나, 기타 지판 알고리즘에 버그가 있어서 소리가 다르게 재생됨
- 소리 기능
- Layout 재구성 - 특히, PWA 시 화면이 잘리는 현상 제거

# https://fret-anki.vercel.app/

# sounds

https://freepats.zenvoid.org/Guitar/acoustic-guitar.html

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
