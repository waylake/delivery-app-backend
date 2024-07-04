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
git clone https://github.com/waylake/delivery-app-backend.git
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

- **URL** : `/api/users/profile`

- **Method** : `GET`

- **Headers** : `Authorization: Bearer <token>`

#### 예시

```sh
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/users/profile
```

### 사용자 프로필 업데이트

사용자 프로필을 업데이트하려면 `PUT /api/users/profile` 엔드포인트를 사용하세요.

- **URL** : `/api/users/profile`

- **Method** : `PUT`

- **Headers** : `Authorization: Bearer <token>`

- **Body** : JSON (업데이트할 필드)

#### 예시

```sh
curl -X PUT -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"name":"Updated Name"}' http://localhost:3000/api/users/profile
```

### 레스토랑 생성

레스토랑을 생성하려면 `POST /api/restaurants` 엔드포인트를 사용하세요.

- **URL** : `/api/restaurants`

- **Method** : `POST`

- **Headers** : `Authorization: Bearer <adminToken>`

- **Body** : JSON (레스토랑 정보)

#### 예시

```sh
curl -X POST -H "Authorization: Bearer <adminToken>" -H "Content-Type: application/json" -d '{"name":"New Restaurant", "address":"123 New St", "cuisine":"New Cuisine", "menu":[{"name":"Sample Dish", "description":"Delicious dish", "price":10.99}]}' http://localhost:3000/api/restaurants
```

### 주문 생성

주문을 생성하려면 `POST /api/orders` 엔드포인트를 사용하세요.

- **URL** : `/api/orders`

- **Method** : `POST`

- **Headers** : `Authorization: Bearer <token>`

- **Body** : JSON (주문 정보)

#### 예시

```sh
curl -X POST -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"restaurant": "restaurantId", "items": [{"name": "Item 1", "price": 10, "quantity": 2}], "totalAmount": 20}' http://localhost:3000/api/orders
```

### 주문 조회

특정 주문을 조회하려면 `GET /api/orders/:id` 엔드포인트를 사용하세요.

- **URL** : `/api/orders/:id`

- **Method** : `GET`

- **Headers** : `Authorization: Bearer <token>`

#### 예시

```sh
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/orders/orderId
```

## 기술 스택

- **Express** : 웹 프레임워크

- **MongoDB** : 데이터베이스

- **TypeScript**

- **Bun** : 빌드 도구

- **Jest** and **Bun** : 테스트 프레임워크
