import type { Meta, StoryObj } from '@storybook/react';
import StatusBadge from './StatusBadge';

const meta = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Admitted: Story = {
  args: { status: 'Admitted' },
};

export const Critical: Story = {
  args: { status: 'Critical' },
};

export const Discharged: Story = {
  args: { status: 'Discharged' },
};