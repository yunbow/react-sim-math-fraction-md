import type { Meta, StoryObj } from '@storybook/react';
import { MultiplicationView } from './MultiplicationView';

const meta = {
  title: 'Fraction/MultiplicationView',
  component: MultiplicationView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    showFirst: { control: 'boolean' },
    showSecond: { control: 'boolean' },
    showOverlap: { control: 'boolean' },
    size: { control: { type: 'range', min: 100, max: 400, step: 10 } },
  },
} satisfies Meta<typeof MultiplicationView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fraction1: { numerator: 2, denominator: 3 },
    fraction2: { numerator: 3, denominator: 4 },
    showFirst: true,
    showSecond: true,
    showOverlap: true,
    size: 200,
  },
};

export const ShowFirstOnly: Story = {
  args: {
    fraction1: { numerator: 2, denominator: 3 },
    fraction2: { numerator: 3, denominator: 4 },
    showFirst: true,
    showSecond: false,
    showOverlap: false,
    size: 200,
  },
};

export const ShowBothWithoutOverlap: Story = {
  args: {
    fraction1: { numerator: 2, denominator: 3 },
    fraction2: { numerator: 3, denominator: 4 },
    showFirst: true,
    showSecond: true,
    showOverlap: false,
    size: 200,
  },
};

export const HalfTimesHalf: Story = {
  args: {
    fraction1: { numerator: 1, denominator: 2 },
    fraction2: { numerator: 1, denominator: 2 },
    showFirst: true,
    showSecond: true,
    showOverlap: true,
    size: 200,
  },
};

export const LargerFractions: Story = {
  args: {
    fraction1: { numerator: 3, denominator: 5 },
    fraction2: { numerator: 4, denominator: 6 },
    showFirst: true,
    showSecond: true,
    showOverlap: true,
    size: 250,
  },
};
