
export class User {
    id: string = "";
    name: string = "";
    email: string = "";
    photo?: File | null | undefined;
    role?: 'user' | 'guide' | 'lead-guide' | 'admin' ;
    password: string = ""; 
    passwordConfirm: string = ""; 
    passwordChangedAt ?: Date ;
    passwordResetToken: string = "";
    passwordResetExpires?: Date ;
    active?: boolean;
  
    constructor(data: Partial<User> = {}) {
      Object.assign(this, data);
    }
  
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean> {
     
      return Promise.resolve(false);
    }
  
    changedPasswordAfter(JWTTimestamp: number): boolean {
      
      return false;
    }
  
    createPasswordResetToken(): string {
      
      return '';
    }
  }
  
