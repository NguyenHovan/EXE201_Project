export type UserRole = "admin" | "manager" | "customer" | "staff";
export class User {
  userId: string; // Unique user identifier
  userEmail: string; // Unique email
  role: UserRole; // User role (e.g., "Admin")
  aud: string; // Audience
  exp: number; // Expiration time (UNIX timestamp)
  iss: string; // Issuer
  jti: string; // Token identifier

  constructor(
    userId: string = "",
    userEmail: string = "",
    role: UserRole = "customer",
    aud: string = "",
    exp: number = 0,
    iss: string = "",
    jti: string = ""
  ) {
    this.userId = userId;
    this.userEmail = userEmail;
    this.role = role;
    this.aud = aud;
    this.exp = exp;
    this.iss = iss;
    this.jti = jti;
  }
}
