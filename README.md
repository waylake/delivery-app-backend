# Delivery App Backend

Delivery App Backend는 배달 주문 및 사용자 관리 기능을 제공하는 서버 애플리케이션입니다. 이 프로젝트는 Express, MongoDB, TypeScript를 사용하여 구현되었으며, Jest를 사용하여 테스트를 수행합니다. Bun을 사용하여 빌드 및 실행을 관리합니다.

## 필수 조건

이 프로젝트를 실행하기 위해서는 다음이 필요합니다:

- Node.js (>= 14.x)

- npm, Yarn, Bun, Pnpm

- MongoDB

## 설치

다음 명령어를 사용하여 프로젝트를 클론하고 의존성을 설치하세요:

```sh
git clone https://github.com/yourusername/delivery-app-backend.git
cd delivery-app-backend
bun install
```

## 환경 변수 설정 
프로젝트 루트에 `.env` 파일을 생성하고 다음 내용을 추가하세요:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/deliveryDB
JWT_SECRET=your_jwt_secret
```

## 실행 

개발 서버를 실행하려면 다음 명령어를 사용하세요:


```sh
bun run start
```

또는 Bun을 사용하여 빌드 및 실행하려면 다음 명령어를 사용하세요:


```sh
bun run build

bun run start
# or
node dist/server.js
```

## API 사용법 

### 사용자 프로필 조회 
사용자 프로필을 조회하려면 `GET /api/users/profile` 엔드포인트를 사용하세요. 
- **URL**  : `/api/users/profile`
 
- **Method**  : `GET`
 
- **Headers**  : `Authorization: Bearer <token>`

#### 예시 


```sh
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/users/profile
```

### 사용자 프로필 업데이트 
사용자 프로필을 업데이트하려면 `PUT /api/users/profile` 엔드포인트를 사용하세요. 
- **URL**  : `/api/users/profile`
 
- **Method**  : `PUT`
 
- **Headers**  : `Authorization: Bearer <token>`
 
- **Body**  : JSON (업데이트할 필드)

#### 예시 


```sh
curl -X PUT -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"name":"Updated Name"}' http://localhost:3000/api/users/profile
```

### 레스토랑 생성 
레스토랑을 생성하려면 `POST /api/restaurants` 엔드포인트를 사용하세요. 
- **URL**  : `/api/restaurants`
 
- **Method**  : `POST`
 
- **Headers**  : `Authorization: Bearer <adminToken>`
 
- **Body**  : JSON (레스토랑 정보)

#### 예시 


```sh
curl -X POST -H "Authorization: Bearer <adminToken>" -H "Content-Type: application/json" -d '{"name":"New Restaurant", "address":"123 New St", "cuisine":"New Cuisine", "menu":[{"name":"Sample Dish", "description":"Delicious dish", "price":10.99}]}' http://localhost:3000/api/restaurants
```

### 주문 생성 
주문을 생성하려면 `POST /api/orders` 엔드포인트를 사용하세요. 
- **URL**  : `/api/orders`
 
- **Method**  : `POST`
 
- **Headers**  : `Authorization: Bearer <token>`
 
- **Body**  : JSON (주문 정보)

#### 예시 


```sh
curl -X POST -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"restaurant": "restaurantId", "items": [{"name": "Item 1", "price": 10, "quantity": 2}], "totalAmount": 20}' http://localhost:3000/api/orders
```

### 주문 조회 
특정 주문을 조회하려면 `GET /api/orders/:id` 엔드포인트를 사용하세요. 
- **URL**  : `/api/orders/:id`
 
- **Method**  : `GET`
 
- **Headers**  : `Authorization: Bearer <token>`

#### 예시 


```sh
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/orders/orderId
```

## 기술 스택 
 
- **Express**  : 웹 프레임워크
 
- **MongoDB**  : 데이터베이스
 
- **TypeScript**  : 프로그래밍 언어
 
- **Bun**  : 빌드 도구
 
- **Jest**  : 테스트 프레임워크
 
- **Memory-Cache**  : 토큰 블랙리스트 구현을 위한 캐싱 라이브러리
 
- **Express-Rate-Limit**  : 속도 제한을 통한 보안 강화

## 기능 설명 

### Memory Cache를 사용한 JWT 블랙리스트 

로그아웃 시 사용된 JWT를 메모리 캐시에 저장하여 블랙리스트에 추가합니다. 이 캐시 항목은 토큰의 유효 기간이 끝날 때까지 유지됩니다. 이를 통해 로그아웃된 토큰이 다시 사용되지 않도록 합니다.
 
- **사용 라이브러리**  : `memory-cache`
 
- **사용 방법**  : 토큰을 로그아웃 시 블랙리스트에 추가하고, 인증 미들웨어에서 블랙리스트 여부를 확인합니다.

### Express Rate Limit을 사용한 요청 속도 제한 

로그인 시도와 같은 민감한 엔드포인트에 속도 제한을 적용하여 무차별 대입 공격(브루트 포스 공격)을 방지합니다. 일반적인 엔드포인트에도 기본적인 속도 제한을 적용하여 서버의 안정성을 높입니다.
 
- **사용 라이브러리**  : `express-rate-limit`
 
- **사용 방법**  : 각 라우트에 속도 제한 미들웨어를 적용합니다.


```typescript
import rateLimit from "express-rate-limit";

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  message: "Too many requests from this IP, please try again after 15 minutes",
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login attempts per window
  message: "Too many login attempts from this IP, please try again after 15 minutes",
});

// Apply rate limiting to routes
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/orders", generalLimiter, orderRoutes);
app.use("/api/restaurants", generalLimiter, restaurantRoutes);
app.use("/api/users", generalLimiter, userRoutes);
```
