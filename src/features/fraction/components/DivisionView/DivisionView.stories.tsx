import type { Meta, StoryObj } from '@storybook/react';
import { DivisionView } from './DivisionView';

const meta = {
  title: 'Fraction/DivisionView',
  component: DivisionView,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    step: {
      control: 'select',
      options: ['initial', 'step1', 'step2', 'reciprocal', 'complete'],
    },
    size: { control: { type: 'range', min: 100, max: 400, step: 10 } },
  },
} satisfies Meta<typeof DivisionView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initial: Story = {
  args: {
    dividend: { numerator: 2, denominator: 3 },
    divisor: { numerator: 3, denominator: 4 },
    step: 'initial',
    size: 200,
  },
};

export const Step1: Story = {
  args: {
    dividend: { numerator: 2, denominator: 3 },
    divisor: { numerator: 3, denominator: 4 },
    step: 'step1',
    size: 200,
  },
};

export const Step2: Story = {
  args: {
    dividend: { numerator: 2, denominator: 3 },
    divisor: { numerator: 3, denominator: 4 },
    step: 'step2',
    size: 200,
  },
};

export const Reciprocal: Story = {
  args: {
    dividend: { numerator: 2, denominator: 3 },
    divisor: { numerator: 3, denominator: 4 },
    step: 'reciprocal',
    size: 200,
  },
};

export const Complete: Story = {
  args: {
    dividend: { numerator: 2, denominator: 3 },
    divisor: { numerator: 3, denominator: 4 },
    step: 'complete',
    size: 200,
  },
};
