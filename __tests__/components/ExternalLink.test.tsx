/*
 * Copyright 2025 Hal Ng
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { render, screen, fireEvent } from '@testing-library/react-native';
import { Platform } from 'react-native';
import { openBrowserAsync } from 'expo-web-browser';

import { ExternalLink } from '@/components/ExternalLink';

// Mock the dependencies
jest.mock('expo-web-browser', () => ({
  openBrowserAsync: jest.fn(),
}));
describe('ExternalLink Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Platform.OS = 'web';
  });

  // Mock event object
  const mockEvent = {
    preventDefault: jest.fn(),
  };

  it('renders correctly with required props', () => {
    render(
      <ExternalLink href="https://example.com" testID="external-link">
        Test Link
      </ExternalLink>,
    );

    const link = screen.getByTestId('external-link');
    expect(link).toBeTruthy();
  });

  it('renders with correct text content', () => {
    render(
      <ExternalLink href="https://example.com" testID="external-link">
        Test Link
      </ExternalLink>,
    );

    const link = screen.getByText('Test Link');
    expect(link).toBeTruthy();
  });

  it('does not call openBrowserAsync on web platform', async () => {
    Platform.OS = 'web';
    render(
      <ExternalLink href="https://example.com" testID="external-link">
        Test Link
      </ExternalLink>,
    );

    const link = screen.getByTestId('external-link');
    fireEvent.press(link, mockEvent);

    expect(openBrowserAsync).not.toHaveBeenCalled();
    expect(mockEvent.preventDefault).not.toHaveBeenCalled();
  });

  it('calls openBrowserAsync on iOS platform', async () => {
    Platform.OS = 'ios';
    render(
      <ExternalLink href="https://example.com" testID="external-link">
        Test Link
      </ExternalLink>,
    );

    const link = screen.getByTestId('external-link');
    fireEvent.press(link, mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(openBrowserAsync).toHaveBeenCalledWith('https://example.com');
  });

  it('calls openBrowserAsync on Android platform', async () => {
    Platform.OS = 'android';
    render(
      <ExternalLink href="https://example.com" testID="external-link">
        Test Link
      </ExternalLink>,
    );

    const link = screen.getByTestId('external-link');
    fireEvent.press(link, mockEvent);

    expect(mockEvent.preventDefault).toHaveBeenCalled();
    expect(openBrowserAsync).toHaveBeenCalledWith('https://example.com');
  });

  it('passes through additional props', () => {
    render(
      <ExternalLink
        href="https://example.com"
        testID="external-link"
        accessibilityLabel="Accessible link"
      >
        Test Link
      </ExternalLink>,
    );

    const link = screen.getByTestId('external-link');
    expect(link).toBeTruthy();
  });
});
