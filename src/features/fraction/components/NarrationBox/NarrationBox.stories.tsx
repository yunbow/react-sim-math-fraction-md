import type { Meta, StoryObj } from '@storybook/react';
import { NarrationBox } from './NarrationBox';

const meta = {
  title: 'Fraction/NarrationBox',
  component: NarrationBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['info', 'hint', 'success', 'warning'],
    },
    showIcon: { control: 'boolean' },
  },
} satisfies Meta<typeof NarrationBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    message: '最初の分数だよ',
    type: 'info',
    showIcon: true,
  },
};

export const Hint: Story = {
  args: {
    message: '割り算は、逆数の掛け算に変えられるね！',
    type: 'hint',
    showIcon: true,
  },
};

export const Success: Story = {
  args: {
    message: '完成！よくできました！',
    type: 'success',
    showIcon: true,
  },
};

export const Warning: Story = {
  args: {
    message: '分母が0にならないように注意してね',
    type: 'warning',
    showIcon: true,
  },
};

export const NoIcon: Story = {
  args: {
    message: 'アイコンなしのメッセージ',
    type: 'info',
    showIcon: false,
  },
};
