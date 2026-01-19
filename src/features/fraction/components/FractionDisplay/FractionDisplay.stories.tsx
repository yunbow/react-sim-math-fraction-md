import type { Meta, StoryObj } from '@storybook/react';
import { FractionDisplay } from './FractionDisplay';

const meta = {
  title: 'Fraction/FractionDisplay',
  component: FractionDisplay,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    highlighted: {
      control: 'boolean',
    },
    color: {
      control: 'color',
    },
  },
} satisfies Meta<typeof FractionDisplay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fraction: { numerator: 3, denominator: 4 },
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    fraction: { numerator: 1, denominator: 2 },
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    fraction: { numerator: 5, denominator: 8 },
    size: 'large',
  },
};

export const Highlighted: Story = {
  args: {
    fraction: { numerator: 2, denominator: 3 },
    size: 'large',
    highlighted: true,
  },
};

export const CustomColor: Story = {
  args: {
    fraction: { numerator: 7, denominator: 10 },
    size: 'large',
    color: '#e8744f',
  },
};
