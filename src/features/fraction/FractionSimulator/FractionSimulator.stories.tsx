import type { Meta, StoryObj } from '@storybook/react';
import { FractionSimulator } from './FractionSimulator';

const meta = {
  title: 'Fraction/FractionSimulator',
  component: FractionSimulator,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FractionSimulator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
