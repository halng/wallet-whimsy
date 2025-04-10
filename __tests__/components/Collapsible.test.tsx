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

import React from 'react';
import { render, screen } from '@testing-library/react-native';

import { Collapsible } from '@/components/Collapsible';

describe(`Component - Collapsible`, () => {
  it(`Snapshot test`, () => {
    render(<Collapsible title={''} />);

    expect(screen.toJSON()).toBeTruthy();
    expect(screen.toJSON()).toMatchSnapshot();
  });
  it('The link should be visible', () => {
    render(<Collapsible title={'this-test'} />);
    const text = screen.getByText('this-test');
    expect(text).toBeTruthy();
  });
});
