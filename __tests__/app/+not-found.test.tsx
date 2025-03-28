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

import React from 'react';
import { render, screen } from '@testing-library/react-native';

import NotFoundScreen from '@/app/+not-found';

jest.mock('expo-router', () => ({
  Stack: {
    Screen: jest.fn(({ children }) => children),
  },
  Link: jest.fn(({ children }) => children),
}));
describe('App - NotFoundScreen', () => {
  test('Snapshot test ', async () => {
    render(<NotFoundScreen />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
  test('UI should render correctly', () => {
    render(<NotFoundScreen />);
    const msg = screen.getByText("This screen doesn't exist.");
    expect(msg).toBeTruthy();
  });
});
