/*
 * Copyright 2025 Hal Ng
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Q } from '@nozbe/watermelondb';

import { AuthCredentials } from '@/model/Auth';

import { database } from '../database';
import { Users } from '../model/Users';

export class UserService {
  private users = database.collections.get<Users>('users');

  async add(authCredentials: AuthCredentials): Promise<void> {
    // on local device only one recore is allowed
    await database.write(async () => {
      const existingCre = await this.users.query(Q.where('is_active', true)).fetch();

      await database.batch(
        ...existingCre.map(user =>
          user.prepareUpdate(user => {
            user.isActive = false;
          }),
        ),
      );

      // add new one
      await this.users.create(user => {
        user.passcode = authCredentials.passcode;
        user.name = authCredentials.name;
        user.isActive = true;
      });
    });
  }

  async hasActiveUser(): Promise<boolean> {
    const count = await this.users.query(Q.where('is_active', true)).fetchCount();
    return count > 0;
  }

  async verifyCredential(authCredentials: AuthCredentials): Promise<boolean> {
    const user = await this.users.query(Q.where('is_active', true)).fetch();

    return (
      user.at(0)?.name === authCredentials.name && user.at(0)?.passcode === authCredentials.passcode
    );
  }
}
