# API Reference

## Overview

### Root Endpoint

```
curl http://127.0.0.1
```

## Mileages

Method | URI | Desc
---|---|---
POST | `/mileages/:userId` | 포인트 증감/회수
GET | `/mileages/:userId` | 포인트 조회

### Grant points to user

#### Parameters

Name | Type |	Required | Description
---|---|---|---
`grantType` | `string` | ✔️ | `INCREASE`, `DECREASE`
`amount`	| `number` | ✔️	| 부여할 포인트

`Example`

```
$ curl -i --header "Content-Type: application/json" \
  --request POST \
  --data '{"grantType":"INCREASE","amount":1.0}' \
  http://localhost:3000/mileages/3ede0ef2-92b7-4817-a5f3-0c575361f745
```

#### Response

```
Status: 204 No Content
```

### Get a user mileages

`Example`

```
$ curl -i --header "Content-Type: application/json" \
  --request GET \
  http://localhost:3000/mileages/3ede0ef2-92b7-4817-a5f3-0c575361f745
```

#### Response

```js
{
  amount: 52,
  updated: '2020-02-26T21:32:12.566Z',
  created: '2020-02-25T11:16:59.500Z'
}
```