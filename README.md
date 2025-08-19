## **🛍️  Shopping Mall**
**MERN**스택으로 개발한 [Shopping Mall]()    사이트

#### **로그인**

> ID: admin@gamil.com
> 
> PW: admin

## **📝  프로젝트 소개**
**쇼핑몰 사이트**

나이키 코리아 사이트 클론 코딩 + 할인 쿠폰 이벤트 + 관리자 쿠폰 관리

## **🕰️  개발기간**
2025.08.01 ~ 2025.08.16

## **⚒️ 사용 기술 스택**
### FrontEnd
<img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"> 
 <img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white"> <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white"> <img src="https://img.shields.io/badge/reactbootstrap-41E0FD?style=for-the-badge&logo=reactbootstrap&logoColor=white"> 

### BackEnd
<img src="https://img.shields.io/badge/Node.js-5FA04E?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"> <img src="https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=Mongoose&logoColor=white">



### Deployment
<img src="https://img.shields.io/badge/netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white"> <img src="https://img.shields.io/badge/Amazon%20AWS-232F3E?style=for-the-badge&logo=Amazon%20AWS&logoColor=white">

### Config
<img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white"> 


## **⚙️ 개발환경**
* Node.js 24.4.1
* npm 11.4.2
* Vite 4.6.0
* Visual Studio Code
* Git / GitHub
* MongoDB Atlas
* AWS Elastic Beanstalk

## **📔 시작 가이드**
### **설치**
```
git clone https://github.com/JiHy0ung/shopping-mall.git [파일 명]
```

### **FrontEnd**
```
npm install
npm run dev
```

### **.env(FrontEnd)**
```
```

### **BackEnd**
```
npm install
npm start
```

### **.env(BackEnd)**
```
```


## ✨ 주요 기능

### 🧑‍💼 고객(Customer) 기능

- **회원가입 / 로그인**
  -  이메일 기반 회원가입 및 로그인
  - 외부 계정(SNS) 로그인 지원 *(ex: Google 등)*

- **쇼핑 기능**
  - Nav Bar의 각 카테고리에서 카테고리 별 상품 확인 가능
  - 상품 상세 페이지에서 정보 확인 및 장바구니 / 위시리스트 추가  
    - 재고가 없을 경우 버튼 비활성화 처리

- **장바구니**
  - 장바구니에 담긴 상품 확인
  - 수량 수정 및 개별 상품 삭제 가능

- **위시리스트**
  - 위시리스트에 담긴 상품 확인
  - 상품 삭제 가능
 
- **이벤트**
  - 이벤트 페이지에서 이벤트 참여를 통한 할인 쿠폰 지급

- **결제 / 주문**
  - 장바구니 내 상품 결제
  - 재고 부족 시 결제 불가 처리
  - 주문 완료 시 예약 번호(주문 번호) 발급

- **마이페이지**
  - 내 주문 목록 확인
  - 주문 상태 및 주문 번호 확인 가능

---

### 🛠 관리자(Admin) 기능

- **상품 관리**
  - 상품 목록 조회
  - 상품 검색 및 필터링
  - 상품 추가 / 수정 / 삭제
  - 페이지네이션 지원

- **주문 관리**
  - 전체 주문 목록 조회
  - 주문 상세 정보 확인
  - 주문 상태 변경 *(ex: preparing → shipping)*
  - 주문 번호로 검색 가능

- **쿠폰 관리**
  - 쿠폰 활성화 / 비활성화 관리




## **🧾 API 명세**
| Method | Endpoint | Description |
|--------|----------|-------------|
|     | `/` | 추가 예정|


## **🎛️ 데이터베이스 ERD**
<img width="428" height="286" alt="image" src="https://github.com/user-attachments/assets/9dcf0fbc-80fa-4a0e-953e-433a58a2fd27" />

## **📂 폴더 구조**
#### FrontEnd
```
TODO-FE
│ 
├─ 📁 node_modules
├─📁 public
└─ 📁 src
```

#### BackEnd
```
TODO-BE
│ 
├─ 📂 node_modules
├─ 📂 .ebextensions
│  └─ cors.config
├─ 📂 controller
│  └─ task.controller.js
├─ 📂 model
│  ├─ User.js
│  ├─ Product.js
│  ├─ Order.js
│  └─ Cart.js
├─ 📂 routes
│  ├─ index.js
│  └─ task.api.js
├─ app.js
├─ .env
├─ Procfile
├─ package-lock.json
└─ package.json
```
