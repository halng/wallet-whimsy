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

import { renderHook, act } from '@testing-library/react-hooks';

import { useColorScheme } from '@/hooks/useColorScheme.web';

// Mock the react-native useColorScheme hook
const mockRNColorScheme = jest.fn();
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  __esModule: true,
  default: () => mockRNColorScheme(),
}));

describe('useColorScheme', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockRNColorScheme.mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });
  it('should return light theme before hydration', () => {
    mockRNColorScheme.mockImplementation(() => 'dark');
    const { result } = renderHook(() => useColorScheme());
    expect(result.current).toBe('dark');
  });

  it('should return the actual color scheme after hydration', async () => {
    mockRNColorScheme.mockImplementation(() => 'dark');
    const { result } = renderHook(() => useColorScheme());

    // Trigger hydration effect
    act(() => {
      jest.runAllTimers();
    });

    // After hydration, should return the value from RN useColorScheme
    expect(result.current).toBe('dark');
  });

  it('should handle light color scheme after hydration', async () => {
    mockRNColorScheme.mockImplementation(() => 'light');
    const { result } = renderHook(() => useColorScheme());

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current).toBe('light');
  });

  it('should handle null color scheme after hydration', async () => {
    mockRNColorScheme.mockImplementation(() => null);
    const { result } = renderHook(() => useColorScheme());

    act(() => {
      jest.runAllTimers();
    });

    expect(result.current).toBe(null);
  });
});
