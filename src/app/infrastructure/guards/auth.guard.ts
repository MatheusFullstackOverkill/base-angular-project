import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const loggedUserGuard = () => {
    const router = inject(Router);

    const has_storage_data = [
        localStorage.getItem('auth_token'),
        localStorage.getItem('user_id')
    ].filter(x => x == null).length == 0;

    console.log(has_storage_data);

    return has_storage_data ? true : router.navigate(['/login']);
}

export const unloggedUserGuard = () => {
    const router = inject(Router);

    const has_storage_data = [
        localStorage.getItem('auth_token'),
        localStorage.getItem('user_id')
    ].filter(x => x == null).length == 0;

    return has_storage_data ? router.navigate(['/dashboard']) : true;  
}