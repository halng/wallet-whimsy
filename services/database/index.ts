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

import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { schemaMigrations } from '@nozbe/watermelondb/Schema/migrations';

import Schema from '../model/Schema';
import { Users } from '../model/Users';

// Define migrations
const migrations = schemaMigrations({
  migrations: [
    // Example migration if needed:
    // {
    //   toVersion: 2,
    //   steps: [
    //     // Add steps here
    //   ]
    // }
  ],
});

const adapter = new SQLiteAdapter({
  schema: Schema,
  dbName: 'whimsy.db',
  migrations,
  onSetUpError: error => {
    console.error(`Database setup error: ${error}`);
  },
});

export const database = new Database({
  adapter,
  modelClasses: [Users],
});
