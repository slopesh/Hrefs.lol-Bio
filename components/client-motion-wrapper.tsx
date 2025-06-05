"use client";

import { motion, HTMLMotionProps } from 'framer-motion';
import React from 'react';

// Extend HTMLMotionProps<'div'> to include all motion and div attributes
interface ClientMotionWrapperProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
}

const ClientMotionWrapper: React.FC<ClientMotionWrapperProps> = ({ children, ...props }) => {
  return (
    <motion.div {...props}>
      {children}
    </motion.div>
  );
};

export default ClientMotionWrapper; 