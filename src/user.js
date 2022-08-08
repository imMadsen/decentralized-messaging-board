import Gun from "gun";
import 'gun/lib/path';
import 'gun/sea';
import 'gun/axe';

export const gun = Gun();
export const user = gun.user().recall({sessionStorage: true});