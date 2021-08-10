import { ajax } from 'rxjs/ajax';
import { User } from '../features/user/models/user.model';

export class UserApi {
  getUserByName(username: string) {
    return ajax.getJSON<User>(`https://api.github.com/users/${username}`);
  }

  getUserList() {
    return ajax.getJSON<User[]>(`https://api.github.com/users`);
  }
}
