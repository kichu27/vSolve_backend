import pkg from 'jsonwebtoken';
const { sign } = pkg;
import { jwtSecretKey, refreshTokenSecretKey } from '../../config/index.js';

export function signAccessTokenForAdmin(userId ,roleId , roleName, roleType) {
  const accessToken = sign(
    { _id: userId , role_id : roleId ,role_name : roleName , role_type : roleType},
    jwtSecretKey,
    {
      expiresIn: '1d',
    }
  );
  return accessToken;
}

export function signAccessToken(userId,roleId , roleName , roleType) {
  const accessToken = sign(
    { _id: userId , role_id : roleId ,role_name : roleName , role_type : roleType},
    jwtSecretKey,
    {
      expiresIn: '1h',
    }
  );
  return accessToken;
}
export function signRefreshToken(userId,roleId , roleName, roleType) {
  const refreshToken = sign(
    { _id: userId , role_id : roleId ,role_name : roleName, role_type : roleType},
    refreshTokenSecretKey,
    {
      expiresIn: '7d',
    }
  );
  return refreshToken;
}
export function signConfirmCodeToken(userId, confirmCode) {
  const confirmCodeToken = sign(
    { _id: userId, code: confirmCode },
    jwtSecretKey,
    {
      expiresIn: '5m',
    }
  );
  return confirmCodeToken;
}
