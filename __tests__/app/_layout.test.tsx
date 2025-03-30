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
import { useFonts } from 'expo-font';

import RootLayout from '@/app/_layout';

jest.mock('expo-router', () => ({
  useRouter: jest.fn(),
  useSegments: jest.fn(),
  usePathname: jest.fn(() => '/'),
  useSearchParams: jest.fn(() => ({})),
  Stack: {
    Screen: jest.fn(({ children }) => children),
  },
}));

jest.mock('expo-font', () => ({
  loadAsync: jest.fn(),
  useFonts: jest.fn(),
}));

describe('App - RootLayout', () => {
  test('Snapshot test - The font is not loaded ', async () => {
    (useFonts as jest.Mock).mockReturnValue([false, false]);

    render(<RootLayout />);
    expect(screen.toJSON()).toMatchSnapshot();
  });
});
