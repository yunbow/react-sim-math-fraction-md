import type { Meta, StoryObj } from '@storybook/react';
import { ReductionView } from './ReductionView';

const meta = {
  title: 'Fraction/ReductionView',
  component: ReductionView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    step: {
      control: 'select',
      options: ['initial', 'findGcd', 'highlighting', 'reducing', 'complete'],
    },
  },
} satisfies Meta<typeof ReductionView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {
  args: {
    original: { numerator: 6, denominator: 8 },
    reduced: { numerator: 3, denominator: 4 },
    gcd: 2,
    step: 'initial',
  },
};

export const FindGcd: Story = {
  args: {
    original: { numerator: 6, denominator: 8 },
    reduced: { numerator: 3, denominator: 4 },
    gcd: 2,
    step: 'findGcd',
  },
};

export const Highlighting: Story = {
  args: {
    original: { numerator: 6, denominator: 8 },
    reduced: { numerator: 3, denominator: 4 },
    gcd: 2,
    step: 'highlighting',
  },
};

export const Reducing: Story = {
  args: {
    original: { numerator: 6, denominator: 8 },
    reduced: { numerator: 3, denominator: 4 },
    gcd: 2,
    step: 'reducing',
  },
};

export const Complete: Story = {
  args: {
    original: { numerator: 6, denominator: 8 },
    reduced: { numerator: 3, denominator: 4 },
    gcd: 2,
    step: 'complete',
  },
};

export const LargerGcd: Story = {
  args: {
    original: { numerator: 9, denominator: 12 },
    reduced: { numerator: 3, denominator: 4 },
    gcd: 3,
    step: 'highlighting',
  },
};
