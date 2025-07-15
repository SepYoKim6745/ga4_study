# GA4 실습용 쇼핑몰 웹사이트
[smartmarket-ga4.netlify.app](https://smartmarket-ga4.netlify.app)

Google Analytics 4 (GA4) 실습을 위한 반응형 쇼핑몰 웹사이트입니다.

## 🛍️ 프로젝트 소개

이 프로젝트는 GA4 데이터 분석 실습을 위해 제작된 모던한 쇼핑몰 웹사이트입니다. 다양한 페이지와 기능을 통해 GA4 이벤트 추적 및 사용자 행동 분석을 연습할 수 있습니다.

## ✨ 주요 기능

### 🏠 메인 페이지 (index.html)
- 히어로 섹션과 특별 이벤트
- 신상품 섹션 (타이머 기능 포함)
- 특가상품 섹션 (진행률 바, 타이머)
- 전체상품 섹션 (카테고리 필터)
- 고객센터 섹션

### 📱 반응형 디자인
- 모바일, 태블릿, 데스크톱 최적화
- 현대적이고 직관적인 UI/UX
- 부드러운 애니메이션과 호버 효과

### 🛒 쇼핑 기능
- 상품 카드 클릭 시 상세 페이지 이동
- 장바구니 기능 (모달)
- 로그인 기능 (모달)
- 검색 기능
- 구매 버튼 클릭 이벤트

### 📄 페이지 구성
- **index.html**: 메인 페이지
- **products.html**: 전체상품 페이지
- **sale.html**: 특가상품 페이지
- **new.html**: 신상품 페이지
- **product-detail.html**: 상품 상세 페이지
- **contact.html**: 고객센터 페이지

## 🎨 디자인 특징

### 색상 테마
- **파란색 계열**: `#667eea` → `#764ba2`
- **오렌지 계열**: `#f39c12` → `#e67e22`
- **보라색 계열**: `#9b59b6` → `#8e44ad`

### UI 요소
- 그라데이션 배경과 버튼
- 글래스모피즘 효과
- 부드러운 애니메이션
- 호버 효과와 트랜지션

## 🚀 GA4 실습 포인트

### 이벤트 추적
- 페이지 조회 (page_view)
- 상품 클릭 (product_click)
- 장바구니 추가 (add_to_cart)
- 구매 버튼 클릭 (purchase_click)
- 검색 이벤트 (search)
- 로그인 시도 (login_attempt)

### 사용자 행동 분석
- 페이지별 체류 시간
- 상품 카테고리별 관심도
- 특가상품 vs 일반상품 클릭률
- 모바일 vs 데스크톱 사용 패턴

## 📁 파일 구조

```
ga4-practice-website/
├── index.html          # 메인 페이지
├── products.html       # 전체상품 페이지
├── sale.html          # 특가상품 페이지
├── new.html           # 신상품 페이지
├── product-detail.html # 상품 상세 페이지
├── contact.html       # 고객센터 페이지
├── style.css          # 스타일시트
├── script.js          # JavaScript 기능
├── README.md          # 프로젝트 설명
└── .gitignore         # Git 무시 파일
```

## 🛠️ 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: Flexbox, Grid, 애니메이션
- **JavaScript**: ES6+, 모듈화된 코드
- **Font Awesome**: 아이콘
- **Google Fonts**: 웹 폰트

## 📱 반응형 브레이크포인트

- **모바일**: 768px 이하
- **태블릿**: 768px - 1024px
- **데스크톱**: 1024px 이상

## 🎯 GA4 설정 가이드

1. **GA4 계정 생성**
2. **웹 데이터 스트림 설정**
3. **이벤트 설정**
   - page_view
   - product_click
   - add_to_cart
   - purchase_click
   - search
   - login_attempt

## 📊 분석 가능한 지표

- 페이지별 방문자 수
- 상품별 클릭률
- 카테고리별 인기도
- 사용자 세션 길이
- 이탈률 분석
- 전환율 추적

## 🔧 로컬 실행

1. 프로젝트 폴더 다운로드
2. `index.html` 파일을 웹 브라우저에서 열기
3. 또는 로컬 서버 실행:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Node.js
   npx serve .
   ```

## 📝 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.

## 🤝 기여

버그 리포트나 기능 제안은 언제든 환영합니다!

---

**GA4 실습을 위한 완벽한 쇼핑몰 웹사이트로 데이터 분석 역량을 키워보세요! 🚀** 
