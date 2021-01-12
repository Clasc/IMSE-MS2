import { User } from "../Dtos/User";
import { UserApiService } from "./UserApiService";

export async function validateUserData(user: User): Promise<string[]> {
    let errors: string[] = [];
    if (!user.username) errors.push("Username is a required field");
    if (!user.first_name) errors.push("first_name is a required field");
    if (!user.last_name) errors.push("last_name is a required field");
    if (!user.password) errors.push("password is a required field");
    if (!user.birthday) errors.push("birthday is a required field");

    let users = await UserApiService.getUserByUsername(user.username);
    if (users && users.length > 0) {
        errors.push("This username already exists");
    }

    let currentYear = new Date().getFullYear();

    if (user.birthday) {
        let birthDate = new Date(user.birthday);
        let age = currentYear - birthDate.getFullYear();

        if (age < 18) {
            errors.push("You are not old enough to register");
        }

    }

    return errors;
}
