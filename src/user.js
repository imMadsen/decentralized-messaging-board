import Gun from "gun";
import 'gun/lib/path';
import 'gun/sea';
import 'gun/axe';

export const gun = Gun();
export const user = gun.user().recall({sessionStorage: true});

export function createAnonymousUser() {
    // Generate random string of given length
    function randomString(length) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text;
    }

    // Create user
    const [alias, password] = [randomString(8), randomString(8)]
    user.create(alias, password, null, () => user.auth(alias, password))
    console.log('Created a new anon user.')
}