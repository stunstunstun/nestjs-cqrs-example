## Mileages

Method | URI | Desc
---|---|---
POST | `/mileages/:userId` | 포인트 증감/회수
GET | `/mileages/:userId` | 포인트 조회

### Examples
```
$ curl -i --header "Content-Type: application/json" \
  --request POST \
  --data '{"grantType":"INCREASE","amount":1.0}' \
  http://localhost:3000/mileages/3ede0ef2-92b7-4817-a5f3-0c575361f745
```

## Resource

Name	| Type	| Required	| Description
---|---|---|---
`userId`	| `string` | ✔️	| 유저 ID
`amount`	| `number` | ✔️	| 현재 마일리지 포인트
`updated`	| `date` | ✔️	| 마일리지 갱신일
`created`	| `date` | ✔️	| 마일리지 생성일
