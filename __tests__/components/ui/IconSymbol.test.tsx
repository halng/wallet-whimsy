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
import { render } from '@testing-library/react-native';

import { IconSymbol } from '@/components/ui/IconSymbol';

describe('IconSymbol', () => {
  it('matches snapshot with default props', () => {
    const { toJSON } = render(<IconSymbol name="house.fill" color="black" />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot with custom size and style', () => {
    const { toJSON } = render(
      <IconSymbol name="paperplane.fill" color="red" size={32} style={{ marginRight: 10 }} />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches snapshot for different icon mappings', () => {
    const { toJSON } = render(
      <>
        <IconSymbol name="chevron.right" color="blue" />
        <IconSymbol name="money.bill.transfer" color="green" />
        <IconSymbol name="account.balance" color="purple" />
      </>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
