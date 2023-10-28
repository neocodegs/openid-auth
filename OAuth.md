
## OAuth 2.0 Authorization Code Flow

#### 1. Build the Authorization URL

```
https://authorization-server.com/authorize?
  response_type=code
  &client_id=jnJXLOLEWoT3G9_3Acrb5SxV
  &redirect_uri=https://www.oauth.com/playground/authorization-code.html
  &scope=photo+offline_access
  &state=u4RaH8QuNIcjAirB
```
#### 2. Verify the state parameter

```
?state=u4RaH8QuNIcjAirB&code=-g3zx-3oybOVuJUE55IaqSv_1rmZnIo0qciZjczqjT-Om8fC
```

#### 3. Exchange the Authorization Code
```
POST https://authorization-server.com/token

grant_type=authorization_code
&client_id=jnJXLOLEWoT3G9_3Acrb5SxV
&client_secret=bLjkSns4TLA_K5IVIt04BQWTGZZaNy6-6oldLzpKo9_g60ug
&redirect_uri=https://www.oauth.com/playground/authorization-code.html
&code=-g3zx-3oybOVuJUE55IaqSv_1rmZnIo0qciZjczqjT-Om8fC
```

## OAuth 2.0 PKCE Flow

#### 1. Create a Code Verifier and Challenge
generated the code_verifier
```
M4NtnD9zIqW_PyhiHThc2MCUnCL2-5f7B3o9vXpMa0hq9LiC
```
generated code challenge
```
base64url(sha256(code_verifier))
i5sHUkFipOOWD6ox9CjiL1Jw8aCa6JosJ3nbizEuanE
```

#### 2. Build the Authorization URL
```
https://authorization-server.com/authorize?
  response_type=code
  &client_id=jnJXLOLEWoT3G9_3Acrb5SxV
  &redirect_uri=https://www.oauth.com/playground/authorization-code-with-pkce.html
  &scope=photo+offline_access
  &state=dbY3ud5ELYZJGUsD
  &code_challenge=i5sHUkFipOOWD6ox9CjiL1Jw8aCa6JosJ3nbizEuanE
  &code_challenge_method=S256
```
saved it in a cookie along with the code_verifier previously generated.


#### 3. Verify the state parameter
The user was redirected back to the client with a few additional query parameters in the URL:
```
?state=dbY3ud5ELYZJGUsD&code=sITqxZ9PLP01s43x2DWF9Vz_zj9Uh_NGxrCQYHa3_nWq3NXN
```

#### 4. Exchange the Authorization Code

The client will build a POST request to the token endpoint with the following parameters:
```
POST https://authorization-server.com/token

grant_type=authorization_code
&client_id=jnJXLOLEWoT3G9_3Acrb5SxV
&client_secret=bLjkSns4TLA_K5IVIt04BQWTGZZaNy6-6oldLzpKo9_g60ug
&redirect_uri=https://www.oauth.com/playground/authorization-code-with-pkce.html
&code=sITqxZ9PLP01s43x2DWF9Vz_zj9Uh_NGxrCQYHa3_nWq3NXN
&code_verifier=M4NtnD9zIqW_PyhiHThc2MCUnCL2-5f7B3o9vXpMa0hq9LiC
```
 The authorization server will check whether the verifier matches the challenge that was used in the authorization request

#### Token Endpoint Response
```
{
  "token_type": "Bearer",
  "expires_in": 86400,
  "access_token": "3dwPqVVCWDLvsHR6MdQLMHWPQDVFAQ3q91clTK-jZzXLqSQ-knXV3EpGvD94zl0EEIufT7-O",
  "scope": "photo offline_access",
  "refresh_token": "_NNxEODnX_oR_62G7FCU5cMK"
}
```

## OAuth 2.0 Implicit Flow

#### 1. Build the Authorization URL
```
https://authorization-server.com/authorize?
  response_type=token
  &client_id=jnJXLOLEWoT3G9_3Acrb5SxV
  &redirect_uri=https://www.oauth.com/playground/implicit.html
  &scope=photo
  &state=Lt3VSedFMecSyVnJ
```

