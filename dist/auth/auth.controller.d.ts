import { AuthService } from './auth.service';
import { LoginDto } from './dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(body: LoginDto): {
        access_token: string;
    };
}
