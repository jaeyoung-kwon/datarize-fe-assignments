import { useState } from 'react';
import type { Customer } from '@/types';

export const useCustomerDetailModal = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [open, setOpen] = useState(false);

  const openModal = (customer: Customer) => {
    setSelectedCustomer(customer);
    setOpen(true);
  };

  const closeModal = () => {
    setSelectedCustomer(null);
    setOpen(false);
  };

  return {
    selectedCustomer,
    open,
    openModal,
    closeModal,
  };
};