#### 2. Verify the state parameter
```
#access_token=1Jtx97SMLBzfCaQ57-3Ndt-zGou8T7eLTNrooKl_iobhnTONZu_gJmla8n0CJzo8utMRAyZY&token_type=Bearer&expires_in=86400&scope=photos&state=Lt3VSedFMecSyVnJ

```
You need to first verify that the state parameter matches the value stored in this user's session so that you protect against CSRF attacks.

This does not stop a malicious actor from injecting an access token into your client. There is no solution in OAuth for protecting the Implicit flow, and it is being deprecated in the Security BCP.

#### 3. Extract the access token
|key|value|
| --- | ---| 
| access_token | 1Jtx97SMLBzfCaQ57-3Ndt-zGou8T7eLTNrooKl_iobhnTONZu_gJmla8n0CJzo8utMRAyZY |
|token_type | Bearer |
|expires_in|	86400 |
|scope|	photos |


Note that this is an OAuth 2.0 Bearer Token,

## OpenID Connect Authorization Code Flow

#### 1. Build the Authorization URL

```
https://authorization-server.com/authorize?
  response_type=code
  &client_id=jnJXLOLEWoT3G9_3Acrb5SxV
  &redirect_uri=https://www.oauth.com/playground/oidc.html
  &scope=openid+profile+email+photos
  &state=zSlbKLMEUhBNzidC
  &nonce=oPz8RP3B6qXd2bpW
```

#### 2. Verify the state parameter

```
?state=zSlbKLMEUhBNzidC&code=TwTY20M9O5g2PJDx7nsKJ1xgfJIYdzXQc4z-zBXszxt6v1zD
```
#### 3. Exchange the Authorization Code

``` code
POST https://authorization-server.com/token

grant_type=authorization_code
&client_id=jnJXLOLEWoT3G9_3Acrb5SxV
&client_secret=bLjkSns4TLA_K5IVIt04BQWTGZZaNy6-6oldLzpKo9_g60ug
&redirect_uri=https://www.oauth.com/playground/oidc.html
&code=5v5pyRWztx9WeWxa5g6g8cODY8u3r4njNq2PtYubB33xjXaj
```
#### Token Endpoint Response
```
{
  "token_type": "Bearer",
  "expires_in": 86400,
  "access_token": "Tmkc4Y4eNuIbinvGOOha1P-RbFlJq7SocVr4TrmMYDcexxMMvIRbPaFQrNoGKo0DyNVIo4i-",
  "scope": "openid profile email photo",
  "id_token": "eyJraWQiOiJzMTZ0cVNtODhwREo4VGZCXzdrSEtQUkFQRjg1d1VEVGxteW85SUxUZTdzIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJkaXp6eS1yYXZlbkBleGFtcGxlLmNvbSIsIm5hbWUiOiJEaXp6eSBSYXZlbiIsImVtYWlsIjoiZGl6enktcmF2ZW5AZXhhbXBsZS5jb20iLCJpc3MiOiJodHRwczovL3BrLWRlbW8ub2t0YS5jb20vb2F1dGgyL2RlZmF1bHQiLCJhdWQiOiJqbkpYTE9MRVdvVDNHOV8zQWNyYjVTeFYiLCJpYXQiOjE2OTg0OTE2NDUsImV4cCI6MTcwMTA4MzY0NSwiYW1yIjpbInB3ZCJdfQ.ZoPvZPaomdOnnz2GFRGbgaW7PPWIMFDqSBp0gbN4An4a9F-Bc-4_T9EBGV8aGetyjZYAON0gjNV0p0NGFiwettePWKuxBzusuGCEd9iXWWUO9-WTF5e2AGr3_jkg34dbxfiFXy3KgH7m0czm809cMaiZ_ofLYgJHVD8lqMQoWifhoNhpjPqa19Svc3nCHzSYHUgTXQWvA56NmQvyVPh_OM7GMpc6zHopmihJqt3eREof8N-bOd7FL39jeam2-k1TFSDogyJE513aC0OssRADr_TWvtL8xoaPkXM_7bXYs9_7erXmzF9la0hvmOuasieetpLhOvFeoiOJWCU9xhxj4Q"
}
```
