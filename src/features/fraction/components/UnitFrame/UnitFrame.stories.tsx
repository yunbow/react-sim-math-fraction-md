import type { Meta, StoryObj } from '@storybook/react';
import { UnitFrame } from './UnitFrame';

const meta = {
  title: 'Fraction/UnitFrame',
  component: UnitFrame,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'range', min: 100, max: 400, step: 10 },
    },
    showLabel: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof UnitFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 200,
    showLabel: true,
  },
};

export const WithContent: Story = {
  args: {
    size: 200,
    showLabel: true,
    children: (
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '75%',
          backgroundColor: '#4a90d9',
        }}
      />
    ),
  },
};

export const NoLabel: Story = {
  args: {
    size: 150,
    showLabel: false,
  },
};

export const Large: Story = {
  args: {
    size: 300,
    showLabel: true,
  },
};
